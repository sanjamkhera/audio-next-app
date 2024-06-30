// In the file: page.jsx
"use client"
import React from 'react';
import Hero from "@/components/hero";
import UserInput from "@/components/userInput";
import FeatureList from "@/components/featureList";

const Home = () => {
  return (
    <div>
      <div className="flex flex-col h-screen overflow-auto max-w-[630px]">
        <Hero className="flex-1" />
        <UserInput className="flex-1" />
      </div>
      <div className='flex flex-col h-screen'>
        <FeatureList className="flex-1" />
      </div>
    </div>
  );
};

export default Home;