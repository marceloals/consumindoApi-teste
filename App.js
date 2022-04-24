import axios from "axios";
import "./App.css";
import React, { useState, useEffect } from 'react';
import { Person } from "./components/Person";

export default function App() {

  const [page, setPage] = useState(1);
  const [dataView, setDataView] = useState([]);
  const [previousData, setPreviousData] = useState({});
  const [next, setNext] = useState("")
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState("")

  const getData = async() => {

    setIsFetching(true)
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
        setDataView(postData);
        setPreviousData(res.data.previous);
        setNext(res.data.next);
        console.log("data", res.data);
        setIsFetching(false)
      });
  }

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

