
// import React from "react";
// import { IoCloseCircleOutline } from "react-icons/io5";
// import '../App.css'

// function Formtab({handleSubmit,handleClose,handleOnChange,rest}) {
//   return (
//     <div className="addContainer">
//       <form onSubmit={handleSubmit}>
//         <div
//           className="close-btn"
//           style={{ "margin-left": "auto", fontSize: "25px" }}
//           onClick={handleClose}
//         >
//           <IoCloseCircleOutline />
//         </div>

//         <label htmlFor="name">Name : </label>
//         <input
//           type="text"
//           id="name"
//           name="name"
//           onChange={handleOnChange}
//           value={rest.name}
//           required
//         />

//         <label htmlFor="email">Email : </label>
//         <input
//           type="email"
//           id="email"
//           name="email"
//           onChange={handleOnChange}
//           value={rest.email}
//           required
//         />

//         <label htmlFor="mobile">Mobile : </label>
//         <input
//           type="number"
//           id="mobile"
//           name="mobile"
//           onChange={handleOnChange}
//           value={rest.mobile}
//           required
//         />

//         <button className="btn">Submit</button>
//       </form>
//     </div>
//   );
// }

// export default Formtab;

import React from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import '../App.css'

function Formtab({ handleSubmit, handleClose, handleOnChange, rest }) {
  return (
    <div className="addContainer">
      <form onSubmit={handleSubmit}>
        <div
          className="close-btn"
          style={{ marginLeft: "auto", fontSize: "25px", cursor: 'pointer' }} // Added cursor style for pointer
          onClick={handleClose}
        >
          <IoCloseCircleOutline />
        </div>

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={handleOnChange}
          value={rest.name}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleOnChange}
          value={rest.email}
          required
        />

        <label htmlFor="mobile">Mobile:</label>
        <input
          type="tel" 
          id="mobile"
          name="mobile"
          onChange={handleOnChange}
          value={rest.mobile}
          required
          pattern="[0-9]{10}" // Pattern for 10-digit mobile number
          title="Please enter a 10-digit mobile number"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password" // Set input type to 'password'
          id="password"
          name="password"
          onChange={handleOnChange}
          value={rest.password}
          required
        />

        <button className="btn">Submit</button>
      </form>
    </div>
  );
}

export default Formtab;

