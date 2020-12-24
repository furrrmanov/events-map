import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'

import CustomTableRow from 'src/client/components/blocks/EventManagementTableRow'
import { filteredEventListUserCreated } from 'src/client/utils/dataMappers'
import MarkerPopupCreateEvent from 'src/client/components/blocks/MarkerPopupCreateEvent'

import { TableCell, Table, PopupWrapper, CloseIcon } from './styles'

export default function EventManagementTable() {
  const eventsList = useSelector((state) => state.event.eventsList)
  const userEmail = useSelector((state) => state.user.email)
  const userEventList = filteredEventListUserCreated(eventsList, userEmail)
  const [showEditPopup, setShowEditPopup] = useState(false)
  const [editItemPosition, setEditItemPostion] = useState(null)
  const [editItemId, setEditItemId] = useState('')

  const openEditPopup = (position, id) => {
    setShowEditPopup(true)
    setEditItemPostion(position)
    setEditItemId(id)
  }

  const closeEditPopup = () => {
    setShowEditPopup(false)
  }

  const handleClickClosePopup = () => {
    setShowEditPopup(false)
  }

  return (
    <div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Public</TableCell>
              <TableCell>Delete on expiration</TableCell>
              <TableCell>Notifications</TableCell>
              <TableCell>Friends</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userEventList.map((row) => (
              <CustomTableRow
                key={row.name}
                row={row}
                openEditPopup={openEditPopup}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {showEditPopup ? (
        <PopupWrapper>
          <MarkerPopupCreateEvent
            position={editItemPosition}
            editMode={true}
            editEventId={editItemId}
            closeEditPopup={closeEditPopup}
            event={eventsList.find((item) => item.id === editItemId)}
          />
          <CloseIcon onClick={handleClickClosePopup} />
        </PopupWrapper>
      ) : null}
    </div>
  )
}
