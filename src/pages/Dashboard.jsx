import React from 'react'
import Balence from '../Components/Balence'
import SideBar from '../Components/SideBar'
import Income from '../Components/Income';
import Expanses from '../Components/Expanses';
import FinanceStatics from '../Components/FinanceStatics';
import MainBody from '../Components/MainBody';

const Dashboard = () => {
  return (
    <>
     <div className="flex flex-col sm:flex-row gap-4">
      <SideBar />
      <MainBody/>
    </div>
    
    
    </>

  );
}

export default Dashboard
