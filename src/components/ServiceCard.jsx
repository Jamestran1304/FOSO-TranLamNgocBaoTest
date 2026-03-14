import React from 'react';
import { useCartDispatch } from '../context/CartContext';

export default function ServiceCard({ item }) {
  const dispatch = useCartDispatch();

  function addToCart() {
    dispatch({
      type: 'ADD',
      item: {
        id: item.id,
        name: item.name,
        description: item.description,
        price: item.price,
      },
    });
  }

  return (
    <div className='py-3 border-b'>
      <div className='flex items-center justify-between'>
        <div>
          <div className='font-medium'>{item.name}</div>
          <div className='text-sm text-gray-600'>{item.description}</div>
        </div>

        <div className='flex items-center gap-3'>
          <div className='font-semibold'>{item.price}</div>
          <button
            onClick={addToCart}
            className='px-3 py-1 bg-gray-800 text-white rounded'
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
