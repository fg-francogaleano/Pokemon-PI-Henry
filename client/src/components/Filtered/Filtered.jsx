import { useState } from "react";
import style from "./Filtered.module.css"

function Filtered ({filtrado}) {
    const [value, setValue] = useState("");
    
    const handleInputChange = (event) => {
        const { value } = event.target
       
        setValue(value); 
        filtrado(value)
    };

    return(
        <div className={style.container}>
            <div>
                <select onChange={handleInputChange} value={value}>
                            <option value="">Type</option>
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
            </div>     
            <div>
                <select onChange={handleInputChange} value={value}>
                    <option value="">Origin</option>
                    <option value="created">Created</option>
                    <option value="existing">Existing</option>
                </select>
            </div>
            <div>
                <select onChange={handleInputChange} value={value}>
                    <option value="">Name</option>
                    <option value="ascName">Ascendant</option>
                    <option value="descName">Descendant</option>
                </select>
            </div>    
            <div>
                <select onChange={handleInputChange} value={value}>
                    <option value="">Attack</option>
                    <option value="ascAttack">Ascendant</option>
                    <option value="descAttack">Descendant</option>
                </select>
            </div>
        </div>
    )
};

export default Filtered