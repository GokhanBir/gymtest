import { React, useEffect, useRef, useState } from "react";
import { Link, Outlet, Route, Routes, useNavigate,useMatch } from "react-router-dom";
import '../css/dstyle.scss';
import gym from '../img/relogo.png';

import AddPhoto from "./dash/AddPhoto";
import UpdatePhoto from "./dash/UpdatePhoto";
import GetGaleri from "./dash/GetGaleri";
import GetUrunler from "./dash/GetUrunler";
import AddUrun from "./dash/AddUrun";
import UpdateUrun from "./dash/UpdateUrun";
import UpdateAbout from "./dash/UpdateAbout";
import Saatler from "./dash/Saatler";
import MobilDash from "./dash/MobilDash";
import axios from "axios";
import UpdatePass from "./dash/UpdatePass";

const Dashboard = () => {

    const path=useMatch("dashboard");
    const navigate = useNavigate();
    const colRef = useRef(null);
    const nextElementRef = useRef(null);
    const [pageW, setPageW] = useState(window.innerWidth);

    var userName = localStorage.getItem("auth_name");

    useEffect(() => {
        if (pageW > 900) {
            var coll = document.getElementById("collapsible");
            coll.addEventListener("click", collap);

            function collap() {
                if (nextElementRef.current.style.display === "block") {
                    nextElementRef.current.style.display = "none";
                } else {
                    nextElementRef.current.style.display = "block";
                }
            }
        }

    }, []);//[pageW > 900 ? nextElementRef : ""] yazılabilir


    useEffect(() => {
        setPageW(window.innerWidth);
    }, [pageW])

    const logoutSubmit = async (e) => {
        e.preventDefault();

        const resp = await axios.post("http://stargymtest.infinityfreeapp.com/api/logout");
        localStorage.removeItem("auth_token", resp.data.token);
        localStorage.removeItem("auth_name", resp.data.name);
        navigate("/login");
    }

    return (
        <>
            {
                (pageW > 900) ?
                    <div className="dash-container">
                        <div className="logo">
                            <img src={gym} alt="" />
                        </div>

                        <div className="panel-exit">
                            <div className="user">
                                <i className="far fa-user"></i>
                                <i className="letter">{userName}</i>
                            </div>
                            <div className="exit">
                                <span onClick={logoutSubmit}><i className="fas fa-sign-out-alt"></i>&nbsp;ÇIKIŞ</span>
                            </div>
                        </div>

                        <div className="panel-link">
                            <nav>
                                <ul className="links">
                                    <Link to=""><button id="collapsible" ref={colRef}>ANASAYFA</button></Link>
                                    <div className="coll" ref={nextElementRef}>
                                        <Link to="saat"><li>SAAT</li></Link>
                                    </div>
                                    <br /><br />
                                    <Link to="getgaleri"><li>GALERİ</li><br /></Link>
                                    <Link to="geturunler"><li>ÜRÜNLER</li><br /></Link>
                                    <Link to="updateabout" ><li>HAKKIMIZDA</li><br /></Link>
                                    <Link to="update_password" ><li>Şifre Güncelleme</li></Link>
                                </ul>
                            </nav>
                            <Outlet />
                        </div>

                        <div className="dash-area">

                            {
                                path!==null?<div>DASHBOARD A SAYFA YAP</div>:

                            (

                                <Routes>
                                <Route path="saat" element={<Saatler />} />
                                <Route path="getgaleri" element={<GetGaleri />} />
                                <Route path="getgaleri/addphoto" element={<AddPhoto />} />
                                <Route path="getgaleri/photoupdate/:id" element={<UpdatePhoto />} />
                                <Route path="geturunler" element={<GetUrunler />} />
                                <Route path="geturunler/addurun" element={<AddUrun />} />
                                <Route path="geturunler/urunguncelle/:id" element={<UpdateUrun />} />
                                <Route path="updateabout" element={<UpdateAbout />} />
                                <Route path="update_password" element={<UpdatePass/>}/>
                            </Routes>
                            )
                        }
                           
                        </div>
                    </div>
                    :
                    <MobilDash />
            }
        </>
    );
}

export default Dashboard;
