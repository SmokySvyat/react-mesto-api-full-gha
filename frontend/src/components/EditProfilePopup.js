import React from "react";
import PopupWithForm from "./PopupWithForm.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

export default function EditProfilePopup ({
    isOpen,
    onClose,
    onUpdateUser,
    isLoading
  }) {
    const currentUser = React.useContext(CurrentUserContext);
    const [value, setValue] = React.useState({});

    React.useEffect(() => {
        setValue({
          name: currentUser.name,
          about: currentUser.about,
        });
      }, [currentUser, isOpen]);

      function handleChange(e) {
        setValue({ ...value, [e.target.name]: e.target.value });
      }

      function handleSubmit(event) {
        event.preventDefault(event);
        onUpdateUser(value);
      }

      return (
        <PopupWithForm
          name = "popup-edit"
          title = "Редактировать профиль"
          buttonValue = {isLoading ? "Сохранение..." : "Сохранить"}
          isOpen = {isOpen}
          onClose = {onClose}
          onSubmit={handleSubmit}
          >
            <div className="popup-form__input-section">
              <input
                id="name"
                className="popup-form__input"
                type="text"
                name="name"
                placeholder="Ваше имя"
                value={value.name ?? ""}
                onChange={handleChange}
                minLength={2}
                maxLength={40}
                required
                />
              <span className="popup__error" />
            </div>
            <div className="popup-form__input-section">
              <input
                id="job"
                className="popup-form__input"
                type="text"
                name="about"
                placeholder="Кратко о себе"
                value={value.about ?? ""}
                onChange={handleChange}
                minLength={2}
                maxLength={200}
                required
                />
              <span className="popup__error" />
            </div>
          </PopupWithForm>
      )
  }