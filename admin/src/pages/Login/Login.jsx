import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './login.css'
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../../redux/apiCalls'
import ErrorIcon from '@mui/icons-material/Error';


export default function Login() {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [err, setErr] = useState("")
    const dispatch = useDispatch()
    const  { isFetching, error } = useSelector((state) => state.user);



    const handleUsername = (e) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }
    
  
    const handleSubmit = async (e) => {
      e.preventDefault()
        login(dispatch, {username, password})
        setErr(error)
    };
    
  return (
    <div className='login'>
    <div className='formContainer'>
        <div className='wrapper'>
            <h4 className='title'>SD-ADMIN</h4>
            <hr />
            <div>
                <form>
                {err && 
                    <div className='errorContainer'>
                        <div className='errorBox'>
                            <h4 className='errorText'><ErrorIcon style={{color: "#ff0000", marginRight: "10px", fontSize: "14px"}}/>Oops! Your credentials did not match our records</h4>
                        </div>
                    </div>
                }
                    <div className="inputWrapper">
                        <input 
                        className="formInput" 
                        type="text"   
                        placeholder="Username" 
                        required
                        onChange={handleUsername}
                        />
                    </div>

                    <div className="inputWrapper">
                        <input 
                        className="formInput" 
                        type="password"   
                        placeholder="Password" 
                        required
                        onChange={handlePassword}
                        />
                    </div>                                   
                    <button onClick={handleSubmit} disabled={isFetching} className='loginButton'>
                        Sign In 
                    </button>
                    {/* <p className='text-center'>
                        Don't have an account? 
                        <button className='regBtn'>
                            <Link className='link ms-1' to='/register'>
                                Sign Up
                            </Link>
                        </button>
                    </p> */}
                </form>
            </div>
        </div>      
    </div>
    </div>
  )
}

