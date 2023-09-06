class Api {
    constructor({url, headers}) {
      this._baseUrl = url;
      this._headers = headers;
    }
  
    _isResultOk(res) {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`Ошибка: ${res.status}`)
    };
  
    getProfile() {
      return fetch(`${this._baseUrl}users/me`, {
          headers: this._headers
        })
          .then(res => this._isResultOk(res))
    };
  
    patchProfile(values) {
      return fetch(`${this._baseUrl}users/me`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify(values)
      })
      .then(res => this._isResultOk(res))
    };

    setUserAvatar({avatar}) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: avatar
        })
      })
      .then(res => this._isResultOk(res))
    };
  
    getCard() {
      return fetch(`${this._baseUrl}cards`, {
        headers: this._headers
      }). then(res => this._isResultOk(res))
    };
  
    postCard(data) {
      return fetch(`${this._baseUrl}cards`, {
        method: 'POST',
        headers: this._headers,
        body: JSON.stringify({
          name: data.place,
          link: data.link
        })
      })
      .then(res => this._isResultOk(res))
    };

    deleteCard(cardId) {
      return fetch(`${this._baseUrl}cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers
      })
      .then(res => this._isResultOk(res))
    }

    like(cardId, isLiked) {
        return fetch(`${this._baseUrl}cards/${cardId}/likes`, {
          method: isLiked ? 'DELETE' : 'PUT',
          headers: this._headers
        })
        .then((res) => this._isResultOk(res))
      }
  };

export const api = new Api ({
  url: 'https://api.mesto.svyat.nomoredomainsicu.ru',
  }
);