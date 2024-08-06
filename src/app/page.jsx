"use client";
import React, { useState, useEffect } from 'react';
import Hero from "@/components/hero";
import FeatureList from "@/components/featureList";
import FeatureButtons from '@/components/featureButtons';
import WaitingPage from '@/components/waitingPage';
import WaitingPageInput from '@/components/waitingPageInput';
import BeforeAfterSlider from '@/components/beforeAfterSlider';
import FeatureListLarge from '@/components/featureListLarge';
import WaitingPageLarge from '../components/waitingPageLarge';
import Image from 'next/image';

const Home = () => {
  // State variables
  const [isEstimateRequested, setIsEstimateRequested] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Audio-related state variables
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [audioBase64, setAudioBase64] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(0);

  // File and email state variables
  const [files, setFiles] = useState([]);
  const [email, setEmail] = useState('');

  // Function to handle estimate request
  const handleGetEstimate = () => {
    setIsEstimateRequested(true);
  };

  // Function to reset all states
  const handleResetStates = () => {
    setIsEstimateRequested(false);
    setIsRecording(false);
    setAudioUrl(null);
    setAudioBase64(null);
    setIsPlaying(false);
    setTimer(0);
    setFiles([]);
    setEmail('');
  };

  // Effect to handle window resize
  useEffect(() => {
    setWindowWidth(window.innerWidth);

    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Common props for child components
  const commonProps = {
    isRecording,
    setIsRecording,
    audioUrl,
    setAudioUrl,
    audioBase64,
    setAudioBase64,
    files,
    setFiles,
    isPlaying,
    setIsPlaying,
    timer,
    setTimer,
    email,
    setEmail,
    onGetEstimate: handleGetEstimate,
    setIsLoading,
  };

  return (
    <div className='min-w-[375px] xm:max-w-[490px] scroll-smooth '>
      {/* Loading indicator */}
      {isLoading && <div className="loading-line"></div>}

      {/* Conditional rendering based on estimate request status */}
      {!isEstimateRequested ? (
        <>
          {/* Hero section */}
          <div className="flex justify-center scroll-smooth font-sans">
            <Hero {...commonProps} className="flex-1" />
          </div>

          {/* Before/After slider (mobile view) */}
          <div className='sl:hidden al:hidden mx:hidden h-screen flex flex-col items-center scroll-smooth overflow-hidden bg-white'>
            <BeforeAfterSlider className="flex-1" />
          </div>

          {/* Feature list and buttons (mobile view) */}
          <div className='sl:hidden al:hidden mx:hidden flex flex-col h-screen items-center overflow-hidden scroll-smooth bg-black z-40'>
            <FeatureList className="flex-1" />
            <FeatureButtons className="flex-1" />
          </div>

          {/* Feature list (large screen view) */}
          <div className="hidden sl:flex al:flex mx:flex justify-center overflow-auto min-w-[809px] h-screen font-sans bg-black bg-[url('/bg_desktop.png')] bg-cover bg-center bg-no-repeat">
            <FeatureListLarge />
          </div>
        </>
      ) : (
        <div>
          {/* Waiting page (mobile view) */}
          <div className='sl:hidden al:hidden mx:hidden w-full flex flex-col items-center min-w-[315px]'>
            <WaitingPage className="flex-1" />
            <WaitingPageInput className="flex-1" onStartNewProject={handleResetStates} />
          </div>

          {/* Waiting page (large screen view) */}
          <div className="hidden sl:flex al:flex mx:flex justify-center overflow-auto min-w-[809px] h-screen font-sans">
            <WaitingPageLarge handleResetStates={handleResetStates} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;