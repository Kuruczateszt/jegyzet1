import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import axios from 'axios';

// {
//   "id": 0,
//   "name": "string",
//   "birth_date": "string",
//   "world_ch_won": 0,
//   "profile_url": "string",
//   "image_url": "string"
// }

export function ChessDelPage(props) {
    const params = useParams();
    const id = params.ChessId;
    const navigate = useNavigate();
    const [Chess, setChess] = useState([]);
    const [isPending, setPending] = useState(false);
    useEffect(() => {
        setPending(true);
        (async () => {
            try {
                const res = await axios.get(`http://localhost:3001/chess/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const Chess = await res.data;
                setChess(Chess);
            }
            catch (error) {
                console.log(error);
            }
            finally {
                setPending(false);
            }
        })
            ();
    }, [id]);
    return (
        <div className="p-5 m-auto text-center content bg-lavender">
            {isPending || !Chess.id ? (
                <div className="spinner-border"></div>
            ) : (
                <div className="card p-3">
                    <div className="card-body">
                        <h5 className="card-title">Törlendő elem: {Chess.name}</h5>
                        <div className="lead">Név: {Chess.name}</div>
                        <div className="lead">Születési idő: {Chess.birth_date}</div>
                        <div className="lead">Nemzetkép: {Chess.world_ch_won}</div>
                        <div className="lead">Profil: {Chess.profile_url}</div>
                        <div className="lead">Kepek: {Chess.image_url}</div>

                        <img alt={Chess.name}
                            className="img-fluid rounded"
                            style={{ maxHeight: "500px" }}
                            src={Chess.image_url ? Chess.image_url :
                                "https://via.placeholder.com/400x800"}
                        />
                    </div>
                    <form onSubmit={(event) => {
                        event.persist();
                        event.preventDefault();
                        axios.delete(`http://localhost:3001/chess/${id}`, {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        })
                            .then(() => {
                                navigate("/");
                            })
                            .catch(console.log);
                    }}>
                        <div>
                            <NavLink to={"/"}><button className="bi bi-backspace">&nbsp;Mégsem</button></NavLink>
                            &nbsp;&nbsp;
                            <button className="bi bi-trash3">&nbsp;Törlés</button></div></form>
                </div>

            )}
        </div>
    );
}
export default ChessDelPage;