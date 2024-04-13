"use client"
import Image from "next/image";
import CountUp from 'react-countup';
import FireEmoji from '@/public/fire-emoji.gif'
import React, { useEffect, useState } from "react";
import Confetti from 'react-confetti'

export default function Home() {

  const [containerWidth, setContainerWidth] = useState(155); // Initial width in pixels

  useEffect(() => {
    const interval = setInterval(() => {
      setContainerWidth((prevWidth) => {
        // Check if the width exceeds the maximum value
        if (prevWidth >= 335) {
          clearInterval(interval); // Stop the interval
          return prevWidth; // Return the current width
        }
        // Increment width by 1 if below maximum
        return prevWidth + 1;
      });
    }, 2); // Adjust interval duration as needed

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  useEffect(() => {
    // Update container width in the UI whenever it changes
    document.documentElement.style.setProperty('--container-width', `${containerWidth}px`);
  }, [containerWidth]);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-teal-400 to-yellow-200">
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
      />
      <div className="flex flex-col items-center p-24">
        <span className="text-6xl font-bold mb-2 uppercase">subscribers</span>
        <div className=" rounded-full p-5 flex bg-[#01020D] " style={{ width: `var(--container-width, ${containerWidth}px)` }}>
          <div className="rounded-full bg-[#1F2939]">
            <Image src={FireEmoji} alt="" className="w-[90px] h-[90px]" />
          </div>

          <CountUp start={0} end={500} duration={5} delay={1}>
            {({ countUpRef }) => (
              <div className="text-8xl ml-5">
                <span ref={countUpRef} />
              </div>
            )}
          </CountUp>


        </div>
      </div>
    </div>
  );
}
