import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div className="homeMainBg">
      <Header />
      <div className="homeBg">
        <div className="content">
          <h1 className="homeHead">Find The Job That Fits Your Life</h1>
          <p className="homePara">
            Millions of people are searching for jobs, salary, information ,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <Link to="/jobs">
            <button type="button" className="homeButton">
              Find Jobs
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
export default Home
