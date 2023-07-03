import React, { useState } from 'react'
import "./Switch.scss";
import ContentWrapper from './ContentWrapper';
const SwitchTabs = ({data,onTabChange}) => {

  
  const [selectedTab,setSelectedTab]=useState(0);
  const [left,setLeft] =useState(0);
  function activeTab(tab,index){
    setLeft(index*100);
    setTimeout(()=>{
      setSelectedTab(index);
    },300)
    onTabChange(tab,index);
  }

  
  return (
    <div className='switchingTabs'>
    <div className='tabItems'>
      { 
        data.map((tab,index)=>{
              return   <span
                key={index} 
                className={`tabItem
                ${selectedTab===index?"active" :""}`
              }
                onClick={()=>activeTab(tab,index)}
                >{tab}</span>
        })
        
        }

      <span className='movingBg' style={{left}}/>
       
    </div>
    </div>
  )
      }

export default SwitchTabs