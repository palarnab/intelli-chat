import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY || process.env.NEXT_PUBLIC_SUPABASE_KEY,
);
const collection =
  process.env.REACT_APP_SUPABASE_APP || process.env.NEXT_PUBLIC_SUPABASE_APP;

let channel = undefined;
let notifyEvent = () => {};

const fetch = async (setMessages, conversation_id, page = 0, perpage = 10) => {
  const start = page * perpage;
  const end = start + 10;
  const { data, error } = await supabase
    .from(collection)
    .select(
      'id, message, metadata, receiver_id, sender_id, group_id, created_at',
    )
    .eq('conversation_id', conversation_id)
    .order('created_at', { ascending: false })
    .range(start, end);
  if (error) {
    console.error(error);
  } else {
    setMessages(data);
  }
};

const subscribe = (setMessages, conversation_id) => {
  if (channel) {
    supabase.removeChannel(channel);
  }
  channel = supabase
    .channel('table_db_changes')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: collection },
      (payload) => {
        if (payload.new) {
          notifyEvent(payload.new);
          if (payload.new.conversation_id === conversation_id)
            fetch(setMessages, conversation_id);
        }
      },
    )
    .subscribe((payload) => {
      if (payload === 'SUBSCRIBED') {
        fetch(setMessages, conversation_id);
      } else {
        // console.log(payload);
      }
    });
};

const unsubscribe = () => {
  supabase.removeAllChannels();
};

const sendMessage = async (content) => {
  await supabase.from(collection).insert({ ...content });
};

const send = async (content) => {
  let { sender_id, receiver_id, group_id } = { ...content };

  let conversation_id =
    sender_id > receiver_id
      ? `${sender_id}-${receiver_id}`
      : `${receiver_id}-${sender_id}`;

  if (group_id !== undefined) {
    receiver_id = 'GROUP';
    conversation_id = group_id;
  }

  await sendMessage({
    ...content,
    sender_id,
    receiver_id,
    group_id,
    conversation_id,
  });
};

const watch = async (watcher) => {
  notifyEvent = watcher;
};

export { subscribe, unsubscribe, send, fetch, watch };
