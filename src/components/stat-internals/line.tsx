
"use client";

import React from "react";

export const Line = ({ type, gridArea, colorClass = 'bg-primary/20' }: { type: 'horizontal' | 'vertical' | 't-down' | 't-up' | 'cross' | 'corner-br' | 'corner-bl' | 'corner-tr' | 'corner-tl' | 'radial-tr' | 'radial-tl' | 'radial-br' | 'radial-bl' | 'z-ne' | 'z-en' | 'z-sw' | 'z-ws'; gridArea: string, colorClass?: string }) => {
  const baseClasses = colorClass;
  
  if (type === 'horizontal') return <div style={{ gridArea }} className="flex items-center"><div className={`${baseClasses} w-full h-0.5`}></div></div>;
  if (type === 'vertical') return <div style={{ gridArea }} className="flex justify-center"><div className={`${baseClasses} h-full w-0.5`}></div></div>;
  
  const rotationClasses: { [key: string]: string } = {
    'radial-tr': 'bottom-0 left-0 origin-bottom-left -rotate-45', 'radial-tl': 'bottom-0 right-0 origin-bottom-right rotate-45',
    'radial-br': 'top-0 left-0 origin-top-left rotate-45', 'radial-bl': 'top-0 right-0 origin-top-right -rotate-45',
  }

  if (rotationClasses[type]) {
    return <div style={{ gridArea }} className="relative"><div className={`${baseClasses} absolute w-full h-0.5 ${rotationClasses[type]}`}></div></div>;
  }
  
  return (
    <div style={{ gridArea }} className="relative w-full h-full">
      { (type === 't-down' || type === 'cross' || type.startsWith('corner-b')) && <div className={`${baseClasses} absolute top-0 left-1/2 w-0.5 h-1/2 -translate-x-1/2`}></div> }
      { (type === 't-up' || type === 'cross' || type.startsWith('corner-t')) && <div className={`${baseClasses} absolute bottom-0 left-1/2 w-0.5 h-1/2 -translate-x-1/2`}></div> }
      
      { (type.startsWith('t-') || type === 'cross' || type.startsWith('corner')) && <div className={`${baseClasses} absolute top-1/2 left-0 w-full h-0.5 -translate-y-1/2`}></div> }

      { (type === 'corner-br') && <><div className={`${baseClasses} absolute top-1/2 left-1/2 w-1/2 h-0.5 -translate-y-1/2`}></div><div className={`${baseClasses} absolute top-0 left-1/2 w-0.5 h-1/2 -translate-x-1/2`}></div></> }
      { (type === 'corner-bl') && <><div className={`${baseClasses} absolute top-1/2 right-1/2 w-1/2 h-0.5 -translate-y-1/2`}></div><div className={`${baseClasses} absolute top-0 left-1/2 w-0.5 h-1/2 -translate-x-1/2`}></div></> }
      { (type === 'corner-tr') && <><div className={`${baseClasses} absolute bottom-1/2 left-1/2 w-1/2 h-0.5 -translate-y-1/2`}></div><div className={`${baseClasses} absolute bottom-0 left-1/2 w-0.5 h-1/2 -translate-x-1/2`}></div></> }
      { (type === 'corner-tl') && <><div className={`${baseClasses} absolute bottom-1/2 right-1/2 w-1/2 h-0.5 -translate-y-1/2`}></div><div className={`${baseClasses} absolute bottom-0 left-1/2 w-0.5 h-1/2 -translate-x-1/2`}></div></> }

    </div>
  );
};
