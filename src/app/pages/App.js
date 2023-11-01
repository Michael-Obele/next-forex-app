'use client';
import React, { useState } from 'react';
import News from './News.js';
import Dashboard from './Dashboard.js';

export function App() {
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
      'fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-0 bg-[#1A2132] border-r border-[#1A2132] md:translate-x-0',
    navHide:
      'fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-[#1A2132] border-r border-[#1A2132] md:translate-x-0',
    iconText_Active:
      'flex items-center p-2 bg-gray-950 text-white  rounded-lg group',
    iconFAwesome_Active: 'text-white transition duration-75',
    iconText_Inactive:
      'flex items-center p-2 text-gray-300 rounded-lg dark:text-white hover:bg-gray-600 dark:hover:bg-gray-700 group',
    iconFAwesome_Inactive:
      'text-gray-500 transition duration-75 group-hover:text-gray-400',
  };
  return (
    <>
      <nav class='fixed top-0 z-50 w-full bg-[#1A2132] border-b border-[#1A2132] dark:bg-gray-800 dark:border-gray-700'>
        <div class='px-3 py-3 lg:px-5 lg:pl-3'>
          <div class='flex items-center justify-between'>
            <div class='flex items-center justify-start'>
              <button
                data-drawer-target='default-sidebar'
                data-drawer-toggle='default-sidebar'
                aria-controls='default-sidebar'
                type='button'
                onClick={toggleNav}
                className='inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'>
                <span className='sr-only'>Open sidebar</span>
                <i className='fa-solid fa-bars-staggered text-3xl'></i>
              </button>
              <a href='#' className='flex items-center pl-2.5 mb-5'>
                <i className='fa-solid fa-gauge-simple-high text-2xl text-white'></i>
                <span className='self-center ml-3 text-xl font-semibold whitespace-nowrap text-white'>
                  Forex Realtime
                </span>
              </a>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id='default-sidebar'
        className={showNav ? styles.navShow : styles.navHide}
        aria-label='Sidebar'>
        <div className='h-full px-3 py-4 text-white overflow-y-auto bg-[#1A2132] dark:bg-gray-800 '>
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
          </ul>
        </div>
      </aside>
      <div
        onClick={() => {
          setShowNav(false);
        }}>
        <div className={selected === 0 ? '' : 'hidden'}>
          <div className='p-4 pt-24 md:ml-64 bg-[#091020]'>
            <Dashboard />
          </div>
        </div>
        <div className={selected === 1 ? '' : 'hidden'}>
          <div className='p-4 pt-24 md:ml-64 bg-[#091020]'>
            <News />
          </div>
        </div>
      </div>
    </>
  );
}
