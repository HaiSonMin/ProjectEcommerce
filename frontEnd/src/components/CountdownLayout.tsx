import { useEffect } from "react";
import Countdown from "react-countdown";
import CountDown from "./CountDown";

const twoDaysInMilliseconds = 2 * 24 * 60 * 60 * 1000 ; // 2 ngày trong mili giây
//* 24 * 60 * 60 * 1000
const endDate = Date.now() + twoDaysInMilliseconds;
const Completionist = () => {
    useEffect(() => {
      console.log("Đã hoàn thành, thông báo cho server.");
    }, []);
  
    return <span>You are good to go!</span>;
  };
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a complete state
      return <Completionist/>;
    } else {
      // Render a countdown
      return (
       <CountDown
       day = {days}
       hour = {hours}
       minute = {minutes}
       second = {seconds}
       />
      );
    }
  };

export default function CountdownLayout() {
  return (
  <Countdown date={endDate} renderer={renderer} />
  )
}
