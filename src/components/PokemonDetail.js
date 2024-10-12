import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPokemonDetails } from '../services/api'; // Make sure this function exists

const PokemonDetail = () => {
  const { pokemonName } = useParams();
  const [pokemonDetail, setPokemonDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      setLoading(true);
      const data = await getPokemonDetails(pokemonName); // Assuming this function is defined
      setPokemonDetail(data);
      setLoading(false);
    };

    fetchPokemonDetail();
  }, [pokemonName]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!pokemonDetail) {
    return <p>Pokémon not found!</p>;
  }

  return (
    <div>
      <h1>{pokemonDetail.name}</h1>
      <img src={pokemonDetail.sprites.front_default} alt={pokemonDetail.name} />
      <p>Height: {pokemonDetail.height}</p>
      <p>Weight: {pokemonDetail.weight}</p>
      <p>Types: {pokemonDetail.types.map(type => type.type.name).join(', ')}</p>
      {/* Add more details as needed */}
    </div>
  );
};

export default PokemonDetail;
