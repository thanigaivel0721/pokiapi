import React, { useEffect, useState } from 'react';
import { getPokemonList, getPokemonTypes, getPokemonDetails } from '../services/api'; // Import getPokemonDetails
import PokemonCard from './PokemonCard';
import './PokemonList.css'; // Import the CSS file for the list

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('');

  useEffect(() => {
    fetchPokemon();
    fetchTypes();
  }, []);

  const fetchPokemon = async () => {
    setLoading(true);
    const data = await getPokemonList();
    // Fetch additional details for each Pokémon (like image) here if needed
    const detailedData = await Promise.all(data.map(async (pokemon) => {
      const details = await getPokemonDetails(pokemon.name); // Make sure getPokemonDetails is defined in your API service
      return {
        ...details,
        image: details.sprites.front_default // Add the image URL to the Pokémon data
      };
    }));
    setPokemonList(detailedData);
    setLoading(false);
  };

  const fetchTypes = async () => {
    const data = await getPokemonTypes();
    setTypes(data);
  };

  const handleFilter = (event) => {
    setFilterType(event.target.value);
  };

  const filteredPokemonList = filterType
    ? pokemonList.filter((pokemon) =>
        pokemon.types && Array.isArray(pokemon.types) &&
        pokemon.types.some(type => type.type.name === filterType)
      )
    : pokemonList;

  return (
    <div>
      <h1>Pokédex</h1>
      <label htmlFor="type-filter">Filter by Type: </label>
      <select id="type-filter" onChange={handleFilter}>
        <option value="">All</option>
        {types.map((type) => (
          <option key={type.name} value={type.name}>
            {type.name}
          </option>
        ))}
      </select>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="pokemon-list">
          {filteredPokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.name} pokemon={pokemon} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonList;
