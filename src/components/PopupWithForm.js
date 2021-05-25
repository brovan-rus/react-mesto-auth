import React from "react";

function PopupWithForm({
  content,
  title,
  children,
  isOpen,
  onClose,
  submitButtonText,
  onSubmit,
}) {
  return (
    <div
      className={`popup popup_content_${content}, ${
        isOpen ? "popup_opened" : ""
      }`}
    >
      <div className={`popup__container popup__container_content_form`}>
        <button
          type="button"
          className="popup__close-button"
          onClick={onClose}
        />
        <h2 className="popup__title">{title}</h2>
        <form
          name={content}
          className="form"
          action="#"
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button className="form__submit-button" type="submit">
            {submitButtonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
