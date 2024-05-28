import {Component} from 'react'
import ReactAudioPlayer from 'react-audio-player'
import {RiArrowGoBackFill} from 'react-icons/ri'
import Cookies from 'js-cookie'
import FeaturedItems from '../FeaturedItems'
import Header from '../Header'
import './index.css'

class FeaturedList extends Component {
  state = {list: [], reqdata: {}, isLoading: true, isSuccess: false, play: ''}

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
    console.log('success')
    console.log(data)

    this.setState({
      isLoading: false,
      isSuccess: true,
      list: data.tracks.items,
      reqdata: data,
    })
  }

  onFailure = () => {
    this.setState({
      isLoading: false,
      isSuccess: false,
      list: [],
      reqdata: {},
      play: '',
    })
  }

  getdata = async () => {
    const {match} = this.props
    const {params} = match
    const {playlistId} = params
    const token = Cookies.get('jwt_token')
    console.log(playlistId)
    const url = `https://apis2.ccbp.in/spotify-clone/playlists-details/${playlistId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok) {
      console.log('ok')
      this.onSuccess(data)
    } else {
      this.onFailure()
    }
  }

  tryAgain = () => {
    this.getdata()
  }

  onClicked = song => {
    this.setState({play: song})
  }

  render() {
    const {list, isLoading, isSuccess, reqdata, play} = this.state

    // console.log(isLoading)

    // console.log(isSuccess)
    return (
      <div className="home-containerf">
        <Header />

        <div className="list-columnf">
          <div className="eachf">
            <button
              className="backbuttonf"
              type="button"
              onClick={this.onClickBack}
            >
              <RiArrowGoBackFill className="back-arrowf" />
              Back
            </button>
            {isLoading && (
              <div data-testid="loader">
                <img
                  src="https://res.cloudinary.com/dj4zaf9dt/image/upload/v1715835011/Loading_ktize5.png"
                  alt="loader"
                  className="loadingf"
                />
              </div>
            )}
            {isSuccess ? (
              <div className="columnf1">
                <div className="details-containerf">
                  <img src={reqdata.images[0].url} alt="alt" className="imgf" />
                  <div className="detailsofimgf">
                    <p className="para1f">Editors Picks</p>
                    <h1 className="headnamef">{reqdata.name}</h1>

                    <p className="para1f">{reqdata.description}</p>
                  </div>
                </div>

                <div className="rowf">
                  <h1 className="typef">Track</h1>
                  <p className="typef">Album</p>
                  <p className="typef">Time</p>
                  <p className="typef">Artist</p>
                  <p className="typef">Added</p>
                </div>

                <ol start="1" className="list-item-containerf">
                  {list.map(eachItem => {
                    const options = {
                      time: eachItem.track.duration_ms,
                      song: eachItem.track.preview_url,
                      added: eachItem.added_at,
                      name: eachItem.track.name,
                      album: eachItem.track.album.name,
                      artist: eachItem.track.artists[0].name,
                      trackno: eachItem.track.track_number,
                      id: eachItem.track.id,
                    }
                    return (
                      <FeaturedItems
                        key={eachItem.track.id}
                        details={options}
                        onClicked={this.onClicked}
                      />
                    )
                  })}
                </ol>

                <div className="scroll">
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
            ) : (
              <div className="col">
                <img
                  src="https://res.cloudinary.com/dj4zaf9dt/image/upload/v1716141506/alert-triangle_iulybe.png"
                  alt="failure view"
                  className="homefailuef"
                />
                <p>Something went wrong. Please try again</p>
                <button
                  className="trybuttonf"
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
export default FeaturedList
