import './index.css'

const GenreItems = props => {
  const {details} = props
  const {url, tracks, name} = details
  // console.log(url)
  return (
    <li className="items-containerg">
      <img src={url} alt="category" className="picg" />
      <p className="detailsg">{name}</p>
      <p className="tracksg">{tracks}</p>
    </li>
  )
}
export default GenreItems
