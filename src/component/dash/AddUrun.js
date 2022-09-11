import axios from "axios";
import { React, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/dstyle.scss";

const AddUrun = () => {

    const allCheckedRef = useRef(null);
    const navigate = useNavigate();

    const [isTxtEmpty, setIsTxtEmpty] = useState(false);
    const [checkBaslik, setCheckBaslik] = useState("");
    const [checkIcerik, setCheckIcerik] = useState("");
    const [selectedFile, setSelectedFile] = useState();
    const [isSelectedFile, setIsSelectedFile] = useState(false);

    console.log(allCheckedRef.current)

    useEffect(() => {
        allCheckedRef.current.disabled = true;

        if (isSelectedFile) {
            if (isTxtEmpty && selectedFile.name !== "" && (selectedFile.type === "image/jpeg" || selectedFile.type === "image/png") && selectedFile.size < (1024 * 1024 * 5)) {
                allCheckedRef.current.disabled = false;
                allCheckedRef.current.className = "file-btn";
            } else {
                allCheckedRef.current.className = "file-btn-deactive";
            }
        }

    })

    useEffect(() => {
        (checkBaslik !== "" && checkIcerik !== "") ? setIsTxtEmpty(true) : setIsTxtEmpty(false);

    }, [checkBaslik, checkIcerik])

    function baslikHandler(e) {
        setCheckBaslik(e.target.value);
    }

    function icerikHandler(e) {
        setCheckIcerik(e.target.value);
    }

    function changeHandler(e) {
        setSelectedFile(e.target.files[0]);
        setIsSelectedFile(true);
    }

    async function clickHandler(e) {
        e.preventDefault();
        //isTxtEmpty?true ise post değilse post değil.

        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("urunad", checkBaslik);
        formData.append("urunbilgi", checkIcerik);

        try {
            await axios({
                url: "http://stargymtest.infinityfreeapp.com/api/add_product",
                method: "POST",
                data: formData
            });
            navigate("../geturunler");
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <div className="back-button"><button onClick={() => navigate(-1)} ><i className="fa-solid fa-angle-left"></i>&nbsp;&nbsp;<span>GERİ</span></button></div>
            <div className="file-container product-add">

                <div className="file-form ">

                    <div className="file-head">
                        <h3>ÜRÜN EKLEME</h3>
                        <hr />
                    </div>

                    <form className="f-form" action="" method="" encType="multipart/form-data">

                        <div className="f-baslik">
                            <div className="f txt">ÜRÜN ADI</div>
                            <textarea onChange={baslikHandler} style={{ "resize": "none" }} name="baslik" id="" cols="30" rows="5"></textarea>
                        </div>
                        <div className="f-icerik">
                            <div className="ftxt">ÜRÜN BİLGİSİ</div>
                            <textarea onChange={icerikHandler} style={{ "resize": "none" }} name="icerik" id="" cols="30" rows="15"></textarea>
                        </div>
                        <p className="file-folder"><input type="file" name="dosya" onChange={changeHandler} /></p>
                        <input ref={allCheckedRef} type="submit" value="EKLE" name="buton" className="file-btn-deactive" onClick={clickHandler} /><br />
                    </form>

                    <div className="file-warning">
                        <p className={isSelectedFile ? ((selectedFile.type === "image/jpeg" || selectedFile.type === "image/png") ? "file-done" : "file-none") : "file-none"} >* İzin verilen formatlar : jpeg,png </p>
                        <p className={isSelectedFile ? (selectedFile.size < (1024 * 1024 * 5) ? "file-done" : "file-none") : "file-none"}>* İzin verilen en yüksek boyut: 5 Mb</p>
                        <div className={isTxtEmpty ? "txt-not-empty" : "txt-empty"}>
                            Alanlar boş bırakılamaz !
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}

export default AddUrun;

