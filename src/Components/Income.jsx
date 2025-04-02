import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../Context/DataContext";
import {db} from "../Config/FireBase.js";
import { collection,addDoc,Timestamp, onSnapshot } from "firebase/firestore";
const Income = () => {
  const { balance, setBalance, income, setIncome, expanses, setexpanses,currency } =
    useContext(DataContext);
    const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(""); 



  //fetch the total income from the firstore database
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "incomes"), (snapshot) => {
      let totalIncome = 0;
      snapshot.forEach((doc) => {
        totalIncome += doc.data().amount;
      });
      setIncome(totalIncome);
      setBalance((prevBalance) => prevBalance + totalIncome); // Adjust balance accordingly
    });

    return () => unsubscribe(); // Cleanup listener when component unmounts
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const newIncome = Number(amount);
    try{
     await addDoc(collection(db,"incomes"),{
      amount :newIncome,
      timestamp: Timestamp.now(),
     });
    setIncome((prevIncome) => prevIncome + Number(amount));
    setBalance((prev)=> prev + Number(amount))
    }
    catch(error){
      console.log(error.message);
    }
    setAmount("");
    setIsOpen(false);
  };

  return (
    <>
      <div className=" shadow-lg rounded-lg px-5 py-4 h-[284px]  w-full sm:w-[416px] flex flex-col justify-between">
        <div className="flex-grow"> 
        <p className="font-montserrat text-[20px]"> Income</p>
        <p className="font-montserrat text-[15px] font-bold">{currency}{income}</p>
        </div>
        <button className='p-2 bg-blue-500 text-white rounded-lg self-end'  onClick={() => setIsOpen(true)}> Add Income</button>
      </div>

      
      {/* Modal Form */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add Income</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="p-2 border rounded-lg"
                required
              />
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2 bg-gray-300 rounded-lg"
                >
                  Cancel
                </button>
                <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-lg">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Income;
