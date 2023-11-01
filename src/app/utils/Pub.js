'use client';

import { useEffect, useState } from 'react';
import { useChannel } from 'ably/react';

function Pub() {
  const { channel } = useChannel('prices');

  function generateRandomNumber() {
    const min = 0;
    const max = 999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const decimalNumber = Math.floor(Math.random() * 100);
    const numberString = `${randomNumber}.${
      decimalNumber < 10 ? '0' : ''
    }${decimalNumber}`;
    return `${numberString}`;
  }

  function generateRandomGain() {
    const min = -33;
    const max = 26;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const decimalNumber = Math.floor(Math.random() * 100);
    const number = randomNumber + decimalNumber / 100;
    return `${number >= 0 ? '+' : ''}${number.toFixed(2)}`;
  }

  function generateRandomArray() {
    const array = [];
    const gains = [];

    for (let i = 0; i < 9; i++) {
      const randomNumber = generateRandomNumber();
      const randomGain = generateRandomGain();
      gains.push(randomGain);
      array.push(randomNumber);
    }

    return [array, gains];
  }

  useEffect(() => {
    const interval = setInterval(() => {
      const [randomArray, randomGains] = generateRandomArray();
      channel.publish('rates', {
        randomArray,
        randomGains,
      });
    }, 3000);

    return () => clearInterval(interval);
  }, [channel]);

  return <div></div>;
}

export default Pub;
