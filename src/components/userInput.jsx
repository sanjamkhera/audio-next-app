// "use client"

// import React, { useState, useRef, useEffect } from 'react';
// import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
// import AttachFileIcon from '@mui/icons-material/AttachFile';

// // Defines a functional component named UserInput
// const UserInput = () => {
//   // State hooks for managing component state
//   const [isRecording, setIsRecording] = useState(false); // Tracks if recording is active
//   const [recordingComplete, setRecordingComplete] = useState(false); // Tracks if recording is complete
//   const [audioUrl, setAudioUrl] = useState(null); // Stores the URL of the recorded audio
//   // Ref hooks for persisting values across renders without causing re-renders
//   const mediaRecorderRef = useRef(null); // Reference to the MediaRecorder object
//   const audioChunksRef = useRef([]); // Stores chunks of audio data
//   const audioRef = useRef(null); // Reference to the audio element 
//   const analyserRef = useRef(null); // Reference to the Web Audio API AnalyserNode
//   const canvasRef = useRef(null); // Reference to the canvas element for visualizing audio
//   const [timer, setTimer] = useState(0); // Timer state
//   const [isPlaying, setIsPlaying] = useState(false); // Play/Pause status
//   const [volume, setVolume] = useState(1); // Volume control

//   // Effect hook to handle recording logic
//   useEffect(() => {
//     if (!isRecording) return; // Exits early if not recording

//     // Requests access to the user's microphone
//     navigator.mediaDevices.getUserMedia({ audio: true })
//       .then(stream => {
//         // Creates an audio context for processing audio
//         const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
//         const source = audioCtx.createMediaStreamSource(stream); // Creates a source from the stream
//         analyserRef.current = audioCtx.createAnalyser(); // Creates an analyser for visualizing audio
//         analyserRef.current.fftSize = 256; // Sets the FFT size for the analyser
//         source.connect(analyserRef.current); // Connects the source to the analyser

//         // Initializes the MediaRecorder with the stream
//         mediaRecorderRef.current = new MediaRecorder(stream);
//         mediaRecorderRef.current.ondataavailable = (event) => {
//           audioChunksRef.current.push(event.data); // Stores audio data chunks
//         };
//         mediaRecorderRef.current.onstop = () => {
//           // Creates a blob from the audio chunks and generates a URL for it
//           const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
//           const audioUrl = URL.createObjectURL(audioBlob);
//           setAudioUrl(audioUrl); // Updates the state with the audio URL
//           audioChunksRef.current = []; // Clears the audio chunks
//         };
//         mediaRecorderRef.current.start(); // Starts recording
//         drawFrequencyBars(); // Calls function to visualize audio
//       });

//     // Cleanup function to stop the media recorder when the component unmounts or recording stops
//     return () => {
//       if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
//         mediaRecorderRef.current.stop();
//       }
//     };
//   }, [isRecording]); // Effect depends on the isRecording state

//   // Function to draw frequency bars on a canvas for audio visualization
//   const drawFrequencyBars = () => {
//     const canvas = canvasRef.current; // Gets the canvas element
//     const canvasCtx = canvas.getContext('2d'); // Gets the canvas context for drawing
//     const bufferLength = analyserRef.current.frequencyBinCount; // Number of data values for visualization
//     const dataArray = new Uint8Array(bufferLength); // Array to store frequency data

//     const draw = () => {
//       if (!isRecording) return; // Stops drawing if not recording
//       requestAnimationFrame(draw); // Calls draw function repeatedly for smooth animation
//       analyserRef.current.getByteFrequencyData(dataArray); // Gets frequency data
//       canvasCtx.fillStyle = 'rgb(0, 0, 0)'; // Sets the background color
//       canvasCtx.fillRect(0, 0, canvas.width, canvas.height); // Fills the background

//       const barWidth = (canvas.width / bufferLength) * 1.2;
//       let barHeight;
//       let x = 0;

