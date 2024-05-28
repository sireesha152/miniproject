import './index.css'

const ReleaseItems = props => {
  const {details, onClicked} = props
  const {time, song, track, artist} = details
  // console.log(details)
  // const newadded = console.log(newadded)
  const min = Math.round(time / 60000)
  const sec = Math.round((time % 60000) / 1000)

  // console.log(somedate)np
  const clikedToPlay = () => {
    onClicked(song)
  }

  return (
    <button className="buttonr" type="button" onClick={clikedToPlay}>
      <li className="itemsr">
        <p className="pr">{track}</p>

        <p className="pr">
          {min}:{sec}
        </p>
        <p className="pr">{artist}</p>
      </li>
    </button>
  )
}
export default ReleaseItems
