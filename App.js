import axios from "axios";
import "./App.css";
import React, { useState, useEffect } from 'react';
import { Person } from "./components/Person";

export default function App() {
  // Definindo o armazenamento dos estados que precisamos monitorar
  const [page, setPage] = useState(1);
  const [dataView, setDataView] = useState([]);
  const [previousData, setPreviousData] = useState({});
  const [next, setNext] = useState("")
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState("")

  // Criando a função de captura dos dados na api
  const getData = async() => {

    setIsFetching(true) // Definindo o valor de isFetching para verdadeiro enquanto carrega
    // Fazendo o get da api com axios e controlando o status da carga 
    axios.get("https://swapi.dev/api/people?page=" + page)
      .catch(function (error) {
        const erro = JSON.stringify(error.message);
        setError(erro);
        setIsFetching(false);
      })
      .then((res) => {
        const postData = res.data.results.map((person) => (
          <Person key={person.url} data={person} />
        ));
        setDataView(postData); // Criando os elementos para exibir no html 
        setPreviousData(res.data.previous); // armazenando a url da pagina anterior
        setNext(res.data.next); // armazenando a url da proxima pagina
        console.log("data", res.data);
        setIsFetching(false) // Retirando a exibição de carregando
      });
  }

  // Usando useEffect para monitorar a mudanca de pagina 
  useEffect(() => {
    getData(page);
  }, [page]);

  return (

         <div className="App">

           <div>{error ? "An error has occurred: " + error : ""}</div>
           <div>{isFetching ? "Updating..." : ""}</div>
           {dataView}

           <button
             disabled={!previousData || page <= 1}
             onClick={() => setPage((pg) => pg - 1)}
           >
           Anterior
           </button>

           <span>Pag.: {page}</span>
           
           <button
             disabled={!next}
             onClick={() => setPage((old) => old + 1)}
           >
           Próximo
           </button>
           </div>
  );
}

