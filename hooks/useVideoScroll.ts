import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";

const useVideoScroll = (selector: string) => {
  useGSAP(() => {
    const video = document.querySelector(selector);
    document.addEventListener("scroll", () => {});

    video?.addEventListener("loadedmetadata", (e) => {
      const target = e.target as HTMLVideoElement;
      const { duration } = target;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: selector,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
          pin: true,
          invalidateOnRefresh: true,
        },
      });
      tl.to(selector, {
        currentTime: duration,
      });
    });
  });
};

export default useVideoScroll;
