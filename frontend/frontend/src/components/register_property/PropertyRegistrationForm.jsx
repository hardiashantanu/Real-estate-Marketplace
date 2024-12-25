import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './PropertyRegistrationForm.css';

const PropertyRegistrationForm = () => {
  const navigate = useNavigate(); // Initialize navigate for redirection
  const [property, setProperty] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
  });
  const [image, setImage] = useState(null); // State for the selected image file

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProperty((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', property.title);
    formData.append('description', property.description);
    formData.append('price', property.price);
    formData.append('location', property.location);
    if (image) formData.append('image', image); // Append image file if selected

    try {
      const response = await axios.post('http://localhost:5000/api/properties/list', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Property listed successfully');
      setProperty({
        title: '',
        description: '',
        price: '',
        location: '',
      });
      setImage(null); // Clear the image file
      navigate('/all-property'); // Redirect to all-property page
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'Failed to list property';
      alert(errorMessage);
    }
  };

  return (
    <div className="property-registration">
      <h2 className="property-title">Register Your Property</h2>
      <form onSubmit={handleSubmit} className="property-form" encType="multipart/form-data">
        <div className="input-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder='The title for your property'
            value={property.title}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder='Description for your property'
            value={property.description}
            onChange={handleChange}
            required
            className="input-field textarea"
          />
        </div>
        <div className="input-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            placeholder='50000'
            value={property.price}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            placeholder='Location of the property'
            name="location"
            value={property.location}
            onChange={handleChange}
            required
            className="input-field"
          />
        </div>
        <div className="input-group">
          <label htmlFor="image">Property Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleImageChange}
            accept="image/*"
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-button">List Property</button>
      </form>
    </div>
  );
};

export default PropertyRegistrationForm;
