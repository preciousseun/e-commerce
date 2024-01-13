import React from 'react'
import './widgetSm.css'
import { Visibility } from '@mui/icons-material';
import { useState, useEffect } from 'react';
import { userRequest } from '../../requetMethod';

const WidgetSm = () => {

    const [users, setUsers] = useState([])

    useEffect(() => {
        const getUsers = async () => {
            const res = await userRequest.get('/user/?new=true')
            setUsers(res.data.data)
            console.log(res.data.data)
        };
        getUsers();
    }, [])

  return (
    <div className='widgetSm'>
      <span className="widgetSmTitle">New Members</span>
      <ul className="widgetSmList">
        {users.map((user) => (
            <li className="widgetSmListItem" key={user.id}>
                <img src={user.img || 
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                    } alt="" className="widgetSmImg"/>
                <div className="widgetSmUser">
                    <span className="widgetSmUsername">{user.username}</span>
                </div>
                <button className="widgetSmButton">
                    <Visibility className="widgetSmIcon"/>
                    Display
                </button>
            </li>
        ))}
      </ul>
    </div>
  )
}

export default WidgetSm