//       for (let i = 0; i < bufferLength; i++) {
//         barHeight = dataArray[i] * 1.2; // Calculates the height of each bar
//         canvasCtx.fillStyle = "rgb(160, 160, 160)"; // Sets the bar color to a lighter gray
//         canvasCtx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight); // Draws the bar
//         x += barWidth + 1; // Moves to the next position for the next bar
//       }
//     };

//     draw(); // Calls the draw function to start the visualization
//   };

//   useEffect(() => {
//     let interval = null;
//     if (isRecording) {
//       setTimer(0); 
//       interval = setInterval(() => {
//         setTimer(prevTimer => prevTimer + 1); // Increment timer every second
//       }, 1000);
//     } else {
//       clearInterval(interval); // Clear interval when recording stops
//     }
//     return () => clearInterval(interval); // Cleanup interval on component unmount
//   }, [isRecording]);

//   const startRecording = () => {
//     setIsRecording(true);
//     setRecordingComplete(false);
//     setAudioUrl(null);
//     setTimer(0);
//   };

//   const stopRecording = () => {
//     setIsRecording(false);
//     setRecordingComplete(true);
//     if (mediaRecorderRef.current) {
//       mediaRecorderRef.current.stop();
//     }
//   };

//   const handleToggleRecording = () => {
//     if (isRecording) {
//       stopRecording();
//     } else {
//       startRecording();
//     }
//   };

//   const togglePlayPause = () => {
//     if (audioRef.current) {
//       if (isPlaying) {
//         audioRef.current.pause();
//       } else {
//         audioRef.current.play();
//       }
//       setIsPlaying(!isPlaying);
//     }
//   };

//   return (
//     <div className='flex flex-grow justify-center'>

//       <div className='xs:w-[90%] w-full flex flex-col justify-start gap-3 mx-4 mb-7 overflow-x-visible'>

//         <button
//           className={`w-full min-w-[315px] xs:h-[48px] h-[60px] xm:h-[68px] rounded-lg text-white px-4 flex items-center justify-between bg-black`}
//           onClick={handleToggleRecording}
//         >
//           {isRecording ? (
//             <div className='flex items-center justify-between w-full'>
//               <div className='flex items-center'>
//                 <img src="/micRed.svg" className="animate-pulse w-auto h-auto" />
//               </div>
//               <div className='flex flex-1 mx-4'>
//                 <canvas ref={canvasRef} className='h-7 w-full'></canvas>
//               </div>
//               <div>
//                 {Math.floor(timer / 60)}:{("0" + (timer % 60)).slice(-2)}
//               </div>
//             </div>
//           ) : audioUrl ? (
//             <div className='flex items-center justify-between w-full'>
//               <div>
//                 <audio ref={audioRef} src={audioUrl} className='w-full'></audio>
//                 <div className='flex items-center'>
//                   <button onClick={togglePlayPause} className='mr-2'>
//                     {isPlaying ? (<img src="/pauseIcon.svg" alt="Pause" />) : (<img src="/playIcon.svg" alt="Play"/>)}
//                   </button>
//                 </div>
//               </div>

//               <button onClick={(event) => {
//                 event.stopPropagation();
//                 setAudioUrl(null);
//               }} className='bg-black p-1 rounded-lg'>
//                 <img src="/deleteIcon.svg" alt="delete" />
//               </button>

//             </div>

//           ) : (
//             <div className='flex items-center justify-between w-full'>
//               <div className='flex items-center'>
//                 <KeyboardVoiceIcon fontSize='medium' />
//                 <span className='whitespace-nowrap pl-[14px] font-bold text-[20px] xs:text-[18px]'>Explain your idea</span>
//               </div>
//               <span className='pl-3 text-sm font-medium whitespace-nowrap'>2 min.</span>
//             </div>
//           )}
//         </button>

