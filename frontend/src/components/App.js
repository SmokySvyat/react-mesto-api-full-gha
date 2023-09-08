import '../App.css';
import { useEffect, useState } from 'react';
import { api } from '../utils/Api.js';
import * as auth from '../utils/auth.js';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute.js'

import Header from '../components/Header.js';
import Main from '../components/Main.js';
import Footer from '../components/Footer.js';
import ImagePopup from './ImagePopup.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ConfirmPopup from './ConfirmPopup.js';

import Login from './Login.js';
import Register from './Register.js';
import ErrorPage from './ErrorPage.js';
import InfoTooltip from './InfoTooltip.js';

function App() {
  const [isAvatarPopupOpen, setAvatarPopupOpen] = useState(false)
  const [isProfilePopupOpen, setProfilePopupOpen] = useState(false)
  const [isAddCardPopupOpen, setAddCardPopupOpen] = useState(false)
  const [isImagePopupOpen, setImagePopupOpen] = useState(false)
  const [isDeletePopupOpen, setDeletePopupOpen] = useState(false);
  const [cards, setCards] = useState([])
  const [currentUser, setCurrentUser] = useState([])
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isError, setError] = useState(false);
  const [isInfoToolTipOpen, setIsInfoToolTipOpen] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    loggedIn && Promise.all([api.getProfile(), api.getCard()])
    .then(([user, cards]) => {
      setCurrentUser(user)
      setCards(cards)
    })
    .catch((err) => console.log(err.message))
  },[loggedIn])

  const handleEditAvatarClick = () => {
    setAvatarPopupOpen(true)
  }

  const handleUpdateAvatar = (value) => {
    setIsLoading(true);

    api
      .setUserAvatar(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEditProfileClick = () => {
      setProfilePopupOpen(true)
  }

  const handleUpdateUser = (value) => {
    setIsLoading(true);

    api.patchProfile(value)
      .then((res) => {
        setCurrentUser(res);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleAddCardClick = () => {
      setAddCardPopupOpen(true)
  }

  const handleAddCard = (value) => {
    setIsLoading(true);

    api.postCard(value)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleCardClick = (card)=>{
    setSelectedCard(card)
    setImagePopupOpen(true)
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);

    api.like(card._id, isLiked)
      .then((newCard) => {
        setCards((state) =>
          state.map((j) => (j._id === card._id ? newCard : j))
        );
      })
      .catch((err) => console.log(err));
  }

  const handleDeleteClick = (card) => {
    setSelectedCard(card)
    setDeletePopupOpen(true)
  }

  function handleCardDelete(card) {
    setIsLoading(true);

    api.deleteCard(card._id)
      .then((item) => {
        setCards(cards.filter((item) => item._id !== card._id));
        closeAllPopups()
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleInfoTooltipAllowed() {
    setIsInfoToolTipOpen(true);
  }

  function handleInfoTooltipDenied() {
    setError(true);
    setIsInfoToolTipOpen(true);
  }

  function closeAllPopups() {
    setAvatarPopupOpen(false)
    setProfilePopupOpen(false)
    setAddCardPopupOpen(false)
    setImagePopupOpen(false)
    setDeletePopupOpen(false)
    setIsInfoToolTipOpen(false)
    setSelectedCard(null)
  }

  const handleRegister = ({ email, password }) => {
    auth.register({ email, password })
      .then(() => {
        handleInfoTooltipAllowed(true);
        navigate("/sign-in");
      })
      .catch((err) => {
        console.log(err);
        handleInfoTooltipDenied(true);
      });
  };

  const handleLogin = ({ email,password }) => {
    auth.authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          setUserEmail(email);
          navigate("/users/me");
        }
      })
      .catch((err) => console.log(err));
  };

  const tockenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    if (jwt) {
      auth.getContent(jwt)
        .then((res) => {
          if (res) {
            setUserEmail(res.email)
            setLoggedIn(true);
            navigate("/users/me");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    tockenCheck();
  }, []);

  const signOut = () => {
    localStorage.removeItem("jwt");
    navigate("/sign-in");
  };


  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div>
        <Routes>
          <Route path="*" element={<ErrorPage />} />

          <Route
              path="/"
              element={
                loggedIn ? (
                  <Navigate to="/users/me" />
                ) : (
                  <Navigate to="/sign-in" replace />
                )
              }
          />
          <Route
            path="/sign-up"
            element={<Register handleRegister={handleRegister} />}
          />
          <Route
            path="/sign-in"
            element={<Login handleLogin={handleLogin} />}
          />

          <Route 
          path="/users/me"
          element={
            <>
              <Header value={'Выход'} onClick={signOut} email={userEmail}/>

              <ProtectedRoute
                element={Main}
                loggedIn={loggedIn}
                onEditProfile = {handleEditProfileClick}
                onAddCard = {handleAddCardClick}
                onEditAvatar = {handleEditAvatarClick}
                onDelete = {handleDeleteClick}
                onClose ={closeAllPopups}
                cards = {cards}
                user = {currentUser}
                onCardClick = {handleCardClick}
                onCardLike = {handleCardLike}
                
              />

              <Footer />

              <EditProfilePopup
                isOpen={isProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                isLoading={isLoading}
              />

              <AddPlacePopup
                isOpen={isAddCardPopupOpen}
                onClose={closeAllPopups}
                onAddPlace={handleAddCard}
                isLoading={isLoading}
              />

              <EditAvatarPopup
                isOpen={isAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                isLoading={isLoading}
              />

              <ConfirmPopup
                card = {selectedCard}
                isOpen={isDeletePopupOpen}
                onClose={closeAllPopups}
                isLoading={isLoading}
                onDeleteCard = {handleCardDelete}
              />

              <ImagePopup
                card = {selectedCard}
                isOpen = {isImagePopupOpen}
                onClose = {closeAllPopups}
              />
          </>
          } />
          </Routes>
          <InfoTooltip
            isOpen={isInfoToolTipOpen}
            onClose={closeAllPopups}
            isError={isError}
          />
        </div>
      </CurrentUserContext.Provider>
  );
}

export default App;
