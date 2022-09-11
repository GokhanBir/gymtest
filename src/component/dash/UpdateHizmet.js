import { React, useState, useEffect } from "react";
import "../../css/dstyle.scss";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateHizmet = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [checkBaslik, setCheckBaslik] = useState("");
    const [checkIcerik, setCheckIcerik] = useState("");

    useEffect( () => {
        getHizmetler();
    },[])

const getHizmetler=async ()=>{
    try {
        const resp = await axios.get(`http://stargymtest.infinityfreeapp.com/api/get_hizmet/${id}`);
        setData(resp.data);
    } catch (error) {
        console.error(error);
    }
}

    const updateder = async () => {
/*         const formdata = new FormData();
        formdata.append("baslik", checkBaslik);
        formdata.append("icerik", checkIcerik); */
        console.log("baslik: "+checkBaslik+" icerik: "+checkIcerik);
        try {
            await axios(
            {   url:`http://stargymtest.infinityfreeapp.com/api/update_hizmet/${id}`,
                method:"PUT", 
                data: {baslik:checkBaslik,icerik:checkIcerik}
            });
                console.log("baslik: "+checkBaslik+" icerik: "+checkIcerik);
        } catch (error) {
            console.error("hizmet error: " + error)
        }
    }

    function baslikHandler(e) {
        console.log(e.target.value);
        setCheckBaslik(e.target.value);
    }

    function icerikHandler(e) {
        console.log(e.target.value);
        setCheckIcerik(e.target.value);
    }

    const submitHandler = (e) => {
        e.preventDefault();
    }

    return (

        <>
            <div className="back-button"><button onClick={() => navigate(-1)} ><i className="fa-solid fa-angle-left"></i>&nbsp;&nbsp;<span>GERİ</span></button></div>
            <div className="dash-area-form" key={data.id}>
                <div className="d-guncelle">
                    <form action="" className="guncelle-form" method="" onSubmit={submitHandler}>
                        <div className="f-baslik">
                            <div className="ftxt">BAŞLIK</div>
                            <textarea onChange={baslikHandler} style={{ "resize": "none" }} name="baslik" id="" cols="30" rows="15">{data.baslik}</textarea>

                        </div>
                        <div className="f-icerik">
                            <div className="ftxt">İÇERİK</div>
                            <textarea onChange={icerikHandler} style={{ "resize": "none" }} name="icerik" id="" cols="30" rows="15">{data.icerik}</textarea>

                        </div>
                        <div className="guncelle">
                            <input onClick={updateder} type="submit" name="buton" defaultValue={"GÜNCELLE"} className="guncelle-btn" />
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default UpdateHizmet;
