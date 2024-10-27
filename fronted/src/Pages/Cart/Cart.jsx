import React, { useContext ,useState ,useEffect} from 'react'
import './Cart.css'
import { StoreContext } from '../../context/StoreContext'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = () => {
  const { cartItems, removeFromCart,getTotalCartAmount } = useContext(StoreContext);

  const navigate = useNavigate();
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4000/api/food/food-list')
      .then(response => setList(response.data.food))
      .catch(err => console.error('Error fetching food data:', err));
  }, []);

  return (
    <div className='cart'>
      <div className="cart-item">
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />
        {list.map((item) => {
          if (cartItems[item._id] > 0) {
            return (
              <div>
                <div className='cart-items-title cart-items-item'>
                  <img src={item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItems[item._id]}</p>
                  <p>${item.price * cartItems[item._id]}</p>
                  <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
                </div>
                <hr />
              </div>
            )
          }
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cart-total-details">
              <p>Subtotal</p>
              {/* <p>${getTotalCartAmount()}</p> */}
            </div>
            <hr/>
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              {/* <p>${getTotalCartAmount() === 0 ? 0 : 2}</p> */}
            </div>
            <hr/>
            <div className="cart-total-details">
              <b>Total</b>
              {/* <b>${getTotalCartAmount() === 0 ? 0 : getTotalCartAmount()+2}</b> */}
            </div>
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have a promo code, Enter it here</p>
            <div className='cart-promocode-input'>
              <input type="text" placeholder='promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart