import { React, useState, useEffect } from "react";
import '../css/style.scss';
import axios from "axios";
import LoadingSpinner from "./LoadingSpinner";

const TimeTable = () => {

    const [data, setData] = useState([]);
    const [isDataGet, setIsDataGet] = useState(false);

    useEffect(async () => {

        try {
            const response = await axios.get("http://localhost:8000/api/get_time");
            setData(response.data);
            setIsDataGet(true);
        } catch (error) {
            console.error(error);
        }

    }, [])

    return (
        <div>
            {isDataGet ? (
                <section className="work-time">
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th colSpan="2">ÇALIŞMA SAATLERİ</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Pazartesi</td>
                                <td>{data[0].pzt}</td>
                            </tr>
                            <tr>
                                <td>Salı</td>
                                <td>{data[0].sali}</td>
                            </tr>
                            <tr>
                                <td>Çarşamba</td>
                                <td>{data[0].carsb}</td>
                            </tr>
                            <tr>
                                <td>Perşembe</td>
                                <td>{data[0].pers}</td>
                            </tr>
                            <tr>
                                <td>Cuma</td>
                                <td>{data[0].cuma}</td>
                            </tr>
                            <tr>
                                <td>Cumartesi</td>
                                <td>{data[0].cmt}</td>
                            </tr>
                            <tr>
                                <td>Pazar</td>
                                <td>{data[0].pzr}</td>
                            </tr>

                        </tbody>
                    </table>
                </section>
            ) :
                <LoadingSpinner />
            }
        </div>
    );
}

export default TimeTable;