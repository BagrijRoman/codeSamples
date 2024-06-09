import React, { useState, useCallback, useEffect } from 'react';
import { Layout } from 'antd';
import axios from 'axios';

import { MessageInput } from './MessageInput';
import { MessagesList } from './messagesList';

import './LongPulling.styles.less';

export const LongPulling = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  console.log('Messages ', messages);

  const onValueSend = useCallback(async() => {
    await axios.post("http://localhost:3000/new-message", {
      message: inputValue,
      id: Date.now(),
    });
    setInputValue("");
  }, [inputValue]);

  const messagesSubscription = useCallback(async () => {
    try {
      axios.defaults.timeout = 5000;
      const { data } = await axios.get("http://localhost:3000/messages");
      setMessages( (prev) => [data, ...prev]);
      await messagesSubscription();
    } catch (err) {
      await messagesSubscription();
    }
  }, [])

  useEffect(() => {
    messagesSubscription();
  }, []);

  return (
    <Layout>
      <Layout.Content className="content-section">
        <MessagesList
          {...{
            messages
          }}
        />
      </Layout.Content>
      <Layout.Footer className="input-section">
        <MessageInput
          {...{
            inputValue,
            setInputValue,
            onValueSend,
          }}
        />
      </Layout.Footer>
    </Layout>

  );
};
