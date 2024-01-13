import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import styled from 'styled-components'
import { mobile } from '../Responsive'
import { PermIdentity, PhoneAndroid, MailOutline, LocationSearching, CameraAlt, Error } from '@mui/icons-material'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import app from '../firebase'
import { updateUsers } from '../redux/apiCalls'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateUserStart, updateUserSuccess, updateUserFailure } from '../redux/userRedux'
import { userRequest } from '../requestMethod'
import { CircularProgress } from '@mui/material'


const Container = styled.div``
const Wrapper = styled.div`
    margin-top: 10px;
    padding: 20px 50px;
    ${mobile({ padding: "10px", })}
`
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: 2px solid #222;
    background-color: #d5bea2;
    color: #222;
    margin-bottom: 30px;
`
const UserContainer = styled.div`
    display: flex;
    ${mobile({ flexDirection: 'column' })}
`
const UserShow = styled.div`
    flex: 4;
    padding: 20px;
    box-shadow: 0px 0px 9px -6px rgba(0,0,0,0.75);
-webkit-box-shadow: 0px 0px 9px -6px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 9px -6px rgba(0,0,0,0.75);
`
const UserShowTop = styled.div`
    display: flex;
    align-items: center;
`
const UserShowImg =styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
`

const UserShowTopTitle =styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 20px;
`

const UserShowUsername = styled.span`
    font-weight: 600;
`
const UserShowUserTitle = styled.span`
    font-weight: 300;
`
const UserShowBottom = styled.div`
    margin-top: 20px;
`
const UserShowTitle = styled.span`
    font-size: 14px;
    font-weight: 600;
    color: rgb(175, 170,170);
`
const UserShowDeets = styled.div`
    display: flex;
    align-items: center;
    margin: 20px 0px;
    color: #444;
`
const UserShowInfoTitle = styled.span`
    margin-left: 10px;
`

const UserUpdate = styled.div`
    flex: 8;
    padding: 20px;
    box-shadow: 0px 0px 9px -6px rgba(0,0,0,0.75);
-webkit-box-shadow: 0px 0px 9px -6px rgba(0,0,0,0.75);
-moz-box-shadow: 0px 0px 9px -6px rgba(0,0,0,0.75);
    margin-left: 20px;
    ${mobile({ marginLeft: '0px', marginTop: "19px" })}
`
const UserUpdateTitle = styled.div`
    font-size: 24px;
    font-weight: 600;
`
const UserUpdateForm = styled.form`
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
    ${mobile({ flexDirection: 'column', justifyContent: "none" })}
`
const UserUpdateLeft = styled.div``

const UserUpdateItem = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 10px;
`
const UserUpdateLabel = styled.label`
    font-size: 18px;
    margin-bottom: 5px;
`

const UserUpdateInput = styled.input`
    border: none;
    width: 250px;
    height: 30px;
    border-bottom: 1px solid lightgray;
    outline: none;
`
const UserUpdateRight = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
`
const UserUpdateRightMobile = styled.div`
    display: none;
    ${mobile({ display: "flex", justifyContent: "flex-end" })}
`

const UserUpdateUpload = styled.div`
    display: flex;
    align-items: center;
    ${mobile({ display: "none" })}
`
const UserUpdateUploadMobile = styled.div`
    display: flex;
    align-items: center;
`
const UserUpdateImg = styled.img`
    height: 100px;
    width: 100px;
    border-radius: 10px;
    margin-right: 10px;
    object-fit: cover;
`
const UserUpdateButton = styled.button`
    font-size: 16px;
    padding: 7px;
    border: 2px solid #222;
    background-color: #d5bea2;
    color: #222;
    cursor: pointer;
    ${mobile({ marginTop: "50px" })}

    &:disabled{
        background-color: gray;
        color: #fff;
        cursor: not-allowed;
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
const SuccessContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
`

const SuccessBox = styled.div`
    width: 300px;
    height: 30px;
    padding: 10px;
    background: lightgray;
    border: 1px solid green;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
`

const SuccessText = styled.h4`
    display: flex;
    align-items: center;
    text-align: center;
    color: green;
    font-weight: 500;
    font-size: 14px;
`


const UpdateUser = () => {

    const dispatch = useDispatch()
    const user = useSelector((state) => state.user.currentUser)
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [phoneNumber, setPhoneNumber] = useState("")
    const [address, setAddress] = useState("")
    const [file, setFile] = useState(null)
    const [errorMsg, setErrorMsg] = useState("")
    const [successMsg, setSuccessMsg] = useState("")
    const [loading, setLoading] = useState(false)
    const  { isFetching, error } = useSelector((state) => state.user);
    const  currentUserId = useSelector((state) => state.user.currentUser._id);

    const handleFirstName = (e) => {
        setFirstName(e.target.value)
    }
    const handleLastName = (e) => {
        setLastName(e.target.value)
    }
    const handleUsername = (e) => {
        setUsername(e.target.value)
    }
    const handleEmail = (e) => {
        setEmail(e.target.value)
    }
    const handlePhoneNumber = (e) => {
        setPhoneNumber(e.target.value)
    }
    const handleAddress = (e) => {
        setAddress(e.target.value)
    }
    const handleFile = (e) => {
        setFile(e.target.files[0])
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app)
        const storageRef = ref(storage, fileName)
        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        setLoading(true)
        uploadTask.on('state_changed', 
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
            case 'paused':
                console.log('Upload is paused');
                break;
            case 'running':
                console.log('Upload is running');
                break;
                default:
            }
        }, 
        (error) => {
            // Handle unsuccessful uploads
        }, 
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
             const updatedUser = {firstName, lastName, username, email, phoneNumber, address, img: downloadURL};
                const updateUsers = async () => {
                    dispatch(updateUserStart());
                    try{
                        const res = await userRequest.put(`/user/${currentUserId}`, updatedUser)
                        dispatch(updateUserSuccess(res.data.data));
                        if(res.data.success === true){
                            setSuccessMsg(res.data.message)
                            setLoading(false)
                        }else {
                            setErrorMsg(res.data.message)
                            setLoading(false)
                        }
                        
                    }catch(err){
                        dispatch(updateUserFailure());
                    };
                };
                updateUsers();
            });
        }
        );
    }

  return (
    <Container>
        <Navbar />
        <Wrapper>
        <Link to="/" className='link'>
            <TopButton>CONTINUE SHOPPING</TopButton>
        </Link>
        <UserContainer>
            <UserShow>
                <UserShowTop>
                    <UserShowImg src={user?.img || 
                            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                        } alt=""  
                    />
                    <UserShowTopTitle>
                        <UserShowUsername>{user?.firstName}</UserShowUsername>
                        <UserShowUserTitle>{user?.lastName}</UserShowUserTitle>
                    </UserShowTopTitle>
                </UserShowTop>
                <UserShowBottom>
                    <UserShowTitle>Account Details</UserShowTitle>
                    <UserShowDeets>
                        <PermIdentity style={{fontSize: '16px'}}/>
                        <UserShowInfoTitle>{user?.username}</UserShowInfoTitle>
                    </UserShowDeets>
                    <UserShowInfoTitle>Contact Details</UserShowInfoTitle>
                    <UserShowDeets>
                        <PhoneAndroid style={{fontSize: '16px'}}/>
                        <UserShowInfoTitle>{user?.phoneNumber}</UserShowInfoTitle>
                    </UserShowDeets>
                    <UserShowDeets>
                        <MailOutline style={{fontSize: '16px'}}/>
                        <UserShowInfoTitle>{user?.email}</UserShowInfoTitle>
                    </UserShowDeets>
                    <UserShowDeets>
                        <LocationSearching style={{fontSize: '16px'}}/>
                        <UserShowInfoTitle>{user?.address}</UserShowInfoTitle>
                    </UserShowDeets>
                </UserShowBottom>
            </UserShow>
            <UserUpdate>
                <UserUpdateTitle>Edit</UserUpdateTitle>
                <UserUpdateForm>
                    <UserUpdateRightMobile>
                        <UserUpdateUploadMobile>
                            <UserUpdateImg src={file ? URL.createObjectURL(file) : user?.img || 
                                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                                } 
                                alt=""
                            />
                            <UserUpdateLabel htmlFor='file'>
                                <CameraAlt style={{cursor: 'pointer'}}/>
                            </UserUpdateLabel>
                            <UserUpdateInput type="file" id="file" style={{display: "none"}} onChange={handleFile}/>
                        </UserUpdateUploadMobile>
                    </UserUpdateRightMobile>
                    <UserUpdateLeft>
                        {errorMsg ? ( 
                            <ErrorContainer>
                                <ErrorBox>
                                    <ErrorText><Error style={{color: "#ff0000", marginRight: "10px", fontSize: "14px"}}/>{errorMsg}</ErrorText>
                                </ErrorBox>
                            </ErrorContainer>
                            ) : (
                            successMsg &&    
                                <SuccessContainer>
                                    <SuccessBox>
                                        <SuccessText><Error style={{color: "green", marginRight: "10px", fontSize: "14px"}}/>{successMsg}</SuccessText>
                                    </SuccessBox>
                                 </SuccessContainer> 
                            )}
                        <UserUpdateItem>
                            <UserUpdateLabel>First Name</UserUpdateLabel>
                            <UserUpdateInput type="text" 
                            placeholder={user?.firstName}  
                            onChange={handleFirstName}
                            />
                        </UserUpdateItem>
                        <UserUpdateItem>
                            <UserUpdateLabel>Last Name</UserUpdateLabel>
                            <UserUpdateInput type="text" 
                            placeholder={user?.lastName}
                            onChange={handleLastName} 
                            />
                        </UserUpdateItem>
                        <UserUpdateItem>
                            <UserUpdateLabel>Username</UserUpdateLabel>
                            <UserUpdateInput type="text" 
                            placeholder={user?.username}
                            onChange={handleUsername}
                            />
                        </UserUpdateItem>
                        <UserUpdateItem>
                            <UserUpdateLabel>Email</UserUpdateLabel>
                            <UserUpdateInput type="email" 
                            placeholder={user?.email} 
                            onChange={handleEmail}
                            />
                        </UserUpdateItem>
                        <UserUpdateItem>
                            <UserUpdateLabel>Phone Number</UserUpdateLabel>
                            <UserUpdateInput type="text" 
                            placeholder={user?.phoneNumber}
                            onChange={handlePhoneNumber}
                            />
                        </UserUpdateItem>
                        <UserUpdateItem>
                            <UserUpdateLabel>Address</UserUpdateLabel>
                            <UserUpdateInput type="text" 
                            placeholder={user?.address} 
                            onChange={handleAddress}
                            />
                        </UserUpdateItem>
                    </UserUpdateLeft>
                    <UserUpdateRight>
                        <UserUpdateUpload>
                            <UserUpdateImg src={file ? URL.createObjectURL(file) : user?.img || 
                                "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                                } 
                                alt=""
                            />
                            <UserUpdateLabel htmlFor='file'>
                                <CameraAlt style={{cursor: 'pointer'}}/>
                            </UserUpdateLabel>
                            <UserUpdateInput type="file" id="file" style={{display: "none"}} onChange={handleFile}/>
                        </UserUpdateUpload>
                        <UserUpdateButton onClick={handleUpdate} disabled={loading}>
                            {loading ? (
                                <CircularProgress size={22} color="inherit" className="mt-1"/>
                                    )  : ( 
                                        "Update" 
                                )}
                        </UserUpdateButton>
                    </UserUpdateRight>
                </UserUpdateForm>
            </UserUpdate>
      </UserContainer>
        </Wrapper>
        <Footer />
    </Container>
  )
}

export default UpdateUser
