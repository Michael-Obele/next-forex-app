'use client';

// TradingViewWidget.jsx

import React, { useEffect, useRef, useState } from 'react';

let tvScriptLoadingPromise;

export default function TradingViewWidget() {
  const onLoadScriptRef = useRef();

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise((resolve) => {
        const script = document.createElement('script');
        script.id = 'tradingview-widget-loading-script';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.type = 'text/javascript';
        script.onload = resolve;

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(
      () => onLoadScriptRef.current && onLoadScriptRef.current()
    );

    return () => (onLoadScriptRef.current = null);

    function createWidget() {
      if (document.getElementById('tradingview_c2b71')) {
        new window.TradingView.widget({
          autosize: true,
          symbol: 'COINBASE:BTCUSD',
          interval: '5',
          timezone: 'Etc/UTC',
          theme: 'dark',
          style: '9',
          locale: 'en',
          enable_publishing: false,
          hide_top_toolbar: true,
          withdateranges: true,
          save_image: false,
          hide_volume: true,
          container_id: 'tradingview_c2b71',
        });
      }
    }
  }, []);

  return (
    <div
      className='tradingview-widget-container'
      style={{
        height: '100%',
        width: '100%',
      }}>
      <div
        id='tradingview_c2b71'
        style={{
          height: '100%',
          width: '100%',
          borderRadius: '0.5rem',
        }}
        className='rounded-lg'
      />
    </div>
  );
}
