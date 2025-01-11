import { useState, useEffect } from "react";
import "./App.css";
import HandleSearch from "./components/Search";

function App() {
  const [words, setWords] = useState([]);

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // Call to JSON file
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/services/mar_mol_dict.json"); // Asegúrate de que el archivo esté servido correctamente.
        if (!response.ok) {
          throw new Error("Error al cargar el archivo JSON");
        }
        const data = await response.json();

        const cleanedData = data.map((eachWord, i) => {
          return {
            index: i,
            name: eachWord.name,
            desc: eachWord.descriptions,
          };
        });

        setWords(cleanedData);
      } catch (error) {
        console.error("Error fetching data: " + error);
      }
    };
    fetchData();
  }, []);

  // Manejar el cambio en la consulta de búsqueda
  const handleInputChange = (value) => {
    setQuery(value);
  };

  const handleSearch = () => {
    // Filtrar palabras que coincidan con la consulta
    const filteredWords = words.filter((word) =>
      word.name.toLowerCase().includes(query.toLowerCase())
    );

    setResults(filteredWords); // Actualizar los resultados
    setHasSearched(true);
  };

  return (
    <>
      <h1>Diccionario Maria Moliner</h1>
      <HandleSearch
        query={query}
        results={results}
        hasSearched={hasSearched}
        handleInputChange={handleInputChange}
        handleSearch={handleSearch}
      />
    </>
  );
}

export default App;
