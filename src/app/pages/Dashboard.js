'use client';
import React from 'react';
import Btc from '../components/Btc';
import TradingViewWidget from '../components/TradingWidget';

export default function Dashboard() {
  return (
    <>
      <div className='h-[35vh] md:h-[60vh] w-full border-8 border-slate-950 rounded-lg mb-8 '>
        <TradingViewWidget />
      </div>
      <div className='sm:flex sm:flex-row max-w-[320px] md:max-w-[1096px] sm:max-w-none mx-auto space-y-3 sm:space-y-0'>
        <h3 className='sm:w-fit w-[90%] h-20 sm:h-40 bg-slate-600 text-white rounded-md text-center md:text-2xl  lg:text-3xl  justify-center items-center capitalize mx-4 px-2 flex'>
          The current price of{' '}
          <i class='fa-brands fa-bitcoin text-xl sm:text-4xl mx-2' /> at the
          moment:
        </h3>
        <div className='w-[50%] h-16 max-w-xs sm:h-40 bg-slate-600 text-white rounded-md text-center mx-auto md:mx-4 justify-center items-center flex'>
          <Btc />
        </div>
      </div>
    </>
  );
}
