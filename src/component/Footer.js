/* eslint-disable jsx-a11y/anchor-is-valid */
import { React, useRef, useEffect, useLayoutEffect } from 'react';
import '../css/style.scss';
import '../img/layer2.png';
import { Link } from 'react-router-dom';
import gsap from "gsap";

const Footer = () => {
    const topButtonRef = useRef(null);
    const iconAnimRef = useRef(null);
    const footerRef = useRef(null);

    useEffect(() => {
        const footertl = gsap.timeline({
            scrollTrigger: {
                trigger: footerRef.current,
                start: "top 95%",
                end: "center 95%",
                scrub: 2,
            }
        })
        footertl.from(iconAnimRef.current, { scale: (.5, .5) });

    });

    //go to up button
    useEffect(() => {
        window.onscroll = () => {
            if (document.documentElement.scrollTop > 300) {
                topButtonRef.current.style.display = "block";
            } else {
                topButtonRef.current.style.display = "none";
            }
        };

    }, []);

    function go2Top(e) {
        e.preventDefault();
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return (
        <div>
            <footer className="footer">
                <div className="footer-content" ref={footerRef}>
                    <div className="adress">
                        <i ref={iconAnimRef} className="fas fa-map-marker-alt fa-2x map-m"></i>
                        <p>İsmet Paşa Mahallesi İsmet Paşa Caddesi No:15 Bafra/SAMSUN</p>
                        <i className="fa fa-phone f-phone"> 0555 555 55 55</i>
                    </div>
                    <div className="f-img"><img src={require('../img/layer2.png')} alt="" /></div>
                    <div className="footer-menu">
                        <div onClick={go2Top} className="f-1"><Link to="hizmetler" >Hizmetler</Link></div>
                        <div onClick={go2Top} className="f-2"><Link to="galeri">Galeri</Link></div>
                        <div onClick={go2Top} className="f-3"><Link to="urunler">Ürünler</Link></div>
                        <div onClick={go2Top} className="f-4"><Link to="hakkimizda">Hakkımızda</Link></div>
                        <div className="f-5"><span>&#169;</span>Neurhino</div>
                    </div>
                </div>
            </footer>
            <a onClick={go2Top} ref={topButtonRef} id="topButton"><span className="arrow"></span></a>
        </div>
    );
}

export default Footer;
