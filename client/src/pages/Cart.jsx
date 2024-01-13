import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { mobile } from '../Responsive'
import { useSelector, useDispatch } from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import { userRequest } from '../requestMethod'
import { Link, useNavigate } from 'react-router-dom'
import { removeProduct } from '../redux/cartRedux'


const KEY = process.env.REACT_APP_API_KEY;

const CartContainer = styled.div``
const Wrapper = styled.div`
    padding: 20px;
    ${mobile({ padding: "10px" })}

`
const Title = styled.h1`
font-weight: 300;
text-align: center;
`
const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`
const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: 2px solid black;
    background-color: ${props=>props.type === 'filled' ? '#d5bea2' : '#eee'};
    color: ${props=>props.type === 'filled' && 'black'};
`
const TopTexts = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    ${mobile({ display: "none" })}

`
const TopText = styled.span`
    margin: 0px 10px;
    cursor: pointer;
    text-decoration: underline;
`
const Bottom = styled.div`
    display: flex;
    justify-content: space-between;
    ${mobile({ flexDirection: 'column' })}

`
const Info = styled.div`
    flex: 3;
`
const Product = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 20px 0px;
    ${mobile({ flexDirection: 'column' })}
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
    margin: 0px 20px;
    ${mobile({ flexDirection: 'column', padding: '20px 0px' })}
`
const Image = styled.img`
    width: 250px;
    height: 250px;
    ${mobile({ width: '100%' })}

    
`
const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    
`
const ProductName = styled.span`
    font-size: 20px;
    font-weight: 600;
    ${mobile({ margin: '10px 0px' })}

`
const ProductId = styled.span`
    font-size: 16px;
    font-weight: 600;
    ${mobile({ margin: '10px 0px' })}

`
const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    ${mobile({ margin: '10px 0px' })}
`
const ProductSize = styled.span`
    font-size: 20px;
    font-weight: 600;
    
`
const CancelCartContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`

const CancelCart = styled.div`
    height: 15px;
    width: 15px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f5f5f5;
    padding: 5px;
    color: #c5c5c5;
    margin-right: 20px;
    margin-top: 20px;
    cursor: pointer;
`

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
`
const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;
    ${mobile({ margin: '5px 15px' })}

`
const ProductPrice = styled.div`
    font-size: 35px;
    font-weight: 400;
`

const Hr = styled.hr`
    background-color: lightgray;
    border: none;
    height: 1px;
`

const Summary = styled.div`
    flex: 1;
    border: 0.5px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
    margin: 0px 10px;
`
const SummaryTitle = styled.h1`
    font-weight: 500;
`
const SummaryItem = styled.div`
    margin: 30px 0px;
    display: flex;
    justify-content: space-between;
    font-weight: ${props=>props.type === 'total' && '500'};
    font-size: ${props=>props.type === 'total' && '24px'};
`
const SummaryItemText = styled.span``
const SummaryItemPrice = styled.span``

const Button = styled.button`
    width: 100%;
    padding: 10px;
    background-color: #d5bea2;
    font-weight: 600;
    cursor: pointer;
`

const Cart = () => {

const navigate = useNavigate()
const cart = useSelector((state) => state.cart)
const userAddress = useSelector((state) => state.user.currentUser?.address)
const user = useSelector((state) => state.user.currentUser)
const dispatch = useDispatch()
const [stripeToken, setStripeToken] = useState(null)
const [cartQuantity, setCartQuantity] = useState(1)

const quantity = useSelector((state) => state.cart.quantity)

const onToken = (token) => {
    setStripeToken(token)
}

const handleQuantity = (type) => {
    if(type === 'dec'){
        cartQuantity > 1 && setCartQuantity(quantity - 1)
    } else {
        setCartQuantity(quantity + 1)
    }
}

useEffect(() => {
    try{
        const makeRequest = async () => {
            const res = await userRequest.post("/checkout/payment", {
                tokenId: stripeToken.id,
                amount: cart.total * 100
            });
            navigate("/success", {stripeData: res.data, products: cart})
        };
        stripeToken && cart.total >= 1 && makeRequest()
    }catch(err){}
}, [stripeToken, cart.total, navigate])

  return (
    <CartContainer>
      <Navbar/>
      <Announcement/>
        <Wrapper>
            <Title>YOUR CART</Title>
            <Top>
                <Link to="/" className='link'>
                    <TopButton>CONTINUE SHOPPING</TopButton>
                </Link>
                <TopTexts>
                    <TopText>Shopping Cart ({quantity})</TopText>
                    <TopText>Your Wishlist (0)</TopText>
                </TopTexts>
                <TopButton type='filled'>FEED BACK</TopButton>
            </Top>
            <Bottom>
                <Info>
                    {cart.products.map((product) => (
                     <>  
                     <CancelCartContainer>
                        <CancelCart onClick={() => {
                            dispatch(removeProduct(product._id))
                        }}>
                            <ClearOutlinedIcon style={{fontSize: "18px"}}/>
                        </CancelCart>
                    </CancelCartContainer> 
                    <Product>
                        <ProductDetail>
                            <Image src={product.img}/>
                            <Details>
                                <ProductName><b>Product:</b> {product.title}</ProductName>
                                <ProductId><b>ID:</b> {product._id}</ProductId>
                                <ProductColor color={product.color}/>
                                <ProductSize><b>Size:</b> {product.size}</ProductSize>
                            </Details>
                        </ProductDetail>
                        <PriceDetail>
                            <ProductAmountContainer>
                                <AddIcon onClick={()=>handleQuantity("dec")}/>
                                <ProductAmount>{product.quantity}</ProductAmount>
                                <RemoveIcon  onClick={()=>handleQuantity("inc")}/>
                            </ProductAmountContainer>
                            <ProductPrice>$ {product.price*product.quantity}</ProductPrice>
                        </PriceDetail>
                    </Product>
                    <Hr/>
                    </>
                    ))}
                </Info>
                <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText>Subtotal:</SummaryItemText>
                        <SummaryItemPrice>$ {cart.total.toFixed(2)}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Estimated Shipping:</SummaryItemText>
                        <SummaryItemPrice>$ 9.60</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Shipping Discount:</SummaryItemText>
                        <SummaryItemPrice>$ -9.60</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText>Shipping Address:</SummaryItemText>
                        <SummaryItemPrice>{userAddress}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem type='total'>
                        <SummaryItemText>Total:</SummaryItemText>
                        <SummaryItemPrice>$ {cart.total.toFixed(2)}</SummaryItemPrice>
                    </SummaryItem>
                    {user ? (
                        <StripeCheckout
                            name='SD-SHOP'
                            image='https://nationaltoday.com/wp-content/uploads/2021/06/Shopping-Cart-Day-1.jpg'
                            billingAddress
                            shippingAddress
                            description= {`Your total is $ ${cart.total}`}
                            amount={cart.total*100}
                            token={onToken}
                            stripeKey="pk_test_51LvFZTCuW9xAQQ60UOjGvJnA49K10Kwi1LkYYiI512ZQqT7jzncOA72PociV99PFxXOFPkT2AjAvKCyaIc8jdNlF00PRBcv2gZ"
                        >
                        <Button>CHECKOUT</Button>
                        </StripeCheckout>
                    ) : (
                        <Link to="/login">
                            <Button style={{fontSize: "18px"}}>SIGN IN</Button>
                        </Link>
                    )}
                </Summary>
            </Bottom>
        </Wrapper>
      <Footer/>
    </CartContainer>
  )
}

export default Cart
