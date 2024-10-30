import { useState, useEffect } from 'react';

const ModalRegistroCanciones = ({ isVisible, onClose, onSongAdded }) => {
    const [formData, setFormData] = useState({
        author: '',
        url: '',
        name: '',
        title: '',
        tags: '' // Changed 'tags' to 'genre' for clarity
    });
    const [authors, setAuthors] = useState([]);
    const [generos, setGeneros] = useState([]);

    useEffect(() => {
        const fetchAuthors = async () => {
            const response = await fetch('http://localhost/musicback/api/autor/getAutor.php');
            const data = await response.json();
            setAuthors(data);
        };

        const fetchGeneros = async () => {
            const response = await fetch('http://localhost/musicback/api/genero/getGenero.php');
            const data = await response.json();
            setGeneros(data);
        };

        fetchAuthors();
        fetchGeneros();
    }, []);

    if (!isVisible) return null;

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost/musicback/api/cancion/postCancion.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams(formData)
        });

        const result = await response.json();
        if (result.success) {
            onSongAdded(); // Call function to refresh the list
            onClose(); // Close the modal
        } else {
            alert(result.message); // Show error message
        }
    };

    return (
        <div className={`modal fade ${isVisible ? 'show' : ''}`} style={{ display: isVisible ? 'block' : 'none' }} tabIndex="-1" role="dialog" data-bs-theme="dark">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Agregar Canción</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label htmlFor="idautor" className="form-label">Autor:</label>
                                <select id="idautor" name="idautor" className="form-select" onChange={handleChange} required>
                                    <option value="">Seleccione un autor</option>
                                    {authors.map(autor => (
                                        <option key={autor.id} value={autor.id}>{autor.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            
                            <div className="mb-3">
                                <label htmlFor="idgenero" className="form-label">Género:</label>
                                <select id="idgenero" name="idgenero" className="form-select" onChange={handleChange} required>
                                    <option value="">Seleccione un género</option>
                                    {generos.map(genero => (
                                        <option key={genero.id} value={genero.id}>{genero.nombre}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="url" className="form-label">URL de YouTube:</label>
                                <input type="url" id="url" name="url" className="form-control" placeholder="https://www.youtube.com/watch?v=..." onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="interprete" className="form-label">Nombre del Cantante o Grupo:</label>
                                <input type="text" id="interprete" name="interprete" className="form-control" onChange={handleChange} required />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="titulo" className="form-label">Título de la Canción:</label>
                                <input type="text" id="titulo" name="titulo" className="form-control" onChange={handleChange} required />
                            </div>
                           


                            <button type="submit" className="btn btn-success">Agregar Canción</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ModalRegistroCanciones;