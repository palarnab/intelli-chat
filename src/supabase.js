import { createClient } from '@supabase/supabase-js';

// Create a single supabase client for interacting with your database
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY,
);
const appId = 'app1';

const fetch = async (setMessages, conversation_id, page = 0, perpage = 10) => {
  console.log(`GET - ${page}`);
  const start = page * perpage;
  const end = start + 10;
  const { data, error } = await supabase
    .from('messages')
    .select('id, message, receiver_id, sender_id, created_at')
    .eq('conversation_id', conversation_id)
    .eq('app_id', appId)
    .order('created_at', { ascending: false })
    .range(start, end);
  if (error) {
    console.error(error);
  } else {
    setMessages(data);
  }
};

const subscribe = (setMessages, conversation_id) => {
  supabase
    .channel('table_db_changes')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'messages' },
      () => fetch(setMessages, conversation_id),
    )
    // .on(
    //   'postgres_changes',
    //   { event: 'UPDATE', schema: 'public', table: 'messages' },
    //   () => fetch(setMessages, conversation_id),
    // )
    .subscribe((payload) => {
      if (payload === 'SUBSCRIBED') {
        fetch(setMessages, conversation_id);
      } else {
        console.log(payload);
      }
    });
};

const unsubscribe = () => {
  supabase.removeAllChannels();
};

const send = async (content) => {
  await supabase.from('messages').insert({ ...content, app_id: appId });
};

export { subscribe, unsubscribe, send, fetch };