import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import React from "react";
import ImagePopup from "./ImagePopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import api from "../utils/api";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import CardDelApprovePopup from "./CardDelApprovePopup";
import { Route, Switch, Link } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";

function App() {
  const [isEditProfilePopupOpen, setIsEditProfileOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(
    false
  );
  const [isCardDelApprovePopupOpen, setIsCardDelApprovePopup] = React.useState(
    false
  );
  const [selectedCard, setSelectedCard] = React.useState({ isOpened: false });
  const [currentUser, setCurrentUser] = React.useState({
    userName: "Загрузка...",
    userDescription: "Загрузка...",
    userAvatar: "../images/loading.jpg",
    userId: "",
  });
  const [deletingCard, setDeletingCard] = React.useState({});

  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getInitialCards()
      .then((answer) => {
        setCards(answer);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleCardLike = (card) => {
    const isLikedByMe = card.likes.some(
      (like) => like._id === currentUser.userId
    );
    api
      .changeLikeCardStatus(card._id, isLikedByMe)
      .then((newCard) =>
        setCards((state) =>
          state.map((c) => (c._id === card._id ? newCard : c))
        )
      )
      .catch((err) => console.log(err));
  };

  const handleCardDelete = (card) => {
    api
      .removeCard(card._id)
      .then((answer) => {
        setCards((state) => state.filter((c) => c._id !== card._id));
        setDeletingCard({});
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  };

  const handleCardDelApprove = (card) => {
    setIsCardDelApprovePopup(true);
    setDeletingCard(card);
  };

  React.useEffect(() => {
    api
      .getCurrentUser()
      .then(({ name, about, avatar, _id }) => {
        setCurrentUser({
          userName: name,
          userDescription: about,
          userAvatar: avatar,
          userId: _id,
        });
      })
      .catch((err) => console.log(err));
  }, []);

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleProfileEditClick() {
    setIsEditProfileOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setIsEditProfileOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsCardDelApprovePopup(false);
    setSelectedCard({ isOpened: false });
  }

  function handleCardClick(card) {
    setSelectedCard({ ...card, isOpened: true });
  }

  function handleUpdateUser(name, description) {
    api
      .setCurrentUser({ userName: name, userDescription: description })
      .then(({ name, about, avatar, _id }) => {
        setCurrentUser({
          userName: name,
          userDescription: about,
          userId: _id,
          userAvatar: avatar,
        });
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleUpdateAvatar(avatarRef) {
    api
      .avatarChange(avatarRef.current.value)
      .then(({ name, about, _id, avatar }) => {
        setCurrentUser({
          userName: name,
          userDescription: about,
          userAvatar: avatar,
          userId: _id,
        });
        avatarRef.current.value = "";
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  function handleCardAdd(name, link) {
    api
      .addNewCard({ name, link })
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err));
  }

  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <>
      {/*<Route path="*">{!loggedIn && <Redirect to="/sign-in" />}</Route>*/}
      <Switch>
        <ProtectedRoute path="/" loggedIn={loggedIn} exact>
          <CurrentUserContext.Provider value={currentUser}>
            <div className="page page_position_center">
              <Header linkText="Выйти" email="brovan@yandex.ru" />
              <Main
                handleAddPlaceClick={handleAddPlaceClick}
                handleEditAvatarClick={handleEditAvatarClick}
                handleProfileEditClick={handleProfileEditClick}
                handleCardClick={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelApprove}
              />
              <Footer />
            </div>

            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
            />

            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
            />

            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onCardAdd={handleCardAdd}
            />

            <CardDelApprovePopup
              isOpen={isCardDelApprovePopupOpen}
              onClose={closeAllPopups}
              card={deletingCard}
              onCardDel={handleCardDelete}
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
          </CurrentUserContext.Provider>
        </ProtectedRoute>

        <ProtectedRoute loggedIn={loggedIn} path="/sign-up">
          <div className="page page_position_center">
            <h1 className="header__link">Страница для регистрации</h1>
          </div>
        </ProtectedRoute>
        <Route path="/sign-in">
          <div className="page page_position_center">
            <Header linkText="Регистрация" />
            <Login />
          </div>
        </Route>
        <ProtectedRoute path="*" loggedIn={loggedIn}>
          <h1>Ошибка 404</h1>
          <Link to="/">На главную</Link>
        </ProtectedRoute>
      </Switch>
    </>
  );
}

export default App;
