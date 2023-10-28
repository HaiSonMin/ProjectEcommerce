import { useEffect, useState } from "react";

export default function useCountDown(timeInitialize: number) {
  const [time, setTime] = useState<number>(timeInitialize);

  useEffect(() => {
    const timeInterval = setInterval(() => {
      if (time > 0) setTime((pre) => pre - 1000);
    }, 1000);
    return () => clearInterval(timeInterval);
  }, [time]);

  return time;
}
