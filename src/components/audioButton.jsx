"use client"

import React, { useState, useRef, useEffect } from 'react';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';

const AudioButton = ({ isRecording, setIsRecording, recordingComplete, setRecordingComplete, audioUrl, setAudioUrl, timer, setTimer, isPlaying, setIsPlaying }) => {
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(null);
  const analyserRef = useRef(null);
  const canvasRef = useRef(null);
  const waveformRef = useRef(null);

  useEffect(() => {
    if (!isRecording) return;
  
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
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
    };
  }, [isRecording]);
  

  useEffect(() => {
    if (!audioUrl) return;

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
      const tinyBarHeight = 3;

      for (let i = 0; i < canvas.width; i += lineSpacing) {
        let min = 1.0;
        let max = -1.0;
        for (let j = 0; j < step; j++) {
          const datum = data[(i * step) + j];
          if (datum < min) min = datum;
          if (datum > max) max = datum;
        }
        if (max - min < silenceThreshold) {
          ctx.moveTo(i, amp - tinyBarHeight / 2);
          ctx.lineTo(i, amp + tinyBarHeight / 2);
        } else {
          ctx.moveTo(i, (1 + min) * amp);
          ctx.lineTo(i, (1 + max) * amp);
        }
      }
      ctx.stroke();
    };

    drawWaveform();
  }, [audioUrl]);

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
    setRecordingComplete(false);
    setAudioUrl(null);
    setTimer(0);
  };

  const stopRecording = () => {
    setIsRecording(false);
    setRecordingComplete(true);
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

  const handleCompleteRecording = () => {
    setRecordingComplete(true);
    setIsRecording(false);
  };

  const handleDeleteRecording = () => {
    setAudioUrl(null);
    setRecordingComplete(false);
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
            <span className='h-auto w-auto'>{Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)}</span>
            <button onClick={(e) => { e.stopPropagation(); togglePlayPause(); }} className='flex justify-center w-10 ml-2'>
              <audio ref={audioRef} src={audioUrl} ></audio>
              {isPlaying ?
                (<img src="pauseIcon.svg" alt="Pause" className='h-full w-full' />) :
                (<img src="playIcon.svg" alt="Play" className='h-full w-full' />)
              }
            </button>
            <canvas ref={waveformRef} className='h-4/5 w-full px-2'></canvas>
            <button onClick={(e) => { e.stopPropagation(); handleCompleteRecording(); }} className='flex justify-center h-auto w-10 mx-2'>
              <img src="appendIcon.png" alt="Complete" className='h-full w-full' />
            </button>
            <button onClick={(e) => { e.stopPropagation(); handleDeleteRecording(); }} className='flex justify-center rounded-lg h-auto w-10'>
              <img src="deleteIcon.svg" alt="Delete" className='h-[60%]' />
            </button>
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
