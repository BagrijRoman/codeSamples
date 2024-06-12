import React from 'react';

import './messagesList.styles.less';

export const MessagesList = (props) => {
  const {
    messages,
  } = props;

  return (
    <div className="messagesListContainer">
      <div className="messagesListWrapper">
        {messages.map(({ id, message }) => (
          <div
            key={id}
            className="messageListItemContainer"
          >
            <div className="messageListItem">
              {message}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
