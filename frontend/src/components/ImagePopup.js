

function ImagePopup ({card, isOpen, onClose}) {
  const className = `popup popup-image ${isOpen? 'popup_active' : ''}`
  return((
    <div id="popup-img" className={className}>
      <div className="popup__image-container">
        <button className="popup__close" type="button" aria-label="Закрыть картинку" onClick={onClose}/>
        <img className="popup__image" src={card?.link} alt={card?.name} />
        <h2 className="popup__heading">{card?.name}</h2>            
      </div>
    </div>
  ))
}

export default ImagePopup;