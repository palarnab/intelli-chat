import { watch, fetch, subscribe, unsubscribe } from '../supabase';
import { useEffect, useState } from 'react';

export default function useGetMessages({
  page,
  senderId,
  receiverId,
  groupId,
  observerIds,
}) {
  const [messages, setMessages] = useState([]);
  const [hasMore, setHasMore] = useState(false);
  const [activity, setActivity] = useState({});
  const [conversationId, setConversationId] = useState([]);
  const [conversationIds, setConversationIds] = useState([]);
  const [initialized, setInitialized] = useState(false);

  const createCoversationId = (senderId, receiverId, groupId) => {
    const conversation_id =
      senderId > receiverId
        ? `${senderId}-${receiverId}`
        : `${receiverId}-${senderId}`;

    if (groupId !== undefined) {
      receiverId = 'GROUP';
      conversation_id = groupId;
    }

    return conversation_id;
  };

  const dedupMessages = (items) => {
    const dedupedObject = items.reduce((acc, item) => {
      if (!acc[item.id]) {
        acc[item.id] = item;
      }
      return acc;
    }, {});

    return Object.values(dedupedObject);
  };

  const watcher = (payload) => {
    if (conversationIds.find((c) => c === payload.conversation_id)) {
      const notification = { ...payload };
      delete notification.conversation_id;
      setActivity(notification);
    }
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
    fetch((data) => mergeMessages(data), conversationId, page);
  }, [page]);

  useEffect(() => {
    if (!receiverId) {
      receiverId = senderId;
    }

    const conversation_id = createCoversationId(senderId, receiverId, groupId);
    setConversationId(conversation_id);

    const conversation_ids = observerIds.map((receiverId) =>
      groupId !== undefined
        ? receiverId
        : senderId > receiverId
        ? `${senderId}-${receiverId}`
        : `${receiverId}-${senderId}`,
    );
    setConversationIds(() => conversation_ids);

    setMessages([]);
    subscribe((data) => mergeMessages(data), conversation_id);
    watch(watcher);
    return () => unsubscribe;
  }, [senderId, receiverId, observerIds]);

  if (!senderId) return { messages: [], hasMore: false };

  return { activity, messages, hasMore, initialized };
}
