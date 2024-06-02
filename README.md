# intelli-chat

Intellichat is an attempt to create a react base simple supabase client. Settingup Supabase tables and realtime configuration to be done separately.

Steps:

1. Create your supabase account
2. Create a table with name 'your_appname_table'
3. Enable realtime in 'your_appname_table' table for INSERT
4. Design table colums like below:
   ![image](https://github.com/palarnab/intelli-chat/assets/39365010/5c4c0990-40e6-436c-bbbc-20e8786e290c)


Next configure your react app to use intelli-chat library

## Add 2 environments in .env:

```
REACT_APP_SUPABASE_URL=<YOUR_SUPABASE_URL>
REACT_APP_SUPABASE_KEY=<YOUR_SUPABASE_KEY>
REACT_APP_SUPABASE_APP=<YOUR_SUPABASE_APP>
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

## Use the Chatbox component

```
const App = () => {
  const sender = { id: "XYZ", name: "Alice" };
  const receiver = { id: "ABC", name: "Bob" };

  return (
    <div>
      <ChatBox sender={sender} receiver={receiver} />
    </div>
  );
};
export default App;
```
