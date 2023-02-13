import { Link } from "react-router-dom"
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css"

function NavBar ({onSearch}) {
    return(
        <div className={style.container}>
           <div>
                <div>
                    <Link to="/home"><button>Home</button></Link>
                </div>
                <div>
                    <SearchBar onSearch={onSearch}/>
                </div>
                <div>
                    <Link to="/create"><button>Create</button></Link>
                </div>
            </div> 
        </div>
    )
};

export default NavBar;