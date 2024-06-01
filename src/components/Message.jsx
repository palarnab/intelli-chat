import { Box, Typography } from '@mui/material';

import ContentRenderer from './ContentRenderer';
import React from 'react';
import { formatDistance } from 'date-fns';

const Message = ({ message, messageUser, user }) => {
  const isAuthor = message.sender_id === user.id;
  const now = Date.now();

  const chatBubble = {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    marginRight: '10px',
  };

  const userMessage = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    color: '#fff',
    textAlign: 'center',
    lineHeight: '30px',
    backgroundColor: messageUser.color,
  };

  return (
    <Box mb={2} style={{ direction: isAuthor ? 'rtl' : '' }}>
      <Box mb={1} color="text.secondary">
        <Typography
          sx={{
            fontSize: '0.7rem',
          }}
          component="small"
          title={new Date(message.created_at)}>
          {`${messageUser.name} sent a message ${formatDistance(
            new Date(message.created_at).getTime(),
            now,
          )} ago `}
        </Typography>
      </Box>
      <Box
        style={{ direction: 'ltr' }}
        sx={{
          bgcolor: isAuthor ? '#8cdfff' : '#edf3f0',
          padding: '1em',
          borderRadius: '10px',
          display: 'flex',
          width: 'fit-content',
          overflowWrap: 'anywhere',
          maxWidth: '50%',
        }}>
        <div style={chatBubble}>
          {message.avatar ? (
            <img src={message.avatar} alt="" />
          ) : (
            <div style={userMessage}>{messageUser.name.charAt(0)}</div>
          )}
        </div>
        <ContentRenderer content={message.message} />
      </Box>
    </Box>
  );
};
export default Message;
