// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './sub.css'

// const Subcategory = () => {
//   const [subcategories, setSubcategories] = useState([]);
//   const [name, setName] = useState('');
//   const [description, setDescription] = useState('');
//   const [categoryId, setCategoryId] = useState(''); // Assuming you have categories to select from
//   const [editId, setEditId] = useState(null); // Used for updating

//   // Fetch all subcategories (READ)
//   const fetchSubcategories = async () => {
//     try {
//       const response = await axios.get('http://localhost:5000/api/subcategories');
//       setSubcategories(response.data);
//       console.log('res',response.data)
//     } catch (error) {
//       console.error('Error fetching subcategories:', error);
//     }
//   };

//   useEffect(() => {
//     console.log(subcategories);
//   }, [subcategories]);

//   // Create a new subcategory (CREATE)
//   const createSubcategory = async () => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/subcategories', {
//         name,
//         description,
//         catId: categoryId,
//       });
//       setSubcategories([...subcategories, response.data]);
//       setName(''); // Reset form
//       setDescription('');
//       setCategoryId('');
//     } catch (error) {
//       console.error('Error creating subcategory:', error);
//     }
//   };

//   // Update a subcategory (UPDATE)
//   const handleUpdate = async (id) => {
//     try {
//       const response = await axios.put(`http://localhost:5000/api/subcategories/${id}`, {
//         name,
//         description,
//         catId: categoryId,
//       });
//       const updatedSubcategories = subcategories && subcategories?.map(subcategory =>
//         subcategory._id === id ? response.data : subcategory
//       );
//       setSubcategories(updatedSubcategories);
//       setName(''); // Reset form
//       setDescription('');
//       setCategoryId('');
//       setEditId(null); // Exit edit mode
//     } catch (error) {
//       console.error('Error updating subcategory:', error);
//     }
//   };

//   // Delete a subcategory (DELETE)
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/subcategories/${id}`);
//       const filteredSubcategories = subcategories.filter(subcategory => subcategory._id !== id);
//       setSubcategories(filteredSubcategories);
//     } catch (error) {
//       console.error('Error deleting subcategory:', error);
//     }
//   };

//   // Fetch subcategories on component mount
//   useEffect(() => {
//     fetchSubcategories();
//   }, []);

//   // Handle form submit (CREATE or UPDATE)
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (editId) {
//       handleUpdate(editId); // If editId is set, update the subcategory
//     } else {
//       createSubcategory(); // Otherwise, create a new subcategory
//     }
//   };

//   return (
//     <div>
//       <h2>Subcategories </h2>

//       {/* Form for Create/Update */}
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <input
//           type="text"
//           placeholder="Description"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//         />
//         <input
//           type="text"
//           placeholder="Category ID"
//           value={categoryId}
//           onChange={(e) => setCategoryId(e.target.value)}
//           required
//         />
//         <button type="submit">
//           {editId ? 'Update Subcategory' : 'Create Subcategory'}
//         </button>
//       </form>

// {/* List of Subcategories */}
// {/* {Array.isArray(subcategories) ? (
//   <ul>
//     {Array.isArray(subcategories) && subcategories?.map((subcategory) => (
//       <li key={subcategory._id}>
//         <span>
//           {subcategory.name} ({subcategory.description}) - Category ID: {subcategory.catId}
//         </span>
//         <button onClick={() => {
//           setEditId(subcategory._id); // Set the current ID for edit mode
//           setName(subcategory.name);
//           setDescription(subcategory.description);
//           setCategoryId(subcategory.catId);
//         }}>
//           Edit
//         </button>
//         <button onClick={() => handleDelete(subcategory._id)}>Delete</button>
//       </li>
//     ))}
//   </ul>
// ) : (
//   <p>No subcategories found.</p>
// )} */}
// {Array.isArray(subcategories) ? (
//   <ul>
//     {subcategories?.map((subcategory) => (
//       <li key={subcategory._id}>
//         <span>
//           {subcategory.name} ({subcategory.description}) -
//           Category ID: {subcategory.catId?._id || subcategory.catId} {/* Handle object or primitive */}
//         </span>
//         <button onClick={() => {
//           setEditId(subcategory._id);
//           setName(subcategory.name);
//           setDescription(subcategory.description);
//           setCategoryId(subcategory.catId?._id || subcategory.catId); {/* Handle catId correctly */}
//         }}>
//           Edit
//         </button>
//         <button onClick={() => handleDelete(subcategory._id)}>Delete</button>
//       </li>
//     ))}
//   </ul>
// ) : (
//   <p>No subcategories found.</p>
// )}

//     </div>
//   );
// };

// export default Subcategory;

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./sub.css";

const Subcategory = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]); // State to store categories
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [categoryId, setCategoryId] = useState(""); // Store selected category ID
  const [editId, setEditId] = useState(null); // Used for updating

  // Fetch all subcategories (READ)
  const fetchSubcategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/subcategories"
      );
      setSubcategories(response.data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // Fetch all categories (for dropdown)
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data.data); // Assuming the API returns categories in `response.data.data`
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch data when the component mounts
  useEffect(() => {
    fetchSubcategories();
    fetchCategories();
  }, []);

  // Create a new subcategory (CREATE)
  const createSubcategory = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/subcategories",
        {
          name,
          description,
          catId: categoryId,
        }
      );
      setSubcategories([...subcategories, response.data]);
      setName(""); // Reset form
      setDescription("");
      setCategoryId("");
      window.location.reload();
    } catch (error) {
      console.error("Error creating subcategory:", error);
    }
  };

  // Update a subcategory (UPDATE)
  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/subcategories/${id}`,
        {
          name,
          description,
          catId: categoryId,
        }
      );
      const updatedSubcategories = subcategories.map((subcategory) =>
        subcategory._id === id ? response.data : subcategory
      );
      setSubcategories(updatedSubcategories);
      setName(""); // Reset form
      setDescription("");
      setCategoryId("");
      setEditId(null); // Exit edit mode
      window.location.reload();
    } catch (error) {
      console.error("Error updating subcategory:", error);
    }
  };

  // Delete a subcategory (DELETE)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/subcategories/${id}`);
      const filteredSubcategories = subcategories.filter(
        (subcategory) => subcategory._id !== id
      );
      setSubcategories(filteredSubcategories);
    } catch (error) {
      console.error("Error deleting subcategory:", error);
    }
  };

  // Handle form submit (CREATE or UPDATE)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      handleUpdate(editId); // If editId is set, update the subcategory
    } else {
      createSubcategory(); // Otherwise, create a new subcategory
    }
  };

  return (
    <div>
      <h2>Subcategories</h2>

      {/* Form for Create/Update */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          required
        >
          <option value="" disabled>
            Select Category
          </option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>
        <button type="submit">
          {editId ? "Update Subcategory" : "Create Subcategory"}
        </button>
      </form>

      {/* List of Subcategories */}
      {Array.isArray(subcategories) ? (
        <ul>
          {subcategories.map((subcategory) => (
            <li key={subcategory._id}>
              <span>
                {subcategory.name} ({subcategory.description}) Category:{" "}
                {subcategory.catId?.name || "No category"}{" "}
                {/* Display category name */}
              </span>
              <button
                onClick={() => {
                  setEditId(subcategory._id);
                  setName(subcategory.name);
                  setDescription(subcategory.description);
                  setCategoryId(subcategory.catId?._id || subcategory.catId);
                  {
                    /* Set catId for editing */
                  }
                }}
              >
                Edit
              </button>
              <button onClick={() => handleDelete(subcategory._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p>No subcategories found.</p>
      )}
    </div>
  );
};

export default Subcategory;
