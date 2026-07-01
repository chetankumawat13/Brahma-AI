import React from 'react'
import SidebarHeader from './SidebarHeader'
import NewChatButton from './NewChatButton'
import SearchChat from './SearchChat'
import RecentChats from './RecentChats'
import UserProfile from './UserProfile'

const SideBar = () => {
  return (
    <aside className='sidebar'>
        <SidebarHeader />
        <NewChatButton />
        <SearchChat />
        <RecentChats />
        <UserProfile />
    </aside>
  )
}

export default SideBar