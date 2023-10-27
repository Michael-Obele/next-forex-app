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

  const styles = {
    navShow:
      'fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-0 sm:translate-x-0',
    navHide:
      'fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0',
    iconText_Active:
      'flex items-center p-2 bg-gray-950 text-white  rounded-lg group',
    iconFAwesome_Active: 'text-white transition duration-75',
    iconText_Inactive:
      'flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group',
    iconFAwesome_Inactive:
      'text-gray-500 transition duration-75 group-hover:text-gray-900',
  };
  return (
    <>
      <button
        data-drawer-target='default-sidebar'
        data-drawer-toggle='default-sidebar'
        aria-controls='default-sidebar'
        type='button'
        onClick={toggleNav}
        className='inline-flex items-center p-2 mt-2 ml-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'>
        <span className='sr-only'>Open sidebar</span>
        <i className='fa-solid fa-bars-staggered'></i>
      </button>

      <aside
        id='default-sidebar'
        className={showNav ? styles.navShow : styles.navHide}
        aria-label='Sidebar'>
        <div className='h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800'>
          <a href='#' className='flex items-center pl-2.5 mb-5'>
            <i className='fa-solid fa-gauge-simple-high text-2xl'></i>
            <span className='self-center ml-3 text-xl font-semibold whitespace-nowrap dark:text-white'>
              Forex Dashboard
            </span>
          </a>
          <ul className='space-y-2 font-medium'>
            <li>
              <a
                onClick={() => handleClick(0)}
                href='#'
                className={
                  selected === 0
                    ? styles.iconText_Active
                    : styles.iconText_Inactive
                }>
                <i
                  className={
                    selected === 0
                      ? styles.iconFAwesome_Active + ' fa-solid fa-chart-line '
                      : styles.iconFAwesome_Inactive +
                        ' fa-solid fa-chart-line '
                  }
                />
                <span className='ml-3'>Home</span>
              </a>
            </li>
            <li>
              <a
                onClick={() => handleClick(1)}
                href='#'
                className={
                  selected === 1
                    ? styles.iconText_Active
                    : styles.iconText_Inactive
                }>
                <i
                  className={
                    selected === 1
                      ? styles.iconFAwesome_Active + ' fa-solid fa-newspaper'
                      : styles.iconFAwesome_Inactive + ' fa-solid fa-newspaper'
                  }
                />
                <span className='ml-3'>News</span>
              </a>
            </li>
            <li>
              <a
                onClick={toggleNav}
                href='#'
                className='flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 sm:hidden group'>
                <i className='fa-solid fa-tent-arrow-turn-left text-gray-500 transition duration-75 group-hover:text-gray-900  ' />
                <span className='ml-3'>Close Navbar</span>
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
          <div className='p-4 sm:ml-64'>
            This is the content for the first item.
            <Btc />
          </div>
        </p>
        <div className={selected === 1 ? '' : 'hidden'}>
          <div className='p-4 sm:ml-64'>
            <News />
          </div>
        </div>
      </div>
    </>
  );
}
