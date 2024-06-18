import React from 'react';
import { Box, Typography } from '@mui/material';

import { formatDistance } from 'date-fns';
import ContentRenderer from './ContentRenderer.jsx';

const Message = ({
  message,
  messageUser,
  user,
  userAvatar,
  bgSender,
  bgReceiver,
}) => {
  const isAuthor = message.sender_id === user.id;
  const now = Date.now();
  const messageTime = new Date(message.created_at).toTimeString();

  if (!messageUser) return <></>;

  return (
    <>
      <Box mb={2} style={{ direction: isAuthor ? 'rtl' : '' }}>
        {userAvatar && (
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
        )}
        <Box
          sx={{
            bgcolor: isAuthor ? bgSender || '#8cdfff' : bgReceiver || '#edf3f0',
            padding: '1em',
            borderRadius: '10px',
            display: 'flex',
            width: 'fit-content',
            overflowWrap: 'anywhere',
            maxWidth: '50%',
            borderRadius: 0,
          }}>
          {userAvatar && (
            <div className="chat-bubble__left">
              {message.avatar ? (
                <img src={message.avatar} alt="" />
              ) : (
                <div
                  className="user-message-circle"
                  style={{ backgroundColor: messageUser.color }}>
                  {messageUser.name.charAt(0)}
                </div>
              )}
            </div>
          )}
          <div>
            <ContentRenderer content={message.message} />
            {!userAvatar && (
              <Typography
                sx={{
                  fontSize: '0.7rem',
                  opacity: 0.3,
                }}
                align="right"
                component="small"
                title={new Date(message.created_at)}>
                {messageTime.substring(0, messageTime.indexOf(':', 3))}
              </Typography>
            )}
          </div>
        </Box>
      </Box>
    </>
  );
};
export default Message;
