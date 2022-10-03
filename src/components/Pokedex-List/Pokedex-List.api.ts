export default async function PokedexListApi(props:any):Promise<any>{
    const getPokemonList = await fetch('https://pokeapi.co/api/v2/pokemon'+(props.page ? '?'+props.page:''));
    const resp = await getPokemonList.json();
    return {
        data: resp.results.map((x:any) => ({
            name: x.name,
            url: x.url,
            id: x.url.split('/pokemon/')[1].slice(0, -1)
        })),
        nextLink: resp.next.split('?')[1]
    };
}
