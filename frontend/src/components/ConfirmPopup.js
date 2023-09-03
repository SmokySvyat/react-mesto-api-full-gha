import React from "react";
import PopupWithForm from "./PopupWithForm";

export default function ConfirmPopup({ card, isOpen, onClose, onDeleteCard, isLoading }) {

    function handleSubmit(evt) {
        evt.preventDefault(evt);
        onDeleteCard(card)
    }

  return (
    <PopupWithForm
      name="form-confirm-delete"
      title="Вы уверены?"
      buttonValue = {isLoading ? "Удаление..." : "Да"}
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    />
  );
}