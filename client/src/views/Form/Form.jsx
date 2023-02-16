import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./Form.module.css"

function Form () {
    const [form, setForm] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        weight: '',
        height: '',
        image: '',
        type1: '',
        type2: ''
     });

     const [error, setError] = useState({
        name: '',
        hp: '',
        attack: '',
        defense: '',
        speed: '',
        weight: '',
        height: '',
        image: '',
        type1: '',
        type2: ''
     });

     const validate = (form) => {
        if(form.name){
            if(/^[a-z]{0,10}$/.test(form.name)) setError({...error, name:""});
            else setError({...error, name:"*max 10 characters"});
        }

        if(form.hp){
            if(/^[0-9]{1,3}$/.test(form.hp)) setError({...error, hp:""});
            else setError({...error, hp:"*integers-max 3 digits"});
        }

        if(form.attack){
            if(/^[0-9]{1,3}$/.test(form.attack) || !form.attack) setError({...error, attack:""})
            else setError({...error, attack:"Integers-max 3 digits"})
        }

        if(form.defense){
            if(/^[0-9]{1,3}$/.test(form.defense) || !form.defense) setError({...error, defense:""})
            else setError({...error, defense:"Integers-max 3 digits"})
        }

        if(form.speed){
            if(/^[0-9]{1,3}$/.test(form.speed) || !form.speed) setError({...error, speed:""})
            else setError({...error, speed:"Integers-max 3 digits"})
        }

        if(form.weight){
            if(/^[0-9]{1,3}$/.test(form.weight) || !form.weight) setError({...error, weight:""})
            else setError({...error, weight:"Integers-max 3 digits"})
        }

        if(form.height){
            if(/^[0-9]{1,3}$/.test(form.height) || !form.height) setError({...error, height:""})
            else setError({...error, height:"Integers-max 3 digits"})
        }
        
     }
     
     const handleInputChange = (event) => {
        const property = event.target.name;
        const value = event.target.value
        
        validate({...form, [property] : value})
        
        setForm({...form, [property] : value})
        
     };
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3001/pokemons",form)
        .then(res=>alert(res))
        .catch(err=>alert(err))
     }
     return (
        <div className={style.contenedor}>
              <div className={style.contenedorForm}>
              <form onSubmit={handleSubmit}>
                        <div>
                            <h1>CREATE POKEMON</h1>
                        </div>
                        <div>                    
                            <input type="text" name="name" value={form.name} onChange={handleInputChange} className={style.input}/>
                            <label for= "" className={style.label}>Name</label>
                            {error.name &&  <span>{error.name}</span>}  
                        </div>
                        <div>    
                            <input type="text" name="hp" value={form.hp} onChange={handleInputChange} className={style.input}/>
                            <label for="" className={style.label}>Hp</label>
                            {error.hp &&  <span>{error.hp}</span>}  
                        </div>
                        <div>
                            <input type="text" name="attack" value={form.attack} onChange={handleInputChange} className={style.input}/>
                            <label for="" className={style.label}>Attack</label>
                            {error.attack &&  <span>{error.attack}</span>}
                        </div>
                        <div>
                            <input type="text" name="defense" value={form.defense} onChange={handleInputChange} className={style.input}/>
                            <label for="" className={style.label}>Defense</label>
                            {error.defense &&  <span>{error.defense}</span>}
                        </div>
                        <div>
                            <input type="text" name="speed" value={form.speed} onChange={handleInputChange} className={style.input}/>
                            <label for="" className={style.label}>Speed</label>
                            {error.speed &&  <span>{error.speed}</span>}
                        </div>
                        <div>
                            <input type="text" name="weight" value={form.weight} onChange={handleInputChange} className={style.input}/>
                            <label for="" className={style.label}>Weight</label>
                            {error.weight &&  <span>{error.weight}</span>}
                        </div>
                        <div>
                            <input type="text" name="height" value={form.height} onChange={handleInputChange} className={style.input}/>   
                            <label for="" className={style.label}>Height</label>
                            {error.height &&  <span>{error.height}</span>}
                        </div>
                        <div>
                            <input type="text" name="image" value={form.image} onChange={handleInputChange} className={style.input}/>
                            <label for="" className={style.label}>Image</label>
                        </div>
                        <div>
                            <select onChange={handleInputChange} value={form.type1} name="type1">
                                <option value="">Select a type</option>
                                <option value="normal">Normal</option>
                                <option value="fighting">Fighting</option>
                                <option value="flying">Flying</option>
                                <option value="poison">Poison</option>
                                <option value="ground">Ground</option>
                                <option value="rock">Rock</option>
                                <option value="bug">Bug</option>
                                <option value="ghost">Ghost</option>
                                <option value="steel">Steel</option>
                                <option value="fire">Fire</option>
                                <option value="water">Water</option>
                                <option value="grass">Grass</option>
                                <option value="electric">Electric</option>
                                <option value="psychic">Psychic</option>
                                <option value="ice">Ice</option>
                                <option value="dragon">Dragon</option>
                                <option value="dark">Dark</option>
                                <option value="fairy">Fairy</option>
                                <option value="unknown">Unknown</option>
                                <option value="shadow">Shadow</option>
                            </select>
                            <label for="" className={style.labelSelect}>Type 1</label>
                        </div>
                        <div>
                            <select onChange={handleInputChange} value={form.type2} name="type2">
                                <option value="">Select a type</option>
                                <option value="normal">Normal</option>
                                <option value="fighting">Fighting</option>
                                <option value="flying">Flying</option>
                                <option value="poison">Poison</option>
                                <option value="ground">Ground</option>
                                <option value="rock">Rock</option>
                                <option value="bug">Bug</option>
                                <option value="ghost">Ghost</option>
                                <option value="steel">Steel</option>
                                <option value="fire">Fire</option>
                                <option value="water">Water</option>
                                <option value="grass">Grass</option>
                                <option value="electric">Electric</option>
                                <option value="psychic">Psychic</option>
                                <option value="ice">Ice</option>
                                <option value="dragon">Dragon</option>
                                <option value="dark">Dark</option>
                                <option value="fairy">Fairy</option>
                                <option value="unknown">Unknown</option>
                                <option value="shadow">Shadow</option>
                            </select>
                            <label for="" className={style.labelSelect}>Type 2</label> 
                        </div>
                            <button type="submit" className={style.button}>CREATE</button>
                    </form>
              </div>
        </div>
     );
};

export default Form;