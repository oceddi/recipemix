"use client";

import { CustomButtonProps } from '@/types';
import Image from 'next/image';

const CustomButton = ({ title, containerStyles, textStyles, handleClick, btnType, leftIcon, disabled} : CustomButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={ btnType || "button"}
      className={`custom-btn ${containerStyles}`}
      onClick={handleClick}
    >
      {leftIcon && (
        <div className="relative w-6 h-6">
          <Image 
            src={leftIcon}
            alt="icon"
            fill
            className="object-contain rounded-full"
          />
        </div>
      )}
      <span className={`flex-1 ${textStyles}`}>
        {title}
      </span>
    </button>
  )
}

export default CustomButton