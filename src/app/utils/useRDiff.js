'use client';
import { useState, useEffect } from 'react';

function useRoundedDifference(firstValue) {
  const [secondValue, setSecondValue] = useState(null);
  const [roundedDifference, setRoundedDifference] = useState(null);

  useEffect(() => {
    if (secondValue !== null) {
      const difference = secondValue - firstValue;
      const rounded = Math.ceil(Math.abs(difference));
      setRoundedDifference(rounded);
    }
  }, [firstValue, secondValue]);

  return [roundedDifference, setSecondValue];
}

export default useRoundedDifference;
