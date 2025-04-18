// import { useEffect, useState } from "react";
// import style from "./Filtered.module.css";
// import { getTypes } from "../../redux/actions";
// import { useDispatch, useSelector } from "react-redux";
// import { useUpdateUrl } from "../../utils/url.Utils";

// function Filtered() {
//   const dispatch = useDispatch();
//   const { applyFilters } = useUpdateUrl();

//   useEffect(() => {
//     dispatch(getTypes());
//   }, [dispatch]);

//   const { types } = useSelector((state) => state);

//   const [value, setValue] = useState("");

//   const handleInputChange = (event) => {
//     event.preventDefault(); // Previene el comportamiento predeterminado del evento.
//     const { name, value } = event.target;
//     // console.log(name, value);

//     applyFilters({ [name]: value });
//     setValue(value); // Actualiza el estado local.
//     window.location.reload(); // Recarga la página.
//   };

//   return (
//     <div className={style.container}>
//       <div>
//         <select onChange={handleInputChange} name="name" value={value}>
//           <option value="">Name A-Z</option>
//           <option value="ASC">A-Z</option>
//           <option value="DESC">Z-A</option>
//         </select>
//       </div>
//       <div>
//         <select onChange={handleInputChange} name="attack" value={value}>
//           <option value="">Attack</option>
//           <option value="ASC">Ascendant</option>
//           <option value="DESC">Descendant</option>
//         </select>
//       </div>
//       <div>
//         <select onChange={handleInputChange} name="type" value={value}>
//           <option value="">Type</option>
//           <option value="all">All</option>
//           {types?.map((type, index) => {
//             return (
//               <option key={index} value={type.name}>
//                 {type.name.replace(/^\w/, (c) => c.toUpperCase())}
//               </option>
//             );
//           })}
//         </select>
//       </div>
//       <div>
//         <select onChange={handleInputChange} name="source" value={value}>
//           <option value="">Origin</option>
//           <option value="created">Created</option>
//           <option value="existing">Existing</option>
//           <option value="all">All</option>
//         </select>
//       </div>
//     </div>
//   );
// }

// export default Filtered;
