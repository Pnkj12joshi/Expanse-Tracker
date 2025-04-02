import React, { useContext, useEffect, useState } from "react";
import Balence from "./Balence";
import Income from "./Income";
import Expanses from "./Expanses";
import FinanceStatics from "./FinanceStatics";
import AllExpanses from "./AllExpanses";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../Config/FireBase.js";
import { DataContext } from "../Context/DataContext";

const MainBody = () => {
  const { balance, setBalance, income, setIncome, expanses, setexpanses, currency } = useContext(DataContext);
  const [myIncome, setmyIncome] = useState([]);
  const [myExpanses, setmyExpanses] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    // Fetch Expenses
    const q = query(collection(db, "Expanses"), orderBy("timestamp", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const ExpanseData = snapshot.docs.map((doc) => ({
        name: new Date(doc.data().timestamp.toDate()).toLocaleDateString(),
        expense: doc.data().amount,
      }));
      setmyExpanses(ExpanseData);
    });

    // Fetch Income
    const i = query(collection(db, "incomes"), orderBy("timestamp", "desc"));
    const unsubscribe2 = onSnapshot(i, (snapshot) => {
      const IncomeData = snapshot.docs.map((doc) => ({
        name: new Date(doc.data().timestamp.toDate()).toLocaleDateString(),
        incomes: doc.data().amount,
      }));
      setmyIncome(IncomeData);
    });

    return () => {
      unsubscribe();
      unsubscribe2();
    };
  }, []);

  // Filter transactions based on search query
  const filteredExpanses = myExpanses.filter((item) =>
    item.name.includes(search) || item.expense.toString().includes(search)  //here intially state is empty so here filter is not apply here
  );

  const filteredIncome = myIncome.filter((item) =>
    item.name.includes(search) || item.incomes.toString().includes(search)
  );

  return (
    <>
      <div className="flex flex-col gap-4 ml-8 ">
        <div className="flex flex-col sm:flex-row gap-4 flex-wrap ">
          <Balence />
          <Income />
          <Expanses />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <FinanceStatics />
          <AllExpanses />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="flex gap-2 flex-1 shadow-lg">
            <input
              type="text"
              placeholder="Search by amount or date"
              className="border-gray-300 rounded-md p-2 border-none outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="px-2 py-1 flex flex-col flex-1 shadow-lg">
            <h1 className="font-montserrat font-semibold">Transaction History</h1>
            <div className="flex gap-2 mt-2 w-full">
              <div className="flex justify-between flex-1 flex-col">
                <div className="w-full">
                  <h1 className="text-center font-semibold">Expanses</h1>
                </div>
                <div className="w-[90%] mt-4">
                  {filteredExpanses.length > 0 ? (
                    filteredExpanses.map((item, index) => (
                      <div
                        className="flex gap-2 items-center justify-between"
                        key={index}
                      >
                        <div className="font-semibold text-[brown]">{item.expense}</div>
                        <div className="font-semibold text-black">{item.name}</div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center">No matching expenses</p>
                  )}
                </div>
              </div>
              <div className="flex justify-between flex-1 flex-col">
                <div className="w-full">
                  <h1 className="text-center font-semibold">Income</h1>
                </div>
                <div className="mt-4">
                  {filteredIncome.length > 0 ? (
                    filteredIncome.map((item, index) => (
                      <div
                        className="flex gap-2 items-center justify-between"
                        key={index}
                      >
                        <div className="font-semibold text-[green]">{item.incomes}</div>
                        <div className="font-semibold text-[red]">{item.name}</div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center">No matching income</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainBody;
