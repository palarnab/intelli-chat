# intelli-chat

Intellichat is an attempt to create a react base simple supabase client. Settingup Supabase tables and realtime configuration to be done separately.

Steps:

1. Create your supabase account (https://supabase.com/dashboard)
2. Create a table with name 'your_appname_table'
3. Enable realtime in 'your_appname_table' table for INSERT
4. Design table colums like below:

   <img width="637" height="449" alt="image" src="https://github.com/user-attachments/assets/39e986e2-344f-4e0f-b9c6-aacb488d23c2" />


Next configure your react app to use intelli-chat library

## Add 3 environments in .env:

```
REACT_APP_SUPABASE_URL=<YOUR_SUPABASE_URL>
REACT_APP_SUPABASE_KEY=<YOUR_SUPABASE_KEY>
REACT_APP_SUPABASE_APP=<YOUR_SUPABASE_APP>
```

OR

```
NEXT_PUBLIC_SUPABASE_URL=<YOUR_SUPABASE_URL>
NEXT_PUBLIC_SUPABASE_KEY=<YOUR_SUPABASE_KEY>
NEXT_PUBLIC_SUPABASE_APP=<YOUR_SUPABASE_APP>
```

YOUR_SUPABASE_APP = is the name of the table you have created. This is used to partition all chat messsages for multiple apps that you might maintain.

For a single app you can use YOUR_SUPABASE_APP = 'messages' or 'chats'
Otherwise your_appname_table SHOULD BE EQUAL TO YOUR_SUPABASE_APP

## Install the following package:

```
npm i @tumbleddowntoearth/intelli-chat
```

## Import the ChatBox Component

```
import { ChatBox } from "@tumbleddowntoearth/intelli-chat";
```

OR, you can direcly import useGetMessages, send and create/style your chatbox as you need (Get help from sample `Chatbox` code in this repository, about how to create a chatbox on top of undelying supabase api calls)

```
import { useGetMessages, send } from "@tumbleddowntoearth/intelli-chat";
```

## Use the Chatbox component

```
const App = () => {
  const sender = { id: "XYZ", name: "Alice" };
  const receiver = { id: "ABC", name: "Bob" };

  return (
    <div>
      <ChatBox sender={sender} receiver={receiver} observeUserIds=['ZZZ', 'YYY'] />
    </div>
  );
};
export default App;
```

OR

## Use the useGetMessages, send libraries

```
  const sender = { id: "XYZ", name: "Alice" };
  const receiver = { id: "ABC", name: "Bob" };
  const groupId = "ABCD";
  const page = 0;

  const { activity, messages, hasMore, initialized } = useGetMessages({
    page,
    sender.id,
    receiver.id,
    groupId,
    ['ZZZ', 'YYY']
  });

  const sendMessage = async () => {
    await send({
      message: 'hello',
      conversation_id,
      sender_id: sender.id,
      receiver_id: receiver.id,
      receiver_id: receiver.id,
      group_id: USER_GROUP_ID,
    });
  }
```
