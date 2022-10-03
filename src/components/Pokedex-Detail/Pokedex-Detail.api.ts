export default async function getPokemonDetail(props:any):Promise<any>{
    const getPokemonDetail = await fetch(props.url);
    const resp = await getPokemonDetail.json();
    return {
        data: resp
    };
}
