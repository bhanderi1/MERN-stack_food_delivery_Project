import React, { useState } from 'react'
import './Add.css'
import { assets } from '../../assets/asset'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = () => {
    const [name,setname]= useState("")
    const [description,setDescription]= useState("")
    const [category,setCategory]= useState("")
    const [price,setPrice]= useState("")
    const [image,setImage]= useState(false)
    

    const handelSubmit = async (e) => {
        // e.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('foodImage', image); 
        try {
            const response = await axios.post('http://localhost:4000/api/food/add-food', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response);
            toast.success("Product added successfully!");
            
        } catch (error) {
            console.error(error);
            toast.error("Failed to add product.");
        }
    };
    
    return (
        <div className='add'>
           <form className='flex-col' onSubmit={handelSubmit}>
                <div className="add-img-upload flex-col">
                    <p>Upload Image</p>
                    <label htmlFor="image" className='add_image'>
                        <img src={image ? URL.createObjectURL(image) : assets.upload_area} alt="Upload_Image" />
                    </label>
                    <input type="file" id="image" hidden required onChange={(e) => setImage(e.target.files[0])} />
                </div>
                <div className="add-product-name flex-col">
                    <p>Product name</p>
                    <input type="text" name="name" placeholder='Type here' onChange={(e)=>setname(e.target.value)} />
                </div>
                <div className='add-product-description flex-col'>
                    <p>Product Description</p>
                    <textarea name="description" id="" rows="6" placeholder='Write content here' required onChange={(e)=>setDescription(e.target.value)}></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Product category</p>
                        <select name="category" id="category" onChange={(e)=>setCategory(e.target.value)}>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure Veg">Pure Veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Product price</p>
                        <input type="Number" name="price" placeholder="$20" onChange={(e)=>{setPrice(e.target.value)}} />
                    </div>
                </div>
                <button type='submit' className='add-btn'>ADD</button>
            </form>
        </div>
    )
}

export default Add
