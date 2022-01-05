import React from "react";
import {Link, useHistory} from "react-router-dom";
import {deleteDeck} from "../../utils/api/index";

export default function RenderDecks({id,name,description,cards,updateDecks}){
    const history = useHistory();

    const handleDelete = async () =>{
        if(window.confirm("Are you sure you want to delete this deck?")){
            await deleteDeck(id);
            updateDecks(-1);
            history.push("/");
        };
    }

    return(
        <div className="card m-2">
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            {cards.length} cards
            <p className="card-text">{description}</p>
            <div className="d-flex">
            <Link to={`/decks/${id}`}><button className="btn btn-secondary p-2 m-1">View</button></Link>
            <Link to={`/decks/${id}/study`}><button className="btn btn-primary p-2 m-1">Study</button></Link>
            <button className="btn btn-danger ml-auto p-2 m-1" onClick={handleDelete}>Delete</button>
            </div>
        </div>
        </div>
    )
}