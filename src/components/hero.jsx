"use client"
import React, { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import AudioButton from './audioButton';
import AttachmentButton from './attachmentButton';
import EmailButton from './emailButton';
import AttachmentButtonLarge from './attachmentButtonLarge';

// Main Hero component
const Hero = ({
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
  onGetEstimate,
  setIsLoading
}) => {

  // State for editing mode and screen size
  const [isEditing, setIsEditing] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Animation for sliding down edit panel
  const slideDown = useSpring({
    from: { transform: 'translateY(100%)' },
    to: { transform: 'translateY(70%)' },
    config: { duration: 500 }
  });

  // Function to delete a file from the list
  const handleDeleteFile = (index) => {
    const updatedFiles = [...files];
    updatedFiles.splice(index, 1);
    setFiles(updatedFiles);
  };

  // Function to handle email input change
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  // Function to send email with audio and files
  const handleSendEmail = async () => {
    const data = {
      email,
      audioBase64,
      files
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        console.log('Email sent successfully!');
        onGetEstimate(); // Call the function to change the state
      } else if (response.status === 400) {
        const errorData = await response.json();
        alert(errorData.error);
      } else {
        console.error('Failed to send email.');
      }
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  // Effect to handle screen size changes
  useEffect(() => {
    // This code runs after the component is mounted, ensuring `window` is available
    const handleResize = () => setIsLargeScreen(window.innerWidth > 819);
    // Set initial value
    handleResize();
    // Add event listener
    window.addEventListener('resize', handleResize);
    // Clean up
    return () => window.removeEventListener('resize', handleResize);
  }, []); // Empty array ensures this effect runs only once after initial render


  return (
    <div className='w-full flex flex-col items-center xs:mb-3 xm:mb-6 sl:h-screen al:h-screen mx:h-screen justify-start max-w-[1440px]'>
      {/* NavBar */}
      <div className="w-full flex flex-row items-center justify-between mx-4 mt-8">
        {/* LOGO, For Local */}
        <img src="logo.svg" alt="Logo" className="w-[119px] h-[34px] sl:w-[200px] al:w-[200px] mx:w-[200px] sl:h-[48px] al:h-[48px] mx:h-[48px] xs:ml-4 xm:ml-4 ml-2" />
        {/* Track Project Button */}
        <img src="topRightCorner.svg" alt="Logo" className="w-[119px] h-[34px] sl:w-[210px] al:w-[210px] mx:w-[210px] sl:h-[50px] al:h-[50px] mx:h-[50px] mr-4" />
      </div>
      {/* Main Hero Section */}
      <div className='w-full sl:h-[80%] al:h-[80%] mx:h-[80%] sl:w-[95%] al:w-[95%] mx:w-[95%] flex flex-row xs:flex-col xm:flex-col items-start justify-between mt-2 sl:mt-12 al:mt-12 mx:mt-12 sl:gap-5 al:gap-5 mx:gap-12'>
        {/* Conditional rendering based on screen size */}
        {!isLargeScreen ? (
          // Mobile layout
          <div className='w-full flex flex-col mt-3 px-4'>
            {/* Hero text for mobile */}
            <div style={{ letterSpacing: '-1.3px' }} className="font-semibold text-pretty text-customGray text-[46px] xs:text-[42px] text-start pb-3 leading-[0.95] xs:leading-[0.93]">
              <span className="whitespace-nowrap">For the busy</span>
              <div className="whitespace-nowrap">
                <span className='text-[#3368F0]'> CEOs</span>,
                <span className="pl-2 text-[#26BD6C]"> VPs</span>,
              </div>
              <div className="whitespace-nowrap">
                <span className='text-[#F48E2F]'> Managers</span>,
                <span className="pl-2 text-[#E6483D]"> PMs</span>,
              </div>
              <div className='whitespace-nowrap'>
                or
                <span className="pl-2 text-[#873DE6]"> Team leads </span>
              </div>
              <span className="whitespace-nowrap">with a design</span>
              <div className="whitespace-nowrap">
                <span className='text-justPretty'> vision</span>,
                deadline,
              </div>
              <div className="whitespace-nowrap">
                or UX
                <span className="text-justPretty pl-2"> problem</span>
              </div>
              <span className="text-justPretty whitespace-nowrap"> to solve.</span>
            </div>

            {/* Logos and stats for mobile */}
            <div className="w-[95%] flex flex-row items-center mt-2 py-3 xs:py-2 border-t border-b border-[#E5E5E5] leading-[1.2] text-[#9e9e9e]">
              <div className="italic min-w-2/5 flex flex-col items-center justify-center text-[12px] font-small pr-2 border-r border-[#E5E5E5] bg-white">
                <div className=' whitespace-nowrap'><span className="text-justPretty font-medium">216+</span> <span className='text-[#AAACB3]'>Satisfied</span></div>
                <div className=' whitespace-nowrap text-[#AAACB3]'>C-Suite Clients</div>
              </div>

              <div className='flex flex-row overflow-hidden'>
                {/* animate-smoothScroll */}
                <div className=' flex gap-6 animate-smoothScroll'>
                  <img src="mit.png" alt="mitLogo" className="w-[40px]"/>
                  <img src="payPal.png" alt="PayPal" className="w-[80px]"/>
                  <img src="achieve.png" alt="achieve" className="w-[88px]"/>
                  {/* Duplicate the images for a seamless loop */}
                  <img src="mit.png" alt="mitLogo" className="w-[40px]"/>
                  <img src="payPal.png" alt="PayPal" className="w-[80px]"/>
                  <img src="achieve.png" alt="achieve" className="w-[88px]"/>
                  {/* Duplicate the images for a seamless loop */}
                  <img src="mit.png" alt="mitLogo" className="w-[40px]"/>
                  <img src="payPal.png" alt="PayPal" className="w-[80px]"/>
                  <img src="achieve.png" alt="achieve" className="w-[88px]"/>
                  {/* Duplicate the images for a seamless loop */}
                  <img src="mit.png" alt="mitLogo" className="w-[40px]"/>
                  <img src="payPal.png" alt="PayPal" className="w-[80px]"/>
                  <img src="achieve.png" alt="achieve" className="w-[88px]"/>
                </div>
              </div>

            </div>

            {/* CTA for mobile */}
            <div className="flex whitespace-nowrap text-[17px] leading-[1.2] font-medium text-prettyGray xs:mt-[12px] mt-4 xs:mb-[10px] mb-[22px]">
              High-fidelity designs, in <span
                className="text-[#14151A] underline pl-[6px] cursor-pointer"
                onClick={() => window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: 'smooth'
                })}
              >
                24 hours or less*
              </span>
            </div>

          </div>
        ) : (
          // Desktop layout
          <div className='flex flex-col items-start justify-start w-1/2'>
            {/* Hero text for desktop */}
            <div style={{ letterSpacing: '-1.3px' }} className="flex flex-col al:font-semibold sl:font-semibold h-auto font-bold text-pretty text-customGray mx:text-[56px] sl:text-[50px] al:text-[40px] text-[60px] text-start pb-4 leading-[0.95] pt-6">
              <span className="whitespace-nowrap">For the busy</span>
              <div className="whitespace-nowrap">
                <span className='text-[#3368F0]'> CEOs</span>,
                <span className="text-[#26BD6C]"> VPs</span>,
                <span className='text-[#F48E2F]'> Managers</span>,
              </div>
              <div className="whitespace-nowrap">
                <span className="text-[#E6483D]">PMs</span>, or <span className="pl-2 text-[#873DE6]"> Team leads</span>,
              </div>
              <div className='whitespace-nowrap'>
                <span className="whitespace-nowrap">with a design vision</span>
              </div>
              <div className="whitespace-nowrap">
                <span> deadline, or UX </span>
              </div>
              <div className="whitespace-nowrap">
                <span className="text-justPretty whitespace-nowrap">problem to solve.</span>
              </div>
            </div>

            {/* CTA for desktop */}
            <div style={{ letterSpacing: '-1.1px' }} className="flex whitespace-nowrap text-[22px] leading-[1.2] font-medium text-black text-opacity-35 mt-3 pt-6 mb-[22px] border-t border-[#E5E5E5]">
              High-fidelity designs, in <span
                className="text-[#14151A] underline pl-1 cursor-pointer"
                onClick={() => window.scrollTo({
                  top: document.body.scrollHeight,
                  behavior: 'smooth'
                })}
              >
                24 hours or less*
              </span>
            </div>
          </div>
        )}

        {/* Buttons and Inputs */}
        <div className='w-[90%] flex flex-col justify-center sl:w-[40%] al:w-[40%] mx:w-[40%] sl:pl-4 al:pl-1/2 sl:gap-6 al:gap-6 mx:gap-6 xs:mx-auto xm:mx-auto gap-3 my-2'>
          <div className={`order-first ${'sl:order-2 al:order-2 mx:order-2'}`}>
            <AudioButton
              isRecording={isRecording}
              setIsRecording={setIsRecording}
              audioUrl={audioUrl}
              setAudioUrl={setAudioUrl}
              audioBase64={audioBase64}
              setAudioBase64={setAudioBase64}
              timer={timer}
              setTimer={setTimer}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          </div>
          {/* Conditionally render AttachmentButton or AttachmentButtonLarge based on screen size */}
          <div className="sl:mt-4 al:mt-0 mx:mt-6 pt-10 pb-4 min-h-[25%] hidden sl:flex al:flex mx:flex border-2 border-dashed border-gray-300 rounded-lg">
            <AttachmentButtonLarge files={files} setFiles={setFiles} />
          </div>
          <div className="flex flex-col w-full h-auto sl:hidden al:hidden mx:hidden">
            <AttachmentButton files={files} setFiles={setFiles} setIsEditing={setIsEditing} />
            <div className='mt-1 ml-1' >
              {files.length > 0 && (
                <button className="text-[14px] underline text-black-600 self-start " onClick={() => setIsEditing(true)}>Edit Files</button>
              )}
              {isEditing && files.length > 0 && (
                <>
                  {/* Overlay */}
                  <div className="w-full fixed inset-0 bg-gray-800 bg-opacity-50 z-40 min-w-[315px]"></div>
                  <animated.div style={slideDown} className="fixed inset-0 bg-white z-50 flex flex-col rounded-t-xl items-center p-4">
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
                    </div>
                  </animated.div>
                </>
              )}
            </div>
          </div>
          <div className="flex order-last ">
            <EmailButton email={email} handleEmailChange={handleEmailChange} handleSendEmail={handleSendEmail} setIsLoading={setIsLoading} />
          </div>
        </div>

      </div>

      {/* Client logos for large screens */}
      <div className='hidden sl:flex al:flex mx:flex w-[90%] flex-col justify-start mb-12'>
        <div className="italic flex items-center text-[12px] font-small pr-2 border-b border-[#E5E5E5] bg-white pb-2">
          <div className=' whitespace-nowrap'><span className="text-justPretty font-medium">216+</span> <span className='text-[#AAACB3]'>Satisfied C-Suite Clients</span></div>
        </div>

        <div className='w-[95%] flex flex-row items-center justify-between mt-4 ml-2'>
          <img src="payPalLg.svg" alt="PayPal" className="min-w-svg mx:scale-100 sl:scale-75 al:scale-75 -mx-2" />
          <img src="brandLg.svg" alt="Brand" className="min-w-svg mx:scale-100 sl:scale-75 al:scale-75 " />
          <img src="achieveLg.svg" alt="Achieve" className="min-w-svg mx:scale-100 sl:scale-75 al:scale-75 -mx-1" />
          <img src="nestleLg.svg" alt="Nestle" className="min-w-svg mx:scale-100 sl:scale-75 al:scale-75 -mx-1" />
          <img src="kinCartaLg.svg" alt="KinCarta" className="min-w-svg mx:scale-100 sl:scale-75 al:scale-75 -mx-5" />
          <img src="principalLg.svg" alt="Principal" className="min-w-svg mx:scale-100 sl:scale-75 al:scale-75 -mx-5" />
          <img src="ibmLg.svg" alt="IBM" className="min-w-svg mx:scale-100 sl:scale-75 al:scale-75 -mx-2" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
