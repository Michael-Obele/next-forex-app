'use client';
import React, { useState } from 'react';
import AblyMessageComponent from './Ably';
import News from './News.js';
import Btc from './Btc';

export function Navbar() {
  const [selected, setSelected] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const handleClick = (index) => {
    setSelected(index);
  };
  const toggleNav = () => {
    setShowNav(!showNav);
  };
  return (
    <>
      <button
        data-drawer-target='default-sidebar'
        data-drawer-toggle='default-sidebar'
        aria-controls='default-sidebar'
        type='button'
        onClick={toggleNav}
        class='inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'>
        <span class='sr-only'>Open sidebar</span>
        <i class='fa-solid fa-bars-staggered'></i>
      </button>

      <aside
        id='default-sidebar'
        className={
          showNav
            ? 'fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-0 sm:translate-x-0'
            : 'fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0'
        }
        class='fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-0 sm:translate-x-0'
        aria-label='Sidebar'>
        <div class='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
          <ul class='space-y-2 font-medium'>
            <li>
              <a
                onClick={() => handleClick(0)}
                href='#'
                class='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                <i class='fa-solid fa-chart-line text-gray-500 transition duration-75 group-hover:text-gray-900  '></i>
                <span class='ml-3'>Home</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => handleClick(1)}
                href='#'
                class='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group'>
                <i class='fa-solid fa-newspaper text-gray-500 transition duration-75 group-hover:text-gray-900  ' />
                <span class='ml-3'>News</span>
              </a>
            </li>
            <li>
              <a
                onClick={toggleNav}
                href='#'
                class='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 sm:hidden group'>
                <i class='fa-solid fa-tent-arrow-turn-left text-gray-500 transition duration-75 group-hover:text-gray-900  ' />
                <span class='ml-3'>Close Navbar</span>
              </a>
            </li>
          </ul>
        </div>
      </aside>
      <div
        onClick={() => {
          setShowNav(false);
        }}>
        <p className={selected === 0 ? '' : 'hidden'}>
          <div class='p-4 sm:ml-64'>
            This is the content for the first item.
            <Btc />
          </div>
        </p>
        <div className={selected === 1 ? '' : 'hidden'}>
          <div class='p-4 sm:ml-64'>
            <News />
          </div>
        </div>
      </div>
    </>
  );
}
