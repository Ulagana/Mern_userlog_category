// import { useEffect, useState } from "react";
// import "../App.css";
// // import { IoCloseCircleOutline } from "react-icons/io5";
// import axios from "axios";
// import Formtab from "./Formtab";

// axios.default.baseURL = "http://localhost:8080/";
// function App() {
//   const [addSection, setAddSection] = useState(false);
//   const [editSection, setEditSection] = useState(false);
//   const [formData, setFormData] = useState({
//     name: " ",
//     email: " ",
//     mobile: " ",
//   });

//   const [formDataEdit, setFormDataEdit] = useState({
//     name: " ",
//     email: " ",
//     mobile: " ",
//     id:''
//   });
//   const [dataList, setDataList] = useState([]);

//   //  const handleOnChange= (e)=>{
//   //     const {value,name} = e.target
//   //     setFormData((preve)= {
//   //       return{
//   //             ...preve,
//   //         [name] : value
//   //       }
//   //     })
//   //  }

//   const handleOnChange = (e) => {
 
//     const { value, name } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const data = await axios.post("http://localhost:8080/create", formData);
//     console.log(data);
//     if (data.data.success) {
//       alert(data.data.message);
//       setAddSection(false);
//       getFetchData();
//     }
//   };

//   // axios
//   // .post("http://localhost:8080/create", formData)
//   // .then((res) => {
//   //   console.log(res);
//   // })
//   // .catch((error) => {
//   //   console.log(error);
//   // });

//   //get * data

//   const getFetchData = async () => {
//     const data = await axios.get("http://localhost:8080/");
//     console.log(data);
//     if (data.data.success) {
//       setDataList(data.data.data);
//     }
//   };
//   useEffect(() => {
//     getFetchData();
//   }, []);

//   const handleDelete = async (id) => {
//     const data = await axios.delete("http://localhost:8080/delete/" + id);

//     if (data.data.success) {
//       alert(data.data.message);
//       getFetchData();
//     }
//   };

//   const handleUpdate = async (e) => {
//     e.preventDefault();
//     const data = await axios.put("http://localhost:8080/update/", formDataEdit);
//     if (data.data.success) {
//       alert(data.data.message);
//       getFetchData();
//     }
//   };

//   const handleEditOnChange = async (e) => {
//     console.log('id',e._id);
//     const { value, name } = e.target;
//     setFormDataEdit((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleEdit = (el,id) => {
//     setFormDataEdit({
//       id:id
//     })
//     console.log('id',id);
//     setFormDataEdit(el);
//     setEditSection(true);
//   };

//   return (
//     <>
//       <div className="container">
//         <button className="btn btn-add" onClick={() => setAddSection(true)}>
//           {" "}
//           Add
//         </button>

//         {addSection && (
//           <Formtab
//             handleSubmit={handleSubmit}
//             handleOnChange={handleOnChange}
//             handleClose={() => setAddSection(false)}
//             rest={formData}
//           />
//         )}
//         {editSection && (
//           <Formtab
//             handleSubmit={handleUpdate}
//             handleOnChange={handleEditOnChange}
//             handleClose={() => setEditSection(false)}
//             rest={formDataEdit}
//           />
//         )}

//         <div className="tableContainer">
//           <table>
//             <thead>
//               <tr>
//                 <td>Name</td>
//                 <td>Email</td>
//                 <td>Mobile</td>
//                 <td>Action</td>
//               </tr>
//             </thead>
//             <tbody>
//               {dataList[0] ? (
//                 dataList.map((el) => {
//                   return (
//                     <tr>
//                       <td>{el.name}</td>
//                       <td>{el.email}</td>
//                       <td>{el.mobile}</td>
//                       <td>
//                         <button
//                           className="btn btn-edit"
//                           onClick={() => handleEdit(el,el._id)}
//                         >
//                           Edit 
//                         </button>{" "}
//                         <span> </span>
//                         <button
//                           className="btn btn-del"
//                           onClick={() => handleDelete(el._id)}
//                         >
//                           delete
//                         </button>
//                       </td>
//                     </tr>
//                   );
//                 })
//               ) : (
//                 <p style={{ textAlign: "center" }}>No data Found</p>
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;


import { useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';

import "../App.css";
import axios from "axios";
import Formtab from "./Formtab";
import { useAuth } from '../AuthContext';

axios.defaults.baseURL = "http://localhost:8080/";

function Data() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "", // Added password field
  });

  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "", // Added password field for editing
    id: '',
  });
  const [dataList, setDataList] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/signup", formData);
    console.log(data);
    if (data.data.success) {
      alert(data.data.message);
      setAddSection(false);
      getFetchData();
    }
  };

 
  const getFetchData = async () => {
    const data = await axios.get("/");
    console.log(data);
    if (data.data.success) {
      setDataList(data.data.data);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);
    if (data.data.success) {
      alert(data.data.message);
      getFetchData();
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put("/update/", formDataEdit);
    if (data.data.success) {
      alert(data.data.message);
      getFetchData();
    }
  };

  const handleEditOnChange = async (e) => {
    const { value, name } = e.target;
    setFormDataEdit((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEdit = (el, id) => {
    setFormDataEdit({
      id: id,
      name: el.name,
      email: el.email,
      mobile: el.mobile,
      password: el.password,
      // Password is generally not shown in edit, keep it blank
    });
    setEditSection(true);
  };

  const handleLogout = (e) => {
    setIsLoggedIn(false);
    logout();
    alert("You have been logged out.");
    navigate("/login");
  };
  // const handleLogout = () => {
  //   logout();  // Clear the authentication token or session
  //   localStorage.removeItem('token');  // Remove any token stored in localStorage (if applicable)

  //   // Redirect to the login page
  //   navigate('/login', { replace: true });

  //   // Prevent forward and backward navigation by manipulating the browser's history state
  //   window.history.pushState(null, '', window.location.href);
  //   window.addEventListener('popstate', () => {
  //     navigate('/login', { replace: true });  // Force the user to remain on the login page
  //   });
  // };

  return (
    <>
      <div className="container">
        <button className="btn btn-add" onClick={() => setAddSection(true)}>
          Add
        </button> <span></span>
        <button className="btn btn-add" onClick={handleLogout}>
              Logout
            </button>

        {addSection && (
          <Formtab
            handleSubmit={handleSubmit}
            handleOnChange={handleOnChange}
            handleClose={() => setAddSection(false)}
            rest={formData}
          />
        )}
        {editSection && (
          <Formtab
            handleSubmit={handleUpdate}
            handleOnChange={handleEditOnChange}
            handleClose={() => setEditSection(false)}
            rest={formDataEdit}
          />
        )}

        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <td>Name</td>
                <td>Email</td>
                <td>Mobile</td>
                <td>Password</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody>
              {dataList.length > 0 ? (
                dataList.map((el) => {
                  return (
                    <tr key={el._id}>
                      <td>{el.name}</td>
                      <td>{el.email}</td>
                      <td>{el.mobile}</td>
                       <td>{el.password}</td>
                      <td>
                        <button
                          className="btn btn-edit"
                          onClick={() => handleEdit(el, el._id)}
                        >
                          Edit
                        </button>{" "}
                        <span> </span>
                        <button
                          className="btn btn-del"
                          onClick={() => handleDelete(el._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: "center" }}>
                    No data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Data;
