"use client"

import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import AudioButton from './audioButton';
import AttachmentButton from './attachmentButton';
import EmailButton from './emailButton';

const UserInput = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [files, setFiles] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  const [isEditing, setIsEditing] = useState(false);

  const slideDown = useSpring({
    from: { transform: 'translateY(100%)' },
    to: { transform: 'translateY(70%)' },
    config: { duration: 500 } // Adjust duration as needed, 1000ms = 1 second
  });

  const handleDeleteFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  return (
    <div className='flex flex-grow justify-center'>
      <div className='xs:w-[90%] w-full flex flex-col justify-start xs:gap-2 gap-3 mx-4 mb-7 overflow-x-visible'>
        <AudioButton
          isRecording={isRecording}
          setIsRecording={setIsRecording}
          recordingComplete={recordingComplete}
          setRecordingComplete={setRecordingComplete}
          audioUrl={audioUrl}
          setAudioUrl={setAudioUrl}
          timer={timer}
          setTimer={setTimer}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
        />
        <AttachmentButton files={files} setFiles={setFiles} setIsEditing={setIsEditing} />
        <div className='mt-[-8px] mb-[-1px]' >
          {files.length > 0 && (
            <button className="xs:text-sm underline text-black-600 self-start " onClick={() => setIsEditing(true)}>Edit Files</button>
          )}
          {isEditing && files.length > 0 && (
            <>
              {/* Overlay */}
              <div className="w-full fixed inset-0 bg-gray-800 bg-opacity-50 z-40 max-w-[430px] min-w-[315px]"></div>
              
              <animated.div style={slideDown} className="fixed inset-0 bg-white z-50 flex flex-col rounded-t-xl items-center p-4 max-w-[430px] min-w-[315px]">
                <div className="w-full flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Edit Files</h2>
                  <button onClick={() => setIsEditing(false)} className="text-2xl font-bold"><img src="closeButton.svg" alt="Close" /></button>
                </div>
                <div className="w-full overflow-y-auto max-h-[calc(100vh-120px)]">
                  <ul className="w-full">
                    {files.map((file, index) => (
                      <li key={index} className="flex justify-start items-center mb-2 ">
                        <span className="truncate">{file.name}</span>
                        <button onClick={() => handleDeleteFile(index)} className="text-black-600 font-bold ml-2">&times;</button>
                      </li>
                    ))}
                  </ul>
                  {files.length === 0 && (
                    <p className="text-center text-gray-600">No files to display.</p>
                  )}
                </div>
              </animated.div>
            </>
          )}
        </div>
        <EmailButton />
      </div>
    </div>
  );
};

export default UserInput;
