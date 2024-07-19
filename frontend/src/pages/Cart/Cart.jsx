// Cart.jsx
// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount,url } = useContext(StoreContext);

  const navigate = useNavigate();

  console.log('Cart items:', cartItems);
  console.log('Food list:', food_list);

  return (
    <div className='cart'>
      <div className="cart-items">
        <div className="cart-items-title">
          <p>Items</p>
          <p>Title</p>
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br/>
        <hr />
        {Object.entries(cartItems).map(([id, quantity]) => {
          // Find the item by _id
          const item = food_list.find(food => food._id === id);
          if (!item) {
            return null; // If the item is not found, skip rendering
          }
          return (
            <div key={id} className="cart-item">
              <img src={url+"/images/"+item.image} alt="" />
              
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>{quantity}</p>
              
              <p>${item.price * quantity}</p>
              
             <button onClick={() => removeFromCart(id)}>Remove</button> 
            </div>
          );
        })}
      </div>
      <div className="cart-bottom">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
            <div className="cart-total-details">
               <p>Subtotal</p>
               <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
               <p>Delivery Fee</p>
               <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr />
            <div className="cart-total-details">
               <b>TOTAL</b>
               <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
            
          </div>
          <button onClick={()=>navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>
        <div className="cart-promocode">
          <div>
            <p>If you have promo code, Enter it here..</p>
            <div className="cart-promocode-input">
              <input type="text" placeholder='promo code' />
              <button>SUBMIT</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
