import { React } from "react";
import "../../css/dstyle.scss";

const UpdateAbout = () => {

    return (
        <div className="about-area">
            <div className="container">
                <div className="about-head">
                    <h3>HAKKIMIZDA GÜNCELLEME</h3>
                </div>
                <div className="file-container">
                    <div className="file-form">
                        <div className="file-head">
                            <h3>Video Yükleme</h3>
                            <hr />
                        </div>
                        <form className="f-form" action="" method="" encType="multipart/form-data">

                            <p className="card-text"><input type="file" name="dosya" /></p>

                            <input type="submit" value="YÜKLE" name="buton" className="file-btn" />

                        </form>
                        <div className="file-warning">
                            * İzin verilen dosya türü: mp4,mpeg <br />
                            * İzin verilen en yüksek boyut: ... Mb
                        </div>
                    </div>
                </div>
                <div className="file-container">
                    <div className="file-form">

                        <div className="file-head">
                            <h3>İçerik Yükleme</h3>
                            <hr />
                        </div>
                        <form action="" className="guncelle-form" method="">
                            <div className="f-icerik">
                                <textarea style={{ "resize": "none" }} name="icerik" id="" cols="30" rows="15"></textarea>
                                <div className="guncelle">
                                    <input type="submit" name="buton" value="GÜNCELLE" className="guncelle-btn" />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateAbout;