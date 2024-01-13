import React from 'react'
import './topbar.css'
import { NotificationsNone, Language, Settings } from '@mui/icons-material';
import { useSelector } from 'react-redux'


const Topbar = () => {

  const admin = JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user).currentUser.isAdmin
  
  return (
    <div className='topbar'>
      <div className="topbarwrapper">
        <div className="topLeft">
          <span className='logo'>SD ADMIN</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone/>
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language/>
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Settings/>
          </div>
          <img src={admin?.img || 
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                } alt="" className='topAvater' />
        </div>
      </div>
    </div>
  )
}

export default Topbar
