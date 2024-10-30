const Buscador = ({ setSearchTerm, searchTerm }) => {
    return (
        <div className="pt-3">
        <input 
            type="text" 
            placeholder="Buscar por título o autor" 
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term
            value={searchTerm}
            className="form-control mb-3"
        />
        </div>
    );
};

export default Buscador;