"use client"

import React, { useEffect, useRef } from 'react';

const Hero = () => {

  return (
    <div className='flex flex-col items-center'>

      <div className="w-full flex items-center justify-between mx-4 xs:mt-4 mt-6">

        {/* LOGO, For Local */}
        <img src="logo.svg" alt="Logo" className="w-[119px] h-[34px] ml-4" />

        {/* BUTTON */}
        <button className="flex flex-row justify-center items-center px-3 py-[10px] gap-2 flex-none bg-white text-black rounded-lg ring-2 ring-customGray mr-4 ring-inset">
          <img src="projectHistory.svg" alt="Project History" />
          <span className="text-sm font-bold text-[#1D252F]">Track Project</span>
          <img src="dropDown.svg" alt="Dropdown" />
        </button>

      </div>

      {/* Custom Paragraph */}
      <div className='w-full flex flex-col xs:mt-3 mt-7 px-4'>
        <div style={{ letterSpacing: '-1.3px' }} className="font-bold text-pretty text-customGray xm:text-[50px] text-[46px] xs:text-[42px] text-start pb-4 xs:pb-2 leading-[0.95] xs:leading-[0.93]">
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

        <div className="flex flex-row max-w-[390px] items-center py-3 xs:py-2 border-t border-b border-[#E5E5E5] leading-[1.2] text-[#9e9e9e] ">

          <div className="italic min-w-2/5 flex flex-col items-center justify-center text-[12px] font-small pr-2 border-r border-[#E5E5E5] bg-white">
            <div className=' whitespace-nowrap'><span className="text-justPretty font-medium">216+</span> <span className='text-[#AAACB3]'>Satisfied</span></div>
            <div className=' whitespace-nowrap text-[#AAACB3]'>C-Suite Clients</div>
          </div>

          <div className='flex flex-row overflow-hidden w-full'>
            {/* animate-smoothScroll */}
            <div className=' flex gap-6 animate-smoothScroll'>
              <img src="payPal.svg" alt="PayPal" className="min-w-svg " />
              <img src="brand.svg" alt="Brand" className="min-w-svg" />
              <img src="achieve.svg" alt="Achieve" className="min-w-svg" />
              {/* Duplicate the images for a seamless loop */}
              <img src="payPal.svg" alt="PayPal" className="min-w-svg" />
              <img src="brand.svg" alt="Brand" className="min-w-svg" />
              <img src="achieve.svg" alt="Achieve" className="min-w-svg" />
              {/* Duplicate the images for a seamless loop */}
              <img src="payPal.svg" alt="PayPal" className="min-w-svg" />
              <img src="brand.svg" alt="Brand" className="min-w-svg" />
              <img src="achieve.svg" alt="Achieve" className="min-w-svg" />
              {/* Duplicate the images for a seamless loop */}
              <img src="payPal.svg" alt="PayPal" className="min-w-svg" />
              <img src="brand.svg" alt="Brand" className="min-w-svg" />
              <img src="achieve.svg" alt="Achieve" className="min-w-svg" />
              {/* Duplicate the images for a seamless loop */}
              <img src="payPal.svg" alt="PayPal" className="min-w-svg" />
              <img src="brand.svg" alt="Brand" className="min-w-svg" />
              <img src="achieve.svg" alt="Achieve" className="min-w-svg" />
            </div>
          </div>

        </div>

        <div style={{ letterSpacing: '-1.1px' }} className="flex whitespace-nowrap xs:text-[15px] text-[17px] leading-[1.2] font-medium text-prettyGray xs:mt-[10px] mt-4 xs:mb-[14px] mb-[22px]">
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

    </div>
  );
};

export default Hero;
