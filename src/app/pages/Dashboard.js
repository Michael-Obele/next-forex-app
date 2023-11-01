'use client';
import React, { useEffect, useState } from 'react';
import Btc from '../components/Btc';
import TradingViewWidget from '../components/TradingWidget';
import Chart from '../components/Chat';
import Image from 'next/image';
import Pub from '../utils/Pub';
import { useChannel } from 'ably/react';

export default function Dashboard() {
  const [data, setData] = useState(Array(9).fill({ price: '0', gain: '0' }));

  const symbol = [
    'Ethereum (ETH)',
    'Dogecoin (DOGE)',
    'Shiba Inu (SHIB)',
    'Cardano (ADA)',
    'Solana (SOL)',
    'Polygon (MATIC)',
    'Avalanche (AVAX)',
    'Litecoin (LTC)',
    'Binance Coin (BNB)',
  ];

  const image = [
    ['/bitcoin.png'],
    ['/ethereum.png'],
    ['/dogecoin.png'],
    ['/shiba.png'],
    ['/cardano.png'],
    ['/solana.png'],
    ['/polygon.png'],
    ['/avalanche.png'],
    ['/litecoin.png'],
    ['/binance.png'],
  ];

  const { channel } = useChannel('prices');
  useEffect(() => {
    channel.subscribe('rates', (message) => {
      if (message.data) {
        setData((prevData) =>
          prevData.map((item, i) => ({
            price: message.data.randomArray[i],
            gain: message.data.randomGains[i],
          }))
        );
      }
    });
  }, [channel]);

  return (
    <>
      <div className='h-[35vh] md:h-[60vh] w-full border-8 border-slate-700 rounded-lg mb-8 '>
        <TradingViewWidget />
      </div>
      <Pub />
      {/* Tables */}

      <div className='relative overflow-x-auto'>
        <table className='w-full text-sm text-left text-white dark:text-gray-400'>
          <thead className='text-xs text-white uppercase dark:text-gray-400'>
            <tr>
              {['Symbol', 'Price', 'Gain'].map((item, i) => (
                <th
                  key={i}
                  scope='col'
                  className={`py-3 ${i === 0 ? 'px-12' : 'px-4'}`}>
                  {item}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr className='bg-[#091020] text-white dark:bg-gray-800'>
              <td scope='col' className='flex flex-row items-center px-2 py-2'>
                <span className=''>
                  <Image
                    src={image[0][0]}
                    alt='BTC Logo'
                    className='justify-center items-center mx-1'
                    width={30}
                    height={30}
                  />
                </span>
                Bitcoin (BTC)
              </td>
              <td scope='col' className='px-2 py-4'>
                <Btc />
                <span className='mx-2 text-gray-500 text-xs'>USD</span>
              </td>
              <td scope='col' className='px-2 py-4'>
                {data[5] ? (
                  <span
                    className={`${
                      data[5].gain < 0
                        ? 'bg-red-700 px-2 rounded-lg'
                        : 'bg-green-700 px-2 rounded-lg'
                    }`}>
                    {data[5].gain}
                  </span>
                ) : null}
              </td>
            </tr>
            {data.map((item, i) => (
              <tr className='bg-[#091020] text-white dark:bg-gray-800' key={i}>
                <td
                  scope='col'
                  className='flex flex-row items-center px-2 py-2'>
                  <span className=''>
                    <Image
                      src={image[i + 1][0]}
                      alt={image[i + 1][0] + ' Logo'}
                      className='justify-center items-center mx-1'
                      width={30}
                      height={30}
                    />
                  </span>
                  {symbol[i]}
                </td>
                <td scope='col' className='px-2 py-4'>
                  {item.price}
                  <span className='mx-2 text-gray-500 text-xs'>USD</span>
                </td>
                <td scope='col' className='px-2 py-4'>
                  <span
                    className={`${
                      item.gain < 0
                        ? 'bg-red-700 px-2 rounded-lg'
                        : 'bg-green-700 px-2 rounded-lg'
                    }`}>
                    {item.gain}
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
