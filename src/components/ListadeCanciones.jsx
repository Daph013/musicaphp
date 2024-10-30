import { useEffect, useState } from "react";

//const API = 'http://backplaylist.test/api/cancion/getCancion.php';
const API = 'http://localhost/musicback/api/cancion/getCancion.php';

const ListadeCanciones = ({ setCancion, genero, autor, filtro, tipoFiltro, agregarTodo, searchTerm, coverImage, titulo }) => {
    const [datos, setDatos] = useState([]);

    const getDatos = async () => {
        try {
            const response = await fetch(API);
            const data = await response.json();
            setDatos(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getDatos();
    }, []);

    let cancionesFiltradas = datos;



    
    if (tipoFiltro === "autor") {
        cancionesFiltradas = datos.filter(item => item.autor === filtro);
    } else if (tipoFiltro === "genero") {
        cancionesFiltradas = datos.filter(item => item.genero === filtro);
    }

    if (searchTerm) {
        cancionesFiltradas = datos.filter(item => 
            item.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
            item.autor.toLowerCase().includes(searchTerm.toLowerCase())  || 
            item.interprete.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }

    return (
        <div className="text-start container mt-3">
           
            <p className="text-center">{cancionesFiltradas.length}<apan className="fw-bold"> {titulo} </apan> de ({datos.length})</p>
           <div className="text-center">
            <button 
                className="btn btn-agregar mb-3" 
                onClick={() => agregarTodo(cancionesFiltradas)} // Llamar a la función con las canciones filtradas
            >

                Agregar Todas las Canciones
            </button>
            </div>
            <div className="row">
            {cancionesFiltradas.map((item) => (
                <div key={item.id} className="col-md-6 col-lg-4 col-xxl-3 mb-3" onClick={() => setCancion(item.genero, item.autor, item.titulo, item.interprete, item.url, item.coverImage)}>
                    <div className="card h-100 cardCanciones" data-bs-theme="dark">
                        <div className="card-body d-flex align-items-center p-1">
                            <img
                                src={item.coverImage ? item.coverImage : './assets/portadas/generic-image.jpg'}
                                alt={item.name}
                                className="rounded me-3"
                                width={100}
                                height={80}
                            />
                            <div>
                                <p>
                                    {item.interprete}<br />
                                    {item.titulo}<br />
                                    {item.genero}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                
            ))}
        </div>
        </div>
    );
};

export default ListadeCanciones;