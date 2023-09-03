import React, { useRef, useState, useEffect } from "react";
import PopupWithForm from "./PopupWithForm";

export default function EditAvatarPopup({
    isOpen,
    onClose,
    onUpdateAvatar,
    isLoading,
  }) {
    const [isValidity, setIsValidity] = useState(true);
    const inputRef = useRef(0);

    useEffect(() => {
        isOpen && (inputRef.current.value = "");
      }, [isOpen]);
    
    function handleSubmit(evt) {
      evt.preventDefault();
      onUpdateAvatar({
        avatar: inputRef.current.value,
      });
    }
    
    function handleChange() {
      setIsValidity(inputRef.current.checkValidity());
    }

    return (
        <PopupWithForm
          name = "popup-change-avatar"
          title = "Обновить аватар"
          buttonValue = {isLoading ? "Сохранение..." : "Да"}
          isOpen = {isOpen}
          onClose = {onClose}
          onSubmit={handleSubmit}
          >
            <div className="popup-form__input-section">
              <input
                id="avatar-link"
                className = {`popup-form__input ${!isValidity}`}
                type="url"
                name="link"
                placeholder="Ссылка на картинку"
                ref={inputRef}
                onChange={(evt) => handleChange(evt.target.value)}
                required
                />
              <span className="popup__error popup__error_active" />
            </div>
          </PopupWithForm>
    )
  }