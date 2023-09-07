import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card({ card, onCardClick, onCardLike, onDeleteCard, onDelete }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some((i) => i._id === currentUser._id);
  const likeButtonClassName = `card__like ${
    isLiked && "card__like_active"
  }`;

    function handleClick() {
      onCardClick(card)
    };

    function handleLikeCard() {
      onCardLike(card);
    };

    function handleDeleteCard() {
      onDelete(card)
    }

  return((
    <li className="card">
      {isOwn && (
        <button className="card__del" type="button" aria-label="Удалить" onClick={handleDeleteCard}/>
      )}

      <img className="card__img" src={card.link} alt={card.name} onClick={handleClick}/>
      <h2 id="place-name" className="card__text">{card.name}</h2>

      <div>
        <button id="like" className={likeButtonClassName} type="button" onClick={handleLikeCard} aria-label="Нравится" data-path="template">
        </button>
        <p className="card__like-counter">{card.likes.length}</p>
      </div>
    </li>
  ))
}

export default Card;