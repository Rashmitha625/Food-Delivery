// Fooditem.jsx
// eslint-disable-next-line no-unused-vars
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './Fooditem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const Fooditem = ({ id, name, price, description, image }) => {
  const { cartItems, addToCart, removeFromCart ,url} = useContext(StoreContext);

  // Log the id being received and cart items state for debugging
  console.log(`Rendering Fooditem with id: ${id}`);
  console.log('Current cartItems state:', cartItems);

  return (
    <div className='food-item'>
      <div className="food-item-img-container">
        <img className='food-item-img' src={url+ "/images/"+image} alt={name} />
        {!cartItems[id] 
          ? <img className='add' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="Add" />
          : <div className='food-item-counter'>
              <img onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="Remove" />
              <p>{cartItems[id]}</p>
              <img onClick={() => addToCart(id)} src={assets.add_icon_green} alt="Add" />
            </div>
        }
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{name}</p>
          <img src={assets.rating_starts} alt="Rating" />
        </div>
        <p className="food-item-desc">{description}</p>
        <p className="food-item-price">${price}</p>
      </div>
    </div>
  );
};

Fooditem.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string,
  image: PropTypes.string.isRequired,
};

Fooditem.defaultProps = {
  description: 'No description available.',
};

export default Fooditem;
