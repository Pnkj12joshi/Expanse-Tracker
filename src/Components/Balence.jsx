import React, { useContext, useState } from 'react'
import { DataContext } from '../Context/DataContext'

const Balence = () => {
     const { balance, setBalance, income, setIncome, expanses, setexpanses,currency } =
       useContext(DataContext);
   
  return (
    <>
    <div className=' shadow-lg rounded-lg px-5 py-4 h-[284px] w-full sm:w-[416px] flex flex-col justify-between '>
      <div className='flex-grow'>
      <p className='font-montserrat text-[20px]'> Balance</p> 
      <p className="font-montserrat text-[15px] font-bold">{currency}{balance}</p>
      </div>
      </div>  
    </>
  )
}

export default Balence;
