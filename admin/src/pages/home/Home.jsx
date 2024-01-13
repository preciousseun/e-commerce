import React from 'react'
import Chart from '../../components/Chart/Chart'
import FeaturedInfo from '../../components/FeaturedInfo/FeaturedInfo'
import './home.css'
import WidgetSm from '../../components/WidgetSm/WidgetSm'
import WidgetLg from '../../components/WidgetLg/WidgetLg'
import { useState } from 'react'
import { useMemo } from 'react'
import { useEffect } from 'react'
import { userRequest } from '../../requetMethod'

const Home = () => {

  const [userStats, setUserStats] = useState([])

  const MONTHS = useMemo(() => [
    "JAN",
    "FEB",
    "MAR",
    "APR",
    "MAY",
    "JUN",
    "JUL",
    "AUG",
    "SEP",
    "OCT",
    "NOV",
    "DEC"
  ],
  []
  );

  useEffect(() => {
    const getStats = async () => {
      try{
        const res = await userRequest.get("/user/stats")
        res.data.data.map((item) => 
          setUserStats((prev) => [
            ...prev,
            {name:MONTHS[item._id - 1], "New Users": item.total},
          ])
        )
      }catch{}
    };
    getStats();
  },[MONTHS])

  console.log(userStats) 

  return (
    <div className='home'>
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New Users"/>
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  )
}

export default Home
