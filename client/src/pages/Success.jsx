import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userRequest } from "../requestMethod";
import styled from 'styled-components'

const Container = styled.div`
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

const Logo = styled.div`
  height: 80px;
  width: 80px;
  border-radius: 50%;
  border: 2px solid lightgray;
  background-image: url("https://nationaltoday.com/wp-content/uploads/2021/06/Shopping-Cart-Day-1.jpg");
  background-size: cover;
`
const Successfull = styled.div`
  margin-top: 20px;
  border: none;
  width: auto;
  padding: 15px;
  background-color: teal;
  border-radius: 5px;
  color: #fff;
  font-weight: 700;
  font-size: 20px;
`

const Processed = styled.p`
    font-size: 18px;
    font-weight: 600;
    text-align: center;
    margin-top: 20px;
`


const Success = () => {

    // const location = useLocation()
    // const data = location.state.stripeData;
    // const cart = location.state.cart;
    // const currentUser = useSelector((state) => state.user.currentUser);
    // const [orderId, setOrderId] = useState(null);

    // useEffect(() => {
    //     const createOrder = async () => {
    //       try {
    //         const res = await userRequest.post("/orders", {
    //             userId: currentUser._id,
    //             products: cart.products.map((item) => ({
    //             productId: item._id,
    //             quantity: item._quantity,
    //           })),
    //           amount: cart.total,
    //           address: data.billing_details.address,
    //         });
    //         setOrderId(res.data.data._id);
    //       } catch {}
    //     };
    //     data && createOrder();
    //   }, [cart, data, currentUser]);

  return (
    <Container>

      <Logo></Logo>

      <Successfull>Successfull</Successfull>
    
      <Processed>Your order is being processed. <br /> Thanks for shopping with us</Processed>

        {/* {orderId
            ? `Order has been created successfully. Your order number is ${orderId}`
            : `Successfull. Your order is being prepared...`} */}
      <button style={{ padding: 10, marginTop: 60, backgroundColor: '#d5bea2' }}><Link to="/" className='link'>Go to Homepage</Link></button>    
    </Container>
  )
}

export default Success
