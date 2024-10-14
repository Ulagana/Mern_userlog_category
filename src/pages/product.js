import React, { useState, useEffect } from "react";
import axios from "axios";
import "./pp.css";

function Product() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [catId, setCatId] = useState("");
  const [subCatId, setSubCatId] = useState("");
  const [image, setImage] = useState(null); // Handle image file
  const [editId, setEditId] = useState(null); // For update
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [timestamp, setTimestamp] = useState("");
  const [catbasefilter, setCatbasefilter] = useState("");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []); // Remove fetchSubcategories from here

  useEffect(() => {
    console.log("catId", catId);
  }, [catId]);

  // Fetch products
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/categories");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  // Fetch subcategories based on selected category
  //   const fetchSubcategories = async (categoryId) => {
  //     try {
  //         const response = await axios.get(`http://localhost:5000/api/subcategories`);
  //         // console.log("Subcategories:", response.data);
  //         setSubcategories(response.data);
  //     } catch (error) {
  //         console.error('Error fetching subcategories:', error);
  //     }
  // };
  const fetchSubcategories = async (categoryId) => {
    console.log("Fetching subcategories for categoryId:", categoryId); // Debugging info
    if (!categoryId) {
      console.error("No categoryId provided");
      return;
    }

    try {
      const response = await axios.get(
        `http://localhost:5000/api/subcategories/`
      );
      console.log("Subcategories:", response.data);
      const Responsedata = response?.data;
      const filteredData =
        Responsedata &&
        Responsedata.filter((item) => item.catId._id === categoryId);
      setSubcategories(filteredData);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  // const handleSubmit = async (e) => {
  //     e.preventDefault();

  //     const productData = new FormData(); // To handle image upload
  //     productData.append('name', name);
  //     productData.append('catId', catId);
  //     productData.append('subCatId', subCatId);
  //     productData.append('image', image); // Append image file
  //     productData.append('timestamp', new Date().toISOString());

  //     try {
  //         if (editId) {
  //             // Update
  //             await axios.put(`http://localhost:5000/api/products/${editId}`, productData, {
  //                 headers: { 'Content-Type': 'multipart/form-data' }
  //             });
  //         } else {
  //             // Create
  //             await axios.post('http://localhost:5000/api/products', productData, {
  //                 headers: { 'Content-Type': 'multipart/form-data' }
  //             });
  //         }
  //         setName('');
  //         setCatId('');
  //         setSubCatId('');
  //         setImage(null);
  //         setTimestamp('');
  //         setEditId(null);
  //         fetchProducts();
  //     } catch (error) {
  //         console.error('Error saving product:', error);
  //     }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = new FormData();
    productData.append("name", name);
    productData.append("catId", catId);
    productData.append("subCatId", subCatId);
    productData.append("image", image);
    productData.append("timestamp", new Date().toISOString());

    // Log the FormData for debugging

    try {
      if (editId) {
        // Update
        const response = await axios.put(
          `http://localhost:5000/api/products/${editId}`,
          productData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log("Update Response:", response.data); // Log response for debugging
      } else {
        // Create
        await axios.post("http://localhost:5000/api/products", productData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      //Reset form fields
      setName("");
      setCatId("");
      setSubCatId("");
      setImage("");
      setTimestamp("");
      setEditId(null);
      fetchProducts(); // Refresh products list
    } catch (error) {
      console.error("Error saving product:", error);
    }
  };

  const handleEdit = (product) => {
    setEditId(product._id);
    setName(product.name);
    setCatId(product.catId?._id || product.catId);
    setSubCatId(product.subCatId?._id || product.subCatId);
    setTimestamp(product.timestamp);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h2>Product Management</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Product Name"
          required
        />
        <select
          value={catId}
          onChange={(e) => {
            setCatId(e.target.value);
            fetchSubcategories(e.target.value);
          }}
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name}
            </option>
          ))}
        </select>

        <select
          value={subCatId}
          onChange={(e) => setSubCatId(e.target.value)}
          required
        >
          <option value="">Select Subcategory</option>
          {subcategories.length > 0 ? (
            subcategories.map((subcategory) => (
              <option key={subcategory._id} value={subcategory._id}>
                {subcategory.name}
              </option>
            ))
          ) : (
            <option value="">No Subcategories Available</option> // Display message if no subcategories
          )}
        </select>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} />

        <button type="submit">
          {editId ? "Update Product" : "Create Product"}
        </button>
      </form>

      <ul className="product-list">
        {products.map((product) => (
          <li className="product-item" key={product._id}>
            {product.image && (
              <img
                src={`http://localhost:5000/uploads/${product.image}`}
                alt={product.name}
                className="product-image"
              />
            )}

            <div className="product-info">
              <span>{product.name}</span>
              <span>Category: {product.catId?.name || "No Category"}</span>
              <span>
                Subcategory: {product.subCatId?.name || "No Subcategory"}
              </span>
            </div>

            <div className="product-buttons">
              <button onClick={() => handleEdit(product)}>Edit</button>
              <button
                className="delete"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Product;
