import {AiOutlineStar} from 'react-icons/ai'
import Component from 'react'
import Cookies from 'js-cookie'
import {IoLocationSharp, IoEnterOutline} from 'react-icons/io5'
import Loader from 'react-loader-spinner'
import {BsFillBagFill} from 'react-icons/bs'
import Header from '../Header'
import './index.css'

class JobItemDetails extends Component {
  state = {
    jobDetails: {},
    similarJobs: [],
    skills: [],
    isLoading: false,
    isError: false,
  }

  componentDidMount() {
    this.jobDetailsCall()
  }

  jobDetailsCall = async () => {
    this.setState({isLoading: true})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()

      const jobDetails1 = data.job_details
      const similarJobs1 = data.similar_jobs

      const newJobDetails = {
        companyLogoUrl: jobDetails1.company_logo_url,
        companyWebsiteUrl: jobDetails1.company_website_url,
        employmentType: jobDetails1.employment_type,
        jobDescription: jobDetails1.job_description,
        id: jobDetails1.id,
        lifeAtCompanyDescription: jobDetails1.life_at_company.description,
        lifeAtCompanyImageUrl: jobDetails1.life_at_company.image_url,
        location: jobDetails1.location,
        packagePerAnnum: jobDetails1.package_per_annum,
        rating: jobDetails1.rating,
        skills: jobDetails1.skills.map(eachItem => ({
          imageUrl: eachItem.image_url,
          name: eachItem.name,
        })),
        title: jobDetails1.title,
      }

      const newSimilarJobs = similarJobs1.map(each => ({
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        id: each.id,
        location: each.location,
        rating: each.rating,
        title: each.title,
      }))

      this.setState({
        jobDetails: newJobDetails,
        similarJobs: newSimilarJobs,
        skills: newJobDetails.skills,
        isLoading: false,
      })
    } else {
      this.setState({isLoading: false, isError: true})
    }
  }

  loading = () => (
    <div className="loading-bg" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  errorLoading = () => (
    <div className="job-details-bg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="no-jobs-img"
        alt="failure view"
      />
      <h1 className="no-jobs-head">Oops! something went wrong</h1>
      <p className="no-jobs-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="logout-button"
        type="button"
        onClick={this.jobDetailsCall}
      >
        Retry
      </button>
    </div>
  )

  onSuccess = () => {
    const {jobDetails, similarJobs, skills} = this.state

    return (
      <div className="job-details-bg">
        <div className="card-container">
          <div className="card-top">
            <img
              src={jobDetails.companyLogoUrl}
              className="company-logo"
              alt="job details company logo"
            />
          </div>
          <div className="card-middle">
            <div className="card-middle">
              <IoLocationSharp className="location" />
              <p className="location11">{jobDetails.location}</p>
              <BsFillBagFill className="location" />
              <p className="location">{jobDetails.employmentType}</p>
            </div>
            <p className="role12">{jobDetails.packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="visit-main-box">
            <h1 className="description">Description</h1>
            <div className="visit-box">
              <a className="anchor-element" href={jobDetails.companyWebsiteUrl}>
                Visit <IoEnterOutline className="visit-icon" />
              </a>
            </div>
          </div>
          <p className="job-description">{jobDetails.jobDescription}</p>
          <h1 className="description">Skills</h1>
          <ul className="skills">
            {skills.map(each => (
              <>
                <li className="each-skill">
                  <img
                    src={each.imageUrl}
                    className="skill-img"
                    alt={each.name}
                  />
                  <h1 className="skill-head">{each.name}</h1>
                </li>
              </>
            ))}
          </ul>
          <h1 className="description">Life at Company</h1>
          <div className="life-at-company">
            <div className="life-at-company-content">
              <p>{jobDetails.lifeAtCompanyDescription}</p>
            </div>
            <img
              src={jobDetails.lifeAtCompanyImageUrl}
              className="life-at-company-content"
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="similar-jobs-head">Similar Jobs</h1>
        <ul className="similar-jobs-container">
          {similarJobs.map(each => (
            <>
              <li className="similar-jobs-card" key={each.id}>
                <div className="card-top-2">
                  <img
                    src={each.companyLogoUrl}
                    className="company-logo2"
                    alt="similar job company logo"
                  />
                  <div>
                    <h1 className="role1">{each.title}</h1>
                    <div className="rating1">
                      <AiOutlineStar className="star-size" />
                      <p className="rating-number">{each.rating}</p>
                    </div>
                  </div>
                </div>
                <h1 className="role22">Description</h1>
                <p className="similar-para">{each.jobDescription}</p>
                <div className="card-middle">
                  <div className="card-top">
                    <IoLocationSharp className="location" />
                    <p className="location1">{each.location}</p>
                  </div>
                  <div className="card-top">
                    <BsFillBagFill className="location" />
                    <p className="location1">{each.employmentType}</p>
                  </div>
                </div>
              </li>
            </>
          ))}
        </ul>
      </div>
    )
  }

  afterLoading = () => {
    const {isError} = this.state
    return isError ? this.errorLoading() : this.onSuccess()
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        {isLoading ? this.loading() : this.afterLoading()}
      </>
    )
  }
}
export default JobItemDetails
