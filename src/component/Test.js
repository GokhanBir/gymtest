import React,{useEffect} from "react";
import {useNavigate} from "react-router-dom";


const Test = ({sata}) => {
    const navigate=useNavigate();

useEffect(()=>{
    function basari(){
        navigate("../getgaleri");
    }

    if(sata){
        setTimeout(basari,2000);
    }
})




    return (<div>BAŞARILI
        </div>);
    

}

export default Test;