"use client";
import React from "react";
import useLenis from "@hooks/useLenis";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import useVideoScroll from "@hooks/useVideoScroll";

const Page = () => {
  useLenis();
  useVideoScroll("#watermelon-vid");

  useGSAP(() => {
    const tl = gsap.timeline({
      // For the start and end properties, the first property value represents a point
      // in the element itself (top,center,  bottom,20%,20px), while the second property represents a position in the screen (top,center,bottom,20%,50px)
      // property scrub makes the animation follow scrolling if true
      // when scrub is false, you set the duration of the animation then
      // toggleActions is used when scrub is set to false
      // toggleActions; onEnter, onLeave, onEnterBack, onLeaveBack (the actions you set values for)
      // so the main toggleActions props; play pause reverse complete
      scrollTrigger: {
        trigger: ".box",
        start: 'top bottom',
        end: 'bottom 50%',
        scrub: 0.5,
        markers: false,
      }
    });

    tl.to(".box", {
      x: 600,
      opacity: 1,
      scale: 1.5,
    });
  });

  return (
    <section className="w-full flex flex-col">
      <div className="h-screen"></div>
      <div className="box -translate-x-[30.5rem] w-max my-56 rounded-2xl p-4 ring-2 ring-orange-400 ring-offset-2">
        <div className="rounded-lg p-8 bg-gradient-to-tr from-purple-400 via-blue-300 to-red-200 font-bold font-sans flex flex-col space-y-6 text-white text-center text-2xl ring-2 ring-purple-400 ring-offset-8">
          <span>THIS IS THE FIRST TEXT</span>
          <span>THIS IS THE SECOND TEXT</span>
          <span>THIS IS THE THIRD TEXT</span>
        </div>
      </div>
      <div className="h-screen w-full">
        <video
          id="watermelon-vid"
          src="/videos/watermelon-vid.mp4"
          className="w-full"
          muted
          preload="auto"
        />
      </div>
      <div className="h-screen w-full"></div>
    </section>
  );
};

export default Page;
