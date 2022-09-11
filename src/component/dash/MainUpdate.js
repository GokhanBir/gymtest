import React from "react";
import "../../css/dstyle.scss";
import data from '../Data.json';
import { useParams,useNavigate } from "react-router-dom";

//silinecek
const MainUpdate = () => {
    const { id } = useParams();
    const navigate=useNavigate();
    return (

        <>
            {data.filter(items =>
                items.id === id ? items.id : null

            ).map((item) =>
            (<><div className="back-button"><button onClick={()=>navigate(-1)} ><i className="fa-solid fa-angle-left"></i>&nbsp;&nbsp;<span>GERİ</span></button></div>
            <div className="dash-area-form" key={item.id}>
                <div className="d-guncelle">
                    <form action="" className="guncelle-form" method="">
                        <div className="f-baslik">
                            <div className="ftxt">BAŞLIK</div>
                            <textarea style={{ "resize": "none" }} name="baslik" id="" cols="30" rows="15">{item.tittle}</textarea>
                            <div className="guncelle">
                                <input type="submit" name="buton" value="GÜNCELLE" className="guncelle-btn" />
                            </div>
                        </div>
                        <div className="f-icerik">
                            <div className="ftxt">İÇERİK</div>
                            <textarea style={{ "resize": "none" }} name="icerik" id="" cols="30" rows="15">{item.info}</textarea>
                            <div className="guncelle">
                                <input type="submit" name="buton" value="GÜNCELLE" className="guncelle-btn" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            </>
            ))}
            
        </>

    );
}

export default MainUpdate;
