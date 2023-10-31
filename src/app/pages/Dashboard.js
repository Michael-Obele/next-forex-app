'use client';
import React, { useEffect, useState } from 'react';
import Btc from '../components/Btc';
import TradingViewWidget from '../components/TradingWidget';
import Chart from '../components/Chat';
import Pub from '../utils/Pub';
import { useChannel } from 'ably/react';

export default function Dashboard() {
  const [prices, setPrices] = useState([
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
  ]);

  const [gains, setGains] = useState([
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
    '0',
  ]);

  const symbol = [
    'Grow Generation',
    'SkyWater',
    'Light Crude Oil',
    'DogeCoin',
    'Stellar',
    'NeoGenomics, Inc',
    'Groupon, Inc',
    'Lyft, Inc',
  ];
  const min = -10;
  const max = 39;

  const { channel } = useChannel('prices');
  useEffect(() => {
    channel.subscribe('rates', (message) => {
      if (message.data) {
        setPrices(message.data.randomArray);
        setGains(message.data.randomGains);
      }
    });
  }, []);

  return (
    <>
      <div className='h-[35vh] md:h-[60vh] w-full border-8 border-slate-950 rounded-lg mb-8 '>
        <TradingViewWidget />
      </div>
      <Pub />
      {/* Tables */}

      <div className='relative overflow-x-auto'>
        <table className='w-full text-sm text-left text-white dark:text-gray-400'>
          <thead className='text-xs text-white uppercase dark:text-gray-400'>
            <tr>
              {['Symbol', 'Price', 'Gain'].map((item) => (
                <th scope='col' className='px-6 py-3'>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className='bg-[#091020] text-white dark:bg-gray-800'>
              <td scope='col' className='px-6 py-4'>
                BTC/USDT
              </td>
              <td scope='col' className='px-6 py-4'>
                <Btc />
                <span className='mx-2 text-gray-500 text-xs'>USD</span>
              </td>
              <td scope='col' className='px-6 py-4'>
                <span
                  className={`${
                    gains[8] < 0
                      ? 'bg-red-700 px-2 rounded-lg'
                      : 'bg-green-700 px-2 rounded-lg'
                  }`}>
                  {gains[8]}
                </span>
              </td>
            </tr>
            {symbol.map((sym, i) => (
              <tr className='bg-[#091020] text-white dark:bg-gray-800'>
                <td scope='col' className='px-6 py-4'>
                  {sym}
                </td>
                <td scope='col' className='px-6 py-4'>
                  {prices[i]}
                  <span className='mx-2 text-gray-500 text-xs'>USD</span>
                </td>
                <td scope='col' className='px-6 py-4'>
                  <span
                    className={`${
                      gains[i] < 0
                        ? 'bg-red-700 px-2 rounded-lg'
                        : 'bg-green-700 px-2 rounded-lg'
                    }`}>
                    {gains[i]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* End of Tables */}
    </>
  );
}
