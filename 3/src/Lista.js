import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';


// "id": 1,
// "name": "Garry Kasparov",
// "birth_date": "1963-04-13",
// "world_ch_won": 0,
// "profile_url": "https://hu.wikipedia.org/wiki/Garry_Kasparov",
// "image_url": "https://www.sulla.hu/Kasparov.jpg"

export function ChessListPage() {

    const [Chesss, setChesss] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);

    useEffect(() => {
        setFetchPending(true);
        axios.get(`http://localhost:3001/chess`, {
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(Chessk => {
                setChesss(Chessk.data);
            })
            .catch(console.log)
            .finally(() => {
                setFetchPending(false);
            })
    }, []);
    return (
        <div className="p-5 m-auto text-center content bg-ivory">
            {isFetchPending ? (
                <div className="spinner-border"></div>
            ) : (
                <div>
                    <h2>Sakk</h2>
                    {Chesss.map((Chess) => (

                        <div className="card col-sm-3 col-md-3 col-lg-3 col-xl-3 d-inline-block m-1 p-2">
                            <p className="text-dark">{Chess.name}</p>
                            <p className="text-dark">{Chess.birth_date}</p>
                            <p className="text-dark">{Chess.world_ch_won}</p>
                            <p className="text-dark"><a href={Chess.profile_url}>{Chess.profile_url}</a></p>
                            <div className="card-body">
                                <NavLink key={Chess.id} to={"/Chess/" + Chess.id}>
                                    <img alt={Chess.name}
                                        className="img-fluid"
                                        style={{ maxHeight: 200, width: 200 }}
                                        src={Chess.image_url ? Chess.image_url :
                                            "https://via.placeholder.com/400x800"} /></NavLink>
                                <br />
                                <NavLink key="y" to={"/mod-Chess/" + Chess.id}>
                                    <i className="bi bi-pencil"></i></NavLink>
                                <NavLink key="x" to={"/del-Chess/" + Chess.id}><i className="bi bi-trash3"></i></NavLink>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
export default ChessListPage;