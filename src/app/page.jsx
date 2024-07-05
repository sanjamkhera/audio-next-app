// In the file: page.jsx
"use client"
import React from 'react';
import Hero from "@/components/hero";
import UserInput from "@/components/userInput";
import FeatureList from "@/components/featureList";
import FeatureButtons from '@/components/featureButtons';

const Home = () => {
  return (
    <div>
      <div className="flex flex-col h-auto overflow-auto max-w-[430px] min-w-[315px]">
        <Hero className="flex-1" />
        <UserInput className="flex-1" />
      </div>
      <div className='flex flex-col items-center h-screen overflow-hidden max-w-[430px] min-w-[315px]'>
        <FeatureList className="flex-1" />
        <FeatureButtons className="flex-1" />
      </div>
    </div>
  );
};

export default Home;