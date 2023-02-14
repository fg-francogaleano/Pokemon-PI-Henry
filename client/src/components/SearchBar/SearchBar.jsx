import { useState } from 'react';
import style from './SearchBar.module.css' 

export default function SearchBar({onSearch}) {
   const [name, setName] = useState("")
   
   const handleInput =(event)=>{
      const value = event.target.value
      setName(value)
    };
  
   return (
      <div className={style.container}>
         <input
         placeholder='   Name' 
         type="text" 
         name="search"  
         onChange={(e)=>handleInput(e)} 
         value={name}/>
         <button type="submit" onClick={() => onSearch(name)}>Search</button>
      </div>
   );
}
