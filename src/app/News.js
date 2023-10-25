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
            <div className=''>
              <div class='my-6 mx-auto max-w-3xl'>
                <img
                  class='rounded-lg mx-auto my-3 border-8 border-slate-500 w-full max-w-2xl'
                  src={datum.banner_image}
                  alt={`From ${datum.source}`}
                />
                <div class='p-5 ml-8'>
                  <p class='mb-3 font-sm text-gray-700'>
                    {new Date(
                      datum.time_published.replace(
                        /(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})/,
                        '$1-$2-$3T$4:$5:$6'
                      )
                    ).toLocaleString()}
                  </p>
                  <h5 class='mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
                    {datum.title}
                  </h5>
                  <p class='mb-3 font-normal text-gray-700 dark:text-gray-400'>
                    {datum.summary}
                  </p>
                  <h2>{datum.authors.join(', ')}</h2>
                  <p>By {datum.source}</p>
                  <a
                    href={datum.url}
                    class='inline-flex items-center mt-3 px-6 py-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800'>
                    Read more
                  </a>
                  <hr class='h-1 my-8 bg-gray-200 border-0 dark:bg-gray-700' />
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
