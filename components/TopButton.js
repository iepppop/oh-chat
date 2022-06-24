import React from 'react';
import {
  ChevronUpIcon
} from '@heroicons/react/outline';
import { useState, useEffect } from 'react';

const TopButton = () => {
  const [scrollActive, setScrollActive] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const handleScroll = () => {
    if (scrollY > 300) {
      setScrollY(window.pageYOffset);
      setScrollActive(true);
    } else {
      setScrollY(window.pageYOffset);
      setScrollActive(false);
    }
  }

  useEffect(() => {
    const scrollListener = () => {
      window.addEventListener("scroll", handleScroll);
    }
    scrollListener();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  })

  const handleTop = () => {
    window.scrollTo({
      top:0,
      behavior:"smooth"
    });
  }

  return (
    <div className={`${scrollActive ? "sticky bottom-[40px]" : "hidden"}`}>
      <div
      onClick={handleTop} 
      className="hidden md:flex absolute right-0 bottom-0 w-[50px] h-[50px] rounded-full text-white bg-[#ffb745] items-center justify-center shadow-[0_-15px_60px_-15px_rgba(0,0,0,0.3)] shadow-gray-500/10 cursor-pointer">
        <ChevronUpIcon width={15} height={15} />
      </div>
    </div>
  )
}

export default TopButton;