import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import './index.css'

class Profile extends Component {
  state = {
    profileData: {},
    isError: false,
    isLoading: false,
  }

  componentDidMount() {
    this.profileCall()
  }

  profileCall = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)

    if (response.ok === true) {
      const data = await response.json()
      const profileDetails = data.profile_details
      const newData = {
        profileImageUrl: profileDetails.profile_image_url,
        name: profileDetails.name,
        shortBio: profileDetails.short_bio,
      }
      console.log(newData.profileImageUrl)
      this.setState({profileData: newData, isLoading: false})
    } else {
      this.setState({isError: true, isLoading: false})
    }
  }

  onLoading = () => (
    <div className="error-profile" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  onProfileError = () => (
    <div className="error-profile">
      <button
        className="logout-button"
        type="button"
        onClick={this.profileCall}
      >
        Retry
      </button>
    </div>
  )

  onProfileSuccess = () => {
    const {profileData} = this.state
    return (
      <div className="profile-card">
        <img
          src={profileData.profileImageUrl}
          className="profile-pic"
          alt="profile"
        />
        <h1 className="profile-name">{profileData.name}</h1>
        <p className="profile-role">{profileData.shortBio}</p>
      </div>
    )
  }

  afterLoading = () => {
    const {isError} = this.state
    return isError ? this.onProfileError() : this.onProfileSuccess()
  }

  render() {
    const {isLoading} = this.state
    return isLoading ? this.onLoading() : this.afterLoading()
  }
}

export default Profile
