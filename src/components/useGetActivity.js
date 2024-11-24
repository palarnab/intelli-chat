import { useEffect, useState } from 'react';
import { watch } from '../supabase';

export default function useGetActivity(senderId, receiverIds) {
  const [activity, setActivity] = useState({});
  const [conversationIds, setConversationIds] = useState([]);

  const watcher = (payload) => {
    if (conversationIds.find((c) => c === payload.conversation_id)) {
      const notification = { ...payload };
      delete notification.conversation_id;
      setActivity(notification);
    }
  };

  useEffect(() => {
    const conversation_ids = receiverIds.map((receiverId) =>
      senderId > receiverId
        ? `${senderId}-${receiverId}`
        : `${receiverId}-${senderId}`,
    );
    setConversationIds(() => conversation_ids);
  }, [senderId, receiverIds]);

  useEffect(() => {
    watch(watcher);
  }, [conversationIds]);

  return { activity };
}
