import axios from "axios";
import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../css/dstyle.scss";

const GetHizmetler = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        try {
            const resp = await axios.get("http://stargymtest.infinityfreeapp.com/api/get_hizmetler");
            setData(resp.data);
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            {
                data.map(item =>
                    <div className="dash_main" key={item.id}>
                        <form action="" className="dash_main_form">
                            <div className="dash_main_form_in">
                                <div className="form_baslik">
                                    <div className="form_txt">BAŞLIK</div>
                                    <input size="18" type="text" name="baslik" defaultValue={`${item.baslik}`} />
                                </div>

                                <div className="form_icerik">
                                    <div className="form_txt">İÇERİK</div>
                                    <textarea style={{ "resize": "none" }} name="icerik" id="" cols="20" rows="6">{item.icerik}</textarea>

                                    <div className="guncelle">
                                        <Link to={`hizmetupdate/${item.id}`}><a className="guncelle-btn" >GÜNCELLE</a></Link>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                )
            }
        </>
    );
}

export default GetHizmetler;
