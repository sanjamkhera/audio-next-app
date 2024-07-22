"use client"
import React, { useEffect } from 'react';

const BeforeAfterSlider = () => {
  useEffect(() => {
    // Dynamically import Cocoen to ensure it is only used on the client side
    import('cocoen').then((module) => {
      const Cocoen = module.default || module.Cocoen;
      Cocoen.parse(document.body);
    }).catch(err => {
      console.error('Error loading Cocoen:', err);
    });
  }, []);

  return (
    <div className='w-full h-full flex flex-col items-center justify-start mt-1 bg-white'>

      <div className="w-[90%] flex justify-between bg-white">
        {/* LOGO, For Local */}
        <img src="napkinIdea.svg" alt="Napkin Idea" className="ml-2" />

        {/* Track Project Button */}
        <img src="24hr.svg" alt="24 hour" className="mr-2" />
      </div>

      {/* Slider Parent */}
      <div className="w-full h-full flex flex-col items-center justify-start bg-[url('/ipad.svg')] bg-cover bg-right bg-white" style={{ backgroundPosition: 'calc(100% + 15px) center' }}>
        <div className="w-full h-full flex flex-col items-center justify-start mt-[14%] mr-[30%] bg-[#efefef] rounded-tr-xl" style={{ transform: 'rotate(-1deg)' }}>
          <div className='w-[75%] h-[85%] min-w-[290px] bg-slate-500 ml-14 mt-8 rounded-xl' style={{ transform: 'rotate(1deg)' }}>
            <div className="cocoen w-full h-full relative overflow-hidden">
              <img src="/before.svg" alt="Before" className="absolute top-0 left-0 w-full h-full object-cover" />
              <img src="/after.svg" alt="After" className="absolute top-0 left-0 w-full h-full object-cover" />
              <div className="cocoen-drag relative z-10 h-full w-1 bg-white cursor-ew-resize">
                <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <span className="block w-1/2 h-1 bg-black"></span>
                  <span className="block w-1/2 h-1 bg-black transform rotate-90"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default BeforeAfterSlider;
