import { React, useState, useEffect } from "react";
import "../../css/dstyle.scss";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UpdateMain = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    },[])

    const getData=async ()=>{
        try {
            const resp = await axios.get(`http://stargymtest.infinityfreeapp.com/api/get_main/${id}`);
            setData(resp.data);
        } catch (error) {
            console.error(error);
        }

    }

    return (
        <>
            <div className="back-button"><button onClick={() => navigate(-1)} ><i className="fa-solid fa-angle-left"></i>&nbsp;&nbsp;<span>GERİ</span></button></div>
            <div className="dash-area-form" key={data.id}>
                <div className="d-guncelle">
                    <form action="" className="guncelle-form" method="">
                        <div className="f-baslik">
                            <div className="ftxt">BAŞLIK</div>
                            <textarea style={{ "resize": "none" }} name="baslik" id="" cols="30" rows="15">{data.baslik}</textarea>
                            <div className="guncelle">
                                <input type="submit" name="buton" value="GÜNCELLE" className="guncelle-btn" />
                            </div>
                        </div>
                        <div className="f-icerik">
                            <div className="ftxt">İÇERİK</div>
                            <textarea style={{ "resize": "none" }} name="icerik" id="" cols="30" rows="15">{data.icerik}</textarea>
                            <div className="guncelle">
                                <input type="submit" name="buton" value="GÜNCELLE" className="guncelle-btn" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </>

    );
}

export default UpdateMain;
