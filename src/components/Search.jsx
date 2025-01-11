import PropTypes from "prop-types";

function Search({ query, results, hasSearched, handleInputChange, handleSearch }) {
  // Función para renderizar resultados de búsqueda
  const renderMatchedWord = () => {
    if (Array.isArray(results) && results.length > 0) {
      return results.map((word, index) => {
        if (word.desc && Array.isArray(word.desc)) {
          return (
            <div
              key={index}
              style={{
                marginTop: "20px",
                borderTop: "1px solid #ccc",
                paddingTop: "10px",
              }}
            >
              <h2>{word.name}</h2>
              <ul>
                {word.desc.map((desc, i) => (
                  <li key={i}>{desc}</li>
                ))}
              </ul>
            </div>
          );
        }
        return null; // Si `descriptions` no es un array, no renderizar nada
      });
    }
    if (hasSearched && query && results.length === 0) {
      return <p>No se encontraron resultados para &quot;{query}&quot;</p>;
    }

    return null; // No mostrar nada si no hay búsqueda activa o resultados
  };

  return (
    <>
      {/* Formulario */}
      <form
        onSubmit={(e) => {
          e.preventDefault(); // Evita recargar la página
          handleSearch(); // Ejecuta la búsqueda
        }}
      >
        <input
          type='text'
          value={query}
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder='Busca una palabra...'
        />
        <button type='submit'>Buscar</button>
      </form>

      {/* Detalles de la palabra coincidente */}
      <div>{renderMatchedWord()}</div>
      
    </>
  );
}

Search.propTypes = {
  query: PropTypes.string.isRequired, // La consulta debe ser una cadena
  results: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,  // Cada resultado debe tener un nombre
      desc: PropTypes.arrayOf(PropTypes.string).isRequired, // La descripción debe ser un array de cadenas
    })
  ).isRequired,
  hasSearched: PropTypes.bool.isRequired, // `hasSearched` debe ser un booleano
  handleInputChange: PropTypes.func.isRequired, // `handleInputChange` debe ser una función
  handleSearch: PropTypes.func.isRequired, // `handleSearch` debe ser una función
};

export default Search;
