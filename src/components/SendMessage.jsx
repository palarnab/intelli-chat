import { Box, Button, TextField as TextInput } from '@mui/material';
import React, { useState } from 'react';

import EmojiPicker from 'emoji-picker-react';
import { send } from '../supabase';

const SendMessage = ({ sender, receiver, scrollIntoView }) => {
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const conversation_id =
      sender.id > receiver.id
        ? `${sender.id}-${receiver.id}`
        : `${receiver.id}-${sender.id}`;

    if (text.trim() === '') {
      alert('Enter valid message');
      return;
    }

    setLoading(true);
    await send({
      message: text,
      metadata: '{"foo": "bar"}',
      conversation_id,
      sender_id: sender.id,
      receiver_id: receiver.id,
    });

    setText('');
    scrollIntoView();
    setLoading(false);
  };

  const emojiSelected = (e) => {
    setText((t) => t + e.emoji);
  };

  return (
    <Box mt={4} mb={1}>
      <form onSubmit={handleSubmit}>
        <TextInput
          disabled={loading}
          label="Send message"
          size="small"
          fullWidth
          multiline
          value={text}
          onChange={(event) => setText(event.target.value)}
          rows={2}
        />
        <Box display="flex" justifyContent="space-between" mt={1}>
          <span>
            <EmojiPicker
              style={{ position: 'absolute' }}
              allowExpandReactions={false}
              searchDisabled={true}
              reactionsDefaultOpen={true}
              open={true}
              autoFocusSearch={false}
              onReactionClick={emojiSelected}
            />
          </span>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={!text || loading || text.length === 0}>
            Send
          </Button>
        </Box>
      </form>
    </Box>
  );
};

export default SendMessage;
