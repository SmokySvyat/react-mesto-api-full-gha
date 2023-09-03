import React from "react";
import icoAllowed from "../images/icoAllowed.svg";
import icoDenied from "../images/icoDenied.svg";

function InfoTooltip(props) {
    const className = `popup ${props.isOpen ? 'popup_active' : ''}`

  return (
    <div className={className}>
      <div className="popup__container">
      <button className="popup__close" type="button" aria-label="Закрыть картинку" onClick={props.onClose}/>
        <img
          className="popup__access-ico"
          src={props.isError ? icoDenied : icoAllowed}
          alt="Статус регистрации"
        />
        <p className="popup__access-text">
          {" "}
          {props.isError
            ? "Что-то пошло не так! Попробуйте ещё раз."
            : "Вы успешно зарегистрировались!"}
        </p>
      </div>
    </div>
  );
}

export default InfoTooltip;