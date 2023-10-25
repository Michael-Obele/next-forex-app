'use client';
import { useEffect, useState, useRef } from 'react';
import Ably from 'ably';
import styles from './styles/Time.css';

export default function Btc() {
  const [btc, setBtc] = useState('');
  const ably = new Ably.Realtime(process.env.NEXT_PUBLIC_BTC_API_KEY);
  const chanName = '[product:ably-coindesk/bitcoin]bitcoin:usd';
  let channel = ably.channels.get(chanName);

  const [price, setPrice] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    channel.subscribe(function (message) {
      setBtc(message.data);
      setNumber(message.data);
    });
    //
    const priceElement = document.getElementById('price');
    const numberElement = document.getElementById('number');
    const from = priceElement.textContent ? +priceElement.textContent : 1000.12;
    const to = numberElement.value ? +numberElement.value : 1545.65;
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
      const diff = (to - from) * progress + from;
      const result = round(diff);
      priceElement.textContent = result;
    };

    const duration = 1000;

    function easeOutExpo(x) {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    }

    const timing = easeOutExpo;

    animate({ timing, duration, callback: callback(from, to) });
    //
  }, [price, number]);

  return (
    <>
      <div className='w-40 h-40 bg-slate-600 text-white rounded-md text-center  justify-center  items-center flex'>
        <h3 className='text-3xl' id='price'>
          {price}
        </h3>
      </div>
      <input className='hidden' type='number' id='number' value={number} />
    </>
  );
}
