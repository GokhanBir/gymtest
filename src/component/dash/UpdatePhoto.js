import { React, useState, useRef, useEffect } from "react";
import "../../css/dstyle.scss";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../LoadingSpinner";

const UpdatePhoto = () => {

    const { id } = useParams();
    const allCheckedRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState();
    const [isSelectedFile, setIsSelectedFile] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const changeHandler = (e) => {
        setSelectedFile(e.target.files[0]);
        setIsSelectedFile(true);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedFile]);

    async function updateHandler(e) {
        setIsLoading(true);
        e.preventDefault();
        const photoData = new FormData();
        photoData.append("file", selectedFile);
        photoData.append("tittle", selectedFile.name);

        try {
            await axios({
                url: `http://stargymtest.infinityfreeapp.com/api/update_galery/${id}`,
                method: "post",
                data: photoData
            }
            );
            setIsLoading(false);
            navigate("../getgaleri")
        } catch (error) {
            console.error(error);
        }
    }


    const renderArea = (
        <>
            <div className="back-button"><button onClick={() => navigate(-1)} ><i className="fa-solid fa-angle-left"></i>&nbsp;&nbsp;<span>GERİ</span></button></div>
            <div className="file-container">

                <div className="file-form">

                    <div className="file-head">
                        <h3>Resim Güncelleme Formu</h3>
                        <hr />
                    </div>
                    <form className="f-form" action="" method="" encType="multipart/form-data">
                        <p className="card-text"><input type="file" name="dosya" onChange={changeHandler} /></p>
                        <input ref={allCheckedRef} type="submit" value="GÜNCELLE" name="buton" className="file-btn-deactive" onClick={updateHandler} />
                    </form>

                    <div className="file-warning">
                        <p className={isSelectedFile ? ((selectedFile.type === "image/jpeg" || selectedFile.type === "image/png") ? "file-done" : "file-none") : "file-none"} >* İzin verilen formatlar : jpeg,png </p>
                        <p className={isSelectedFile ? (selectedFile.size < (1024 * 1024 * 5) ? "file-done" : "file-none") : "file-none"}>* İzin verilen en yüksek boyut: 5 Mb</p>
                    </div>
                </div>
            </div>
        </>
    )

    return (
        <>
            {
                isLoading ? <LoadingSpinner /> : renderArea
            }

        </>
    );
}

export default UpdatePhoto;


