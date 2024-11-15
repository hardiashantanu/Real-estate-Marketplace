// import React, { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from "axios";
// import "./PropertyDetails.css";

// const PropertyDetails = () => {
//   const { id } = useParams();
//   const [property, setProperty] = useState(null);
//   const [isEditing, setIsEditing] = useState(false);
//   const [editData, setEditData] = useState({
//     title: "",
//     description: "",
//     price: "",
//     location: "",
//   });
//   const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
//   const userId = useSelector((state) => state.auth.userId);
//   const isAdmin = useSelector((state) => state.auth.isAdmin); // Check if the user is an admin
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProperty = async () => {
//       try {
//         const response = await axios.get(`http://localhost:5000/api/properties/${id}`);
//         console.log("Fetched property data:", response.data);
//         setProperty(response.data);
//         setEditData({
//           title: response.data.title,
//           description: response.data.description,
//           price: response.data.price,
//           location: response.data.location,
//         });
//       } catch (error) {
//         console.error("Error fetching property details:", error);
//       }
//     };
//     fetchProperty();
//   }, [id]);

//   const handleEditToggle = () => {
//     setIsEditing(!isEditing);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setEditData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:5000/api/properties/${id}`, editData, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       alert("Property updated successfully");
//       setProperty({ ...property, ...editData });
//       setIsEditing(false);
//     } catch (error) {
//       console.error("Error updating property:", error.response?.data || error.message);
//       alert("Failed to update property");
//     }
//   };

//   const handleDelete = async () => {
//     try {
//       await axios.delete(`http://localhost:5000/api/properties/${id}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       });
//       alert("Property deleted successfully");
//       navigate("/all-property");
//     } catch (error) {
//       console.error("Error deleting property:", error.response?.data || error.message);
//       alert("Failed to delete property");
//     }
//   };

//   // Handle verify property for admin
//   const handleVerifyProperty = async () => {
//     try {
//       await axios.post(
//         `http://localhost:5000/api/properties/verify/${id}`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       alert("Property verified successfully");
//       setProperty({ ...property, verified: true });
//     } catch (error) {
//       console.error("Error verifying property:", error.response?.data || error.message);
//       alert("Failed to verify property");
//     }
//   };

//   // Handle property purchase
//   const handlePurchase = async () => {
//     if (!isLoggedIn) {
//       alert("You must be logged in to purchase a property.");
//       return;
//     }
//     try {
//       const response = await axios.post(
//         `http://localhost:5000/api/properties/${id}/purchase`,
//         {},
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         }
//       );
//       alert("Property purchased successfully");
//       setProperty(response.data); // Update the property with the purchased data
//     } catch (error) {
//       console.error("Error purchasing property:", error.response?.data || error.message);
//       alert("Failed to purchase property");
//     }
//   };

//   if (!property) return <p>Loading...</p>;

//   const isSeller = isLoggedIn && property.seller?._id?.toString() === userId?.toString();

//   return (
//     <div className="property-details">
//       <img src={`http://localhost:5000/${property.image}`} alt={property.title} className="property-image" />
//       <h2 className="property-title">{property.title}</h2>
//       <p className="property-description">{property.description}</p>
//       <p className="property-price">Price: ${property.price}</p>
//       <p className="property-location">Location: {property.location}</p>
//       <p className="property-seller">Seller: {property.seller?.name || "Anonymous"}</p>
//       <p className="property-status">Status: {property.verified ? "Verified" : "Not Verified"}</p>
//       {property.purchased?.status && property.purchased?.user ? (
//         <p className="property-purchased">Purchased By: {property.purchased.user.name || "Unknown Buyer"}</p>
//       ) : (
//         <p className="property-purchased">Status: Available for purchase</p>
//       )}

//       {!property.purchased?.status && (
//         <button
//           className="btn-purchase"
//           onClick={handlePurchase}
//           style={{ backgroundColor: "green", color: "white", padding: "10px 20px", margin: "5px", border: "none", borderRadius: "5px" }}
//         >
//           Purchase Property
//         </button>
//       )}

//       {isSeller && (
//         <div className="property-actions">
//           <button
//             className="btn-edit"
//             onClick={handleEditToggle}
//             style={{ backgroundColor: "red", color: "white", padding: "10px 20px", margin: "5px", border: "none", borderRadius: "5px" }}
//           >
//             {isEditing ? "Cancel" : "Edit"}
//           </button>
//           <button
//             className="btn-delete"
//             onClick={handleDelete}
//             style={{ backgroundColor: "red", color: "white", padding: "10px 20px", margin: "5px", border: "none", borderRadius: "5px" }}
//           >
//             Delete
//           </button>
//         </div>
//       )}

//       {isEditing && isSeller && (
//         <form className="edit-form" onSubmit={handleUpdate}>
//           <div className="form-group">
//             <label>Title</label>
//             <input
//               type="text"
//               name="title"
//               value={editData.title}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Description</label>
//             <textarea
//               name="description"
//               value={editData.description}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Price</label>
//             <input
//               type="number"
//               name="price"
//               value={editData.price}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label>Location</label>
//             <input
//               type="text"
//               name="location"
//               value={editData.location}
//               onChange={handleInputChange}
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="btn-save"
//             style={{ backgroundColor: "green", color: "white", padding: "10px 20px", margin: "5px", border: "none", borderRadius: "5px" }}
//           >
//             Save Changes
//           </button>
//         </form>
//       )}

