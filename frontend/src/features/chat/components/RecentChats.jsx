import React from "react";
import ChatItem from "./ChatItem";
import { useChat } from "../hooks/useChat";

const RecentChats = () => {


  const {chats,loadingChats} = useChat()

  if(loadingChats){
      return (
         <h4>Loading</h4>
      )
  }


  return <div className="recent-chats">
        <h4>Recents</h4>
        {
            chats.map(chat => (
                <ChatItem key={chat._id} chat={chat} />
            ))
        } 
  </div>;
};

export default RecentChats;
