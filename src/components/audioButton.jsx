"use client"

import React, { useState, useRef, useEffect } from 'react';
import { useAudioRecorder } from 'react-audio-voice-recorder';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';

// AudioButton component for recording, playing, and visualizing audio
const AudioButton = ({
  isRecording,
  setIsRecording,
  audioUrl,
  setAudioUrl,
  audioBase64,
  setAudioBase64,
  timer,
  setTimer,
  isPlaying,
  setIsPlaying }) => {

  // Refs for audio elements and visualization
  const audioRef = useRef(null);
  const analyserRef = useRef(null);
  const canvasRef = useRef(null);
  const waveformRef = useRef(null);
  const dotCanvasRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  // State for playback time and error handling
  const [playbackTime, setPlaybackTime] = useState(0);
  const [error, setError] = useState(null);

  // Initialize audio recorder with noise suppression and echo cancellation
  const recorderControls = useAudioRecorder({
    audioTrackConstraints: {
      noiseSuppression: true,
      echoCancellation: true,
    },
    onNotAllowedOrFound: (err) => {
      console.error('Error accessing media devices.', err);
      alert('Permission denied. Please enable microphone access and try again.');
      setIsRecording(false);
    },
  });

  const { startRecording, stopRecording, recordingBlob, isRecording: recorderIsRecording, mediaRecorder } = recorderControls;

  // Handle recording blob and convert to base64
  useEffect(() => {
    if (recordingBlob && timer < 10) {
      setError('Recording must be at least 10 seconds long.');
      setAudioUrl(null);
    } else if (recordingBlob && recordingBlob.size >= 10) {
      setError(null);
      const audioUrl = URL.createObjectURL(recordingBlob);
      setAudioUrl(audioUrl);
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result.split(',')[1];
        setAudioBase64(base64data);
      };
      reader.readAsDataURL(recordingBlob);
    } else {
      setAudioUrl(null);
      setError(null);
    }
  }, [recordingBlob]);

  // Update playback time
  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      const updatePlaybackTime = () => {
        setPlaybackTime(audio.currentTime);
        setTimer(Math.floor(audio.currentTime));
      };
      audio.addEventListener('timeupdate', updatePlaybackTime);
      return () => {
        audio.removeEventListener('timeupdate', updatePlaybackTime);
      };
    }
  }, [audioUrl]);

  // Handle waveform click to change playback position
  const handleWaveformClick = (e) => {
    const waveform = waveformRef.current;
    if (!waveform) return;
    const clickX = e.pageX - waveform.getBoundingClientRect().left;
    const clickPercentage = clickX / waveform.width;
    const newTime = audioRef.current.duration * clickPercentage;

    if (isFinite(newTime)) {
      audioRef.current.currentTime = newTime;
      setTimer(Math.floor(newTime));
    } else {
      console.error('newTime is not finite:', newTime);
    }
  };

  // Set up media recorder
  useEffect(() => {
    mediaRecorderRef.current = mediaRecorder;
  }, [mediaRecorder]);

  // Set up audio analyser for visualization
  useEffect(() => {
    if (!isRecording || !mediaRecorderRef.current) return;
    const stream = mediaRecorderRef.current.stream;
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const source = audioCtx.createMediaStreamSource(stream);
    analyserRef.current = audioCtx.createAnalyser();
    analyserRef.current.fftSize = 256;
    source.connect(analyserRef.current);
    drawFrequencyBars();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      if (analyserRef.current) {
        analyserRef.current.disconnect();
      }
    };
  }, [isRecording, mediaRecorderRef.current]);

  // Draw frequency bars for audio visualization
  const drawFrequencyBars = () => {
    const canvas = canvasRef.current;
    const canvasCtx = canvas.getContext('2d');
    const bufferLength = analyserRef.current.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const draw = () => {
      if (!isRecording) return;
      requestAnimationFrame(draw);
      analyserRef.current.getByteFrequencyData(dataArray);
      canvasCtx.fillStyle = 'rgb(0, 0, 0)';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 1.2;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] * 1.2;
        canvasCtx.fillStyle = "rgb(160, 160, 160)";
        canvasCtx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight);
        x += barWidth + 1;
      }
    };
    draw();
  };

  // Draw waveform for recorded audio
  const drawWaveform = async () => {
    const canvas = waveformRef.current;
    const ctx = canvas.getContext('2d');
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    try {
      const response = await fetch(audioUrl);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

      const bufferLength = audioBuffer.length;
      const data = audioBuffer.getChannelData(0);
      const step = Math.ceil(data.length / canvas.width);
      const amp = canvas.height / 2;

      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.lineWidth = 2;
      ctx.strokeStyle = 'rgb(160, 160, 160)';
      ctx.beginPath();

      const lineSpacing = 3;
      const silenceThreshold = 0.1;
      const tinyBarHeight = 4;

      const scalingFactor = 4;

      for (let i = 0; i < canvas.width; i += lineSpacing) {
        let min = 1.0;
        let max = -1.0;
        for (let j = 0; j < step; j++) {
          const datum = data[(i * step) + j];
          if (datum < min) min = datum;
          if (datum > max) max = datum;
        }
        min *= scalingFactor;
        max *= scalingFactor;

        if (max - min < silenceThreshold) {
          ctx.moveTo(i, amp - tinyBarHeight / 2);
          ctx.lineTo(i, amp + tinyBarHeight / 2);
        } else {
          ctx.moveTo(i, amp + min * (amp / 2));
          ctx.lineTo(i, amp + max * (amp / 2));
        }
      }
      ctx.stroke();
    } catch (error) {
      console.error('Failed to draw waveform:', error);
    }
  };

  // Draw playback position dot on waveform
  const drawDot = () => {
    if (!audioRef.current) return;
    const canvas = dotCanvasRef.current;
    const ctx = canvas.getContext('2d');
    const playbackPercentage = audioRef.current.currentTime / audioRef.current.duration;
    const dotX = canvas.width * playbackPercentage;
    canvas.height = canvas.offsetHeight;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const radius = 7;
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(dotX, canvas.height / 2, radius, 0, 2 * Math.PI);
    ctx.fill();

    requestAnimationFrame(drawDot);
  };

  // Draw waveform and dot when audio URL changes
  useEffect(() => {
    if (audioUrl) {
      drawWaveform().then(() => {
        drawDot();
      });
    }
  }, [audioUrl, playbackTime]);

  // Handle recording timer
  useEffect(() => {
    let interval = null;
    if (recorderIsRecording) {
      setTimer(0);
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [recorderIsRecording]);

  // Start and stop recording handlers
  const startRecordingHandler = () => {
    setIsRecording(true);
    startRecording();
  };

  const stopRecordingHandler = () => {
    setIsRecording(false);
    stopRecording();
  };

  // Toggle recording on button click
  const handleToggleRecording = (event) => {
    if (event.target.closest('.control-button')) {
      return;
    }
    if (isRecording) {
      stopRecordingHandler();
    } else {
      startRecordingHandler();
    }
  };

  // Toggle play/pause for recorded audio
  const togglePlayPause = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          await audioRef.current.pause();
        } else {
          await audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
      } catch (error) {
        console.error(isPlaying ? 'Pause error:' : 'Play error:', error);
      }
    }
  };

  // Delete recorded audio
  const handleDeleteRecording = () => {
    setAudioUrl(null);
    setTimer(0);
  };

  // Render the AudioButton component
  return (
    <div>
      <button
        className={`w-full min-w-[315px] h-[60px] rounded-lg text-white px-4 flex items-center justify-between bg-black`}
        onClick={audioUrl ? null : handleToggleRecording}
      >
        {/* Render different UI based on recording state */}
        {isRecording ? (
          // Recording in progress UI
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center'>
              <img src="micRed.svg" className="animate-pulse w-auto h-auto" />
            </div>
            <div className='flex flex-1 mx-4'>
              <canvas ref={canvasRef} className='h-7 w-full'></canvas>
            </div>
            <div>
              {Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)}
            </div>
          </div>
        ) : audioUrl ? (
          // Playback UI for recorded audio
          <div className='flex items-center justify-between h-full w-full'>
            <span className='h-auto w-auto mr-[2px] '>{Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)}</span>
            <div className='flex justify-center w-10 ml-1 mr-2 control-button' onClick={(e) => { e.stopPropagation(); togglePlayPause(); }}>
              <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)}></audio>
              {isPlaying ?
                (<PauseIcon fontSize="large" />) :
                (<PlayArrowIcon fontSize="large" />)
              }
            </div>
            <div className="relative h-[50px] w-full ml-2 mr-3" onClick={(e) => { e.stopPropagation(); handleWaveformClick(e); }}>
              <canvas ref={waveformRef} className="absolute top-0 left-0 w-full h-full"></canvas>
              <canvas ref={dotCanvasRef} className="absolute top-0 left-0 w-full h-full"></canvas>
            </div>
            <div className='flex justify-center h-auto w-10 ml-[-4px] control-button scale-110' onClick={(e) => { e.stopPropagation(); handleDeleteRecording(); }}>
              <img src="deleteIcon.svg" alt="Delete" className='h-[60%] ml-2' />
            </div>
          </div>
        ) : (
          // Initial state UI
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center'>
              <KeyboardVoiceIcon fontSize='medium' />
              <span className='whitespace-nowrap pl-[14px] al:font-semibold sl:font-semibold font-bold text-[20px] xs:text-[18px]'>Explain your idea</span>
            </div>
            <span className='pl-3 text-sm font-normal'>2 min.</span>
          </div>
        )}
      </button>
      {error && <div className='text-red-500 text-sm mt-2'>{error}</div>}
    </div>
  );
};

export default AudioButton;
