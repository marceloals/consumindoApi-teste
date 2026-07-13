import axios from "axios";
import "./App.css";
import React, { useState, useEffect } from 'react';
import { Person } from "./components/Person.jsx";

export default function App() {
  // Definindo o armazenamento dos estados que precisamos monitorar
  const [page, setPage] = useState(1);
  const [dataView, setDataView] = useState([]);
  const [previousData, setPreviousData] = useState({});
  const [totalPages, setTotalPages] = useState(null);
  const [next, setNext] = useState("")
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState("")

  // Criando a função de captura dos dados na api
  const getData = async () => {
    setIsFetching(true); // Definindo o valor de isFetching para verdadeiro enquanto carrega
    setError("");

    try {
      // Fazendo o get da api com axios e controlando o status da carga
      const res = await axios.get("https://swapi.dev/api/people?page=" + page);
      const postData = res.data.results.map((person) => (
        <Person key={person.url} data={person} />
      ));
      setDataView(postData); // Criando os elementos para exibir no html
      setPreviousData(res.data.previous); // armazenando a url da pagina anterior
      setNext(res.data.next); // armazenando a url da proxima pagina
      setTotalPages(Math.ceil(res.data.count / 10)); // total de paginas retornadas pela SWAPI
    } catch (error) {
      const erro = JSON.stringify(error.message);
      setError(erro);
      setDataView([]);
      setPreviousData(null);
      setNext("");
      setTotalPages(null);
    } finally {
      setIsFetching(false); // Retirando a exibição de carregando
    }
  };

  // Usando useEffect para monitorar a mudanca de pagina 
  useEffect(() => {
    getData();
  }, [page]);

  return (

         <div className="App">

           <div>{error ? "An error has occurred: " + error : ""}</div>
           <div>{isFetching ? "Updating..." : ""}</div>
           {dataView}

           <div className="pagination-controls">
             <button
               disabled={page <= 1}
               onClick={() => setPage(1)}
             >
             Primeiro
             </button>

             <button
               disabled={!previousData || page <= 1}
               onClick={() => setPage((pg) => pg - 1)}
             >
             Anterior
             </button>

             <span className="page-indicator">Pag.: {page}</span>

             <button
               disabled={!next}
               onClick={() => setPage((old) => old + 1)}
             >
             Próximo
             </button>

             <button
               disabled={!totalPages || page >= totalPages}
               onClick={() => setPage(totalPages)}
             >
             Último
             </button>
           </div>
           </div>
  );
}

