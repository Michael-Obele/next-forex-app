'use client';
import React, { useState } from 'react';
import AblyMessageComponent from './Ably';
import News from './News';
export function Tabs() {
  const [selected, setSelected] = useState(0);
  let styleActive =
    'inline-flex items-center justify-center p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500 group';
  let styleNotActive =
    'inline-flex items-center justify-center p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 group';
  const handleClick = (index) => {
    setSelected(index);
  };
  return (
    <div class='border-b sticky border-gray-200 '>
      <ul class='flex flex-wrap -mb-px text-sm font-medium text-center text-gray-500 '>
        <li onClick={() => handleClick(0)} class='mr-2'>
          <a href='#' className={selected === 0 ? styleActive : styleNotActive}>
            <i class='fa-solid fa-chart-line mr-2'></i>
            Update
          </a>
        </li>
        <li onClick={() => handleClick(1)} class='mr-2'>
          <a href='#' className={selected === 1 ? styleActive : styleNotActive}>
            <i class='fa-solid fa-newspaper mr-2' />
            News
          </a>
        </li>
        <li onClick={() => handleClick(2)} class='mr-2'>
          <a href='#' className={selected === 2 ? styleActive : styleNotActive}>
            <i class='fa-solid fa-message mr-2'></i>
            Chat
          </a>
        </li>
      </ul>
      <p className={selected === 0 ? '' : 'hidden'}>
        This is the content for the first item.
      </p>
      <div className={selected === 1 ? '' : 'hidden'}>
        <News />
      </div>
      <div className={selected === 2 ? '' : 'hidden'}>
        <AblyMessageComponent />
      </div>
    </div>
  );
}
