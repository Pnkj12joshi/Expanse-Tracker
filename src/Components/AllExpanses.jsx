import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../Context/DataContext";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../Config/FireBase.js";

const AllExpanses = () => {
  const {
    balance,
    setBalance,
    income,
    setIncome,
    expanses,
    setexpanses,
    currency,
  } = useContext(DataContext);
  const [data, setdata] = useState([]);

  //here i am fetching Expanses
  useEffect(()=>{ 
    const q = query(collection(db, "Expanses"), orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ExpanseData = snapshot.docs.map((doc) => ({
        name: new Date(doc.data().timestamp.toDate()).toLocaleDateString(),
        expenses: doc.data().amount,
      }));
      setdata(ExpanseData);
      
    });
    return () => unsubscribe()
  },[])
  return (
    <>
      <div className=" shadow-lg rounded-lg px-5 py-4 min-h-[284px] w-full sm:w-[416px] ">
        <p className="font-montserrat text-[20px]"> All Expanses</p>
        {data.length > 0 ? (
        data.map((item, index) => (
          <div className="w-full mt-2 flex justify-between" key={index}>
            <div className="flex justify-center items-center text-[green] font-semibold">{currency}{item.expenses}</div>
            <div className="flex justify-center items-center text-[red]">{item.name}</div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center py-5">No expenses recorded</p>
      )}
      </div>
    </>
  );
};

export default AllExpanses;
