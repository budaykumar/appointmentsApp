import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    titleInput: '',
    dateInput: '',
    appointmentsList: [],
    isFilterActive: false,
  }

  updateTitleInputValue = event => {
    this.setState({titleInput: event.target.value})
  }

  updateDateInputValue = event => {
    this.setState({dateInput: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()

    const {titleInput, dateInput} = this.state

    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStared: false,
    }

    this.setState(preState => ({
      appointmentsList: [...preState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  toggleIsStarred = id => {
    this.setState(preState => ({
      appointmentsList: preState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStared: !eachAppointment.isStared}
        }
        return eachAppointment
      }),
    }))
  }

  onClickFilter = () => {
    const {isFilterActive} = this.state
    this.setState({isFilterActive: !isFilterActive})
  }

  getFilteredAppointmentsList = () => {
    const {appointmentsList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentsList.filter(
        eachAppointment => eachAppointment.isStared === true,
      )
    }
    return appointmentsList
  }

  render() {
    // eslint-disable-next-line
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="bgContainer">
        <div className="cardContainer">
          <div className="titleAndDateInputContainer">
            <form className="appointmentForm" onSubmit={this.onAddAppointment}>
              <h1 className="mainHeading">Add Appointments</h1>
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                className="textInput"
                placeholder="Title"
                value={titleInput}
                onChange={this.updateTitleInputValue}
              />
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                className="textInput"
                value={dateInput}
                onChange={this.updateDateInputValue}
              />
              <br />
              <button type="submit" className="button">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="AppointmentImage"
            />
          </div>
          <hr className="line" />
          <div className="startedContainer">
            <h2 className="mainHeading">Appointments</h2>
            <button
              type="submit"
              className={`para1 ${filterClassName}`}
              onClick={this.onClickFilter}
            >
              Starred
            </button>
          </div>

          <ul className="listContainer">
            {filteredAppointmentsList.map(eachAppointment => (
              <AppointmentItem
                key={eachAppointment.id}
                appointmentDetails={eachAppointment}
                toggleIsStarred={this.toggleIsStarred}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
