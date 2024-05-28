import {Link} from 'react-router-dom'
import './index.css'

const ReleaseListItem = props => {
  const {details} = props
  const {requrl, reqid, reqname} = details
  // console.log(reqid)
  return (
    <Link to={`/album/${reqid}`}>
      <li className="items-container">
        <img src={requrl} alt="new release album" className="pic" />
        <p className="details">{reqname}</p>
      </li>
    </Link>
  )
}
export default ReleaseListItem
