'use client';
import { useEffect, useState, useRef, useCallback } from 'react';
import { useChannel } from 'ably/react';

export default function Sub() {
  const [values, setValues] = useState([]);
  const [value, setValue] = useState(0);
  const prevValueRef = useRef(0);

  const { channel } = useChannel('prices');
  useEffect(() => {
    channel.subscribe('rates', (message) => {
      prevValueRef.current = message.data.data;
      setValue(message.data.data);
    });
  }, []);

  useEffect(() => {
    setValues((prevValues) => [...prevValues, prevValueRef.current]);
  }, [value]);

  const calculateDifference = useCallback(() => {
    if (values.length < 2) {
      return 0;
    }
    return value - values[values.length - 2];
  }, [value, values]);

  return <></>;
}