//       {isAdmin && !property.verified && (
//         <button
//           className="btn-verify"
//           onClick={handleVerifyProperty}
//           style={{ backgroundColor: "blue", color: "white", padding: "10px 20px", margin: "5px", border: "none", borderRadius: "5px" }}
//         >
//           Verify Property
//         </button>
//       )}
//     </div>
//   );
// };

// export default PropertyDetails;


import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import "./PropertyDetails.css";

const PropertyDetails = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: "",
    description: "",
    price: "",
    location: "",
  });
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const userId = useSelector((state) => state.auth.userId);
  const isAdmin = useSelector((state) => state.auth.isAdmin); // Check if the user is an admin
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/properties/${id}`);
        console.log("Fetched property data:", response.data);
        setProperty(response.data);
        setEditData({
          title: response.data.title,
          description: response.data.description,
          price: response.data.price,
          location: response.data.location,
        });
      } catch (error) {
        console.error("Error fetching property details:", error);
      }
    };
    fetchProperty();
  }, [id]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/properties/${id}`, editData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Property updated successfully");
      setProperty({ ...property, ...editData });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating property:", error.response?.data || error.message);
      alert("Failed to update property");
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/properties/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Property deleted successfully");
      navigate("/all-property");
    } catch (error) {
      console.error("Error deleting property:", error.response?.data || error.message);
      alert("Failed to delete property");
    }
  };

  // Handle verify property for admin
  const handleVerifyProperty = async () => {
    try {
      await axios.post(
        `http://localhost:5000/api/properties/verify/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Property verified successfully");
      setProperty({ ...property, verified: true });
    } catch (error) {
      console.error("Error verifying property:", error.response?.data || error.message);
      alert("Failed to verify property");
    }
  };

  // Handle property purchase
  const handlePurchase = async () => {
    if (!isLoggedIn) {
      alert("You must be logged in to purchase a property.");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:5000/api/properties/${id}/purchase`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert("Property purchased successfully");
      setProperty(response.data); // Update the property with the purchased data
    } catch (error) {
      console.error("Error purchasing property:", error.response?.data || error.message);
      alert("Failed to purchase property");
    }
  };

  if (!property) return <p>Loading...</p>;

  const isSeller = isLoggedIn && property.seller?._id?.toString() === userId?.toString();

  return (
    <div className="property-details">
      <img src={`http://localhost:5000/${property.image}`} alt={property.title} className="property-image" />
      <h2 className="property-title">{property.title}</h2>
      <p className="property-description">{property.description}</p>
      <p className="property-price">Price: ${property.price}</p>
      <p className="property-location">Location: {property.location}</p>
      <p className="property-seller">Seller: {property.seller?.name || "Anonymous"}</p>
      <p className="property-status">Status: {property.verified ? "Verified" : "Not Verified"}</p>
      {property.purchased?.status && property.purchased?.user ? (
        <p className="property-purchased">Purchased By: {property.purchased.user.name || "Unknown Buyer"}</p>
      ) : (
        <p className="property-purchased">Status: Available for purchase</p>
      )}

      {/* Render the Purchase button only if the logged-in user is not the seller */}
      {!property.purchased?.status && !isSeller && (
        <button
          className="btn-purchase"
          onClick={handlePurchase}
          style={{ backgroundColor: "green", color: "white", padding: "10px 20px", margin: "5px", border: "none", borderRadius: "5px" }}
        >
          Purchase Property
        </button>
      )}

      {isSeller && (
        <div className="property-actions">
          <button
            className="btn-edit"
            onClick={handleEditToggle}
            style={{ backgroundColor: "red", color: "white", padding: "10px 20px", margin: "5px", border: "none", borderRadius: "5px" }}
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
          <button
            className="btn-delete"
            onClick={handleDelete}
            style={{ backgroundColor: "red", color: "white", padding: "10px 20px", margin: "5px", border: "none", borderRadius: "5px" }}
          >
            Delete
          </button>
        </div>
      )}

      {isEditing && isSeller && (
        <form className="edit-form" onSubmit={handleUpdate}>
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={editData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={editData.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={editData.price}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              name="location"
              value={editData.location}
              onChange={handleInputChange}
              required
            />
          </div>
          <button
            type="submit"
            className="btn-save"
            style={{ backgroundColor: "green", color: "white", padding: "10px 20px", margin: "5px", border: "none", borderRadius: "5px" }}
          >
            Save Changes
          </button>
        </form>
      )}

      {isAdmin && !property.verified && (
        <button
          className="btn-verify"
          onClick={handleVerifyProperty}
          style={{ backgroundColor: "blue", color: "white", padding: "10px 20px", margin: "5px", border: "none", borderRadius: "5px" }}
        >
          Verify Property
        </button>
      )}
    </div>
  );
};

export default PropertyDetails;

