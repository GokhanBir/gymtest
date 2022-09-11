import { React, useState, useEffect } from "react";
import "../../css/dstyle.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";

const GetGaleri = () => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        getData();
    }, [])


    async function getData() {
        setIsLoading(true);
        try {
            const resp = await axios.get("http://stargymtest.infinityfreeapp.com/api/get_galery");
            setData(resp.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
        }
    }
    async function deleteHandle(e, id) {
        setIsLoading(true);
        e.preventDefault();
        try {
            await axios.delete(`http://stargymtest.infinityfreeapp.com/api/del_photo/${id}`);
            getData();

        } catch (error) {
            console.error(error);
        }

    }
    const renderArea = (
        <>
            <div className="photo-area">
                <div className="photo-add">
                    <div className="ekleme">
                        <Link to="addphoto"><a href="" className="ekle-btn">YENİ FOTOĞRAF EKLE</a></Link>
                    </div>
                </div>

                <div className="photo-container">

                    {
                        data.map((item) =>

                            <div className="photo-wrap" key={item.id} >
                                <div className="photo">
                                    <img style={{ "width": "300px", "height": "300px", "marginTop": "10px" }} src={`http://stargymtest.infinityfreeapp.com//${item.path}`} alt={item.tittle} />
                                </div>
                                <div className="guncelle">
                                    <Link to={`photoupdate/${item.id}`}><a className="guncelle-btn">GÜNCELLE</a></Link>
                                </div>
                                <div className="sil">
                                    <a href="" onClick={(e) => deleteHandle(e, item.id)} className="sil-btn">SİL</a>

                                </div>
                            </div>
                        )
                    }

                </div>
            </div>
        </>
    )

    return (
        <>
            {isLoading ? <LoadingSpinner /> : renderArea}
        </>
    );
}

export default GetGaleri;