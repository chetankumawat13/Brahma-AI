import { createContext, useState } from "react";

export const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messagesByChat, setMessagesByChat] = useState({});
  const [loadingChats, setLoadingChats] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(false);
  const [sending, setSending] = useState(false);
  const [streaming, setStreaming] = useState(false);

  return (
    <ChatContext.Provider
      value={{
        chats,
        setChats,
        currentChat,
        setCurrentChat,
        messagesByChat,
        setMessagesByChat,
        loadingChats,
        setLoadingChats,
        loadingMessages,
        setLoadingMessages,
        sending,
        setSending,
        streaming,
        setStreaming
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
