import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const {history} = props
  const logoutClick = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav>
      <ul className="homeNav">
        <li className="eachItem">
          <Link to="/">
            <img
              className="headLogo"
              alt="website logo"
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            />
          </Link>
        </li>
        <li className="eachItem1">
          <Link to="/" className="headerLi">
            Home
          </Link>
          <Link to="/jobs" className="headerLi">
            Jobs
          </Link>
        </li>
        <li className="eachItem">
          <button className="logoutButton" type="button" onClick={logoutClick}>
            Logout
          </button>
        </li>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
