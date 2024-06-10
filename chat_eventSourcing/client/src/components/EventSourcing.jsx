import React, { useState, useCallback, useEffect } from 'react';
import { Layout } from 'antd';
import axios from 'axios';

import { MessageInput } from './MessageInput';
import { MessagesList } from './messagesList';

import './EventSourcing.styles.less';

export const EventSourcing = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const onValueSend = useCallback(async() => {
    await axios.post("http://localhost:3000/new-message", {
      message: inputValue,
      id: Date.now(),
    });
    setInputValue("");
  }, [inputValue]);

  const messagesSubscription = useCallback( () => {
    const eventSource = new EventSource("http://localhost:3000/connect");
    eventSource.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      setMessages((prev) => [messageData, ...prev]);
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
