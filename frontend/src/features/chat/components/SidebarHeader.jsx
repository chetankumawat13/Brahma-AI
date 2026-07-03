import React from 'react'

const SidebarHeader = ({ onClose }) => {
  return (
    <div className='sidebar-header'>
        <img src="/BrahmaAilogo.svg" alt="Brahma AI" />
        <button type='button' className='sidebar-close-button' onClick={onClose} aria-label='Close sidebar'>
          <i className='ri-close-line'></i>
        </button>
    </div>
  )
}

export default SidebarHeader