import React, { useState, useCallback, useRef } from 'react';
import { Layout, Button, Input } from 'antd';

import { MessageInput } from './MessageInput';
import { MessagesList } from './messagesList';

import './WebSockets.styles.less';

export const WebSockets = () => {
  const [ messages, setMessages ] = useState([]);
  const [ inputValue, setInputValue ] = useState('');
  const [ isConnected, setIsConnected ] = useState(false);
  const [ userName, setUserName ] = useState('');
  const socket = useRef();

  const onSignInClick = useCallback(() => {
    socket.current = new WebSocket('ws://localhost:7005');

    socket.current.onopen = () => {
      setIsConnected(true);

      const message = {
        event: 'connection',
        userName,
        id: Date.now(),
      };

      socket.current.send(JSON.stringify(message));
    };

    socket.current.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setMessages((prev) => [message, ...prev]);
    };

    socket.current.onclose = () => {
      setIsConnected(false);
      console.log('Socket was closed');
    };

    socket.current.onerror = () => {
      console.log('Socket error occurs')
    };

  }, [isConnected, userName])

  const sendMessage = useCallback(() => {
    const message = {
      event: 'message',
      userName,
      message: inputValue,
      id: Date.now(),
    };

    socket.current.send(JSON.stringify(message));
    setInputValue('');
  }, [userName, inputValue]);

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
        {isConnected ? (
          <MessageInput
            {...{
              inputValue,
              setInputValue,
              onValueSend: sendMessage,
            }}
          />
        ) : (<div className="login-inputs">
          <span>Please log in</span>
          <Input
            type='text'
            placeholder='enter your name'
            value={userName}
            onChange={e => setUserName(e.target.value)}
          />
          <Button
            type="primary"
            onClick={onSignInClick}
          >
            Sign in
          </Button>
        </div>)}
      </Layout.Footer>
    </Layout>
  );
};
