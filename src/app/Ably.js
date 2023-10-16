'use client';

import React, { useState, useEffect, useCallback } from 'react';

import Ably from 'ably/promises';

const AblyMessageComponent = () => {
  const [messages, setMessages] = useState([]);
  const [channel, setChannel] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [presenceData, setPresenceData] = useState([]);

  const client = new Ably.Realtime(process.env.NEXT_PUBLIC_ABLY_KEY);

  useEffect(() => {
    const getChannel = async () => {
      const newChannel = client.channels.get('my-cool-channel');
      setChannel(newChannel);
    };
    getChannel();
  }, []);

  useEffect(() => {
    if (channel) {
      const messageCallback = (message) => {
        console.log('A message was received', message.data.text);
        console.log('Everything', message);
        setMessages((prevMessages) => [...prevMessages, message.data.text]);
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
        data: { text: inputValue },
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
