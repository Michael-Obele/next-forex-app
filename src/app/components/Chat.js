'use client';
import { useState, useEffect, useRef } from 'react';
import * as LightweightCharts from 'lightweight-charts';
import { createChart, ColorType } from 'lightweight-charts';

function Chart() {
  const [candlestickData, setCandlestickData] = useState([
    {
      time: '2018-10-19',
      open: 180.34,
      high: 180.99,
      low: 178.57,
      close: 179.85,
    },
    {
      time: '2018-10-22',
      open: 180.82,
      high: 181.4,
      low: 177.56,
      close: 178.75,
    },
    {
      time: '2018-10-23',
      open: 175.77,
      high: 179.49,
      low: 175.44,
      close: 178.53,
    },
    {
      time: '2018-10-24',
      open: 178.58,
      high: 182.37,
      low: 176.31,
      close: 176.97,
    },
    {
      time: '2018-10-25',
      open: 177.52,
      high: 180.5,
      low: 176.83,
      close: 179.07,
    },
    {
      time: '2018-10-26',
      open: 176.88,
      high: 177.34,
      low: 170.91,
      close: 172.23,
    },
    {
      time: '2018-10-29',
      open: 173.74,
      high: 175.99,
      low: 170.95,
      close: 173.2,
    },
    {
      time: '2018-10-30',
      open: 173.16,
      high: 176.43,
      low: 172.64,
      close: 176.24,
    },
    {
      time: '2018-10-31',
      open: 177.98,
      high: 178.85,
      low: 175.59,
      close: 175.88,
    },
    {
      time: '2018-11-01',
      open: 176.84,
      high: 180.86,
      low: 175.9,
      close: 180.46,
    },
    {
      time: '2018-11-02',
      open: 182.47,
      high: 183.01,
      low: 177.39,
      close: 179.93,
    },
    {
      time: '2018-11-05',
      open: 181.02,
      high: 182.41,
      low: 179.3,
      close: 182.19,
    },
    {
      time: '2019-05-16',
      open: 192.47,
      high: 194.96,
      low: 192.2,
      close: 192.38,
    },
    {
      time: '2019-05-17',
      open: 190.86,
      high: 194.5,
      low: 190.75,
      close: 192.58,
    },
    {
      time: '2019-05-20',
      open: 191.13,
      high: 192.86,
      low: 190.61,
      close: 190.95,
    },
    {
      time: '2019-05-21',
      open: 187.13,
      high: 192.52,
      low: 186.34,
      close: 191.45,
    },
    {
      time: '2019-05-22',
      open: 190.49,
      high: 192.22,
      low: 188.05,
      close: 188.91,
    },
    {
      time: '2019-05-23',
      open: 188.45,
      high: 192.54,
      low: 186.27,
      close: 192.0,
    },
    {
      time: '2019-05-24',
      open: 192.54,
      high: 193.86,
      low: 190.41,
      close: 193.59,
    },
  ]);

  const chartRef = useRef(null);

  useEffect(() => {
    const chart = LightweightCharts.createChart(chartRef.current, {
      width: 600,
      height: 300,
      layout: {
        background: {
          type: 'solid',
          color: '#000000',
        },
        textColor: 'rgba(255, 255, 255, 0.9)',
      },
      grid: {
        vertLines: {
          color: 'rgba(197, 203, 206, 0.5)',
        },
        horzLines: {
          color: 'rgba(197, 203, 206, 0.5)',
        },
      },
      crosshair: {
        mode: LightweightCharts.CrosshairMode.Normal,
      },
      rightPriceScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
      },
      timeScale: {
        borderColor: 'rgba(197, 203, 206, 0.8)',
      },
    });

    const candlestickSeries = chart.addCandlestickSeries({
      upColor: 'rgba(255, 144, 0, 1)',
      downColor: '#000',
      borderDownColor: 'rgba(255, 144, 0, 1)',
      borderUpColor: 'rgba(255, 144, 0, 1)',
      wickDownColor: 'rgba(255, 144, 0, 1)',
      wickUpColor: 'rgba(255, 144, 0, 1)',
    });

    candlestickSeries.setData(candlestickData);

    return () => {
      chart.remove();
    };
  }, [candlestickData]);

  return <div id='chat' ref={chartRef}></div>;
}

export default Chart;
