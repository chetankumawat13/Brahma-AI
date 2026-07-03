import React from 'react'
import SidebarHeader from './SidebarHeader'
import NewChatButton from './NewChatButton'
import SearchChat from './SearchChat'
import RecentChats from './RecentChats'
import UserProfile from './UserProfile'

const SideBar = ({ isOpen, onClose }) => {
  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : ''}`}>
        <SidebarHeader onClose={onClose} />
        <NewChatButton onClose={onClose} />
        <SearchChat />
        <RecentChats onClose={onClose} />
        <UserProfile />
    </aside>
  )
}

export default SideBar