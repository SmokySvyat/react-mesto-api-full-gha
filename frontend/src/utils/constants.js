export const validationOptions = {
  formSelector: '.popup-form',
  inputSelector: '.popup-form__input',
  submitButtonSelector: '.popup-form__btn',
  inactiveButtonClass: 'popup-form__btn_inactive',
  inputErrorClass: 'popup-form__input_invalid',
  errorClass: 'popup__error_active',
  errorText: '.popup__error',
  errorClosestParent: '.popup-form__input-section'
};

export const cardTemplateOptions = {
  containerSelector: '.cards',
  templateSelector: 'card-template',
  cardSelector: '.card',
  cardHeadingSelector: '.card__text',
  deleteBtnSelector: '.card__del',
  likeBtnSelector: '.card__like',
  imgSelector: '.card__img',
  likeBtnClass: 'card__like_active',
  counterSelector: '.card__like-counter'
};

export const profileSelectors = {
  avatarSelector: '.profile__avatar',
  nameSelector: '.profile__name',
  aboutSelector: '.profile__job',
  buttonEditSelector: '.profile__edit',
  buttonAvatarSelector: '.profile__avatar-overlay',
  buttonAddSelector: '.profile__add'
};

export const popupsSelectors = {
  editProfile: '#popup-edit',
  addCard: '#popup-add',
  imagePopup: '.popup-image',
  changeAvatar: '#popup-change-avatar',
  confirmDelete: '#popup-confirm-delete'
}

export const formSelectors = {
  formProfile: "form-profile",
  formAdd: "form-add-card",
  formAvatar: "form-change-avatar",
  submit: '.popup-form__btn'
}