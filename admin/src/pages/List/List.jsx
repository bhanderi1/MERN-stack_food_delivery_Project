import React, { useEffect, useState } from 'react'
import './List.css'
import axios from "axios"
import {toast} from 'react-toastify'

const List = () => {
  const [list,setList] = useState([])

  const fechList = async() => {
    const response= await axios.get('http://localhost:4000/api/food/food-list')
    console.log(response.data);
    
    if(response.data.success){
      setList(response.data.data)
    }
    else{
      toast.error("Error")
    }
  }

  const removeFood = async(foodId) =>{
     console.log(removeFood);
     const response = await axios.post('http://localhost:4000/api/food/food-item-delete',{id:foodId});
     await fechList();
     if(response.data.success){
      toast.success(response.data.message)
     }
     else{
      toast.error("Error")
     }
  }
  useEffect(()=>{
    fechList();
  },[])

  return (
    <div className='list add-flex-col '>
       <p>All Foods List</p>
       <div className="list-table">
        <div className="list-table-format title">
            <b>Image</b>
            <b>Name</b>
            <b>Category</b>
            <b>Price</b>
            <b>Action</b>
        </div>
        {
          list.map((item,index)=>{
               return(
                <div key={index} className='list-table-format'>
                    <img src={`http://localhost:4000/images/`+item.images} alt="Item_image" />
                    <p>{item.name}</p>
                    <p>{item.category}</p>
                    <p>${item.price}.00</p>
                    <p onClick={()=> removeFood(item._id)} className='cursor'>X</p>
                </div>
               )
          })
        }
       </div>
    </div>
  )
}

export default List