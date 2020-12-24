import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import moment from 'moment'
import TableRow from '@material-ui/core/TableRow'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import ActionConfirmationPopup from 'src/client/components/blocks/actionConfirmationPopup'
import { getDeleteItemRequest } from 'src/client/actions'

import { TableCell, ButtonsWrapper, Button } from './styles'

export default function CustomTableRow(props) {
  const { row, openEditPopup } = props
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const dispatch = useDispatch()

  const handleClickButtonDelete = () => {
    setDeleteConfirmation(true)
  }

  const handleClickButtonEdit = () => {
    openEditPopup(row.coordinates, row.id)
  }

  const confirmDeleteEvent = () => {
    dispatch(
      getDeleteItemRequest({
        itemId: row.id,
        collectionName: '/events',
        collectionRoot: 'events/',
      })
    )
  }

  const cancelDeleteEvent = () => {
    setDeleteConfirmation(false)
  }

  return (
    <TableRow key={row.name}>
      <TableCell>{row.name}</TableCell>
      <TableCell>
        {row.date ? moment.unix(row.date / 1000).format('LL H:m') : null}
      </TableCell>
      <TableCell>{row.public ? 'Yes' : 'No'}</TableCell>
      <TableCell>{row.deleteExpiredEvent ? 'Yes' : 'No'}</TableCell>
      <TableCell>{row.notifications ? 'Yes' : 'No'}</TableCell>
      <TableCell>{row.friendsEmail}</TableCell>
      <TableCell>
        {deleteConfirmation ? (
          <ActionConfirmationPopup
            confirmDeleteEvent={confirmDeleteEvent}
            cancelDeleteEvent={cancelDeleteEvent}
          />
        ) : null}

        <ButtonsWrapper>
          <Button
            onClick={handleClickButtonEdit}
            variant="contained"
            color="primary"
            size="small"
            startIcon={<EditIcon />}>
            Edit
          </Button>
          <Button
            onClick={handleClickButtonDelete}
            variant="contained"
            size="small"
            color="secondary"
            startIcon={<DeleteIcon />}>
            Delete
          </Button>
        </ButtonsWrapper>
      </TableCell>
    </TableRow>
  )
}
