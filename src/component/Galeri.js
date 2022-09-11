import axios from 'axios';
import React from 'react';
import { useEffect, useState } from 'react';
import '../css/style.scss';
import "../img/gym-1.jpg";
import LoadingSpinner from './LoadingSpinner';
import '../css/spinner.css';
import ErrorPage from './ErrorPage';

const Galeri = () => {

    const [data, setData] = useState([]);
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError]=useState(false);

    useEffect(async () => {
        setIsLoading(true);
        try {
            const resp = await axios.get("http://stargymtest.infinityfreeapp.com/api/get_galery");

            setData(resp.data);
            setIsLoading(false);
            
        } catch (error) {
            console.error(error);
            setError(true);
            setIsLoading(false);
        }
    }, [])

    function modalOpen(e) {

        const id = e.target.parentElement.getAttribute("id");
        const modal = document.getElementById("f" + id);
        modal.style.display = "block";

        //herhangibir yere tıklayınca fotoyu kapatma
        let clickOut = document.getElementById(id); //dışına tıklanacak öğe

        //eğer alınan öğenin dışına tıklama yapılırsa öğeyi kapat
        document.addEventListener("click", function (e) {
            var isClickInsideElement = clickOut.contains(e.target);
            if (!isClickInsideElement) {
                modal.style.display = "none";
            }
        })
    }

    const renderArea=(
        <>
        <div>
            <main className="sect-height">
                <div className="galery-wrap">
                    <div className="galery">
                        {
                            data.map((item) =>
                                <div id={item.id} onClick={modalOpen} className="photo" key={item.id}>
                                    <img src={`http://stargymtest.infinityfreeapp.com/${item.path}`} alt="" />
                                    <i className="fas fa-search-plus fa-2x"></i>
                                </div>
                            )
                        }
                    </div>
                </div>

                <div className="modal-container">
                    {
                        data.map((item) =>
                            <div id={"f" + item.id} className="modal" key={item.id}>
                                <span className="close">&times;</span>
                                <img className="modal-content" src={`http://stargymtest.infinityfreeapp.com/${item.path}`} alt="" />
                            </div>
                        )
                    }
                </div>
                <div className="p-card-container">
                {error&& <ErrorPage/>}
                </div>

            </main>
        </div>
    </>
    )

    return (
        <>
        {isLoading?<LoadingSpinner/>:renderArea}

        </>
    );
}

export default Galeri;