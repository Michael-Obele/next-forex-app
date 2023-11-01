'use client';
import React, { useState, useEffect } from 'react';
import offlineData from '../utils/news';

function News() {
  const [data, setData] = useState('');

  useEffect(() => {
    const url =
      'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=demo';

    fetch(url, {
      headers: {
        'User-Agent': 'request',
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        if (data.Information) {
          console.log(data);
          setData(offlineData);
        } else {
          setData(data);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        setData(offlineData);
      });
  }, []);

  return (
    <div>
      {data ? (
        data.feed.map((datum, i) => (
          <>
            <div key={i} className='my-6 mx-auto max-w-3xl'>
              <img
                className='rounded-lg mx-auto my-3 border-8 border-slate-500 w-full max-w-2xl'
                src={datum.banner_image}
                alt={`From ${datum.source}`}
                width={500}
                height={500}
              />
              <div className='p-5 sm:ml-8'>
                <p className='mb-3 font-sm text-white'>
                  {new Date(
                    datum.time_published.replace(
                      /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/,
                      '$1-$2-$3T$4:$5:$6'
                    )
                  ).toString()}
                </p>
                <h5 className='mb-2 text-2xl font-bold tracking-tight text-white dark:text-white'>
                  {datum.title}
                </h5>
                <p className='mb-3 font-normal text-white dark:text-gray-400'>
                  {datum.summary}
                </p>
                <span className='text-white'>
                  <h5 className='italic'>{datum.authors.join(', ')}</h5>
                  <p className='text-xs'>By {datum.source}</p>
                </span>
                <a
                  href={datum.url}
                  className='inline-flex items-center mt-3 px-6 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                  Read more
                </a>
                <hr className='h-1 my-8 bg-gray-200 border-0 dark:bg-gray-700' />
              </div>
            </div>
          </>
        ))
      ) : (
        <p>Loading News...</p>
      )}
    </div>
  );
}

export default News;
