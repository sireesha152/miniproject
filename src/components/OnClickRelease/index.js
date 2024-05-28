import {Component} from 'react'
import ReactAudioPlayer from 'react-audio-player'
import {RiArrowGoBackFill} from 'react-icons/ri'
import Cookies from 'js-cookie'
import ReleaseItems from '../ReleaseItems'
import Header from '../Header'
import './index.css'

class OnClickRelease extends Component {
  state = {list: [], isLoading: true, isSuccess: false, reqdata: {}, play: ''}

  componentDidMount() {
    this.getdata()
  }

  onClickBack = () => {
    const token = Cookies.get('jwt_token')
    const {history} = this.props
    if (token === undefined) {
      history.replace('/login')
    } else {
      history.push('/')
    }
  }

  onSuccess = data => {
    // console.log('success')
    console.log(data)

    this.setState({
      isLoading: false,
      isSuccess: true,
      list: data.tracks.items,
      reqdata: data,
    })
  }

  onFailure = () => {
    this.setState({isLoading: false, isSuccess: false, list: [], reqdata: {}})
  }

  getdata = async () => {
    const {match} = this.props
    const {params} = match
    const {albumId} = params
    const token = Cookies.get('jwt_token')
    // console.log(albumId)
    const url = `https://apis2.ccbp.in/spotify-clone/album-details/${albumId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok) {
      this.onSuccess(data)
    } else {
      this.onFailure()
    }
  }

  onClicked = song => {
    this.setState({play: song})
  }

  tryAgain = () => {
    this.getdata()
  }

  render() {
    const {list, isLoading, isSuccess, reqdata, play} = this.state
    // console.log(list)

    // console.log(isSuccess)
    return (
      <div className="home-containerr">
        <Header />

        <div className="list-columnr">
          <div className="eachr">
            <button
              className="backbuttonr"
              type="button"
              onClick={this.onClickBack}
            >
              <RiArrowGoBackFill className="back-arrowr" />
              <p className="backr">Back</p>
            </button>
            {isLoading ? (
              <div data-testid="loader" className="b">
                <img
                  src="https://res.cloudinary.com/dj4zaf9dt/image/upload/v1715835011/Loading_ktize5.png"
                  alt="loader"
                  className="loadingr"
                />
              </div>
            ) : (
              <div className="columnr1">
                <div className="details-containerr">
                  <img src={reqdata.images[0].url} alt="alt" className="imgr" />
                  <div className="detailsofimgr">
                    <p className="para1r">New Releases</p>
                    <h1 className="headnamer">{reqdata.name}</h1>
                    <p className="para1r">Mickey J.Meyer</p>
                  </div>
                </div>
                <div className="rowr">
                  <p className="typer">#</p>
                  <p className="typer">Track</p>
                  <p className="typer">Time</p>
                  <p className="typer">Artist</p>
                  <p className="typer">Popularity</p>
                </div>

                <ol className="list-item-containerr">
                  {list.map(eachItem => {
                    const options = {
                      time: eachItem.duration_ms,
                      song: eachItem.preview_url,
                      // added: eachItem.added_at,
                      track: eachItem.name,
                      //  album: eachItem.track.album.name,
                      artist: eachItem.artists[0].name,
                      //  trackno: eachItem.track.track_number,
                      id: eachItem.id,
                    }
                    return (
                      <ReleaseItems
                        key={eachItem.id}
                        details={options}
                        onClicked={this.onClicked}
                      />
                    )
                  })}
                </ol>

                <div className="scrollr">
                  <img
                    src={reqdata.images[0].url}
                    alt="img"
                    className="scrollimg"
                  />
                  <ReactAudioPlayer
                    className="play"
                    src={play}
                    autoPlay
                    controls
                  />
                </div>
              </div>
            )}
            {!isSuccess && (
              <div className="colr">
                <img
                  src="https://res.cloudinary.com/dj4zaf9dt/image/upload/v1716141506/alert-triangle_iulybe.png"
                  alt="failure view"
                  className="homefailuef"
                />
                <p>Something went wrong. Please try again</p>
                <button
                  className="trybuttonr"
                  type="button"
                  onClick={this.tryAgain}
                >
                  Try Again
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default OnClickRelease
