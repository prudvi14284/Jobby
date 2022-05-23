import {AiOutlineStar} from 'react-icons/ai'
import {Component} from 'react'
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
    skills1: [],
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
        skills1: newJobDetails.skills,
        isLoading: false,
      })
    } else {
      this.setState({isLoading: false, isError: true})
    }
  }

  loadingFun = () => (
    <div className="loadingBg" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  errorFun = () => (
    <div className="jobDetailsBg">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="noJobsImg"
        alt="failure view"
      />
      <h1 className="noJobsHead">Oops! Something Went Wrong</h1>
      <p className="noJobsPara">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="logoutButton"
        type="button"
        onClick={this.jobDetailsCall}
      >
        Retry
      </button>
    </div>
  )

  onSuccess = () => {
    const {jobDetails, similarJobs, skills1} = this.state
    return (
      <div className="jobDetailsBg">
        <div className="cardContainer11">
          <div className="cardTop11">
            <img
              src={jobDetails.companyLogoUrl}
              className="companyLogo11"
              alt="job details company logo"
            />
            <div>
              <h1 className="role11">{jobDetails.title}</h1>
              <div className="rating11">
                <AiOutlineStar className="starSize11" />
                <p className="role11">{jobDetails.rating}</p>
              </div>
            </div>
          </div>
          <div className="cardMiddle11">
            <div className="cardMiddle11">
              <IoLocationSharp className="location" />
              <p className="location11">{jobDetails.location}</p>
              <BsFillBagFill className="location" />
              <p className="location11">{jobDetails.employmentType}</p>
            </div>
            <p className="role12">{jobDetails.packagePerAnnum}</p>
          </div>
          <hr className="line" />
          <div className="visitMainBox">
            <h1 className="description11">Description</h1>
            <div className="visitBox">
              <a className="anchorEl" href={jobDetails.companyWebsiteUrl}>
                Visit <IoEnterOutline className="visitIcon" />
              </a>
            </div>
          </div>
          <p className="jobDescription11">{jobDetails.jobDescription}</p>
          <h1 className="description11">Skills</h1>
          <ul className="skills">
            {skills1.map(each => (
              <>
                <li className="eachSkill">
                  <img
                    src={each.imageUrl}
                    className="skillImg"
                    alt={each.name}
                  />
                  <h1 className="skillHead">{each.name}</h1>
                </li>
              </>
            ))}
          </ul>
          <h1 className="description11">Life at Company</h1>
          <div className="lifeAtCompany">
            <div className="lifeAtCompanyContent">
              <p>{jobDetails.lifeAtCompanyDescription}</p>
            </div>
            <img
              src={jobDetails.lifeAtCompanyImageUrl}
              className="lifeAtCompanyImg"
              alt="life at company"
            />
          </div>
        </div>
        <h1 className="similarJobsHead">Similar Jobs</h1>
        <ul className="similarJobContainer">
          {similarJobs.map(each => (
            <>
              <li className="similarJobCard" key={each.id}>
                <div className="cardTop22">
                  <img
                    src={each.companyLogoUrl}
                    className="companyLogo22"
                    alt="similar job company logo"
                  />
                  <div>
                    <h1 className="role22">{each.title}</h1>
                    <div className="rating11">
                      <AiOutlineStar className="starSize11" />
                      <p className="ratingNumber">{each.rating}</p>
                    </div>
                  </div>
                </div>
                <h1 className="role22">Description</h1>
                <p className="similarPara">{each.jobDescription}</p>
                <div className="cardMiddle11">
                  <div className="cardTop22">
                    <IoLocationSharp className="location" />
                    <p className="location11">{each.location}</p>
                  </div>
                  <div className="cardTop22">
                    <BsFillBagFill className="location" />
                    <p className="location11">{each.employmentType}</p>
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
    return isError ? this.errorFun() : this.onSuccess()
  }

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        {isLoading ? this.loadingFun() : this.afterLoading()}
      </>
    )
  }
}
export default JobItemDetails
