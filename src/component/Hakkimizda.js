import {React,useState,useEffect} from "react";
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

const Hakkimizda = () => {
    const[data,setData]=useState([]);
    const[isDataGet,setIsDataGet]=useState(false);
    useEffect(async()=>{
try {
    const response=await axios.get("http://stargymtest.infinityfreeapp.com/api/get_about");
    setData(response.data);
    setIsDataGet(true);

} catch (er) {
    console.error(er);
}

    },[])
    
    return (
        <>
{isDataGet?(            <div className="ab-container">
                <div className="ab-holder">
                    <div className="frame">
                        <iframe
                            width="100%"
                            height="100%"
                            src={data[0].link}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            allowTransparency="true"
                        ></iframe>
                    </div>
                    <div className="v-txt">
                        <p>{data[0].icerik}</p>
                    </div>
                </div>
            </div>):
            <LoadingSpinner/>
            }
        </>
    );
};

export default Hakkimizda;
