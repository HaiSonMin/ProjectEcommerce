import { useEffect } from "react";

export default function LoginGoogleSuccess() {
  useEffect(() => {
    const time = setTimeout(() => {
      window.close();
    }, 100);
    return () => clearTimeout(time);
  }, []);
  return <div>Login Success</div>;
}
