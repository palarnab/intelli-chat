import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Box } from '@mui/material';
import Error from './Error.jsx';
import Message from './Message.jsx';
import SendMessage from './SendMessage.jsx';
import useGetMessages from './useGetMessages';

const ChatBox = ({
  sender,
  receiver,
  isFullPage,
  observeUserIds,
  containerHeight,
  showUserAvatar,
  bgSender,
  bgReceiver,
}) => {
  const [page, setPage] = useState(0);
  const scroll = useRef();
  const { activity, messages, hasMore, initialized } = useGetMessages(
    page,
    sender.id,
    receiver ? receiver.id : null,
    observeUserIds,
  );

  const observer = useRef();
  const lastChatElementRef = useCallback(
    (node) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prev) => prev + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [hasMore],
  );

  useEffect(() => {
    console.log(activity);
  }, [activity]);

  useEffect(() => {
    setTimeout(() => {
      scroll.current.scrollIntoView({ behavior: 'smooth' });
    }, 2000);
  }, [initialized]);

  useEffect(() => {
    if (sender && receiver) {
      sender.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      receiver.color = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }
  }, []);

  if (!(sender && sender.id && sender.name)) {
    return (
      <Error
        error={`Sender: ${JSON.stringify(sender || {})} is not complete`}
      />
    );
  }

  const scrollIntoView = () => {
    setTimeout(() => {
      scroll.current.scrollIntoView({ behavior: 'smooth' });
    }, 10);
  };

  const getUser = (id) => {
    if (id === sender.id) {
      return sender;
    } else if (id === receiver.id) {
      return receiver;
    }
  };

  const boxStyle = {
    width: '100%',
    minHeight: '100vh',
    paddingTop: '60px',
    maxWidth: '100vw',
    fontSize: '16px',
    fontFamily: 'sans-serif',
  };

  return (
    <div style={isFullPage ? boxStyle : null}>
      <Box
        mt="0.5em"
        style={{
          height: containerHeight || '72vh',
          overflow: 'auto',
          scrollbarWidth: 'thin',
        }}>
        <div
          style={{ opacity: 0.3 }}
          ref={lastChatElementRef}
          title={messages.length}>
          .
        </div>
        {messages.map((message) => (
          <Message
            userAvatar={showUserAvatar}
            bgSender={bgSender}
            bgReceiver={bgReceiver}
            key={message.id}
            message={message}
            messageUser={getUser(message.sender_id)}
            user={sender}
          />
        ))}
        <span ref={scroll}></span>
      </Box>
      <SendMessage
        sender={sender}
        receiver={receiver}
        scrollIntoView={scrollIntoView}
      />
    </div>
  );
};

export default ChatBox;
