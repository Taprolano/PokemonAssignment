import React, { useEffect, useState, useReducer } from "react";
import PokedexDetail from "../Pokedex-Detail/Pokedex-Detail";
import "./Pokedex-List.css";
import getPokemonList from "./Pokedex-List.api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";

interface PokedexListProps {}

const initialState = { url: "" };

export default function PokedexList(props: PokedexListProps): any {
  const [pokemonList, setPokemonList] = useState<any | undefined>([]);
  const [nextPage, setNextPage] = useState<string>("");
  const [url, setPokemonUrl] = useState<string>("");

  useEffect(() => {
    getPokemonDataWithPage();
  }, []);

  const getPokemonDataWithPage = () => {
    getPokemonList({ page: nextPage }).then((data: any): any => {
      setPokemonList([...pokemonList, ...data.data]);
      setNextPage(data.nextLink);
    });
  };

  function handleClick(url: string) {
    setPokemonUrl(url);
  }

  function capitalizeFirstLetter(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="row">
      <div className="col-4">
        <ul className="list-unstyled">
          {pokemonList &&
            pokemonList.map((data: any, index: number) => {
              return (
                <li key={index} className="my-2">
                  <div className="row">
                    <div className="col-3">
                      <button className="btn btn-info text-light">
                        <FontAwesomeIcon icon={faStar} />
                      </button>
                    </div>
                    <div className="col-6 text-center">
                      <b>{capitalizeFirstLetter(data.name)}</b>
                    </div>
                    <div className="col-3 text-end">
                      <button
                        className="btn btn-info text-light"
                        onClick={() => handleClick(data.url)}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </div>
                  </div>
                </li>
              );
            })}
          {nextPage ? (
            <li>
              <button
                className="btn btn-info w-100 text-light"
                onClick={getPokemonDataWithPage}
              >
                Load More...
              </button>
            </li>
          ) : (
            <></>
          )}
        </ul>
      </div>
      <div className="col-8">
        <PokedexDetail url={url}></PokedexDetail>
      </div>
    </div>
  );
}
