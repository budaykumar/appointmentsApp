// eslint-disable-next-line no-unused-vars
import {format} from 'date-fns'

import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsStarred} = props
  const {id, title, date, isStared} = appointmentDetails

  const stareImageUrl = isStared
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStar = () => {
    toggleIsStarred(id)
  }
  return (
    <li className="eachListItem">
      <div className="titleAndStareContainer">
        <p className="title">{title}</p>
        <button
          type="submit"
          data-testid="star"
          className="star-button"
          onClick={onClickStar}
        >
          <img src={stareImageUrl} alt="star" className="star" />
        </button>
      </div>
      <p className="date">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
