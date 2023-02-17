import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPokemonName } from '../../redux/actions'
import style from './SearchBar.module.css' 

export default function SearchBar() {
   const [name, setName] = useState("")
   
   const handleInput =(event)=>{
      const value = event.target.value
      setName(value)
    };   

   const dispatch = useDispatch();
   const onSearch = (name) => {
      dispatch(getPokemonName(name));
      setName("");
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
