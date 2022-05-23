import {AiOutlineStar} from 'react-icons/ai'

import {IoLocationSharp} from 'react-icons/io5'
import {BsFillBagFill} from 'react-icons/bs'
import './index.css'

const JobCard = props => {
  const {items} = props
  const {
    id,
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = items
  return (
    <div className="cardContainer1">
      <div className="cardTop">
        <img
          src={companyLogoUrl}
          className="companyLogo"
          alt="company logo"
          key={companyLogoUrl}
        />
        <div>
          <h1 className="role">{title}</h1>
          <div className="rating">
            <AiOutlineStar className="starSize" />
            <p className="role">{rating}</p>
          </div>
        </div>
      </div>
      <div className="cardMiddle">
        <div className="cardMiddle1">
          <IoLocationSharp className="location" />
          <p className="location1">{location}</p>
          <BsFillBagFill className="location" />
          <p className="location1">{employmentType}</p>
        </div>
        <h1 className="role">{packagePerAnnum}</h1>
      </div>
      <hr className="line" />
      <h1 className="description">Description</h1>

      <p className="jobDescription">{jobDescription}</p>
    </div>
  )
}

export default JobCard
