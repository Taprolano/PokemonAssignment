import React, { useEffect, useState } from "react";
import getPokemonDetail from "./Pokedex-Detail.api";
import "./Pokedex-Detail.css";

interface PokedexDetailProps {
  url: string;
}

export default function PokedexDetail({ url }: PokedexDetailProps): any {
  const [pokemonDetail, setPokemonDetail] = useState<any>(null);

  useEffect(() => {
    if (url)
      getPokemonDetail({ url: url }).then((data) => {
        setPokemonDetail(data.data);
      });
  }, [url]);

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div>
      {pokemonDetail ? (
        <table className="table table-dark">
          <thead>
            <tr>
              <th colSpan={4} className="text-center">
                <h2>{capitalizeFirstLetter(pokemonDetail.name)}</h2>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th>Weight</th>
              <td>{pokemonDetail.weight}</td>
              <th>Height</th>
              <td>{pokemonDetail.height}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        ""
      )}
    </div>
  );
}
