'use client';
import React, { useState, useEffect } from 'react';

function News() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const url =
      'https://www.alphavantage.co/query?function=NEWS_SENTIMENT&tickers=AAPL&apikey=G7QA7LOEUR0MNE0O';

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
        console.log(data);
        setData(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div>
      {data ? (
        data.feed.map((datum) => (
          <>
            <div class='flex flex-col p-8 text-center bg-white border-b border-gray-200 rounded-t-lg md:rounded-t-none md:rounded-tl-lg md:border-r dark:bg-gray-800 dark:border-gray-700'>
              <blockquote class='max-w-2xl mx-auto mb-4 text-gray-500 lg:mb-8 dark:text-gray-400'>
                <h3 class='text-lg font-semibold text-gray-900 dark:text-white'>
                  {datum.title}
                </h3>
                <p class='my-4'>{datum.summary}</p>
              </blockquote>
              <div class='flex items-center justify-center space-x-3'>
                <div class='space-y-0.5 font-medium dark:text-white text-left'>
                  <div>{datum.authors[0]}</div>
                  <div class='text-sm text-gray-500 dark:text-gray-400'>
                    By {datum.source}
                  </div>
                </div>
              </div>
            </div>
          </>
        ))
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default News;
