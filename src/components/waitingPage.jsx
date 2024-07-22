"use client"
import React from 'react';

const WaitingPage = () => {
  return (
    <div className='flex flex-col items-center'>
      <div className="w-full flex items-center justify-between mx-4 xs:mt-4 mt-6">
        {/* LOGO, For Local */}
        <img src="logo.svg" alt="Logo" className="w-[119px] h-[34px] ml-4" />

        {/* Top Right Corner Image */}
        <img src="topRightCorner.svg" alt="Logo" className="w-[119px] h-[34px] mr-4" />
      </div>

      {/* Custom Paragraph */}
      <div className='w-full flex flex-col mt-1 mb-0 px-4 max-w-[390px]'>

        <img src="reDirect.svg" alt="Re-Direct Image" className="flex" />

        <div className="flex flex-col items-center justify-start">
          <div className='flex whitespace-nowrap font-semibold text-[36px] text-[#873DE6] leading-[1.1] tracking-tight'>Boom.</div>
          <div className='flex whitespace-nowrap font-semibold text-[36px] text-[#1D2F2F] leading-[1.1] tracking-tight'>We're on it.</div>
        </div>

        <div className="flex flex-col items-center pt-1 pb-3">
          <span className="text-[#0D1126] text-opacity-35 whitespace-nowrap font-medium leading-[1.2] text-[22px] xs:text-[18px]">You’ll receive an email within</span>
          <div className="text-[#0D1126] text-opacity-35 whitespace-nowrap font-medium leading-[1.2] text-[22px] xs:text-[18px]"> <span className="text-[#0D1126] leading-[1.2] text-[22px] xs:text-[18px]" >one hour</span>  with an estimate and a </div>
          <span className="text-[#0D1126] text-opacity-35 whitespace-nowrap font-medium leading-[1.2] text-[22px] xs:text-[18px]">contract link.</span>
        </div>
      </div>
    </div>
  );
};

export default WaitingPage;
