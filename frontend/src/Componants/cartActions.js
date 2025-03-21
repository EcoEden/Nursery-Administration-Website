import axios from 'axios';

export const addToCart = async (productId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('You must be logged in to add to cart');
      window.location.href = '/login';
      return;
    }

    const response = await axios.post(
      'http://localhost:5000/cart/add',
      { productId },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    alert('Failed to add item to cart');
  }
};
