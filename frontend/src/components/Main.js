import Card from './Card.js';
import React, { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";


function Main({
    onEditAvatar,
    onEditProfile,
    onAddCard,
    onDelete,
    onCardClick,
    cards,
    onCardLike,
    onDeleteCard
  }) {

    const currentUser = useContext(CurrentUserContext);

    return ((
        <main className="main">
          <section className="profile">
            <div className="profile__avatar-overlay" onClick={onEditAvatar}/>
            <img className="profile__avatar" src={currentUser.avatar} alt="аватар пользователя" />

            <h1 className="profile__name">{currentUser.name}</h1>
            <p className="profile__job">{currentUser.about}</p>

            <button className="profile__edit" type="button" aria-label="Редактировать" onClick={onEditProfile}>
            </button>

            <button className="profile__add" type="button" aria-label="Добавить фотографию" onClick={onAddCard}>
            </button>
          </section>

          <section>
            <ul className="cards">
            {cards.map((card) => {
              return(
                <Card 
                  card = {card}
                  key={card._id}
                  onCardClick = {onCardClick}
                  onCardLike={onCardLike}
                  onDeleteCard={onDeleteCard}
                  onDelete = {onDelete}
                />
            )})}
            </ul>
          </section>
        </main>
    ))
}

export default Main