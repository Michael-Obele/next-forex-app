'use client';
import Script from 'next/script';
import { Realtime } from 'ably';
import { AblyProvider } from 'ably/react';
import { App } from './pages/App';

const client = new Realtime({
  key: process.env.NEXT_PUBLIC_BTC_API_KEY,
  closeOnUnload: true,
});

export default function Home() {
  return (
    <>
      <Script
        src='https://kit.fontawesome.com/7cc1bf722a.js'
        crossorigin='anonymous'
      />
      <AblyProvider client={client}>
        <App />
      </AblyProvider>
    </>
  );
}
