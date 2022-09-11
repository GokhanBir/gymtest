import axios from "axios";
import { React, useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../css/dstyle.scss";
import LoadingSpinner from "../LoadingSpinner";


const AddPhoto = () => {
    const navigate = useNavigate();
    const allCheckedRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState();
    const [isSelectedFile, setIsSelectedFile] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const changeHandler = (e) => {
        setSelectedFile(e.target.files[0]);
        setIsSelectedFile(true);
    }

    async function uploadHandler(e) {
        setIsLoading(true);
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", selectedFile);
        formData.append("tittle", selectedFile.name);

        try {
            await axios({
                url: "http://stargymtest.infinityfreeapp.com/api/add_photo",
                method: "post",
                data: formData
            });
            
            setIsLoading(false);
            navigate("../getgaleri");
        } catch (error) {
            console.error(error);
        }

    }
    useEffect(() => {

        allCheckedRef.current.disabled = true;

        if (isSelectedFile) {
            if (selectedFile.name !== "" && (selectedFile.type === "image/jpeg" || selectedFile.type === "image/png") && selectedFile.size < (1024 * 1024 * 5)) {
                allCheckedRef.current.disabled = false;
                allCheckedRef.current.className = "file-btn";
            } else {
                allCheckedRef.current.className = "file-btn-deactive";
            }
        }

    }, [isSelectedFile, selectedFile]);


    const renderArea=(
    <>
        <div className="back-button"><button onClick={() => navigate(-1)} ><i className="fa-solid fa-angle-left"></i>&nbsp;&nbsp;<span>GERİ</span></button></div>
        <div className="file-container">

            <div className="file-form">

                <div className="file-head">
                    <h3>Resim Yükleme Formu</h3>
                    <hr />
                </div>
                <form className="f-form" action="" method="post" encType="multipart/form-data" >
                    <p className="card-text"><input type="file" name="dosya" onChange={changeHandler} /></p>

                    <input ref={allCheckedRef} type="submit" value="YÜKLE" name="buton" className="file-btn-deactive" onClick={uploadHandler} />
                </form>
                <div className="file-warning">
                    <p className={isSelectedFile ? ((selectedFile.type === "image/jpeg" || selectedFile.type === "image/png") ? "file-done" : "file-none") : "file-none"} >* İzin verilen formatlar : jpeg,png </p>
                    <p className={isSelectedFile ? (selectedFile.size < (1024 * 1024 * 5) ? "file-done" : "file-none") : "file-none"}>* İzin verilen en yüksek boyut: 5 Mb</p>
                </div>
            </div>

        </div>
    </>);

    return (
        <>
            {
                isLoading ?<LoadingSpinner/> :renderArea
            }

        </>
    );
}

export default AddPhoto;


