import { useRef } from "react";
// Using for: Scroll, Multi click
export default function useThrottle(cb: () => void, delay: number) {
  const lastRun = useRef(Date.now());0

  return function () {
    if (Date.now() - lastRun.current > delay) {
      cb();
      lastRun.current = Date.now();
    }
  };
}
