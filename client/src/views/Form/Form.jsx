import axios from "axios";
import { useState } from "react";
import styles from "./Form.module.css"

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
        .then(res=>alert(res))
        .catch(err=>alert(err))
     }
     return (
        <div className={styles.contenedor}>
              <form onSubmit={handleSubmit}>
                    <div>                    
                        <input type="text" name="name" value={form.name} onChange={handleInputChange} />
                        <label>Name: </label>
                    </div>
                    <div>    
                        <input type="number" name="hp" value={form.hp} onChange={handleInputChange} />
                        <label>Hp: </label>  
                    </div>
                    <div>
                        <input type="number" name="attack" value={form.attack} onChange={handleInputChange}/>
                        <label>Attack: </label>
                    </div>
                    <div>
                        <input type="number" name="defense" value={form.defense} onChange={handleInputChange}/>
                        <label>Defense: </label>
                    </div>
                    <div>
                        <input type="number" name="speed" value={form.speed} onChange={handleInputChange}/>
                        <label>Speed: </label>
                    </div>
                    <div>
                        <input type="number" name="weight" value={form.weight} onChange={handleInputChange}/>
                        <label>Weight: </label>
                    </div>
                    <div>
                        <input type="number" name="height" value={form.height} onChange={handleInputChange}/>   
                        <label>Height: </label>
                    </div>
                    <div>
                        <input type="text" name="image" value={form.image} onChange={handleInputChange}/>
                        <label>Image: </label>
                    </div>
                    <div>
                    <label>Type 1: </label>
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
                    </div>
                    <div>
                        <label>Type 2: </label>
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
                    </div>
                    <button type="submit">CREATE POKEMON</button>
              </form>
        </div>
     );
};

export default Form;