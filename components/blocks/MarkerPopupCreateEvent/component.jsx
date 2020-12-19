import React, { useState, createRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Button from '@material-ui/core/Button'
import SaveIcon from '@material-ui/icons/Save'

import { convertEventDataInObject } from 'utils/dataMappers'
import {
  getRequestOnSendEventInFirebaseDb,
  getUpdateItemRequest,
} from 'actions'
import { parsingDateFromUnix, parsingTimeFromUnix } from 'utils/timeParser'

import {
  PopupWrapper,
  Input,
  Checkbox,
  Title,
  CheckboxContainer,
  InputDateContainer,
  InputEmailContainer,
} from './styles'

export default function MarkerPopupCreateEvent(props) {
  const { position, editMode, editEventId, closeEditPopup, event } = props

  const dispatch = useDispatch()
  let formRef = createRef()
  const createdByEmail = useSelector((state) => state.user.email)
  const [eventName, setEventName] = useState(editMode ? event.name : '')
  const [eventPublic, setEventPublic] = useState(
    editMode ? event.public : false
  )
  const [eventDate, setEventDate] = useState(
    editMode && event.date ? parsingDateFromUnix(event.date) : ''
  )
  const [eventTime, setEventTime] = useState(
    editMode && event.date ? parsingTimeFromUnix(event.date) : ''
  )
  const [deleteExpiredEvent, setDeleteExpiredEvent] = useState(
    editMode ? event.deleteExpiredEvent : true
  )
  const [notifications, setNotifications] = useState(
    editMode ? event.notifications : true
  )
  const [friendsEmail, setFriendsEmail] = useState(
    editMode ? event.friendsEmail : ''
  )

  const handleChangeInputName = ({ target }) => {
    setEventName(target.value)
  }

  const handleChangeInputFriendsEmail = ({ target }) => {
    setFriendsEmail(target.value)
  }

  const handleChangeEventPublickCheckBox = () => {
    setEventPublic(!eventPublic)
  }

  const handleChangeInputDate = ({ target }) => {
    setEventDate(target.value)
  }

  const handleChangeInputTime = ({ target }) => {
    setEventTime(target.value)
  }

  const handleChangeExpiredEventCheckBox = () => {
    setDeleteExpiredEvent(!deleteExpiredEvent)
  }

  const handleChangeNotificationsCheckBox = () => {
    setNotifications(!notifications)
  }

  const clearform = () => {
    formRef.reset()
    setEventName('')
    setEventPublic(false)
    setEventDate('')
    setEventTime('')
    setFriendsEmail('')
    setDeleteExpiredEvent(true)
    setNotifications(true)
  }

  const handleClickButtonSave = (e) => {
    e.preventDefault()
    const data = convertEventDataInObject(
      eventName,
      eventPublic,
      eventDate,
      eventTime,
      deleteExpiredEvent,
      notifications,
      createdByEmail,
      friendsEmail,
      position
    )

    editMode
      ? dispatch(
          getUpdateItemRequest({
            data,
            editEventId,
            collectionName: '/events',
            collectionRoot: 'events/',
          })
        )
      : dispatch(getRequestOnSendEventInFirebaseDb(data))

    if (closeEditPopup) {
      closeEditPopup()
    }
    clearform()
  }

  return (
    <PopupWrapper>
      <form ref={(el) => (formRef = el)}>
        <Input
          placeholder="Event name"
          value={eventName}
          onChange={handleChangeInputName}
        />
        <CheckboxContainer>
          <Title>Public</Title>
          <Checkbox
            checked={eventPublic}
            onClick={handleChangeEventPublickCheckBox}
          />
        </CheckboxContainer>
        <InputDateContainer>
          <Input
            placeholder="Date"
            type="date"
            value={eventDate}
            onChange={handleChangeInputDate}
          />
          <Input
            placeholder="Time"
            type="time"
            value={eventTime}
            onChange={handleChangeInputTime}
          />
        </InputDateContainer>
        <CheckboxContainer>
          <Title>Delete event on expiration</Title>
          <Checkbox
            checked={deleteExpiredEvent}
            onClick={handleChangeExpiredEventCheckBox}
          />
        </CheckboxContainer>
        <CheckboxContainer>
          <Title>Receive notifications</Title>
          <Checkbox
            checked={notifications}
            onClick={handleChangeNotificationsCheckBox}
          />
        </CheckboxContainer>
        <InputEmailContainer>
          <Input
            placeholder="Friends email"
            value={friendsEmail}
            onChange={handleChangeInputFriendsEmail}
          />
        </InputEmailContainer>
        <Button
          variant="contained"
          color="primary"
          size="small"
          type="submit"
          startIcon={<SaveIcon />}
          disabled={eventName ? false : true}
          onClick={handleClickButtonSave}>
          Save
        </Button>
      </form>
    </PopupWrapper>
  )
}
