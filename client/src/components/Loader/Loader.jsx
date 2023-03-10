import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners"
import style from "./Loader.module.css"

function Loader (props) {
    const [isLoading, setIsLoading] = useState(true);
     
    useEffect(() => {
        setIsLoading(props.isLoading)
    }, [props.isLoading])
    
    if(isLoading) {
        return (
            <div className={style.container}>
               <PulseLoader size={25}/>
            </div>
        )
    };

    return props.children
};

export default Loader;