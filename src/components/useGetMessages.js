import { fetch, subscribe, unsubscribe } from '../supabase';
import { useEffect, useState } from 'react';

export default function useGetMessages(page, senderId, receiverId) {
  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const conversation_id =
    senderId > receiverId
      ? `${senderId}-${receiverId}`
      : `${receiverId}-${senderId}`;

  const dedupMessages = (items) => {
    const dedupedObject = items.reduce((acc, item) => {
      if (!acc[item.id]) {
        acc[item.id] = item;
      }
      return acc;
    }, {});

    return Object.values(dedupedObject);
  };

  const mergeMessages = (newMessages) => {
    setMessages((previousState) => {
      const collectedMessages = [...previousState, ...newMessages];
      const filtered = dedupMessages(collectedMessages);
      const sortedMessages = filtered.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at),
      );
      return sortedMessages;
    });
    setHasMore(newMessages.length > 0);
    setInitialized(true);
  };

  useEffect(() => {
    fetch((data) => mergeMessages(data), conversation_id, page);
  }, [page]);

  useEffect(() => {
    subscribe((data) => mergeMessages(data), conversation_id);
    return () => unsubscribe;
  }, []);

  if (!senderId || !receiverId) return { messages: [], hasMore: false };

  return { messages, hasMore, initialized };
}
