import React, {useState,useEffect} from "react";
import {Link} from "react-router-dom";
import {listDecks} from "../../utils/api/index";
import RenderDecks from "./RenderDecks";

export default function Home({numOfDecks,updateDecks}){

    //load all decks from API into decks state
    const [decks,setDecks] = useState([]);

    useEffect(()=>{
      const abortController = new AbortController();
      const loadDecks = async () => {
      const deck = await listDecks(abortController.signal)
      setDecks(deck);
    };
    loadDecks();
    return () => abortController.abort();
    },[numOfDecks]);

   return(
    <div className={"container"}>
            <Link to="/decks/new">
            <button type="button" className="btn btn-secondary m-3">Create Deck</button>
            </Link>
            {decks.map(({id,name,description,cards})=>(
            <RenderDecks key={id} id={id} description={description} cards={cards} name={name} updateDecks={updateDecks}/>
            ))}
    </div>
    )
}