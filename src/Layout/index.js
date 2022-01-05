import React, {useState} from "react";
import {Route, Switch} from "react-router-dom";
import Header from "./Misc/Header";
import NotFound from "./Misc/NotFound";
import Home from "./Home/Home";
import StudyPage from "./Deck/StudyPage";
import CreateDeck from "./Home/CreateDeck";
import EditDeck from "./Deck/EditDeck";
import Deck from "./Deck/Deck";
import EditCard from "./Cards/EditCard";
import AddCard from "./Cards/AddCard";

function Layout() {
const [numOfDecks, setNumofDecks] = useState(0);
const updateDecks = (val) => {
  setNumofDecks(numOfDecks + val);
};


  return (
    <div>
      <Header />
      <div className='container'>
      <Switch>    
        
        <Route exact={true} path={"/"}>  
          <Home numOfDecks={numOfDecks} updateDecks={updateDecks}/>  
        </Route>
        
        <Route path={"/decks/:deckId/study"}>
          <StudyPage/>
        </Route>
        
        <Route path={"/decks/new"}>
          <CreateDeck/>
        </Route>

        <Route path={"/decks/:deckId/edit"}>
          <EditDeck/>
        </Route>

        <Route path={"/decks/:deckId/"} exact={true}>
          <Deck updateDecks={updateDecks}/>
        </Route>

        <Route path={"/decks/:deckId/cards/new"}>
          <AddCard/>
        </Route>

        <Route path={"/decks/:deckId/cards/:cardId/edit"}>
          <EditCard/>
        </Route>

        <Route>
          <NotFound/>
        </Route>

      </Switch>
      </div>
      </div>
    
  );
}

export default Layout;