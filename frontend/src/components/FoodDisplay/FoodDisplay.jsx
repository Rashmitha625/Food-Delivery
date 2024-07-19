// FoodDisplay.jsx
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import './FoodDisplay.css';
import { StoreContext } from '../../context/StoreContext';
import Fooditem from '../Fooditem/Fooditem';

const FoodDisplay = ({ category }) => {
  const { food_list } = useContext(StoreContext);

  console.log('Rendering FoodDisplay with category:', category);
  console.log('Food list:', food_list);

  return (
    <div className='food-display' id='food-display'>
      <h2>Top dishes near you</h2>
      <div className="food-display-list">
        {food_list.map((item) => {
          console.log(`Rendering item: ${JSON.stringify(item)}`);

          if (category === "All" || category === item.category) {
            return (
              <Fooditem 
                key={item._id} // Use item._id instead of index for the key
                id={item._id}  // Pass item._id as id to Fooditem
                name={item.name}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            );
          }

          return null; // Return null if the item does not match the category
        })}
      </div>
    </div>
  );
};

FoodDisplay.propTypes = {
  category: PropTypes.string.isRequired, // Validate category as a required string prop
};

export default FoodDisplay;
