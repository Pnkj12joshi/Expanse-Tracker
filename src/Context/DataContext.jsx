import { createContext, useEffect, useState } from "react";

export const  DataContext = createContext();

const DataContextProvider = ({children})=>{
    const [balance,setBalance] = useState(0);
    const [income,setIncome] = useState(0);
    const[expanses,setexpanses]=useState(0);
    const currency = "$";

    useEffect(()=>{
      setBalance(income-expanses)
    },[income,expanses]);

    const values = {
      balance,
      setBalance,
      income,
      setIncome,
      expanses,
      setexpanses,
      currency,
    };
    
    return(
        <DataContext.Provider value={values}>
            {children}
        </DataContext.Provider>
    )
}
export default DataContextProvider;
