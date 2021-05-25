function ImagePopup({ card, onClose }) {
  return (
    <div
      className={`popup popup_content_photo ${
        card.isOpened ? "popup_opened" : ""
      }`}
    >
      <div className="popup__container popup__container_content_photo">
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <img src={card.link} alt={card.name} className="popup__photo" />
        <h2 className="popup__title popup__title_content_photo">{card.name}</h2>
      </div>
    </div>
  );
}

export default ImagePopup;
