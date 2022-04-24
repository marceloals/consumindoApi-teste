import { useQuery } from "react-query";
import axios from "axios";
import "./App.css";
import React from "react";
import { Person } from "./components/Person";

function pessoas() {

  const bt = () =>{
    if (document.getElementById("anterior") == true){
      document.getElementById("proximo") = false;
    }else{
      document.getElementById("anterior") = false;
    }
  }

  const voltar = () =>{
    window.location = "\App.js"
   }
   return (
    <div className="App">
      <h1>Última página, clique para voltar!</h1>
      

      <button id="anterior" onclick = {voltar} disabled ={false}>Anterior</button>
      <button id="proximo" disabled = {true}>Próximo</button>
    </div>
  );
}

export default pessoas;
