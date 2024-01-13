import React, { useEffect, useState, } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { publicRequest } from '../requestMethod'
import { mobile } from '../Responsive'
import ErrorIcon from '@mui/icons-material/Error';
import { useDispatch, useSelector } from 'react-redux'
import { useMutation } from 'react-query'
import { signUpUser } from '../redux/authRedux'
import { clearMessage } from '../redux/message'




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

const Register = () => {

    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [loading, setLoading] = useState(false)

    const handleFisrtName = (e) => {
        setFirstName(e.target.value)
    }
    const handleLastName = (e) => {
        setLastName(e.target.value)
    }
    const handleUsername = (e) => {
        setUsername(e.target.value.toLowerCase())
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handleAddress = (e) => {
        setAddress(e.target.value)
    }
    const handlePassword = (e) => {
        setPassword(e.target.value)
    }


    // load your store
    // const { message } = useSelector((state) => state.message)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearMessage())
    }, [dispatch])

    // console.log(message)
    
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

    const onSubmitHandler = values => {
        // ? Execute the Mutation

        registerUser(values)
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        // const signin = {
        //     firstName: `${firstName}`,
        //     lastName: `${lastName}`,
        //     username: `${username}`,
        //     email: `${email}`,
        //     address: `${address}`,
        //     password: `${password}`,
        // }
        // setLoading(true)
        // publicRequest.post('/auth/register', signin)
        // .then(res => {
        //   if (res.data.success === true) {
        //     res.data && window.location.replace("/login") 
        //   } else {
        //     setErrorMsg(res.data.message)
        //   }
        //   setLoading(false)
        // })

    

    }


  return (
    <Container>
      <Wrapper>
            <Title>CREATE ACCOUNT</Title>
            <Form onSubmit={handleSubmit(onSubmitHandler)}>
            {/* {!isSuccess && <p>{data}</p>}
            {message && (
                <ErrorContainer>
                    <ErrorBox>
                        <ErrorText><ErrorIcon style={{color: "#ff0000", marginRight: "10px", fontSize: "14px"}}/>{message}</ErrorText>
                    </ErrorBox>
                </ErrorContainer>
            )} */}
                <InputWrapper>
                    <Input placeholder='First Name' type="text" onChange={handleFisrtName}/>
                </InputWrapper>
                <InputWrapper>
                    <Input placeholder='Last Name' type="text" onChange={handleLastName}/>
                </InputWrapper>
                <InputWrapper>
                    <Input placeholder='Username' type="text" onChange={handleUsername}/>
                </InputWrapper>
                <InputWrapper>
                    <Input placeholder='Email' type="email" onChange={handleEmail}/>
                </InputWrapper>
                <InputWrapper>
                    <Input placeholder='Address' type="text" onChange={handleAddress}/>
                </InputWrapper>
                <InputWrapper>
                    <Input placeholder='Password' type="password" onChange={handlePassword}/>
                </InputWrapper>
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

export default Register
