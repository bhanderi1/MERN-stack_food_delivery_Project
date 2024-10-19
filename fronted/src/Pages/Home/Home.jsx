import React, { useState } from 'react'
import './Home.css'
import Header from '../../../components/Header/Header'
import ExploreMenu from '../../../components/ExploreMenu/ExploreMenu'
import FoodDisaply from '../../../components/FoodDisplay/FoodDisaply'
import AppDownload from '../../../components/AppDownload/appDownload'

const Home = () => {
  const [category , setCategory] =useState("All")
  return (
    <div>
      <Header/>
      <ExploreMenu category={category} setCategory={setCategory}/>
      <FoodDisaply category={category}/>
      <AppDownload/>
    </div>
  )
}

export default Home
