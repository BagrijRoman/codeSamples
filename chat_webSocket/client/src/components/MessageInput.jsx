import React from 'react';
import { Input, Button } from 'antd';


export const MessageInput = (props) => {
  const {
    inputValue,
    setInputValue,
    onValueSend,
  } = props;

  return (
    <div>
      <Input.TextArea
        rows={4}
        placeholder="Type message here"
        maxLength={600}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <div className="btn-container">
        <Button
          type="primary"
          className="send-btn"
          onClick={onValueSend}
          disabled={!inputValue.length}
        >
          Send
        </Button>
      </div>
    </div>
  );
}