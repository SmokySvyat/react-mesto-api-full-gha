import React, { useState,useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function AddPlacePopup({
    isOpen,
    onClose,
    onAddPlace,
    isLoading,
  }) {
    const [values, setValues] = useState({});

    useEffect(() => {
        if (isOpen) {
        setValues({});
        }
    }, [isOpen]);

    function handleChange(evt) {
        setValues({ ...values, [evt.target.name]: evt.target.value });
      }
    
      function handleSubmit(evt) {
        evt.preventDefault();
        onAddPlace(values);
      }

      return (
        <PopupWithForm
          name = "popup-add"
          title = "Новое место"
          buttonValue = {isLoading ? "Создание..." : "Создать"}
          isOpen = {isOpen}
          onClose = {onClose}
          onSubmit={handleSubmit}
          >
            <div className="popup-form__input-section">
              <input
                id="place"
                className="popup-form__input"
                type="text"
                name="place"
                placeholder="Название"
                value={values.place ?? ""}
                onChange={handleChange}
                minLength={2}
                maxLength={30}
                required
                />
              <span className="popup__error popup__error_active" />
            </div>
            <div className="popup-form__input-section">
              <input
                id="place-link"
                className="popup-form__input"
                type="url"
                name="link"
                placeholder="Ссылка на картинку"
                value={values.link ?? ""}
                onChange={handleChange}
                required
                />
              <span className="popup__error popup__error_active" />
            </div>
          </PopupWithForm>
      )
  }