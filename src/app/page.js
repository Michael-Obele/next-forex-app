'use client';
import { Tabs } from './Tabs';

import Script from 'next/script';

import TradingViewWidget from './TradingWidget';
import { Realtime } from 'ably';
import { AblyProvider } from 'ably/react';
import { Navbar } from './Navbar';

const client = new Realtime({ authUrl: '/api' });

export default function Home() {
  return (
    <>
      <Script
        src='https://kit.fontawesome.com/7cc1bf722a.js'
        crossorigin='anonymous'
      />
      <AblyProvider client={client}>
        {/* <div className=' h-[60vh]'>
          <TradingViewWidget />
        </div> */}

        <Navbar />
      </AblyProvider>
    </>
  );
}
