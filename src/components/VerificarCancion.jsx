import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player'; // Ensure you have react-player installed

const VerificarCancion = ({ isVisible, onClose }) => {
    const [url, setUrl] = useState('');
    const [isPlaying, setIsPlaying] = useState(false); // State to control playback
    const [error, setError] = useState(''); // State to handle errors

    // useEffect to clear input and other states when the modal opens
    useEffect(() => {
        if (isVisible) {
            setUrl(''); // Clear the URL
            setIsPlaying(false); // Reset playback
            setError(''); // Clear errors
        }
    }, [isVisible]);

    if (!isVisible) return null;

    const handleChange = (e) => {
        setUrl(e.target.value);
        setError(''); // Clear error on URL change
    };

    const handleVerify = () => {
        if (!url) {
            setError('Por favor, ingresa una URL válida.');
            return;
        }
        setIsPlaying(true); // Start playback
    };

    return (
        <div className={`modal fade show ${isVisible ? 'd-block' : 'd-none'}`} tabIndex="-1" role="dialog" data-bs-theme="dark"  >
            <div className="modal-dialog modal-lg "  role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title ">Verificar Canción</h5>
                        <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <div className="mb-3">
                            <label htmlFor="url" className="form-label ">URL de YouTube:</label>
                            <input
                                type="url"
                                className="form-control"
                                id="url"
                                placeholder="Pegue aquí el link de la canción"
                                value={url}
                                onChange={handleChange}
                                required
                            />
                            {error && <p className="text-danger">{error}</p>}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary" onClick={handleVerify}>Verificar Canción</button>
                        {url && (
                        <div className="playerContainer">
                            <ReactPlayer
                                url={url}
                                playing={isPlaying}
                                controls={true}
                                width="0" // Hide width
                                height="0" // Hide height
                                style={{ display: 'none' }} // Hide player
                            />
                            <button type="button" className="btn btn-secondary" onClick={() => setIsPlaying(!isPlaying)}>
                                {isPlaying ? 'Pausar' : 'Reproducir'}
                            </button>
                        </div>
                    )}
                      <button type="button" className="btn btn-danger" onClick={onClose}>
                            Cerrar
                    </button>
                    </div>
                  
                   
                </div>
            </div>
        </div>
    );
};

export default VerificarCancion;