import React, { useState, useEffect } from 'react';
import { Navbar  } from "../components";

const Seller = () => {
  <Navbar/>
  const [categories, setCategories] = useState([]);
  const [newItem, setNewItem] = useState({
    Category_display_name: '',
    title:'',
    price: '',
    description: '',
    imageUrl: '',
  });

  const getCategories = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/categories', { method: 'GET' });
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevNewItem) => ({ ...prevNewItem, [name]: value }));
  };

  const handleCreateNewItem = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        const newCategory = await response.json();
        setCategories((prevCategories) => [...prevCategories, newCategory]);
        setNewItem({ Category_display_name: '',title:'', price: '', description: '', imageUrl: '' });
      } else {
        console.error('Failed to create a new item');
      }
    } catch (error) {
      console.error('Error creating a new item:', error);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div>
      <h2>Categories</h2>
     
      <h2>Create New Item</h2>
      <div>
        <label>Select Category Display Name:</label>
        <select name="Category_display_name" value={newItem.Category_display_name} onChange={handleInputChange}>
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="footwear">Footwear</option>
          <option value="apparel">Apparel</option>
        </select>
      </div>
      <div>
        <label>Enter Price:</label>
        <input type="text" name="price" value={newItem.price} onChange={handleInputChange} />
      </div>
      <div>
        <label>Enter title:</label>
        <input type="text" name="title" value={newItem.title} onChange={handleInputChange} />
      </div>
      <div>
        <label>Enter Description:</label>
        <input type="text" name="description" value={newItem.description} onChange={handleInputChange} />
      </div>
      <div>
        <label>Enter Image URL:</label>
        <input type="text" name="imageUrl" value={newItem.imageUrl} onChange={handleInputChange} />
      </div>
      <button onClick={handleCreateNewItem}>Create New Item</button>
    </div>
  );
};

export default Seller;
