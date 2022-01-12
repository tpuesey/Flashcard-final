import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { createCard, readDeck } from "../../utils/api/index";

export default function AddCard() {
  const initialState = { front: "", back: "" };
  const [formData, setFormData] = useState(initialState);
  const [deck, setDeck] = useState({});
  const { deckId } = useParams();

  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value,
    });
  };

  useEffect(() => {
    const abortController = new AbortController();

    async function getDeck() {
      try {
        let result = await readDeck(deckId, abortController.signal);
        setDeck(result);
      } catch (error) {
        throw error;
      }
    }
    getDeck();

    return () => abortController.abort();
  }, [deckId]);

  const submitHandler = (event) => {
    event.preventDefault();

    setCard({ front: card.front, back: card.back });
    const abortController = new AbortController();

    try {
      async function CreateCard() {
        let result = await createCard(deckId, card, abortController.signal);

        setUpdated(result);
      }
      CreateCard();
    } catch (error) {
      throw error;
    }
    setCard({ front: "", back: "" });
  };

  return (
    <>
      {" "}
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to={"/"}>
              <HouseFill /> &nbsp;Home
            </Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deckId}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            <Link to={url}>Add Card</Link>
          </li>
        </ol>
      </nav>
      <h2>{deck.name}: Add Card</h2>
      <CardForm
        handleChange={handleChange}
        submitHandler={submitHandler}
        card={card}
        deck={deck}
      />
    </>
  );
}