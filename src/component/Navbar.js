/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useRef, useLayoutEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/style.scss';
import logo from '../img/relogo.png';
import gsap from "gsap";

const Navbar = () => {

    const logoAnimRef = useRef(null);
    const topRef = useRef(null);
    const middleRef = useRef(null)
    const bottomRef = useRef(null);
    const iconRef = useRef(null);

    useLayoutEffect(() => {
        gsap.to(logoAnimRef.current, { rotationY: 360, duration: 1, repeat: 1, yoyo: true });
    })

    //mobil menu anim
    const animControl = (e) => {
        e.preventDefault();

        //ilgili elementin css ine ulaşma
        const iconElem = iconRef.current;
        const icon = window.getComputedStyle(iconElem);

        //ilgili elementin css property değerini kontrol ve animasyonlar
        if (icon.getPropertyValue("display") === "block") {
            topRef.current.style.transform = "translateY(0) rotate(0deg)";
            bottomRef.current.style.transform = "translateY(0) rotate(0deg)";
            middleRef.current.style.transform = "scale(1)";
            setTimeout(() => { iconRef.current.style.display = "none" }, 150);
        } else {
            topRef.current.style.transform = "translateY(12px) rotate(135deg)";
            bottomRef.current.style.transform = "translateY(-12px) rotate(-135deg)";
            middleRef.current.style.transform = "scale(0)";
            setTimeout(() => { iconRef.current.style.display = "block" }, 150);
        }

    }
    //onTouchStart={''}
    return (
        <>
            <div className="top-bar-container" >
                <div className="top-bar">
                    <div className="top-bar-left">
                        <i className="fa fa-phone"> 0555 555 55 55</i>
                    </div>
                    <div className="top-bar-right">
                        <div><a href='#'><i className="fab fa-facebook"></i></a></div>
                        <div><Link to=""><a href="https://google.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a></Link></div>
                        <div><Link to="#"><i className="fab fa-twitter"></i></Link></div>
                    </div>
                </div>
            </div>
            {/*TOP ICON END*/}

            {/*HEADER*/}
            <div className="head-container">

                <div className="menu">

                    <div className="logo" >
                        <img ref={logoAnimRef} className="rlogo" src={logo} alt="" />
                        {/*--MOBİL NAV menu anim*/}
                        <div className="xross" onClick={animControl} >
                            <span id="top" ref={topRef}></span>
                            <span id="middle" ref={middleRef}></span>
                            <span id="bottom" ref={bottomRef}></span>
                        </div>
                    </div>

                    <div className="link" >
                        <div className="nav-1"><Link to='/'>Anasayfa</Link></div>
                        <div className="nav-2"><Link to='hizmetler'>Hizmetler</Link></div>
                        <div className="nav-3"><Link to="galeri">Galeri</Link></div>
                        <div className="nav-4"><Link to="urunler">Ürünler</Link></div>
                        <div className="nav-5"><Link to="hakkimizda">Hakkımızda</Link></div>

                    </div>

                </div>

                {/* <!--MOBİL NAV--> */}
                <div className="icon" id="icon" ref={iconRef}>
                    <div className="icon-nav"><Link to='/'>Anasayfa</Link></div>
                    <div className="icon-nav"><Link to='hizmetler'>Hizmetler</Link></div>
                    <div className="icon-nav"><Link to="galeri">Galeri</Link></div>
                    <div className="icon-nav"><Link to="urunler">Ürünler</Link></div>
                    <div className="icon-nav"><Link to="hakkimizda">Hakkımızda</Link></div>
                </div>
            </div>
        </>
    );

}

export default Navbar;