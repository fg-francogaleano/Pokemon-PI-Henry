import { useState } from 'react';

export default function SearchBar({onSearch}) {
   const [name, setName] = useState("")
   
   const handleInput =(event)=>{
      const value = event.target.value
      setName(value)
    };
  
   return (
      <div>
         <input 
         type="text" 
         name="search"  
         onChange={(e)=>handleInput(e)} 
         value={name}/>
         <button type="submit" onClick={() => onSearch(name)}>Search</button>
      </div>
   );
}
