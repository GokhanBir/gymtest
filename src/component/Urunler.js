import { React, useState, useEffect } from 'react';
import '../css/style.scss';
import axios from 'axios';
import LoadingSpinner from './LoadingSpinner';
import '../css/spinner.css';
import ErrorPage from './ErrorPage';

const Urunler = () => {
    const [openCard, setOpenCard] = useState(false);
    const [cardId, setCardId] = useState(0);
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(false);
    useEffect(async () => {
        setIsLoading(true);
        try {
            const resp = await axios.get("http://localhost:8000/api/get_products");
            setData(resp.data);
            setIsLoading(false);
        } catch (error) {
            console.error(error);
            setError(true);
            setIsLoading(false)
        }
    }, [])
    const OpenCard = (e) => {
        setOpenCard(!openCard);
        const el2 = e.target.parentElement.getAttribute("id");
        setCardId(el2);

    };


    const renderArea = (
        <>
            <div>
                <section className="sect-height">
                    <div className="p-card-container">
                        {
                            data.map((item) =>
                                <div id={item.id} className="p-card" key={item.id}>
                                    <img src={`http://localhost:8000/${item.fotoyol}`} alt={item.urunad + item.id} />
                                    <button id={item.id} onClick={OpenCard}
                                        className="i-btn">{(openCard && (item.id === cardId)) ? (<p>x</p>) : (<p>i</p>)}
                                    </button>


                                    {
                                        (openCard && (item.id == cardId)) ?
                                            (
                                                <div className="p-info" >
                                                    <p>{item.urunbilgi}</p>
                                                </div>
                                            )
                                            :
                                            (
                                                <div className="p-card-txt">
                                                    <h2>{item.urunad}</h2>
                                                    <h3>STOK DURUMUNU SORUNUZ</h3>
                                                    <p>FİYATI SORUNUZ</p>
                                                </div>
                                            )
                                    }

                                </div>
                            )
                        }
                        {
                            error && <ErrorPage />
                        }
                    </div>
                </section>
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

export default Urunler;