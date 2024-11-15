// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import './PropertyListingPage.css';

// const PropertyListingPage = () => {
//   const [properties, setProperties] = useState([]);
//   const BASE_URL = 'http://localhost:5000'; // Define the base URL here

//   useEffect(() => {
//     const fetchProperties = async () => {
//       try {
//         const response = await axios.get(`${BASE_URL}/api/properties/verified`); // Use the verified properties endpoint
//         setProperties(response.data);
//       } catch (error) {
//         console.error('Error fetching properties:', error);
//         alert('Failed to load properties');
//       }
//     };

//     fetchProperties();
//   }, []);

//   return (
//     <div className="property-listing">
//       <h2 className="listing-title">Available Properties</h2>
//       <div className="properties-grid">
//         {properties.map((property) => (
//           <Link key={property._id} to={`/property/${property._id}`} className="property-link">
//             <div className="property-card">
//               {property.image && (
//                 <img
//                   src={`${BASE_URL}/${property.image}`}
//                   alt={property.title}
//                   className="property-image"
//                 />
//               )}
//               <h3 className="property-title">{property.title}</h3>
//               <p className="property-description">{property.description}</p>
//               <p className="property-price">Price: ${property.price}</p>
//               <p className="property-location">Location: {property.location}</p>
//               <p className="property-seller">Seller: {property.seller?.name || 'Anonymous'}</p>
//             </div>
//           </Link>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default PropertyListingPage;


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './PropertyListingPage.css';

const PropertyListingPage = () => {
  const [properties, setProperties] = useState([]);
  const BASE_URL = 'http://localhost:5000'; // Define the base URL here

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/properties/verified`); // Use the verified properties endpoint
        setProperties(response.data);
      } catch (error) {
        console.error('Error fetching properties:', error);
        alert('Failed to load properties');
      }
    };

    fetchProperties();
  }, []);

  return (
    <div className="property-listing">
      <h2 className="listing-title">Available Properties</h2>
      <div className="properties-grid">
        {properties.map((property) => (
          <Link key={property._id} to={`/property/${property._id}`} className="property-link">
            <div className="property-card">
              {property.image && (
                <img
                  src={`${BASE_URL}/${property.image}`}
                  alt={property.title}
                  className="property-image"
                />
              )}
              <h3 className="property-title">{property.title}</h3>
              <p className="property-description">{property.description}</p>
              <p className="property-price">Price: ${property.price}</p>
              <p className="property-location">Location: {property.location}</p>
              <p className="property-seller">Seller: {property.seller?.name || 'Anonymous'}</p>
              <p className="property-purchased">
                Purchased By: {property.purchased?.status ? property.purchased.user?.name || 'Unknown Buyer' : 'Not Purchased'}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default PropertyListingPage;
