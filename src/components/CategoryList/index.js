import {Link} from 'react-router-dom'
import './index.css'

const CategoryList = props => {
  const {details} = props
  const {requrl, reqid, name} = details

  return (
    <Link to={`/category/${reqid}/playlists`}>
      <li className="items-container">
        <img src={requrl} alt="category" className="pic" />
        <p className="name">{name}</p>
      </li>
    </Link>
  )
}
export default CategoryList
