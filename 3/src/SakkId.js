import React, { useState, useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import axios from 'axios';

// {
// "id": 1,
// "name": "Garry Kasparov",
// "birth_date": "1963-04-13",
// "world_ch_won": 0,
// "profile_url": "https://hu.wikipedia.org/wiki/Garry_Kasparov",
// "image_url": "https://www.sulla.hu/Kasparov.jpg"
// }

export function ChessSinglePage(props) {
    const params = useParams();
    const id = params.ChessId;
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
                        <h5 className="card-title">{Chess.name}</h5>
                        <p className="card-text">{Chess.birth_date}</p>
                        <p className="card-dark">{Chess.world_ch_won}</p>
                        <p className="card-dark"><a href={Chess.profile_url}>{Chess.profile_url}</a></p>
                        <img alt={Chess.name}
                            className="img-fluid rounded"
                            style={{ maxHeight: "500px" }}
                            src={Chess.image_url ? Chess.image_url :
                                "https://via.placeholder.com/400x800"}
                        />
                    </div>
                    <div><NavLink to="/"><i class="bi bi-backspace"></i></NavLink> &nbsp;&nbsp;&nbsp;
                        <NavLink key="y" to={"/mod-Chess/" + Chess.id}><i class="bi bi-pencil"></i></NavLink></div>
                </div>

            )}
        </div>
    );
}
export default ChessSinglePage;