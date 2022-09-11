import { React, useState, useRef, useEffect } from "react";
import "../../css/dstyle.scss";
import data from '../Data.json';
import { useParams,useNavigate } from "react-router-dom";

const UrunUpdate = () => {
    const navigate=useNavigate();
    const { id } = useParams();
    const allCheckedRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState();
    const [isSelectedFile, setIsSelectedFile] = useState(false);

    const changeHandler = (e) => {
        setSelectedFile(e.target.files[0]);
        setIsSelectedFile(true);
    }

    useEffect(() => {
        allCheckedRef.current.disabled = true;

        if (isSelectedFile) {
            if (selectedFile.name !== "" && (selectedFile.type === "image/jpeg" || selectedFile.type === "image/png") && selectedFile.size < (1024 * 1024 * 5)) {
                allCheckedRef.current.disabled = false;
                allCheckedRef.current.className = "p-btn";
            } else {
                allCheckedRef.current.className = "p-btn-deactive";
            }
        }

    }, [isSelectedFile, selectedFile]);
    return (
        <div className="update-products">
            {
                data.filter(items =>
                    items.id === id ? id : null
                ).map(item =>
                    <>
                    <div className="back-button"><button onClick={()=>navigate(-1)} ><i className="fa-solid fa-angle-left"></i>&nbsp;&nbsp;<span>GERİ</span></button></div>
                    <form className="p-form" action="" method="post" enctype="multipart/form-data">
                        <div className="prod-head">
                            <h3>ÜRÜN GÜNCELLEME</h3>
                            <hr />
                        </div>

                        <div className="kapsa">
                            <div className="p-photo">
                                <img src={item.img_path} alt={item.tittle} />
                                <p className="p-card-text"><input type="file" name="dosya" onChange={changeHandler} /></p>
                            </div>

                            <div className="baslik">
                                <div className="prod-tittle">Ürün Adı</div>
                                <textarea style={{ "resize": "none" }} name="baslik" id="" cols="80" rows="4">{item.tittle}</textarea>
                            </div>

                            <div className="icerik">
                                <div className="prod-tittle">Ürün Bilgisi</div>
                                <textarea style={{ "resize": "none" }} name="icerik" id="" cols="80" rows="12">{item.info}</textarea>
                            </div>

                            <input ref={allCheckedRef} type="submit" value="GÜNCELLE" name="buton" className="p-btn-deactive" />
                        </div>
                    </form>
                    </>
                )
            }
        </div>
    );
}

export default UrunUpdate;