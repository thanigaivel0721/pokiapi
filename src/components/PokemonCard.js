import React from 'react';
import { Link } from 'react-router-dom';
import './PokemonCard.css'; // Import the CSS file

const PokemonCard = ({ pokemon }) => {
  return (
    <div className="pokemon-card">
      <Link to={`/pokemon/${pokemon.name}`}>
        <h3>{pokemon.name}</h3>
        <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
        <div className="types">
          {pokemon.types.map((type) => (
            <span key={type.name} className={`type ${type.name}`}>
              {type.name}
            </span>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default PokemonCard;
