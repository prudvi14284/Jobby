import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import JobCard from '../JobCard'
import Profile from '../Profile'

import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    employmentType1: false,
    employmentType2: false,
    employmentType3: false,
    employmentType4: false,
    searchInput: '',
    minPackage: '',
    jobsList: [],
    isLoading: false,
    noJobs: false,
    errorJobs: false,
  }

  componentDidMount() {
    this.callJobs()
  }

  callJobs = async () => {
    this.setState({isLoading: true})
    const jwtToken = Cookies.get('jwt_token')
    const {
      searchInput,
      minPackage,
      employmentType1,
      employmentType2,
      employmentType3,
      employmentType4,
    } = this.state

    const empType = [
      {employmentType: employmentType1, ids: 'FULLTIME'},
      {employmentType: employmentType2, ids: 'PARTTIME'},
      {employmentType: employmentType3, ids: 'FREELANCE'},
      {employmentType: employmentType4, ids: 'INTERNSHIP'},
    ]

    const employmentType = empType.filter(each =>
      each.employmentType ? each.ids : '',
    )

    const empTypeList = employmentType.map(each => each.ids)
    const finalEmploymentType = empTypeList.join(',')
    const url = `https://apis.ccbp.in/jobs?employment_type=${finalEmploymentType}&minimum_package=${minPackage}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const jobsData = data.jobs
      const updatedData = jobsData.map(each => ({
        id: each.id,
        companyLogoUrl: each.company_logo_url,
        employmentType: each.employment_type,
        jobDescription: each.job_description,
        location: each.location,
        packagePerAnnum: each.package_per_annum,
        rating: each.rating,
        title: each.title,
      }))
      if (updatedData.length === 0) {
        this.setState({jobsList: updatedData, isLoading: false, noJobs: true})
      } else {
        this.setState({
          jobsList: updatedData,
          isLoading: false,
          noJobs: false,
        })
      }
    } else {
      this.setState({errorJobs: true, isLoading: false})
    }
  }

  salaryRangeFun = event =>
    this.setState({minPackage: event.target.value}, this.callJobs)

  employmentTypeFun = event => {
    const ans = event.target.value
    switch (ans) {
      case 'FULLTIME':
        this.setState(
          previous => ({
            employmentType1: !previous.employmentType1,
          }),
          this.callJobs,
        )
        break
      case 'PARTTIME':
        this.setState(
          previous => ({
            employmentType2: !previous.employmentType2,
          }),
          this.callJobs,
        )
        break
      case 'FREELANCE':
        this.setState(
          previous => ({
            employmentType3: !previous.employmentType3,
          }),
          this.callJobs,
        )
        break
      case 'INTERNSHIP':
        this.setState(
          previous => ({
            employmentType4: !previous.employmentType4,
          }),
          this.callJobs,
        )
        break
      default:
        break
    }
  }

  searching = event => this.setState({searchInput: event.target.value})

  searchClick = () => {
    const {searchInput} = this.state
    this.setState({searchInput}, this.callJobs)
  }

  renderJobs = () => {
    const {jobsList} = this.state
    return (
      <ul className="allJobsBg">
        {jobsList.map(each => (
          <Link to={`/jobs/${each.id}`} className="eachJob" >
            <li className="eachJob">
              <JobCard items={each} key={each.id}/>
            </li>
          </Link>
        ))}
      </ul>
    )
  }

  renderNoJobs = () => (
    <div className="noJobsContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        className="noJobsImg"
        alt="no jobs"
      />
      <h1 className="NoJobsHead">No Jobs Found</h1>
      <p className="noJobsPara">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderErrorJobs = () => (
    <div className="noJobsContainer">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        className="noJobsImg"
        alt="failure view"
      />
      <h1 className="noJobsHead">Oops! Something Went Wrong</h1>
      <p className="noJobsPara">
        We cannot seem to find the page you are looking for.
      </p>
      <button className="logoutButton" type="button" onClick={this.callJobs}>
        Retry
      </button>
    </div>
  )

  renderJobsCheck2 = () => {
    const {noJobs} = this.state
    return noJobs ? this.renderNoJobs() : this.renderJobs()
  }

  renderJobsCheck = () => {
    const {errorJobs} = this.state
    return errorJobs ? this.renderErrorJobs() : this.renderJobsCheck2()
  }

  renderLoading = () => (
    <div className="noJobsContainer">
      <div className="loader-container" testid="loader">
        <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
      </div>
    </div>
  )

  render() {
    const {searchInput, isLoading} = this.state

    return (
      <>
        <Header />
        <div className="jobsBg">
          <div className="sideBar">
            <Profile />
            <hr className="line" />
            <h1 className="employmentType">Type of Employment</h1>
            <ul className="employmentUl">
              {employmentTypesList.map(each => (
                <li className="employmentValues" key={each.employmentTypeId}>
                  <input
                    type="checkbox"
                    id={each.employmentTypeId}
                    className="checkClass"
                    value={each.employmentTypeId}
                    onClick={this.employmentTypeFun}
                  />
                  <label htmlFor={each.employmentTypeId}>{each.label}</label>
                </li>
              ))}
            </ul>
            <hr className="line" />
            <h1 className="employmentType">Salary Range</h1>
            <ul className="employmentUl">
              {salaryRangesList.map(each => (
                <li className="employmentValues" key={each.salaryRangeId}>
                  <input
                    type="radio"
                    id={each.salaryRangeId}
                    className="checkClass"
                    name="salary"
                    value={each.salaryRangeId}
                    onChange={this.salaryRangeFun}
                  />
                  <label htmlFor={each.salaryRangeId}>{each.label}</label>
                </li>
              ))}
            </ul>
          </div>
          <div className="jobsContainer">
            <div className="searchContainer">
              <input
                type="search"
                className="inputSearch"
                placeholder="Search"
                value={searchInput}
                onChange={this.searching}
              />
              <button
                type="button"
                testid="searchButton"
                onClick={this.searchClick}
                className="searchButton"
              >
                <BsSearch className="searchStyle" />
              </button>
            </div>
            {isLoading ? this.renderLoading() : this.renderJobsCheck()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
