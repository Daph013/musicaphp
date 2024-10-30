import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
//const API = 'http://backplaylist.test/api/autor/getAutor.php';
const API = 'http://localhost/musicback/api/autor/getAutor.php';

const FiltroAutores = ({ setAutor }) => {
    const [datos, setDatos] = useState([]);
    const getDatos = async () => {
        try {
            const response = await fetch(API);
            const data = await response.json();
            //console.log(data);
            setDatos(data);
        } catch (error) {
            console.error(error);
        }
    };
    useEffect(() => {
        getDatos();
    }, []);

    return (
        <div className="menuHorizontal">
            {datos && datos.map((item) => (
                <Link key={item.id} href="#" className="btn btn-outline-info btn-sm m-1" onClick={() => setAutor(item.nombre)}>
                    {item.nombre}
                </Link>
            ))}
        </div>
    );
};

export default FiltroAutores;