import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Announcement from '../components/Announcement'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import Newsletter from '../components/Newsletter'
import ProductImg from '../images/lebron-17-fire-red-basketball-shoe-XNGQVG.jfif'
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { mobile } from '../Responsive'
import { useLocation } from 'react-router-dom'
import { publicRequest } from '../requestMethod'
import { addProduct } from '../redux/cartRedux'
import { useDispatch } from 'react-redux'


const Container = styled.div`` 
const Wrapper = styled.div`
    margin-top: 50px;
    padding: 50px;
    display: flex;
    ${mobile({ padding: "10px", flexDirection: 'column' })}
` 
const ImgContainer = styled.div`
    flex: 1;
` 
const Image = styled.img`
    width: 100%;
    height: 70vh;
    object-fit: cover;
    ${mobile({ height: "50vh" })}

` 
const InfoContainer = styled.div`
    flex: 1;
    padding: 0px 50px;
    ${mobile({ padding: "10px" })}

` 
const Title = styled.h1`
    font-weight: 300;
` 
const Desc = styled.p`
    margin: 20px 0px;
` 
const Price = styled.span`
    font-weight: 200;
    font-size: 40px;
` 
const FilterContainer = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-between;
    margin: 30px 0px;
    ${mobile({ width: "100%" })}

`
const Filter = styled.div`
    display: flex;
    align-items: center;
`
const FilterTitle = styled.span`
    font-size: 20px;
    font-weight: 200;
`
const FilterColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
    margin: 0px 5px;
    cursor: pointer;
`
const FilterSize = styled.select`
    margin-left: 10px;
    padding: 5px;
    outline: none;
`
const FilterSizeOption = styled.option``

const AddContainer = styled.div`
    width: 50%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    ${mobile({ width: "100%" })}

`
const AmountContainer = styled.div`
    display: flex;
    align-items: center;
    font-weight: 700;
`
const Amount = styled.span`
    width: 30px;
    height: 30px;
    border-radius: 10px;
    border: 1px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0px 5px;
`
const Button = styled.button`
    padding: 15px;
    border: 2px solid #222;
    background-color: #d5bea2;
    font-weight: 600;
    cursor: pointer;
`

const Product = () => {

    const location = useLocation()
    const id = location.pathname.split("/")[2]

    const [product, setProduct] = useState({})
    const [quantity, setQuantity] = useState(1)
    const [color, setColor] = useState('null')
    const [size, setSize] = useState('null')
    const dispatch = useDispatch()

    useEffect(()=>{
        const getProduct = async () => {
           try{
            const res = await publicRequest.get("/products/find/" + id)
            setProduct(res.data.data)
           }catch(err){}
        };
        getProduct()
    },[id])

    const handleQuantity = (type) => {
        if(type === 'dec'){
            quantity > 1 && setQuantity(quantity - 1)
        } else {
            setQuantity(quantity + 1)
        }
    }

    const handleClick = async () => {
        dispatch(addProduct({ ...product, quantity, color, size}))
        
    }

  return (
    <Container>
      <Navbar/>
      <Announcement/>
      <Wrapper>
        <ImgContainer>
            <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
            <Title>{product.title}</Title>
            <Desc>{product.desc}</Desc>
            <Price>$ {product.price}</Price>
            <FilterContainer>
                <Filter>
                    <FilterTitle>Color:</FilterTitle>
                    {product.color?.map((c) => 
                        <FilterColor color={c} key={c} onClick={() =>setColor(c)}/>
                    )}
                </Filter>
                <Filter>
                    <FilterTitle>Size</FilterTitle>
                    <FilterSize onChange={(e)=>setSize(e.target.value)}>
                        <FilterSizeOption></FilterSizeOption>
                        {product.size?.map((s) => (
                            <FilterSizeOption key={s}>{s.toUpperCase()}</FilterSizeOption>
                        ))}
                    </FilterSize>
                </Filter>
            </FilterContainer>
            <AddContainer>
                <AmountContainer>
                    <RemoveIcon onClick={()=>handleQuantity("dec")}/>
                    <Amount>{quantity}</Amount>
                    <AddIcon onClick={()=>handleQuantity("inc")}/>
                </AmountContainer>
                <Button onClick={handleClick}>ADD TO CART</Button>
            </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter/>
      <Footer/>
    </Container>
  )
}

export default Product
