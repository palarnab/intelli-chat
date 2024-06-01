# intelli-chat

Intellichat is an attempt to create a react base simple supabase client. Settingup Supabase tables and realtime configuration to be done separately.

Steps:
1. Create your supabase account
2. Create a table names 'messages'
3. Enable realtime in 'messages' table for INSERT
4. Design table colums like below:

   ![image](https://github.com/palarnab/intelli-chat/assets/39365010/4dcfd824-3b20-4d64-b359-bdd6475490c1)


Next configure your react app to use intelli-chat library

## Add 2 environments in .env:

```
REACT_APP_SUPABASE_URL=<YOUR_SUPABASE_URL>
REACT_APP_SUPABASE_KEY=<YOUR_SUPABASE_KEY>
```

## Install the following package:

```
npm i @tumbleddowntoearth/intelli-chat@0.0.2-a-beta
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
