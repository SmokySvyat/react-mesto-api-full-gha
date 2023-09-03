

function PopupWithForm (props) {
    const className = `popup ${props.isOpen ? 'popup_active' : ''}`
    return ((
    <div id={props.name} className={className}>
        <div className="popup__container">
            <form name="form-confirm-delete" className="popup-form" onSubmit={props.onSubmit}>
              <button className="popup__close" type="button" aria-label="Закрыть картинку" onClick={props.onClose}/>
              <h2 className="popup-form__heading">{props.title}</h2>
              {props.children}
              <input className="popup-form__btn" type="submit" value={props.buttonValue} />
            </form>
        </div>
    </div>
    ))
};

export default PopupWithForm;