//         <button className="w-full min-w-[315px] xs:h-[48px] h-[60px] xm:h-[70px] px-4 rounded-lg flex items-center justify-between font-semibold text-lg ring-2 ring-inset ring-gray-300">
//           <div className="flex flex-nowrap items-center">
//             <AttachFileIcon fontSize="medium" />
//             <span className="pl-3 font-bold text-[20px] xs:text-[18px] whitespace-nowrap">Add attachments</span>
//           </div>
//           <span className="pl-3 text-sm font-medium whitespace-nowrap">3 max.</span>
//         </button>

//         <div className='w-full min-w-[315px] xs:h-[48px] h-[60px] xm:h-[70px] flex justify-between border border-customGray rounded-lg leading-[1.2] text-[16px]'>
//           <input type='email' placeholder='Enter your email' className='xs:p-2 p-3 focus:outline-none rounded-l-lg placeholder-placeHolderGray-700' />
//           <button className='flex items-center bg-gray-200 xs:px-1 px-4 rounded-r-lg text-placeHolderGray whitespace-nowrap'>
//             Get Estimate
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserInput;


// const drawFrequencyBars = () => {
//   const canvas = canvasRef.current;
//   const canvasCtx = canvas.getContext('2d');
//   const bufferLength = analyserRef.current.frequencyBinCount;
//   const dataArray = new Uint8Array(bufferLength);
//   let xOffset = 0;

//   const draw = () => {
//     if (!isRecording) return;
//     requestAnimationFrame(draw);

//     analyserRef.current.getByteFrequencyData(dataArray);
//     const barWidth = (canvas.width / bufferLength) * 2.5;
//     let x = xOffset;

//     // Clear the canvas
//     canvasCtx.fillStyle = 'rgb(0, 0, 0)';
//     canvasCtx.fillRect(0, 0, canvas.width, canvas.height);

//     // Draw the bars
//     for (let i = 0; i < bufferLength; i++) {
//       const barHeight = dataArray[i];
//       canvasCtx.fillStyle = 'rgb(160, 160, 160)';
//       const centerY = canvas.height / 2;
//       canvasCtx.fillRect(x, centerY - barHeight / 2, barWidth, barHeight);
//       x += barWidth + 1;
//       if (x >= canvas.width) x = 0; // Wrap around if it exceeds the canvas width
//     }

//     xOffset -= 2; // Move the bars to the left
//     if (xOffset <= -barWidth - 1) xOffset = 0; // Reset xOffset to prevent overflow
//   };

//   draw();
// };

//  // Function to draw frequency bars on a canvas for audio visualization
//  const drawFrequencyBars = () => {
//   const canvas = canvasRef.current; // Gets the canvas element
//   const canvasCtx = canvas.getContext('2d'); // Gets the canvas context for drawing
//   const bufferLength = analyserRef.current.frequencyBinCount; // Number of data values for visualization
//   const dataArray = new Uint8Array(bufferLength); // Array to store frequency data

//   const draw = () => {
//     if (!isRecording) return; // Stops drawing if not recording
//     requestAnimationFrame(draw); // Calls draw function repeatedly for smooth animation
//     analyserRef.current.getByteFrequencyData(dataArray); // Gets frequency data
//     canvasCtx.fillStyle = 'rgb(0, 0, 0)'; // Sets the background color
//     canvasCtx.fillRect(0, 0, canvas.width, canvas.height); // Fills the background

//     const barWidth = (canvas.width / bufferLength);
//     let barHeight;
//     let x = 0;

//     for (let i = 0; i < bufferLength; i++) {
//       barHeight = dataArray[i] * 1.2; // Calculates the height of each bar
//       canvasCtx.fillStyle = "rgb(160, 160, 160)"; // Sets the bar color to a lighter gray
//       canvasCtx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight); // Draws the bar
//       x += barWidth + 1; // Moves to the next position for the next bar
//     }
//   };

//   draw(); // Calls the draw function to start the visualization
// };

"use client"

