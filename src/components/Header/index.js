import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logoutButton = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <div className="header-container">
      <button className="button1" type="button" onClick={logoutButton}>
        <img
          src="https://res.cloudinary.com/dj4zaf9dt/image/upload/v1715855750/music_zo3pdp.png"
          alt="website logo"
          className="musiclogo"
        />
      </button>

      <button className="button1" type="button" onClick={logoutButton}>
        <img
          src="https://res.cloudinary.com/dj4zaf9dt/image/upload/v1715856100/logout_vxusq0.png"
          alt="logout"
          className="logout"
        />
      </button>
    </div>
  )
}
export default withRouter(Header)
