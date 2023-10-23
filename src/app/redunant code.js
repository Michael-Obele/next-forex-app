 useEffect(() => {
    const getChannel = async () => {
      const newChannel = client.channels.get('rates');
      setChannel(newChannel);
    };
    getChannel();
  }, []);

    const sendMessage = useCallback(() => {
    if (channel) {
      channel.publish({
        name: 'ForexType',
        data: 'inputValue',
      });
    }
  }, [channel]);