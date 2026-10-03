import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(id)
  }, [])

  return <p>{time.toLocaleTimeString()}</p>;
};

export default Clock;
