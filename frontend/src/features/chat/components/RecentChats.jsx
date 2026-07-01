import React from "react";
import ChatItem from "./ChatItem";

const RecentChats = () => {
  const dummyChats = [
    {
      id: 1,
      title: "Progressive Web Apps",
    },
    {
      id: 2,
      title: "React Hooks",
    },
    {
      id: 3,
      title: "MongoDB",
    },
    {
      id: 4,
      title: "Express Middleware",
    },
  ];

  return <div className="recent-chats">
        <h4>Recent</h4>
        {
            dummyChats.map(chat => (
                <ChatItem key={chat.id} chat={chat} />
            ))
        } 
  </div>;
};

export default RecentChats;
