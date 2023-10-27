'use client';
import Script from 'next/script';
import TradingViewWidget from './components/TradingWidget';
import { Realtime } from 'ably';
import { AblyProvider } from 'ably/react';
import { Navbar } from './components/Navbar';

const client = new Realtime({ authUrl: '/api' });

export default function Home() {
  return (
    <>
      <Script
        src='https://kit.fontawesome.com/7cc1bf722a.js'
        crossorigin='anonymous'
      />
      <AblyProvider client={client}>
        <Navbar />
      </AblyProvider>
    </>
  );
}
