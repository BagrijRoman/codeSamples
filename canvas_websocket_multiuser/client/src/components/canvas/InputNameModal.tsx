import React, { useCallback, useState, useEffect } from 'react';
import { Modal, Button, Input } from 'antd';

interface IInputNameModalProps {
  setUserName: (userName: string) => void,
}

export const InputNameModal = (props: IInputNameModalProps) => {
  const {
    setUserName,
  } = props;

  const [ isOpen, setIsOpen ] = useState<boolean>(true);
  const [ inputValue, setInputValue ] = useState<string>('');

  const onSubmit = useCallback(() => {
    setUserName(inputValue);
    setIsOpen(false);
  }, [inputValue, setUserName, setIsOpen]);

  return (
    <Modal
      open={isOpen}
      closeIcon={null}
      footer={
        <Button
          key="submit"
          type="primary"
          disabled={inputValue.length < 3}
          onClick={onSubmit}
        >
          Submit
        </Button>
      }
    >
      <h3>
        Input user name
      </h3>
      <Input
        style={{ marginTop: '30px' }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter user name here"
      />
    </Modal>
  );
}