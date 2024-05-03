import React, { useState, useEffect } from 'react';
import Confetti from 'react-confetti';
import { useWindowSize } from 'react-use';

const Congratulations = ({congrats}) => {
  const { width, height } = useWindowSize();
  const [runConfetti, setRunConfetti] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setRunConfetti(false);
    }, 10000); // Run confetti for 10 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {congrats && runConfetti && <Confetti width={width} height={height} />}
     </>
  );
};

export default Congratulations;
