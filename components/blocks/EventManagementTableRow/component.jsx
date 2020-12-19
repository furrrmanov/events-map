import React from 'react'
import { useDispatch } from 'react-redux'

import moment from 'moment'
import TableRow from '@material-ui/core/TableRow'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'

import { getDeleteItemRequest } from 'actions'

import { TableCell, ButtonsWrapper, Button } from './styles'

export default function CustomTableRow(props) {
  const { row, openEditPopup } = props
  const dispatch = useDispatch()

  const handleClickButtonDelete = () => {
    dispatch(
      getDeleteItemRequest({
        itemId: row.id,
        collectionName: '/events',
        collectionRoot: 'events/',
      })
    )
  }

  const handleClickButtonEdit = () => {
    openEditPopup(row.coordinates, row.id)
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
