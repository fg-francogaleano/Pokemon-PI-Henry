import { Link } from "react-router-dom";

function Landing () {
    return(
        <div>
            <h2>Este es el Landing</h2>
            <Link to="/home">Home</Link>
        </div>
    )
};

export default Landing;