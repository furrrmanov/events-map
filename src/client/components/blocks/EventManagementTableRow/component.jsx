import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

import moment from 'moment'
import TableRow from '@material-ui/core/TableRow'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import Checkbox from '@material-ui/core/Checkbox'

import ActionConfirmationPopup from 'src/client/components/blocks/actionConfirmationPopup'
import { getDeleteItemRequest } from 'src/client/actions'

import { TableCell, ButtonsWrapper, Button } from './styles'

export default function CustomTableRow(props) {
  const { row, openEditPopup, selectedItemIntoChange, selected } = props
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)
  const dispatch = useDispatch()

  const handleClickCheckBox = () => {
    selectedItemIntoChange(row.id)
  }


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
      <TableCell padding="checkbox">
        <Checkbox onClick={handleClickCheckBox} checked={selected.includes(row.id)}/>
      </TableCell>
      <TableCell align="center">{row.name}</TableCell>
      <TableCell>
        {row.date ? moment.unix(row.date / 1000).format('LL H:m') : null}
      </TableCell>
      <TableCell align="center">{row.public ? 'Yes' : 'No'}</TableCell>
      <TableCell align="center">
        {row.deleteExpiredEvent ? 'Yes' : 'No'}
      </TableCell>
      <TableCell align="center">{row.notifications ? 'Yes' : 'No'}</TableCell>
      <TableCell align="center">{row.friendsEmail}</TableCell>
      <TableCell align="left" width="0">
        {deleteConfirmation ? (
          <ActionConfirmationPopup
            confirmDeleteEvent={confirmDeleteEvent}
            cancelDeleteEvent={cancelDeleteEvent}
          />
        ) : null}

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