import React, { useState, useRef, useEffect } from 'react';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const UserInput = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioRef = useRef(null);
  const analyserRef = useRef(null);
  const canvasRef = useRef(null);
  const [timer, setTimer] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
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

      const lineSpacing = 3; // Adjust this value to increase or decrease the gap between lines
      const silenceThreshold = 0.1; // Define what "no sound" means (very low amplitude)
      const tinyBarHeight = 3; // Height of the tiny bar to indicate silence

      for (let i = 0; i < canvas.width; i += lineSpacing) {
        let min = 1.0;
        let max = -1.0;
        for (let j = 0; j < step; j++) {
          const datum = data[(i * step) + j];
          if (datum < min) min = datum;
          if (datum > max) max = datum;
        }
        if (max - min < silenceThreshold) {
          // Draw a tiny bar to indicate silence
          ctx.moveTo(i, amp - tinyBarHeight / 2);
          ctx.lineTo(i, amp + tinyBarHeight / 2);
        } else {
          // Draw the normal waveform line
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

  const handleResumeRecording = () => {
    setIsRecording(true);
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
    <div className='flex flex-grow justify-center'>

      <div className='xs:w-[90%] w-full flex flex-col justify-start gap-3 mx-4 mb-7 overflow-x-visible'>
        <button
          className={`w-full min-w-[315px] xs:h-[48px] h-[60px] xm:h-[68px] rounded-lg text-white px-4 flex items-center justify-between bg-black`}
          onClick={handleToggleRecording}
        >
          {isRecording ? (
            <div className='flex items-center justify-between w-full'>
              <div className='flex items-center'>
                <img src="/micRed.svg" className="animate-pulse w-auto h-auto" />
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

              <button onClick={(e) => { e.stopPropagation(); togglePlayPause(); }} className='flex justify-center h-auto w-10 ml-2'>
              <audio ref={audioRef} src={audioUrl} hidden></audio>
                {isPlaying ? (<img src="/pauseIcon.svg" alt="Pause" className='h-full w-full' />) : (<img src="/playIcon.svg" alt="Play" className='h-full w-full' />)}
              </button>

              <canvas ref={waveformRef} className='h-4/5 w-full px-2'></canvas>

              <button onClick={(e) => { e.stopPropagation(); handleResumeRecording(); }} className='flex justify-center h-auto w-10'>
                <img src="/pauseIcon.svg" alt="Resume" className='h-full w-full' />
              </button>

              <button onClick={(e) => { e.stopPropagation(); handleCompleteRecording(); }} className='flex justify-center h-auto w-10 mx-2'>
                <img src="/featherIcon.svg" alt="Complete" className='h-full w-full' />
              </button>

              <button onClick={(e) => { e.stopPropagation(); handleDeleteRecording(); }} className='flex justify-center bg-black rounded-lg h-auto w-10'>
                <img src="/deleteIcon.svg" alt="Delete" className='h-auto w-auto' />
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

        <button className="w-full min-w-[315px] xs:h-[48px] h-[60px] xm:h-[70px] px-4 rounded-lg flex items-center justify-between font-semibold text-lg ring-2 ring-inset ring-gray-300">
          <div className="flex flex-nowrap items-center">
            <AttachFileIcon fontSize="medium" />
            <span className="pl-3 font-bold text-[20px] xs:text-[18px] whitespace-nowrap">Add attachments</span>
          </div>
          <span className="pl-3 text-sm font-medium whitespace-nowrap">3 max.</span>
        </button>

        <div className='w-full min-w-[315px] xs:h-[48px] h-[60px] xm:h-[70px] flex justify-between border border-customGray rounded-lg leading-[1.2] text-[16px]'>
          <input type='email' placeholder='Enter your email' className='xs:p-2 p-3 focus:outline-none rounded-l-lg placeholder-placeHolderGray-700' />
          <button className='flex items-center bg-gray-200 xs:px-1 px-4 rounded-r-lg text-placeHolderGray whitespace-nowrap'>
            Get Estimate
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserInput;

