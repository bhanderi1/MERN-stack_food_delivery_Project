import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/food/food-list')
      .then(response => setList(response.data.food))
      .catch(err => console.error(err));
  }, []);

  const removeFood = (id) => {
    axios
      .delete(`http://localhost:4000/api/food/food-item-delete?foodId=${id}`)
      .then(response => {
        toast.success(response.data.message);
        setList(list.filter(item => item._id !== id)); 
      })
      .catch(err => {
        console.error(err);
        toast.error('Failed to delete the item');
      });
  };

  return (
    <div className='list add-flex-col'>
      <p>All Foods List</p>
      <div className='list-table'>
        <div className='list-table-format title'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map(item => (
          <div className='list-table-format' key={item._id}>
            <img src={`http://localhost:4000/${item.image}`} alt='Item_image' className='item-image' />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}.00</p>
            <p onClick={() => removeFood(item._id)} className='cursor'>
              X
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
