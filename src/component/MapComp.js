import React from "react";
import '../css/style.scss';

const MapComp = () => {
    const link = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1255.1229714994092!2d35.90976121452293!3d41.5648653099569!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4088991ed28b05bf%3A0x5b990f0015fbef62!2sStar%20Spor%20Gym!5e0!3m2!1str!2str!4v1613424813835!5m2!1str!2str"
    return (
        <div>
            <div className="map">
                <div className="map-container">
                    <iframe src={link} width="100%" height="450" frameBorder="0" style={{ border: 0 }} allowFullScreen="" aria-hidden="false" tabIndex="0"></iframe>
                </div>
            </div>
        </div>
    );
}

export default MapComp;