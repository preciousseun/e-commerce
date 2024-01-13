import { PermIdentity, CalendarToday, PhoneAndroid, MailOutline, LocationSearching, Publish } from '@mui/icons-material'
import React from 'react'
import './user.css'
import { Link } from 'react-router-dom'



const User = () => {
  return (
    <div className='user'>
      <div className="userTitleContainer">
        <h1 className='userTitle'>Edit User</h1>
        <Link to="/newUser">
            <button className="userAddButton">Create</button>
        </Link>
      </div>
      <div className="userContainer">
        <div className="userShow">
            <div className="userShowTop">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXWWLQ85k0UHQ7Epo8pHUsBxTJCnDyayQ1lg&usqp=CAU" 
                alt="" 
                className="userShowImg" 
                />
                <div className="userShowTopTitle">
                    <span className="userShowUsername">Anna Carol</span>
                    <span className="userShowUserTitle">Software Engineer</span>
                </div>
            </div>
            <div className="userShowBottom">
                <span className="userShowTitle">Account Details</span>
                <div className="userShowInfo">
                    <PermIdentity className='userShowIcon'/>
                    <span className="userShowInfoTitle">annacarol94</span>
                </div>
                <div className="userShowInfo">
                    <CalendarToday className='userShowIcon'/>
                    <span className="userShowInfoTitle">6.10.1999</span>
                </div>
                <span className="userShowTitle">Contact Details</span>
                <div className="userShowInfo">
                    <PhoneAndroid className='userShowIcon'/>
                    <span className="userShowInfoTitle">+234 814-601-4795</span>
                </div>
                <div className="userShowInfo">
                    <MailOutline className='userShowIcon'/>
                    <span className="userShowInfoTitle">annacarol94@gmail.com</span>
                </div>
                <div className="userShowInfo">
                    <LocationSearching className='userShowIcon'/>
                    <span className="userShowInfoTitle">Lagos | Nigeria</span>
                </div>
            </div>
        </div>
        <div className="userUpdate">
            <span className="userUpdateTitle">Edit</span>
            <form className="userUpadteForm">
                <div className="userUpdateLeft">
                    <div className="userUpdateItem">
                        <label>Username</label>
                        <input type="text" 
                        placeholder='annacarol94' 
                        className='userUpdateInput' 
                        />
                    </div>
                    <div className="userUpdateItem">
                        <label>Full Name</label>
                        <input type="text" 
                        placeholder='Anna Carol' 
                        className='userUpdateInput' 
                        />
                    </div>
                    <div className="userUpdateItem">
                        <label>Email</label>
                        <input type="email" 
                        placeholder='annacarol94@gmail.com' 
                        className='userUpdateInput' 
                        />
                    </div>
                    <div className="userUpdateItem">
                        <label>Phone Number</label>
                        <input type="text" 
                        placeholder='+234 814-601-4795' 
                        className='userUpdateInput' 
                        />
                    </div>
                    <div className="userUpdateItem">
                        <label>Address</label>
                        <input type="text" 
                        placeholder='Lagos | Nigeria' 
                        className='userUpdateInput' 
                        />
                    </div>
                </div>
                <div className="userUpdateRight">
                    <div className="userUpadteUpload">
                        <img className='userUpdateImg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXWWLQ85k0UHQ7Epo8pHUsBxTJCnDyayQ1lg&usqp=CAU" 
                        alt=""
                        />
                        <label htmlFor='file'>
                            <Publish className="userUpdateIcon" />
                        </label>
                        <input type="file" id="file" style={{display: "none"}}/>
                    </div>
                    <button className="userUpdateButton">Update</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}

export default User
