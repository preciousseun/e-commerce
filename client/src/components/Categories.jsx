import React from 'react'
import styled from 'styled-components'
import { mobile } from '../Responsive'
import { categories } from '../slide-data'
import CategoryItem from './CategoryItem'

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    ${mobile({ padding: '0px', flexDirection: 'column' })}
`

const Categories = () => {
  return (
    <Container>
      {categories.map(item =>(
        <CategoryItem item={item}key={item.id}/>
      ))}
    </Container>
  )
}

export default Categories
