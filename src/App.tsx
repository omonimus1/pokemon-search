import React from 'react';
import logo from './logo.svg';
import './App.css';
import {useState} from "react";


import Axios from "axios";

function App() {
 
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonChosen, setPokemonChosen] = useState(false);
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    img: "",
    hp: "",
    attack: "",
    defence: "",
    type: "",
  });
  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then(
      (response) => {
        console.log(response);
        setPokemon({
           name : pokemonName,
           species: response.data.species.name,
           img: response.data.sprites.front_default,
           hp: response.data.stats[0].base_stat,
           attack: response.data.stats[1].base_stat,
           defence: response.data.stats[2].base_stat,
           type: response.data.types[0].type.name, 
        });
        setPokemonChosen(true); 
      }
    );
  };

  return (
    <div className="App">
      <div className="row">
        <div className='titleSection'>
          <h1>Pokemon Stats</h1>
          <input type="text" 
          onChange= {(event) => {
            setPokemonName(event.target.value);
          }}
          />
          <button onClick={searchPokemon}>Search Pokemon</button>
        </div>
      </div>
      <div className="row">
        <div className="displaySection">
            {!pokemonChosen ? 
              ( <h1>Please choose a Pokemon</h1> ) :
              ( 
                <>
                <h1>{pokemon.name}</h1> 
                <img src={pokemon.img} />
                <h3>Species: {pokemon.species}</h3>
                <h3>Type: {pokemon.type}</h3>
                <h4>Attack: {pokemon.hp} </h4>
                <h4>Defence: {pokemon.hp}</h4>
                <h4>HP: {pokemon.hp}</h4>
                </>
              )
            }
        </div>
      </div>
    </div>
  );
}

export default App;
