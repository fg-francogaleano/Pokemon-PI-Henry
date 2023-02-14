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
     
     const handleInputChange = (event) => {
        const property = event.target.name;
        const value = event.target.value
        setForm({
              ...form,
              [property] : value
        })
     };
    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post("http://localhost:3001/pokemons",form)
        .then(res=>alert("Pokemon creado correctamente"))
        .catch(err=>alert(err))
     }
     return (
        <div className={style.contenedor}>
              <div className={style.contenedorForm}>
              <form onSubmit={handleSubmit}>
                        <div>
                            <h2>CREATE</h2>
                        </div>
                        <div>                    
                            <input type="text" name="name" value={form.name} onChange={handleInputChange} className={style.input}/>
                            <label for= "" className={style.label}>Name</label>
                        </div>
                        <div>    
                            <input type="text" name="hp" value={form.hp} onChange={handleInputChange} className={style.input}/>
                            <label for="" className={style.label}>Hp</label>  
                        </div>
                        <div>
                            <input type="text" name="attack" value={form.attack} onChange={handleInputChange} className={style.input}/>
                            <label for="" className={style.label}>Attack</label>
                        </div>
                        <div>
                            <input type="text" name="defense" value={form.defense} onChange={handleInputChange} className={style.input}/>
                            <label for="" className={style.label}>Defense</label>
                        </div>
                        <div>
                            <input type="text" name="speed" value={form.speed} onChange={handleInputChange} className={style.input}/>
                            <label for="" className={style.label}>Speed</label>
                        </div>
                        <div>
                            <input type="text" name="weight" value={form.weight} onChange={handleInputChange} className={style.input}/>
                            <label for="" className={style.label}>Weight</label>
                        </div>
                        <div>
                            <input type="text" name="height" value={form.height} onChange={handleInputChange} className={style.input}/>   
                            <label for="" className={style.label}>Height</label>
                        </div>
                        <div>
                            <input type="text" name="image" value={form.image} onChange={handleInputChange} className={style.input}/>
                            <label for="" className={style.label}>Image</label>
                        </div>
                        <div>
                            <select onChange={handleInputChange} value={form.type1} name="type1">
                                <option value="">Selecione un opcion</option>
                                <option value="Water">Water</option>
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
                                <option value="">Selecione un opcion</option>
                                <option value="Water">Water</option>
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