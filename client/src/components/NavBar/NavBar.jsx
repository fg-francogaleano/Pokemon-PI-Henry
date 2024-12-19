import { Link } from "react-router-dom";
// import { IoIosArrowDown } from 'react-icons/io';
import SearchBar from "../SearchBar/SearchBar";
import style from "./NavBar.module.css";
import img from "./img/logo.png";

function NavBar({ onSearch }) {
  return (
    <div>
      <div className={style.container}>
        <div>
          <img src={img} alt="" height="50px" width="200px" />
        </div>
        <div style={{ width: "40%" }}>
          <SearchBar onSearch={onSearch} />
        </div>
        <div style={{ display: "flex", marginRight: "10px" }}>
          <div>
            <Link to="/home">
              <button className={style.button}>Home</button>
            </Link>
          </div>
          <div>
            <Link to="/create">
              <button className={style.button}>Create</button>
            </Link>
          </div>
          {/* <div>
                        <Link to="/create">
                            <button className={style.button}>About</button>
                        </Link>
                    </div> */}
        </div>
      </div>
      {/* <div style={{height:"40px", width:"100%", backgroundColor:"rgb(35,35,35)", display: "flex", alignItems:"center", justifyContent:"center"}}>
                <nav style={{}}>
                    <ul style={{}}>
                        <li 
                        className={style.list}
                        >
                            Ver todo
                        </li>
                        <li 
                        className={style.list}
                        >
                            A-Z
                            <IoIosArrowDown />
                        </li>
                        <li 
                        className={style.list}
                        >
                            Attack
                            <IoIosArrowDown />
                        </li>
                        <li 
                        className={style.list}
                        >
                            Type
                            <IoIosArrowDown />
                        </li>
                        <li 
                        className={style.list}
                        >
                            Origin
                            <IoIosArrowDown />
                        </li>
                    </ul>
                </nav>
            </div>   */}
    </div>
  );
}

export default NavBar;
