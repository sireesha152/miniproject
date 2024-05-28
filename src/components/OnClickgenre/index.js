import {Component} from 'react'
import {RiArrowGoBackFill} from 'react-icons/ri'
import Cookies from 'js-cookie'
import GenreItems from '../GenreItems'
import Header from '../Header'
import './index.css'

class OnClickgenre extends Component {
  state = {list: [], isLoading: true, isSuccess: false, head: ''}

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
    console.log(data)

    this.setState({
      isLoading: false,
      isSuccess: true,
      list: data,
      head: data[1].name,
    })
  }

  onFailure = () => {
    this.setState({
      isLoading: false,
      isSuccess: false,
      list: [],
      head: '',
    })
  }

  getdata = async () => {
    const token = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {categoryId} = params
    // console.log(categoryId)
    const url = `https://apis2.ccbp.in/spotify-clone/category-playlists/${categoryId}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }

    const response = await fetch(url, options)

    const data = await response.json()

    if (response.ok) {
      this.onSuccess(data.playlists.items)
    } else {
      this.onFailure()
    }
  }

  tryAgain = () => {
    this.getdata()
  }

  render() {
    const {list, isLoading, isSuccess, head} = this.state
    // console.log(isLoading)

    // console.log(isSuccess)
    return (
      <div className="home-containerg">
        <Header />

        <div className="list-columng">
          <div className="eachg">
            <button
              className="backbuttong"
              type="button"
              onClick={this.onClickBack}
            >
              <RiArrowGoBackFill className="back-arrowg" />
              <p className="backg">Back</p>
            </button>

            {isLoading && (
              <div data-testid="loader">
                <img
                  src="https://res.cloudinary.com/dj4zaf9dt/image/upload/v1715835011/Loading_ktize5.png"
                  alt="loader"
                  className="loading"
                />
              </div>
            )}
            {isSuccess ? (
              <>
                <h1 className="typelistg">{head}</h1>

                <ul className="list-item-containerg">
                  {list.map(eachItem => {
                    const options = {
                      url: eachItem.images[0].url,
                      tracks: eachItem.tracks.total,
                      name: eachItem.name,
                    }
                    return <GenreItems key={eachItem.id} details={options} />
                  })}
                </ul>
              </>
            ) : (
              <div className="colc">
                <img
                  src="https://res.cloudinary.com/dj4zaf9dt/image/upload/v1716141506/alert-triangle_iulybe.png"
                  alt="failure view"
                  className="homefailuef"
                />
                <p>Something went wrong. Please try again</p>
                <button
                  className="trybuttonc"
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
export default OnClickgenre
