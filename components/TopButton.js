import React from 'react';
import {
    ChevronUpIcon
  } from '@heroicons/react/outline';

const TopButton = () => {
  return (
    <div className="fixed bottom-[44px] right-[510px]">
       <div className="w-[50px] h-[50px] rounded-full text-white bg-[#ffb745] flex items-center justify-center">
        <ChevronUpIcon width={15} height={15}/>
        </div>
        </div>
  )
}

export default TopButton;