import axios from 'axios';
import { React, useState, useEffect } from 'react';
import "../../css/dstyle.scss";

const Saatler = () => {

    const [data, setData] = useState([]);
    const [pzt, setPzt] = useState("");
    const [sali, setSali] = useState("");
    const [carsb, setCarsb] = useState("");
    const [pers, setPers] = useState("");
    const [cuma, setCuma] = useState("");
    const [cmt, setCmt] = useState("");
    const [pzr, setPzr] = useState("");
    const [error, setError] = useState(false);

    useEffect(() => {
        getTime();

    }, [])



    async function getTime() {
        try {
            const response = await axios.get("http://stargymtest.infinityfreeapp.com/api/get_time");
            setData(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    const updateTime = async (e) => {
        e.preventDefault();

        try {
            await axios(
                {
                    url: `http://localhost:8000/api/update_time`,
                    method: "put",
                    data: { pzt, sali, carsb, pers, cuma, cmt, pzr }
                }
            )
            setError(false);
        } catch (error) {
            console.error(error);
            setError(true);
        }

    }
    const submitHandler = (e) => {
        e.preventDefault();
    }

    return (
        <div className="dash-area-form">
            <div className="d-guncelle">
                {
                    data[0] === undefined ?
                        (
                            <form action="" className="work-time guncelle-form" method="">

                                <table className="custom-table dashboard-table time-tbl">
                                    <thead>
                                        <tr>
                                            <th colSpan="1">GÜNLER</th>
                                            <th colSpan="2">ÇALIŞMA SAATLERİ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                                <div className="guncelle dash-time-table">
                                    <input type="submit" name="buton" value="GÜNCELLE" className="guncelle-btn" />
                                </div>
                            </form>
                        ) :
                        (
                            <form action="" className="work-time guncelle-form" method="" onSubmit={submitHandler}>

                                <table className="custom-table dashboard-table time-tbl">
                                    <thead>
                                        <tr>
                                            <th colSpan="1">GÜNLER</th>
                                            <th colSpan="2">ÇALIŞMA SAATLERİ</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>PAZARTESİ</td>
                                            <td><textarea onChange={(e) => setPzt(e.target.value)} style={{ "resize": "none" }} name="pzt" id="" cols="30" rows="1" required>{data[0].pzt}</textarea></td>
                                        </tr>
                                        <tr>
                                            <td>SALI</td>
                                            <td><textarea onChange={(e) => setSali(e.target.value)} style={{ "resize": "none" }} name="sali" id="" cols="30" rows="1" required>{data[0].sali}</textarea></td>
                                        </tr>
                                        <tr>
                                            <td>ÇARŞAMBA</td>
                                            <td><textarea onChange={(e) => setCarsb(e.target.value)} style={{ "resize": "none" }} name="carsb" id="" cols="30" rows="1" required>{data[0].carsb}</textarea></td>
                                        </tr>
                                        <tr>
                                            <td>PERŞEMBE</td>
                                            <td><textarea onChange={(e) => setPers(e.target.value)} style={{ "resize": "none" }} name="pers" id="" cols="30" rows="1" required>{data[0].pers}</textarea></td>
                                        </tr>
                                        <tr>
                                            <td>CUMA</td>
                                            <td><textarea onChange={(e) => setCuma(e.target.value)} style={{ "resize": "none" }} name="cuma" id="" cols="30" rows="1" required>{data[0].cuma}</textarea></td>
                                        </tr>
                                        <tr>
                                            <td>CUMARTESİ</td>
                                            <td><textarea onChange={(e) => setCmt(e.target.value)} style={{ "resize": "none" }} name="cmt" id="" cols="30" rows="1" required>{data[0].cmt}</textarea></td>
                                        </tr>
                                        <tr>
                                            <td>PAZAR</td>
                                            <td><textarea onChange={(e) => setPzr(e.target.value)} style={{ "resize": "none" }} name="pzr" id="" cols="30" rows="1" required>{data[0].pzr}</textarea></td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="guncelle dash-time-table">
                                    <input onClick={updateTime} type="submit" name="buton" value="GÜNCELLE" className="guncelle-btn" />
                                    {error ? (<p style={{ color: "red" }}>Tüm alanlara değer giriniz...</p>) : ""}
                                </div>
                            </form>
                        )
                }

            </div>
        </div>
    );
}

export default Saatler;
/*

                <form action="" className="work-time guncelle-form" method="">
                
                    <table className="custom-table dashboard-table time-tbl">
                        <thead>
                            <tr>
                                <th colSpan="1">GÜNLER</th>
                                <th colSpan="2">ÇALIŞMA SAATLERİ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>PAZR</td>
                                <td><textarea style={{ "resize": "none" }} name="" id="" cols="30" rows="1" required>11s</textarea></td>
                            </tr>

                        </tbody>
                    </table>
                    <div className="guncelle dash-time-table">
                        <input type="submit" name="buton" value="GÜNCELLE" className="guncelle-btn" />
                    </div>
                </form>




*/