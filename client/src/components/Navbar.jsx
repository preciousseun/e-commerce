import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import { Badge } from '@mui/material';
import {mobile} from '../Responsive'
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from'react-redux';
import { logOut } from '../redux/userRedux'

const Container = styled.div`
    height: 60px;
    background-color: #f4ece3;
    ${mobile({ height: 'auto' })}
`
const Wrapper = styled.div`
  padding: 10px 40px;
  display: flex;
  justify-content: space-between;
  ${mobile({ padding: '10px 10px' })}
`
const Left = styled.div`
  flex: 1;
  ${mobile({ justifyContent: 'center', flex: 0 })}
`
const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: '20px' })}
`
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ justifyContent: 'center', flex: 0 })}
`
const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  ${mobile({ fontSize: '12px', marginLeft: '10px' })}
`
const NavImg = styled.img`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    cursor: pointer;
`
const SignIn = styled.div`
  display: flex;
  border: 1px solid #222;
  background-color: #d5bea2;
  border-radius: 20px;
  padding: 4px 15px;
  width: 50px;
  font-size: 16px;
  justify-content: center;
  cursor: pointer;
`
const Language = styled.div`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: 'none' })}
`
const Center = styled.div`
  flex: 1; 
  display: flex;
  align-items: center;
  justify-content: center;
`
const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 5px 10px;
  border: 1px solid lightgray;
  border-radius: 20px;
  color: lightgray;
`
const Input = styled.input`
  border: none;
  outline: none;
  background-color: transparent;
  ${mobile({ width: '50px' })}
`
const RightUser = styled.div``

const Navbar = () => {

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch()

  const handleLogout =() => {
    dispatch(logOut())
}

  const quantity = useSelector(state=>state.cart.quantity)

  return (
    <Container>
      <Wrapper>
        <Left><Logo>SD-SHOP</Logo></Left>
        <Center>
          <SearchContainer>
            <Input placeholder='Browse Shop'/>
            <SearchIcon color='lightgray' style={{fontSize: "18"}}/>
          </SearchContainer>
        </Center>
        <Right>
          <Language>ENG</Language>
          <Link to="/cart"className='link'>
            <MenuItem>
              <Badge badgeContent={quantity} color="primary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </MenuItem>
          </Link>
          {user && 
            <Link to="/updateuser" className='link'>
              <MenuItem>
                <NavImg src={user.img || 
                    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                } alt="" />
              </MenuItem>
            </Link>
          }
          {
            user ? (
                <MenuItem>
                  <SignIn onClick={handleLogout}>
                    {user && "Logout"}
                  </SignIn>
                </MenuItem>
            ) : (
            <Link className='link' to="/login">
              <MenuItem>
                <SignIn>
                  Sign In
                </SignIn>
              </MenuItem>
            </Link>
            )
          }
        </Right>
      </Wrapper>
    </Container>
  )
}

export default Navbar
