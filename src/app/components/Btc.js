'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import Ably from 'ably';
import { useChannel } from 'ably/react';

export default function Btc() {
  const [price, setPrice] = useState(0);
  const [rem, setRem] = useState('');
  const [number, setNumber] = useState(34245);

  const [values, setValues] = useState([]);
  const prevValueRef = useRef(0);

  useEffect(() => {
    setValues((prevValues) => [...prevValues, prevValueRef.current]);
  }, [price]);

  const calculateDifference = useCallback(() => {
    if (values.length < 2) {
      return 0;
    }
    return Math.round(price - values[values.length - 2]);
  }, [price, values]);

  const chanName = '[product:ably-coindesk/bitcoin]bitcoin:usd';

  const { channel } = useChannel(chanName);

  useEffect(() => {
    channel.subscribe(function (message) {
      prevValueRef.current = message.data;
      setNumber(message.data);
    });

    //
    const numberElement = number;
    const from = price ? +price : 1000.12;
    const to = numberElement ? +numberElement : 34145.65;
    const round = (num) => Math.round(num);
    const animate = ({ timing, duration, callback }) => {
      let start = performance.now();
      let frame = 0;

      requestAnimationFrame(function anim(timestamp) {
        let timeFraction = (timestamp - start) / duration;
        if (timeFraction > 1) {
          timeFraction = 1;
        }
        const progress = timing(timeFraction);

        callback(progress);

        if (progress < 1) {
          frame = requestAnimationFrame(anim);
        }
      });
    };

    const callback = (from, to) => (progress) => {
      const rem_diff = round(to - from);
      const diff = (to - from) * progress + from;
      const result = round(diff);
      setPrice(result);
      setRem(rem_diff);
    };

    const duration = 1000;

    function easeOutExpo(x) {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    }

    const timing = easeOutExpo;

    animate({ timing, duration, callback: callback(from, to) });
    //
  }, [price, number, channel]);

  return price;
}
