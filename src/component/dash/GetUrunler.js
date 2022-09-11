import { React, useState, useEffect } from "react";
import "../../css/dstyle.scss";
import { Link } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";

const GetUrunler = () => {

    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        getData();

    }, [])

    const deleteData = async (e, id) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.delete(`http://stargymtest.infinityfreeapp.com/api/del_product/${id}`);
            getData();
        } catch (error) {
            console.error(error);
        }

    }

    const getData = async () => {
        setIsLoading(true);
        try {
            const resp = await axios.get("http://stargymtest.infinityfreeapp.com/api/get_products");
            setData(resp.data);
        } catch (error) {
            console.error(error);
        }
        setIsLoading(false);
    }

    const renderArea = (
        <div className="product-area">
            <div className="photo-add">
                <div className="ekleme">
                    <Link to="addurun"><a className="ekle-btn">YENİ ÜRÜN EKLE</a></Link>
                </div>
            </div>

            <div className="products" >
                <div className="p-head">ÜRÜNLER</div>
                {data.map((item) =>
                    <div className="p-wrap" key={item.id}>
                        <div className="p-name">{item.urunad}</div>
                        <div className="guncelle">
                            <Link to={`urunguncelle/${item.id}`}><a className="guncelle-btn">GÜNCELLE</a></Link>
                        </div>
                        <div className="sil">
                            <a onClick={(e) => deleteData(e, item.id)} className="sil-btn">SİL</a>
                        </div>
                    </div>
                )}
            </div>

        </div>
    )

    return (
        <>
            {isLoading ? <LoadingSpinner /> : renderArea}
        </>
    );
}

export default GetUrunler;

