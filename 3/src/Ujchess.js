import { useNavigate } from "react-router-dom";
import axios from "axios";

// {
// "name": "Példa",
// "birth_date": "1978-10-08",
// "world_ch_won": 1,
// "profile_url": "https://hu.wikipedia.org/wiki/Garry_Kasparov",
// "image_url": "https://www.sulla.hu/Kasparov.jpg"
// }

export function ChessCreatePage() {
    const navigate = useNavigate();
    return (
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Új Chess</h2>
            <form
                onSubmit={(event) => {
                    event.persist();
                    event.preventDefault();

                    let kiskutya = {
                        name: event.target.elements.name.value,
                        birth_date: event.target.elements.birth_date.value,
                        world_ch_won: event.target.elements.world_ch_won.value,
                        profile_url: event.target.elements.profile_url.value,
                        image_url: event.target.elements.image_url.value,
                    }

                    console.log(kiskutya);

                    axios.post("http://localhost:3001/chess", kiskutya, {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    })
                        .then(() => {
                            navigate("/");
                        })
                        .catch(console.log);
                }}>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Chess név:</label>
                    <div className="col-sm-9">
                        <input type="text" name="name" className="form-control" />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Chess Szültésnap:</label>
                    <div className="col-sm-9">
                        <input type="date" name="birth_date" className="form-control" />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Nyerések:</label>
                    <div className="col-sm-9">
                        <input type="number" name="world_ch_won" className="form-control" />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Chess Profile:</label>
                    <div className="col-sm-9">
                        <input type="text" name="profile_url" className="form-control" />
                    </div>
                </div>
                <div className="form-group row pb-3">
                    <label className="col-sm-3 col-form-label">Kép URL-je:</label>
                    <div className="col-sm-9">
                        <input type="text" name="image_url" className="form-control" />
                    </div>
                </div>
                <button type="submit" className="btn btn-success">
                    Küldés
                </button>
            </form>
        </div >
    );
}
export default ChessCreatePage;