import React, { useEffect, useState, } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { mobile, tablet, x, xr } from '../Responsive'
import ErrorIcon from '@mui/icons-material/Error';
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { object, string } from 'zod'
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import { signUpUser } from '../redux/authRedux'
import { clearMessage } from '../redux/message'
import { FiEye } from 'react-icons/fi'
import { FiEyeOff } from 'react-icons/fi'




const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url("https://images.ctfassets.net/rxqefefl3t5b/6I2vL9f0IVsDQ8qFgdrxH7/7660c4bab3116a4a04025d5c4802efa5/Virgin-Red-online-shopping-offers.jpg");
    display: flex;
    justify-content: center;
    align-items: center;
`
const Wrapper = styled.div`
    width: 400px;
    padding: 20px;
    background-color: #f5f5f5;
    ${mobile({ width: "75%" })}
    ${tablet({ width: "75%" })}

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
    background-color: transparent;
    border: none;
    border-bottom: 1px solid lightgray;
    outline: none;
    &:focus{
        border-bottom: 1px solid gray;
    }
`

const Agreement = styled.div`
    font-size: 12px;
    margin: 20px 0px;
`
const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: #d5bea2;
    color: #222;
    cursor: pointer;

    &:disabled{
        background-color: gray;
        color: #fff;
        cursor: not-allowed;
    }
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

const LinkWrapper = styled.div`
    margin: 20px 0px;
    ${mobile({ fontSize: "14px" })}
`

const LinkCreate = styled.span`
    cursor: pointer;
    

    &:hover{
        text-decoration: underline;
    }
`
const Links = styled.a``

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
const registerSchema = object({
    firstName: string().min(1, 'First name is required').max(100),
    lastName: string().min(1, 'Last name is required').max(100),
    username: string().min(1, 'Username is required').max(20).trim(),
    email: string()
        .min(1, 'Email address is required')
        .email('Email Address is invalid'),
    phoneNumber: string()
        .min(1, 'Phone number is required')
        .min(11, 'Phone number must be 11 characters').max(11),
    address: string()
        .min(1, 'Address is required'),
    password: string()
        .min(1, 'Password is required')
        .min(8, 'Password must be more than 8 characters')
        .max(32, 'Password must be less than 32 characters'),
})

const Registration = () => {


    // load your store
    const { message } = useSelector((state) => state.message)
    const dispatch = useDispatch()
    const [isVisible, setIsvisible] = useState(false)

    useEffect(() => {
        dispatch(clearMessage())
    }, [dispatch])

    const toggle = () => {
        setIsvisible(!isVisible)
    }

    
        // dispatch a register user to the backend
        const {
            mutate: registerUser,
            data,
            isSuccess,
            isLoading,
        } = useMutation(userData => dispatch(signUpUser(userData)), {
            onMutate() {},
            onSuccess() {},
            onError(error) {
                console.log(error)
            },
        })
        const {
            register,
            handleSubmit,
            formState: { errors },
        } = useForm({
            resolver: zodResolver(registerSchema),
        })
        useEffect(() => {
            if (data) {
                console.log(data)
            }
        }, [data])
    
        const onSubmitHandler = values => {
            // ? Execute the Mutation
    
            registerUser(values)

            // window.location.replace('/login')
        }


  return (
    <Container>
      <Wrapper>
            <Title>CREATE ACCOUNT</Title>
            <Form onSubmit={handleSubmit(onSubmitHandler)}>
            {!isSuccess && <p>{data}</p>}
            {message && (
                <ErrorContainer>
                    <ErrorBox>
                        <ErrorText><ErrorIcon style={{color: "#ff0000", marginRight: "10px", fontSize: "14px"}}/>{message}</ErrorText>
                    </ErrorBox>
                </ErrorContainer>
            )}
                <InputWrapper>
                    <Input placeholder='First Name' type="text" {...register('firstName')}/>
                </InputWrapper>
                {errors.firstName && (
                    <ErrorMsg>
                        {errors.firstName.message}
                    </ErrorMsg>
                )}
                <InputWrapper>
                    <Input placeholder='Last Name' type="text" {...register('lastName')}/>
                </InputWrapper>
                {errors.lastName && (
                    <ErrorMsg>
                        {errors.lastName.message}
                    </ErrorMsg>
                )}
                <InputWrapper>
                    <Input placeholder='Username' type="text" {...register('username')}/>
                </InputWrapper>
                {errors.username && (
                    <ErrorMsg>
                        {errors.username.message}
                    </ErrorMsg>
                )}
                <InputWrapper>
                    <Input placeholder='Email' type="email" {...register('email')}/>
                </InputWrapper>
                {errors.email && (
                    <ErrorMsg>
                        {errors.email.message}
                    </ErrorMsg>
                )}
                <InputWrapper>
                    <Input placeholder='Phone number' type="number" {...register('phoneNumber')}/>
                </InputWrapper>
                {errors.phoneNumber && (
                    <ErrorMsg>
                        {errors.phoneNumber.message}
                    </ErrorMsg>
                )}
                <InputWrapper>
                    <Input placeholder='Address' type="text" {...register('address')}/>
                </InputWrapper>
                {errors.address && (
                    <ErrorMsg>
                        {errors.address.message}
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
                {/* <InputWrapper>
                    <Input placeholder='Confirm Password' />
                </InputWrapper> */}
                <Agreement>By creating an account, you agree to providing your information to SD-SHOP</Agreement>
                <Button disabled={isLoading}>CREATE</Button>
                <LinkWrapper style={{display: 'flex', justifyContent: 'center'}}>
                    <Links>Already own an account?
                        <LinkCreate style={{color: "#1f50bb"}}> <Link className="link" to="/login">Sign In</Link></LinkCreate>
                    </Links>
                </LinkWrapper>
            </Form>
      </Wrapper>
    </Container>
  )
}

export default Registration
