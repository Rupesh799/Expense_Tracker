import React from 'react'
import { Bar, BarChart, Legend, Tooltip, XAxis, YAxis } from 'recharts'

const BarCharts = ({budgetList}) => {
  return (
    <div className='hidden md:block'>
        <h1 className='font-bold mb-3'>Activities</h1>
        <BarChart
        width={300}
        height={300}
        data={budgetList}

        >
            <XAxis dataKey='name'/>
            <YAxis/>
            <Tooltip/>
            <Legend/>
            <Bar dataKey={"totalSpend"} stackId="a" fill='#16423C'/>
            <Bar dataKey={"amount"} stackId="a" fill='#6A9C89'/>

        </BarChart>
    </div>
  )
}

export default BarCharts