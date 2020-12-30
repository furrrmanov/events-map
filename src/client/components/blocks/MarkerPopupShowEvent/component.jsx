import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import moment from 'moment'

import { getDeleteItemRequest } from 'src/client/actions'
import ActionConfirmationPopup from 'src/client/components/blocks/actionConfirmationPopup'

import { PopupWrapper, Text, ButtonsWrapper, Button } from './styles'

export default function MarkerPopupShowEvent(props) {
  const dispatch = useDispatch()
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const userEmail = useSelector((state) => state.user.email)
  const { name, date, notifications, id, createdBy } = props.event
  const eventPublic = props.event.public
  const { togglePopupMode } = props
  const eventDate = moment.unix(date / 1000).format('LL HH:mm')

  const handleClickButtonEdit = () => {
    togglePopupMode(id)
  }

  const handleClickButtonDelete = () => {
    setDeleteConfirmation(true)
  }

  const confirmDeleteEvent = () => {
    dispatch(
      getDeleteItemRequest({
        itemId: id,
        collectionName: '/events',
        collectionRoot: 'events/',
      })
    )
  }

  const cancelDeleteEvent = () => {
    setDeleteConfirmation(false)
  }

  return (
    <PopupWrapper>
      {deleteConfirmation ? (
        <ActionConfirmationPopup
          confirmDeleteEvent={confirmDeleteEvent}
          cancelDeleteEvent={cancelDeleteEvent}
        />
      ) : null}
      <Text>Name: {name}</Text>
      {date ? <Text>Date: {eventDate}</Text> : null}
      <Text>Public: {eventPublic ? 'Yes' : 'No'} </Text>
      <Text>Notifications: {notifications ? 'Yes' : 'No'} </Text>

      {userEmail === createdBy ? (
        <ButtonsWrapper>
          <Button
            onClick={handleClickButtonEdit}
            variant="outlined"
            color="primary"
            size="small"
            startIcon={<EditIcon />}>
            Edit
          </Button>
          <Button
            onClick={handleClickButtonDelete}
            variant="outlined"
            color="secondary"
            size="small"
            startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </ButtonsWrapper>
      ) : null}
    </PopupWrapper>
  )
}
