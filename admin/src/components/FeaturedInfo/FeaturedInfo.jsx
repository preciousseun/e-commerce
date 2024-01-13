import React from 'react'
import './featuredInfo.css'
import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import { useEffect } from 'react';
import { useState } from 'react';
import { userRequest } from '../../requetMethod';

const FeaturedInfo = () => {

  const [income, setIncome] = useState([])
  const [ perc, setPerc ] = useState(0)

  useEffect(() => {
    const getIncome = async () => {
      try{
        const res = await userRequest.get("/orders/income")
        setIncome(res.data.data)
        setPerc((res.data.data[1].total*100) / res.data.data[0].total - 100)
      }catch{}
    }
    getIncome();
  }, [])


  return (
    <div className='featured'>
      <div className="featuredItem">
        <span className="featuredTitle">Revenue</span>
        <div className="featuredMoneyContainer">
          {/* <span className="featuredMoney">$ {income[1]?.total}</span>
            <span className="featuredMoneyRate">% 
            {Math.floor(perc)}{" "}
            {perc < 0 ? (
              <ArrowDownward className='featuredIcon negative'/>
            ) : ( 
              <ArrowUpward className='featuredIcon'/>
            )}
            </span> */}
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Sales</span>
        <div className="featuredMoneyContainer">
            <span className="featuredMoney">$ 8,344</span>
            <span className="featuredMoneyRate">- 1.4 <ArrowDownward className='featuredIcon negative'/></span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Cost</span>
        <div className="featuredMoneyContainer">
            <span className="featuredMoney">$ 3,671</span>
            <span className="featuredMoneyRate">+ 3.7 <ArrowUpward className='featuredIcon'/></span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  )
}

export default FeaturedInfo
