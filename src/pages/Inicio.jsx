import React, { useEffect, useState } from 'react'
import FiltroAutores from '../components/FiltroAutores'
import FiltroGeneros from '../components/FiltroGeneros';
import Buscador from '../components/buscador';
import Reproductor from '../components/Reproductor';
import ReactPlayer from 'react-player'
import ListadeCanciones from '../components/ListadeCanciones';
import VerificarCancion from '../components/VerificarCancion';
import ModalRegistroCanciones from "../components/ModalRegistroCanciones";

const API = 'http://localhost/musicback/api/cancion/getCancion.php';

const Inicio = () => {
    const [autor, setAutor] = useState("");
    const [genero, setGenero] = useState("");
    const [datos, setDatos] = useState([]);
    const [canciones, setCanciones] = useState([]);
    const [cancionActual, setCancionActual] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [filtro, setFiltro] = useState("");
    const [tipoFiltro, setTipoFiltro] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [titulo, setTitulo] = useState("Ultimas Canciones");

    const [modalVisibleForm, setModalVisibleForm] = useState(false);
    const [modalVisibleForm2, setModalVisibleForm2] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0); // Estado para forzar la re-renderización
    const [modo, setModo]=useState('Audio');
   

    const loadSongs = async () => {
        try {
            const response = await fetch(API);
            const data = await response.json();
            setDatos(data); // Actualiza el estado de las canciones
        } catch (error) {
            console.error("Error al cargar las canciones:", error);
        }
    };

    const handleAutorSelect = (nombre) => {
        setSearchTerm("");
        setAutor(nombre);
        setFiltro(nombre);
        setTipoFiltro("autor");
        setTitulo(` Canciones de la lista de ${nombre}`);
    };

    const handleGeneroSelect = (nombre) => {
        setSearchTerm("");
        setGenero(nombre);
        setFiltro(nombre);
        setTipoFiltro("genero");
        setTitulo(` Canciones del Genero ${nombre}`);
    };

    const handleCancionSelect = (genero, autor, titulo, interprete, url, coverImage) => {
        const songExists = canciones.some(song => song.titulo === titulo && song.autor === autor);

        if (!songExists) {
            setCanciones(prev => [...prev, { genero, autor, titulo, interprete, url, coverImage }]);
            setCancionActual({ genero, autor, titulo, interprete, url, coverImage });
        } else {
            console.log("La canción ya existe en la lista.");
        }
    };

    const agregarTodas = (canciones) => {
        setCanciones(prev => [...prev, ...canciones]);
    };

    const handleSongAdded = () => {
        loadSongs(); // Llama a loadSongs para refrescar la lista de canciones
        setRefreshKey(prev => prev + 1); // Incrementa el refreshKey para forzar re-renderización
        setModalVisibleForm2(false); // Cerrar el modal
    };

    useEffect(() => {
        loadSongs(); // Cargar las canciones al montar el componente
    }, []);

    return (
        <>
            <div className='text-center'>
                <FiltroAutores setAutor={handleAutorSelect} />
                <div className="pt-3 ">
                <FiltroGeneros setGenero={handleGeneroSelect} />
                </div>
            </div>
            <div className="pt-2 text-center">
            <button className="btn btn-info btn-sm m-1" onClick={() => setModalVisibleForm(true)}>Verificar</button>
                <VerificarCancion
                    isVisible={modalVisibleForm}
                    onClose={() => setModalVisibleForm(false)}
                />
                      <button className="btn btn-info btn-sm m-1" onClick={() => setModalVisibleForm2(true)}>Agregar canción</button>
                <ModalRegistroCanciones
                    isVisible={modalVisibleForm2}
                    onClose={() => setModalVisibleForm2(false)}
                    onSongAdded={handleSongAdded}
                />
            </div>
            <div className='w-25 mx-auto'>
            
            <Buscador  setSearchTerm={setSearchTerm}  searchTerm={searchTerm}/>     
            </div>
            <div className='py-3 text-center'>{titulo}</div>
            <div className="py-3">
                <Reproductor 
                    canciones={canciones} 
                    setCanciones={setCanciones} // Asegúrate de que esto se pase
                    setCancionActual={setCancionActual} 
                    isPlaying={isPlaying} 
                    setIsPlaying={setIsPlaying} 
                />
            </div>
            <div>
                <ListadeCanciones 
                    setCancion={handleCancionSelect} 
                    genero={genero} 
                    autor={autor} 
                    filtro={filtro} 
                    tipoFiltro={tipoFiltro} 
                    agregarTodo={agregarTodas}
                    searchTerm={searchTerm}
                    titulo={titulo} 
                    datos={datos}
                />
            </div>
        </>)    
}

export default Inicio