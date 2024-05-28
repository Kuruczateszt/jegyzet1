import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

// {
//   "id": 1,
//   "name": "Példa",
//   "birth_date": "1978-10-08",
//   "world_ch_won": 1,
//   "profile_url": "https://hu.wikipedia.org/wiki/Garry_Kasparov",
//   "image_url": "https://www.sulla.hu/Kasparov.jpg"
// }

export function ChessModPage(props) {
    const params = useParams();
    const id = params.ChessId;
    const navigate = useNavigate();
    const [Chess, setChess] = useState([]);
    const [name, setname] = useState('');
    const [birth_date, setBirth_date] = useState('');
    const [world_ch_won, setWorld_ch_won] = useState('');
    const [profile_url, setProfile_url] = useState('');
    const [image_url, setImage_url] = useState('');

    useEffect(() => {
        (async () => {

            try {
                const res = await axios.get(`http://localhost:3001/chess/${id}`, {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                const Chess = await res.data;
                setChess(Chess);
                setname(Chess.name);
                setBirth_date(Chess.birth_date);
                setWorld_ch_won(Chess.world_ch_won);
                setProfile_url(Chess.profile_url);
                setImage_url(Chess.image_url);
            }
            catch (error) {
                console.log(error);
            }
        })
            ();
    }, [id, name, birth_date, world_ch_won, profile_url, image_url]);

    const Name = event => {
        setname(event.target.value);
    }
    const Birth_date = event => {
        setBirth_date(event.target.value);
    }
    const World_ch_won = event => {
        setWorld_ch_won(event.target.value);
    }
    const Profile_url = event => {
        setProfile_url(event.target.value);
    }
    const Image_url = event => {
        setImage_url(event.target.value);
    }


    return (
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Chess módosítása</h2>
            <form
                onSubmit={(event) => {
                    event.persist();
                    event.preventDefault();

                    axios.put(`http://localhost:3001/chess/${id}`, {
                        id: event.target.elements.id.value,
                        name: event.target.elements.name.value,
                        birth_date: event.target.elements.birth_date.value,
                        world_ch_won: event.target.elements.world_ch_won.value,
                        profile_url: event.target.elements.profile_url.value,
                        image_url: event.target.elements.image_url.value,
                    }, {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    })
                        .then(() => {
                            navigate("/");
                        })
                        .catch(console.log);
                }}>

                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Chess ID:</label>
                    <div className="col-sm-9">
                        <input type="text" name="id" className="form-control" value={Chess.id} />
                    </div>
                </div>

                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Chess név:</label>
                    <div className="col-sm-9">
                        <input type="text" name="name" className="form-control" defaultValue={Chess.name} onChange={Name} />
                    </div>
                </div>

                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Chess születési idő:</label>
                    <div className="col-sm-9">
                        <input type="date" name="birth_date" className="form-control" defaultValue={Chess.birth_date} onChange={Birth_date} />
                    </div>
                </div>

                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">nyerések száma:</label>
                    <div className="col-sm-9">
                        <input type="number" name="world_ch_won" className="form-control" defaultValue={Chess.world_ch_won} onChange={World_ch_won} />
                    </div>
                </div>

                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Chess profile url:</label>
                    <div className="col-sm-9">
                        <input type="text" name="profile_url" className="form-control" defaultValue={Chess.profile_url} onChange={Profile_url} />
                    </div>
                </div>

                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Kép URL-je:</label>
                    <div className="col-sm-9">
                        <input type="text" name="image_url" className="form-control" defaultValue={Chess.image_url} onChange={Image_url} />
                        <img src={Chess.image_url} height="200px" alt={Chess.name} />
                    </div>
                </div>
                <button type="submit" className="btn btn-success">Küldés</button>
            </form>
        </div>
    );
}
export default ChessModPage;