"use client"

import React, { useState, useRef, useEffect } from 'react';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

const AudioButton = ({
  isRecording,
  setIsRecording,
  audioUrl,
  setAudioUrl,
  timer,
  setTimer,
  isPlaying,
  setIsPlaying }) => {
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(null);
  const analyserRef = useRef(null);
  const canvasRef = useRef(null);
  const waveformRef = useRef(null);
  const dotCanvasRef = useRef(null);

  const [playbackTime, setPlaybackTime] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      const audio = audioRef.current;
      const updatePlaybackTime = () => {
        setPlaybackTime(audio.currentTime);
        setTimer(Math.floor(audio.currentTime)); // Update the timer here
      };
      audio.addEventListener('timeupdate', updatePlaybackTime);

      return () => {
        audio.removeEventListener('timeupdate', updatePlaybackTime);
      };
    }
  }, [audioUrl]);

  useEffect(() => {
    if (!isRecording) return;

    let stream = null; // Hold the stream globally within this effect

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(s => {
        stream = s; // Assign the stream from getUserMedia to the global variable
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const source = audioCtx.createMediaStreamSource(stream);
        analyserRef.current = audioCtx.createAnalyser();
        analyserRef.current.fftSize = 256;
        source.connect(analyserRef.current);
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.ondataavailable = (event) => {
          audioChunksRef.current.push(event.data);
        };
        mediaRecorderRef.current.onstop = () => {
          const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
          const audioUrl = URL.createObjectURL(audioBlob);
          setAudioUrl(audioUrl);
          audioChunksRef.current = [];
        };
        mediaRecorderRef.current.start();
        drawFrequencyBars();
      })
      .catch(err => {
        console.error('Error accessing media devices.', err);
        alert('Permission denied. Please enable microphone access and try again.');
        setIsRecording(false);
      });

    return () => {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      if (stream) {
        stream.getTracks().forEach(track => track.stop()); // Stop each track to ensure the microphone is turned off
      }
      // If using an audio context, disconnect the source here as well
      if (analyserRef.current) {
        analyserRef.current.disconnect();
      }
    };
  }, [isRecording]);

  useEffect(() => {
    const setAudioOutputDevice = async () => {
      if (audioRef.current && audioRef.current.setSinkId) {
        try {
          // Attempt to get the default device or any output device
          const devices = await navigator.mediaDevices.enumerateDevices();
          const audioOutputDevices = devices.filter(device => device.kind === 'audiooutput');
          if (audioOutputDevices.length > 0) {
            // This example uses the first available output device
            // You might want to let the user choose or try to select the default device explicitly
            await audioRef.current.setSinkId(audioOutputDevices[0].deviceId);
            console.log(`Audio output set to device: ${audioOutputDevices[0].label}`);
          }
        } catch (error) {
          console.error('Error setting audio output device:', error);
        }
      }
    };
  
    setAudioOutputDevice();
  }, [audioUrl]); // Re-run when audioUrl changes, indicating a new recording is available for playback

  useEffect(() => {
    const drawWaveform = async () => {
      const canvas = waveformRef.current;
      const ctx = canvas.getContext('2d');
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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

      const scalingFactor = 4; // Increase this to increase the height of the waveform

      for (let i = 0; i < canvas.width; i += lineSpacing) {
        let min = 1.0;
        let max = -1.0;
        for (let j = 0; j < step; j++) {
          const datum = data[(i * step) + j];
          if (datum < min) min = datum;
          if (datum > max) max = datum;
        }
        min *= scalingFactor; // Apply scaling factor
        max *= scalingFactor; // Apply scaling factor

        if (max - min < silenceThreshold) {
          ctx.moveTo(i, amp - tinyBarHeight / 2);
          ctx.lineTo(i, amp + tinyBarHeight / 2);
        } else {
          // Adjust the drawing to account for the increased height
          ctx.moveTo(i, amp + min * (amp / 2));
          ctx.lineTo(i, amp + max * (amp / 2));
        }
      }
      ctx.stroke();
    };

    const drawDot = () => {
      if (!audioRef.current) return;
      const canvas = dotCanvasRef.current;
      const ctx = canvas.getContext('2d');
      const playbackPercentage = audioRef.current.currentTime / audioRef.current.duration;
      const dotX = canvas.width * playbackPercentage;
      canvas.height = canvas.offsetHeight;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Increase the radius here
      const radius = 4; // Example: doubled the radius to make the dot bigger
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(dotX, canvas.height / 2, radius, 0, 2 * Math.PI);
      ctx.fill();

      requestAnimationFrame(drawDot);
    };

    if (audioUrl) {
      drawWaveform().then(() => {
        drawDot();
      });
    }
  }, [audioUrl, playbackTime]);

  const handleWaveformClick = (e) => {
    const waveform = waveformRef.current;
    if (!waveform) return;

    const clickX = e.pageX - waveform.getBoundingClientRect().left;
    const clickPercentage = clickX / waveform.width;
    const newTime = audioRef.current.duration * clickPercentage;

    // Check if newTime is finite before setting currentTime
    if (isFinite(newTime)) {
      audioRef.current.currentTime = newTime;
      setTimer(Math.floor(newTime));
    } else {
      console.error('newTime is not finite:', newTime);
    }
  };

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

  useEffect(() => {
    let interval = null;
    if (isRecording) {
      setTimer(0);
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const startRecording = () => {
    setIsRecording(true);
    setAudioUrl(null);
    setTimer(0);
  };

  const stopRecording = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
    }
  };

  const handleToggleRecording = (event) => {
    if (event.target.closest('.control-button')) {
      return;
    }
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleDeleteRecording = () => {
    setAudioUrl(null);
    setTimer(0);
  };

  return (
    <div>
      <button
        className={`w-full min-w-[315px] xs:h-[48px] h-[60px] xm:h-[68px] rounded-lg text-white px-4 flex items-center justify-between bg-black`}
        onClick={handleToggleRecording}
      >
        {isRecording ? (
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
          <div className='flex items-center justify-between h-full w-full'>
            <span className='h-auto w-auto mr-[2px]'>{Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)}</span>
            <div className='flex justify-center w-10 m-2 control-button' onClick={(e) => { e.stopPropagation(); togglePlayPause(); }}>
              <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)}></audio>
              {isPlaying ?
                (<img src="pauseIcon.svg" alt="Pause" className='scale-110' />) :
                (<img src="playIcon.svg" alt="Play" className='h-full w-full' />)
              }
            </div>
            <div className="relative h-[50px] w-full mx-2" onClick={handleWaveformClick}>
              <canvas ref={waveformRef} className="absolute top-0 left-0 w-full h-full"></canvas>
              <canvas ref={dotCanvasRef} className="absolute top-0 left-0 w-full h-full"></canvas>
            </div>

            <div className='flex justify-center h-auto w-10 ml-[-4px] control-button scale-110' onClick={(e) => { e.stopPropagation(); handleDeleteRecording(); }}>
              <img src="deleteIcon.svg" alt="Delete" className='h-[60%] ml-2' />
            </div>
          </div>
        ) : (
          <div className='flex items-center justify-between w-full'>
            <div className='flex items-center'>
              <KeyboardVoiceIcon fontSize='medium' />
              <span className='whitespace-nowrap pl-[14px] font-bold text-[20px] xs:text-[18px]'>Explain your idea</span>
            </div>
            <span className='pl-3 text-sm font-medium whitespace-nowrap'>2 min.</span>
          </div>
        )}
      </button>
    </div>
  );
};

export default AudioButton;
