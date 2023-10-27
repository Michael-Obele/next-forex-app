'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { useChannel } from 'ably/react';

const AblyMessageComponent = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const { channel } = useChannel('activities');

  useEffect(() => {
    if (channel) {
      const messageCallback = (message) => {
        console.log('A message was received', message.data);
        console.log('Everything', message);
        setMessages((prevMessages) => [...prevMessages, message.data]);
      };
      channel.subscribe(messageCallback);
      return () => {
        channel.unsubscribe(messageCallback);
      };
    }
  }, [channel]);

  const sendMessage = useCallback(() => {
    if (channel) {
      channel.publish({
        name: 'ForexType',
        data: inputValue,
      });
      setInputValue('');
    }
  }, [channel, inputValue]);

  return (
    <>
      <main>
        <button onClick={sendMessage}>Click here to send a message</button>
        <input
          className='text-blue-500'
          type='text'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <h2>Messages will appear here:</h2>
        <ul>
          {messages.map((text, index) => (
            <li key={'item' + index}>{text}</li>
          ))}
        </ul>
      </main>
    </>
  );
};

export default AblyMessageComponent;
