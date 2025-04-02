import React, { useContext, useEffect, useState } from 'react'
import { DataContext } from '../Context/DataContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import {db} from "../Config/FireBase.js";

const FinanceStatics = () => {
   const { balance, setBalance, income, setIncome, expanses, setexpanses,currency } =
         useContext(DataContext); 
         const [data, setData] = useState([]);
         useEffect(() => {
          if (income === 0 && balance === 0) return;
          
          const q = query(collection(db, "incomes"), orderBy("timestamp", "asc"));
          const unsubscribe = onSnapshot(q, (snapshot) => {
            const incomeData = snapshot.docs.map(doc => ({
              name: new Date(doc.data().timestamp.toDate()).toLocaleDateString(),
              balance: balance,
              expenses: expanses
            }));
            setData(incomeData);
          });
      
          return () => unsubscribe();
        }, [income, balance, expanses]);
     
    return (
      <>
      <div className=' shadow-lg rounded-lg px-5 py-4 flex-1 '>
        <p className='font-montserrat text-[20px]'> Financial Statistics</p> 
        {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="balance" stroke="#4CAF50" strokeWidth={2} name={`Balance (${currency})`} />
            <Line type="monotone" dataKey="expenses" stroke="#FF5733" strokeWidth={2} name={`Expenses (${currency})`} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 text-center py-5">No data available</p>
      )}
        </div>  
      </>
    )
}

export default FinanceStatics
