import React, { useContext, useEffect, useState } from "react";
import { DataContext } from "../Context/DataContext";
import { db } from "../Config/FireBase.js";
import { collection, addDoc, Timestamp,onSnapshot } from "firebase/firestore";

const Expanses = () => {
  const {
    balance,
    setBalance,
    income,
    setIncome,
    expanses,
    setexpanses,
    currency,
  } = useContext(DataContext);
  const [IsOpen, setIsOpen] = useState(false);
  const [myExpanses, setmyExpanses] = useState("");



   //fetch the total Expanses from the firstore database
    useEffect(() => {
      const unsubscribe = onSnapshot(collection(db, "Expanses"), (snapshot) => {
        let totalExpanses = 0;
        snapshot.forEach((doc) => {
          totalExpanses += doc.data().amount;
        });
        setexpanses(totalExpanses);
      });
  
      return () => unsubscribe(); // Cleanup listener when component unmounts
    }, []);


  const handlesubmit = async (e) => {
    const newExpanses = Number(myExpanses);
    try {
      e.preventDefault();
      await addDoc(collection(db, "Expanses"), {
        amount: newExpanses,
        timestamp: Timestamp.now(),
      });
      setexpanses((prev) => {
        const newExpanses = prev + Number(myExpanses);
        setBalance(income - newExpanses);
        return newExpanses;
      });
    } catch (error) {
      console.log(error.message);
    }
    setmyExpanses("");
  };

  return (
    <>
      <div className=" shadow-lg rounded-lg px-5 py-4 h-[284px]  w-full sm:w-[416px] flex flex-col justify-between">
        <div className="flex-grow">
          <p className="font-montserrat text-[20px]"> Expanses</p>
          <p className="font-montserrat text-[15px] font-bold">
            {currency}
            {expanses}
          </p>
        </div>
        <button
          className="p-2 bg-blue-500 text-white rounded-lg self-end"
          onClick={() => setIsOpen(true)}
        >
          {" "}
          Add Expanses
        </button>
      </div>

      {IsOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-semibold mb-4">Add Expanses</h2>
            <form onSubmit={handlesubmit} className="flex flex-col gap-3">
              <input
                type="number"
                placeholder="Enter amount"
                value={myExpanses}
                onChange={(e) => setmyExpanses(e.target.value)}
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
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg"
                >
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

export default Expanses;
