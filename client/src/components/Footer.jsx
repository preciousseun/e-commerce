import React from 'react'
import styled from 'styled-components'
import FacebookIcon from '@mui/icons-material/Facebook';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import PlaceIcon from '@mui/icons-material/Place';
import PhoneIcon from '@mui/icons-material/Phone';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import footerPayment from '../images/footerPayment.png'
import { mobile } from '../Responsive';

const Container = styled.div`
    display: flex;
    background-color: #f4ece3;
    margin-top: 50px;
    padding: 40px;
    ${mobile({ flexDirection: 'column', padding: "10px" })}
`
const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
    ${mobile({ padding: "10px" })}
`
const Logo = styled.h1``
const Desc = styled.p`
    margin: 20px 0px;
`
const SocialContainer = styled.div`
    display: flex;
`
const SocialIcon = styled.div`
    color: ${props=> props.color};
    display: flex;
    justify-content: center;
    align-items: center;
    margin-right: 20px;
    padding-top: 60px;
    ${mobile({ marginTop: "5px", paddingTop: '20px' })}
`

const Center = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ padding: "10px" })}
`
const Title = styled.h1`
    margin-bottom: 30px;
`
const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`
const ListItem = styled.li`
    width: 50%;
    margin-bottom: 10px;
    cursor: pointer;

    &:hover{
        text-decoration: underline;
    }
`
const Right = styled.div`
    flex: 1;
    padding: 20px;
    ${mobile({ padding: "10px" })}
`
const ContactItem = styled.div`
    margin-bottom: 20px;
    display: flex;
    align-items: center;
`
const Payment = styled.img`
    width: 50%;
`

const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>SD-SHOP</Logo>
        <Desc>Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus quam atque sequi labore hic dolore, modi quisquam pariatur necessitati</Desc>
        <SocialContainer>
            <SocialIcon color='#51c85d'>
                <WhatsAppIcon style={{fontSize: '35'}}/>
            </SocialIcon>
            <SocialIcon color='rgb(#8a3ab9, #bc2a8d, #fccc63)'>
                <InstagramIcon style={{fontSize: '35'}}/>
            </SocialIcon>
            <SocialIcon color='#00acee'>
                <TwitterIcon style={{fontSize: '35'}}/>
            </SocialIcon>
            <SocialIcon color='#3b5998'>
                <FacebookIcon style={{fontSize: '35'}}/>
            </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Shortcuts</Title>
        <List>
            <ListItem>Home</ListItem>
            <ListItem>Men</ListItem>
            <ListItem>Women</ListItem>
            <ListItem>Children</ListItem>
            <ListItem>Adults</ListItem>
            <ListItem>Phones</ListItem>
            <ListItem>Laptops</ListItem>
            <ListItem>Accessories</ListItem>
            <ListItem>Cart</ListItem>
            <ListItem>Language</ListItem>
            <ListItem>Wishlist</ListItem>
            <ListItem>Order Tracking</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact Us</Title>
            <ContactItem>
               <PlaceIcon style={{marginRight: '10px'}}/> 1A Ajose Adeogun Ave, Victoria Island, Lagos State.
            </ContactItem>
            <ContactItem>
               <PhoneIcon style={{marginRight: '10px'}}/> +234 814-601-4795
            </ContactItem>
            <ContactItem>
                <MailOutlineIcon style={{marginRight: '10px'}}/> contact@sd-shop.com
            </ContactItem>
            <Payment src={footerPayment}/>
      </Right>
    </Container>
  )
}

export default Footer
