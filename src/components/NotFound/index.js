import {Link} from 'react-router-dom'
import {RiArrowGoBackFill} from 'react-icons/ri'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const NotFound = props => {
  const onClickBack = () => {
    const token = Cookies.get('jwt_token')
    const {history} = props
    if (token === undefined) {
      history.replace('/login')
    } else {
      history.push('/')
    }
  }

  return (
    <div className="home-containern">
      <Header />

      <div className="list-columnn">
        <Link to="/">
          <button className="backbuttonn" type="button" onClick={onClickBack}>
            <RiArrowGoBackFill className="back-arrown" />
            <p className="back">Home Page</p>
          </button>{' '}
        </Link>
        <h1>PAGE NOT FOUND</h1>

        <img
          src="https://res.cloudinary.com/dj4zaf9dt/image/upload/v1715944180/Frame_154_awqb9q.png"
          alt="page not found"
          className="img404n"
        />
      </div>
    </div>
  )
}
export default NotFound
