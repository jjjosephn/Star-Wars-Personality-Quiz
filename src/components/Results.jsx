import React, { useContext, useEffect } from "react";
import { UserContext } from './UserContext';

function capitalizeFirstLetter(string) {
  if (!string) return '';  
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export default function Results({ artwork }) {
  const { name } = useContext(UserContext);

  useEffect(() => {
    console.log('Artwork data:', artwork);
  }, [artwork]);

  return (
    <div>
      <p>
        <strong>{name}</strong>, your selected character is: {artwork ? artwork.name : 'No character found'}
      </p>
      {artwork ? (
        <div className="artwork">
          <h2>{artwork.name}</h2>
          <img src={artwork.image} alt={artwork.name} />
          <p>Species: {capitalizeFirstLetter(artwork.species)}</p>
        </div>
      ) : (
        <p>No artwork found.</p>
      )}
    </div>
  );
}
