import React from 'react'
import './chart.css'
import { XAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const Chart = ({title, data, dataKey, grid}) => {

    
  return (
    <div className='chart'>
      <h3 className="">{title}</h3>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="total" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
            <XAxis dataKey="name" stroke='#5550bd'/>
            <Area
            type="monotone"
            dataKey={dataKey}
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#total)"
          />
            <Tooltip/>
            {grid && <CartesianGrid stroke='#e0dfdf' strokeDasharray="5 5"/>}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart
