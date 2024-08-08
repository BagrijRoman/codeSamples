import React from 'react';

import './messagesList.styles.less';

export const MessagesList = (props) => {
  const {
    messages,
  } = props;

  return (
    <div className="messagesListContainer">
      <div className="messagesListWrapper">
        {messages.map(({ id, message, event, userName }) => (
          <div
            key={id}
            className="messageListItemContainer"
          >
            <div className="messageListItem">
              {event === 'connection' ? (
                <span>User {userName} was connected</span>
              ) : (
                <span>{userName}: {message}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
