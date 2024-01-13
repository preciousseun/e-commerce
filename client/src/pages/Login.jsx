import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { mobile, tablet, xr } from '../Responsive'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import ErrorIcon from '@mui/icons-material/Error';
import { publicRequest } from '../requestMethod';
import { loginFailure, loginStart, loginSuccess } from '../redux/userRedux';
import { CircularProgress } from '@mui/material';
import { object, string } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useMutation } from 'react-query'
import { loginUser } from '../redux/authRedux'
import { clearMessage } from '../redux/message'
import { FiEye } from 'react-icons/fi'
import { FiEyeOff } from 'react-icons/fi'



const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), 
    url("https://cdn.searchenginejournal.com/wp-content/uploads/2022/08/google-shopping-ads-6304dccb7a49e-sej.png");
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
`
const Wrapper = styled.div`
    width: 400px;
    padding: 20px;
    background-color: #f5f5f5;
    ${mobile({ width: "75%" })}
`

const Title = styled.h1`
    display: flex;
    justify-content: center;
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 10px;
`
const Form = styled.form`

`
const InputWrapper = styled.div`
    display: flex;
    justify-content: center;
    padding: 10px;
`
const Input = styled.input`
    width: 100%;
    padding: 6px;
    font-size: 16px;
    background-color: transparent;
    border: none;
    border-bottom: 1px solid lightgray;
    outline: none;
    &:focus{
        border-bottom: 1px solid gray;
    }
`
const Button = styled.button`
    width: 40%;
    margin-top: 7px;
    border: none;
    padding: 15px 20px;
    background-color: #d5bea2;
    color: #222;
    cursor: pointer;

    /* &:disabled{
        background-color: gray;
        color: #fff;
        cursor: not-allowed;
    } */
`
const LinkWrapperPassword = styled.div`
    margin: 6px 0px;
    cursor: pointer;
    ${mobile({ fontSize: "14px" })}

`
const LinkWrapper = styled.div`
    margin: 20px 0px;
    ${mobile({ fontSize: "14px" })}
`
const Links = styled.a``

const LinkCreate = styled.span`
    cursor: pointer;
    

    &:hover{
        text-decoration: underline;
    }
`

const ErrorContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const ErrorBox = styled.div`
    width: 300px;
    height: 30px;
    padding: 10px;
    background: rgb(240, 199, 199);
    border: 1px solid #ff0000;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const ErrorText = styled.h4`
    display: flex;
    align-items: center;
    text-align: center;
    color: #ff0000;
    font-weight: 500;
    font-size: 14px;
`

const ErrorMsg = styled.span`
    color: red;
    font-size: 12px;
    display: block;
    padding-left: 18px;
`

const PasswordIcon = styled.span`
    position: absolute;
    // top: 0px;
    // bottom: 0px;
    // right: 0px;
    padding-right: 1px;
    display: flex;
    align-items: center;
    cursor: pointer;
    // ${tablet({ top: "59%", right: "16%" })}
    // ${xr({ top: "55%", right: "19%" })}
`

// form validation schema
const loginSchema = object({
    username: string()
        .min(1, 'Username is required'),
    password: string()
        .min(1, 'Password is required')
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
})

const Login = () => {

    // const [username, setUsername] = useState("");
    // const [password, setPassword] = useState("");
    // const [errorMsg, setErrorMsg] = useState("")
    // const dispatch = useDispatch();
    // const  { isFetching, error } = useSelector((state) => state.user);



    // const handleUsername = (e) => {
    //     setUsername(e.target.value)
    // }

    // const handlePassword = (e) => {
    //     setPassword(e.target.value)
    // }
  
    // const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   const login = async () => {
    //     dispatch(loginStart());
    //     try {
    //       const res = await publicRequest.post("/auth/login", {
    //         username,
    //         password
    //       });
    //       setErrorMsg(res.data.message)
    //       dispatch(loginSuccess(res.data.data));
    //     } catch (err) {
    //       dispatch(loginFailure());
    //     }
    //   };
    //   login();
    // };
 

    const navigate = useNavigate()
    const dispatch = useDispatch()
    // const { isLoggedIn } = useSelector(state => state.auth)
    const { message } = useSelector(state => state.message)
    const [isVisible, setIsvisible] = useState(false)

    const toggle = () => {
        setIsvisible(!isVisible)
    }

    useEffect(() => {
        dispatch(clearMessage())
    }, [dispatch])

    const from = '/'

    // Api login Mutation
    const {
        mutate: signinUser,
        isLoading,
        data,
    } = useMutation(userData =>
        dispatch(loginUser(userData))
            .unwrap()
            .then(() => {
                navigate(from)
            })
            .catch(() => {}),
    )

    const {
        reset,
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    })

    useEffect(() => {
        if (data) {
            reset()
        }
    }, [data])

    const onSubmitHandler = values => {
        signinUser(values)
    }

    // if (isLoggedIn) {
    //     return <Navigate to="/" />
    // }
    

  return (
    <Container>
    <Wrapper>
          <Title>SIGN IN</Title> 
          <Form onSubmit={handleSubmit(onSubmitHandler)}>
          {message && <ErrorContainer>
                <ErrorBox>
                    <ErrorText><ErrorIcon style={{color: "#ff0000", marginRight: "10px", fontSize: "14px"}}/>{message}</ErrorText>
                </ErrorBox>
            </ErrorContainer>}
              <InputWrapper>
                  <Input placeholder='Username' {...register('username')} />
              </InputWrapper>
              {errors.username && (
                    <ErrorMsg>
                        {errors.username.message}
                    </ErrorMsg>
                )}
              <InputWrapper>
                  <Input placeholder='Password' type={!isVisible ? 'password' : 'text'} {...register('password')}/>
                  <PasswordIcon onClick={toggle}>
                        {isVisible ? <FiEye /> : <FiEyeOff />}
                    </PasswordIcon>
              </InputWrapper>
              {errors.password && (
                    <ErrorMsg>
                        {errors.password.message}
                    </ErrorMsg>
                )}
              <LinkWrapperPassword >
                <Links style={{float: 'right', color: '#1f50bb'}}>Forgot Password</Links>
              </LinkWrapperPassword>
              <br />
              <Button disabled={isLoading}>
                {isLoading ? (
                    <CircularProgress size={22} color="inherit" className="mt-1"/>
                )  : ( 
                    "Sign In" 
                )}
              </Button>
              <LinkWrapper style={{display: 'flex', justifyContent: 'center'}}>
                <Links>Don't have an account?<LinkCreate style={{color: '#1f50bb'}}> <Link to="/register" className="link">Create Account</Link></LinkCreate></Links>
              </LinkWrapper>
          </Form>
    </Wrapper>
  </Container>
  )
}

export default Login
