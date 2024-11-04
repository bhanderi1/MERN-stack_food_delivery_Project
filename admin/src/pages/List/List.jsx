import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = () => {
  const [list, setList] = useState([]);

<<<<<<< HEAD
=======
  // Fetching food data on component mount
>>>>>>> 3c841a4e8da9f807cdd15bfbab9a601cfd8ff124
  useEffect(() => {
    axios
      .get('http://localhost:4000/api/food/food-list')
      .then(response => setList(response.data.food))
      .catch(err => console.error('Error fetching food data:', err));
  }, []);

<<<<<<< HEAD
=======
  // Remove food item handler
>>>>>>> 3c841a4e8da9f807cdd15bfbab9a601cfd8ff124
  const removeFood = (id) => {
    axios
      .delete(`http://localhost:4000/api/food/food-item-delete?foodId=${id}`)
      .then(response => {
        toast.success(response.data.message);
        setList(list.filter(item => item._id !== id));
      })
      .catch(err => {
        console.error('Error deleting the item:', err);
        toast.error('Failed to delete the item');
      });
  };

  return (
    <div className='list add-flex-col'>
<<<<<<< HEAD
      <h3>All Foods List</h3>
=======
      <p>All Foods List</p>
>>>>>>> 3c841a4e8da9f807cdd15bfbab9a601cfd8ff124
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
            <img 
              src={`http://localhost:4000/${item.image}`} 
              alt={item.name} 
              className='item-image' 
            />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>${item.price}.00</p>
            <button 
              onClick={() => removeFood(item._id)} 
              className='delete-button'
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
