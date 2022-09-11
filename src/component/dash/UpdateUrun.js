import { React, useState, useRef, useEffect } from "react";
import "../../css/dstyle.scss";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";

const UpdateUrun = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const subCheckedRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState();
    const [isSelectedFile, setIsSelectedFile] = useState(false);
    const [urunad, setUrunad] = useState("");
    const [urunbilgi, setUrunbilgi] = useState("");
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    const changeHandler = (e) => {
        setSelectedFile(e.target.files[0]);
        setIsSelectedFile(true);

    }

    useEffect(() => {
        getUrun();

    }, [])

    useEffect(() => {

        subCheckedRef.current.disabled = true;

        if (isSelectedFile) {
            if (selectedFile.name !== "" && (selectedFile.type === "image/jpeg" || selectedFile.type === "image/png") && selectedFile.size < (1024 * 1024 * 5)) {
                subCheckedRef.current.disabled = false;
                subCheckedRef.current.className = "p-btn";
            } else {
                subCheckedRef.current.className = "p-btn-deactive";
            }
        }

    });


    const getUrun = async () => {
        try {
            const resp = await axios.get(`http://stargymtest.infinityfreeapp.com/api/get_product/${id}`);
            setData(resp.data);

        } catch (error) {
            console.error(error);
        }
    }

    async function handlerUpdate(e) {
        e.preventDefault();

        const productData = new FormData();
        productData.append("file", selectedFile);
        productData.append("urunad", urunad);
        productData.append("urunbilgi", urunbilgi);

        try {
            await axios({
                url: `http://stargymtest.infinityfreeapp.com/api/update_product/${id}`,
                method: "post",
                data: productData
            });
            setIsLoading(false);
            navigate("../geturunler")
        } catch (error) {
            console.error(error);
        }

    }

    const renderArea = (<div className="update-products">
        <div className="back-button"><button onClick={() => navigate(-1)} ><i className="fa-solid fa-angle-left"></i>&nbsp;&nbsp;<span>GERİ</span></button></div>
        <form key={data.id} className="p-form" action="" method="" encType="multipart/form-data">
            <div className="prod-head">
                <h3>ÜRÜN GÜNCELLEME</h3>
                <hr />
            </div>

            <div className="kapsa">
                <div className="p-photo">
                    <img src={data.fotoyol} alt={data.urunad} />
                    <p className="p-card-text"><input type="file" name="dosya" onChange={changeHandler} /></p>
                </div>

                <div className="baslik">
                    <div className="prod-tittle">Ürün Adı</div>
                    <textarea style={{ "resize": "none" }} name="urunad" id="" cols="80" rows="4" onChange={(e) => setUrunad(e.target.value)}>{data.urunad}</textarea>
                </div>

                <div className="icerik">
                    <div className="prod-tittle">Ürün Bilgisi</div>
                    <textarea style={{ "resize": "none" }} name="urunbilgi" id="" cols="80" rows="12" maxlength="500" onChange={(e) => setUrunbilgi(e.target.value)}>{data.urunbilgi}</textarea>
                </div>

                <input ref={subCheckedRef} type="submit" value="GÜNCELLE" name="buton" className="p-btn-deactive" onClick={handlerUpdate} />
            </div>
        </form>
    </div>)

    return (
        <>
            {isLoading ? <LoadingSpinner /> : renderArea}
        </>
    );
}

export default UpdateUrun;