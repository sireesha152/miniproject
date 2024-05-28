import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import ListItem from '../ListItem'
import CategoryList from '../CategoryList'
import ReleaseListItem from '../ReleaseListItem'
import './index.css'

class Home extends Component {
  state = {
    list: [],
    isLoading: true,
    isSuccessn: false,
    isSuccessc: false,
    isSuccessf: false,
    clist: [],
    nlist: [],
  }

  componentDidMount() {
    this.getFeaturedPlayist()
    this.getcategoryList()
    this.getNewReleaseList()
  }

  onSuccessf = playlists => {
    console.log(playlists)
    this.setState({
      list: playlists,
      isLoading: false,
      isSuccessf: true,
    })
  }

  onSuccessc = playlists => {
    // console.log(playlists)
    this.setState({
      clist: playlists,
      isLoading: false,
      isSuccessc: true,
    })
  }

  onSuccessn = playlists => {
    this.setState({
      nlist: playlists,
      isLoading: false,
      isSuccessn: true,
    })
  }

  onFailuref = () => {
    this.setState({
      isSuccessf: false,
      isLoading: false,
    })
  }

  onFailurec = () => {
    this.setState({isSuccessc: false, isLoading: false})
  }

  onFailuren = () => {
    this.setState({isSuccessn: false, isLoading: false})
  }

  getNewReleaseList = async () => {
    const token = Cookies.get('jwt_token')
    const url = 'https://apis2.ccbp.in/spotify-clone/new-releases'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessn(data.albums.items)
    } else {
      this.onFailuren()
    }
  }

  getcategoryList = async () => {
    const token = Cookies.get('jwt_token')
    const url = 'https://apis2.ccbp.in/spotify-clone/categories'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessc(data.categories.items)
    } else {
      this.onFailurec()
    }
  }

  getFeaturedPlayist = async () => {
    const token = Cookies.get('jwt_token')
    const url = 'https://apis2.ccbp.in/spotify-clone/featured-playlists'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSuccessf(data.playlists.items)
    } else {
      this.onFailuref()
    }
  }

  tryAgainf = () => {
    this.getFeaturedPlayist()
  }

  tryAgainc = () => {
    this.getcategoryList()
  }

  tryAgainn = () => {
    this.getNewReleaseList()
  }

  render() {
    const {
      isLoading,
      isSuccessc,
      isSuccessf,
      isSuccessn,
      list,
      clist,
      nlist,
    } = this.state

    return (
      <div className="home-container">
        <Header />

        <div className="list-column">
          <div className="each">
            <h1 className="editors-heading">Editors Picks</h1>
            <ul className="list-container">
              {isLoading && (
                <div data-testid="loader">
                  <img
                    src="https://res.cloudinary.com/dj4zaf9dt/image/upload/v1715835011/Loading_ktize5.png"
                    alt="loader"
                    className="loading"
                  />
                </div>
              )}
              {isSuccessf ? (
                <>
                  {list.map(eachItem => {
                    const options = {
                      requrl: eachItem.images[0].url,
                      reqid: eachItem.id,
                      reqname: eachItem.name,
                      total: eachItem.tracks.total,
                    }
                    return <ListItem key={eachItem.id} details={options} />
                  })}
                </>
              ) : (
                <div className="colh">
                  <img
                    src="https://res.cloudinary.com/dj4zaf9dt/image/upload/v1716141506/alert-triangle_iulybe.png"
                    alt="failure view"
                    className="homefailuef"
                  />
                  <p>Something went wrong. Please try again</p>
                  <button
                    className="trybuttonh"
                    type="button"
                    onClick={this.tryAgainf}
                  >
                    Try Again
                  </button>
                </div>
              )}
            </ul>
          </div>
          <div className="each">
            <h1 className="editors-heading">Genres & Moods</h1>
            <ul className="list-container">
              {isLoading && (
                <div data-testid="loader">
                  <img
                    src="https://res.cloudinary.com/dj4zaf9dt/image/upload/v1715835011/Loading_ktize5.png"
                    alt="loader"
                    className="loading"
                  />
                </div>
              )}
              {isSuccessc ? (
                <>
                  {clist.map(eachItem => {
                    const options = {
                      requrl: eachItem.icons[0].url,
                      reqid: eachItem.id,
                      name: eachItem.name,
                    }
                    return (
                      <CategoryList key={options.reqid} details={options} />
                    )
                  })}
                </>
              ) : (
                <div className="colh">
                  <img
                    src="https://res.cloudinary.com/dj4zaf9dt/image/upload/v1716141506/alert-triangle_iulybe.png"
                    alt="failure view"
                    className="homefailuef"
                  />
                  <p>Something went wrong. Please try again</p>
                  <button
                    className="trybuttonh"
                    type="button"
                    onClick={this.tryAgainc}
                  >
                    Try Again
                  </button>
                </div>
              )}
            </ul>
          </div>
          <div className="each">
            <h1 className="editors-heading">New Releases</h1>
            <ul className="list-container">
              {isLoading && (
                <div data-testid="loader">
                  <img
                    src="https://res.cloudinary.com/dj4zaf9dt/image/upload/v1715835011/Loading_ktize5.png"
                    alt="loader"
                    className="loading"
                  />
                </div>
              )}
              {isSuccessn ? (
                <>
                  {nlist.map(eachItem => {
                    const options = {
                      requrl: eachItem.images[0].url,
                      reqid: eachItem.id,
                      reqname: eachItem.name,
                    }
                    return (
                      <ReleaseListItem key={eachItem.id} details={options} />
                    )
                  })}
                </>
              ) : (
                <div className="colh">
                  <img
                    src="https://res.cloudinary.com/dj4zaf9dt/image/upload/v1716141506/alert-triangle_iulybe.png"
                    alt="failure view"
                    className="homefailuef"
                  />
                  <p>Something went wrong. Please try again</p>
                  <button
                    className="trybuttonh"
                    type="button"
                    onClick={this.tryAgainn}
                  >
                    Try Again
                  </button>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Home
