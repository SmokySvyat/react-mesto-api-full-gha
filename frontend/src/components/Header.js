import logo from '../images/logo.svg';

function Header({value, onClick, email}) {

    return (
    <header className="header">
        <a className="header__logo" href="*"><img src={logo} alt="логотип проекта" /></a>
        <div>
          <span className="header__user">{email}</span>
          <button
            className="header__button"
            onClick={onClick}
          >
            {value}
          </button>
        </div>
    </header>
    )
}

export default Header