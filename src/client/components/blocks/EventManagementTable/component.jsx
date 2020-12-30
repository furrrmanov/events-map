import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton'
import Checkbox from '@material-ui/core/Checkbox'

import { getDeleteItemRequest } from 'src/client/actions'
import CustomTableRow from 'src/client/components/blocks/EventManagementTableRow'
import { filteredEventListUserCreated } from 'src/client/utils/dataMappers'
import MarkerPopupCreateEvent from 'src/client/components/blocks/MarkerPopupCreateEvent'
import ActionConfirmationPopup from 'src/client/components/blocks/actionConfirmationPopup'

import { TableCell, Table, PopupWrapper, CloseIcon } from './styles'

export default function EventManagementTable() {
  const dispatch = useDispatch()
  const eventsList = useSelector((state) => state.event.eventsList)
  const userEmail = useSelector((state) => state.user.email)
  const userEventList = filteredEventListUserCreated(eventsList, userEmail)
  const [showEditPopup, setShowEditPopup] = useState(false)
  const [editItemPosition, setEditItemPostion] = useState(null)
  const [editItemId, setEditItemId] = useState('')
  const [selectedItem, setSelectedItem] = useState([])
  const [deleteConfirmation, setDeleteConfirmation] = useState(false)

  const handleClickAllSelected = (event) => {
    if (event.target.checked) {
      const newSelecteds = userEventList.map((event) => event.id)
      setSelectedItem(newSelecteds)
      return
    }
    setSelectedItem([])
  }

  const selectedItemIntoChange = (itemId) => {
    const selectedIndex = selectedItem.indexOf(itemId)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = [...selectedItem, itemId]
    } else if (selectedIndex === 0) {
      newSelected = [...selectedItem.slice(1)]
    } else if (selectedIndex === selectedItem.length - 1) {
      newSelected = [...selectedItem.slice(0, -1)]
    } else if (selectedIndex > 0) {
      newSelected = [
        ...selectedItem.slice(0, selectedIndex),
        selectedItem.slice(selectedIndex + 1),
      ]
    }
    setSelectedItem(newSelected)
  }

  const handleClickButtonDeleteSelectedItem = () => {
    setDeleteConfirmation(true)
  }

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

  const confirmDeleteEvent = () => {
    selectedItem.forEach((id) => {
      dispatch(
        getDeleteItemRequest({
          itemId: id,
          collectionName: '/events',
          collectionRoot: 'events/',
        })
      )
    })
    setSelectedItem([])
    setDeleteConfirmation(false)
  }

  const cancelDeleteEvent = () => {
    setDeleteConfirmation(false)
  }

  return (
    <div>
      {deleteConfirmation ? (
        <ActionConfirmationPopup
          confirmDeleteEvent={confirmDeleteEvent}
          cancelDeleteEvent={cancelDeleteEvent}
        />
      ) : null}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>
                <Checkbox
                  onClick={handleClickAllSelected}
                  checked={selectedItem.length === userEventList.length}
                />
              </TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Public</TableCell>
              <TableCell>Delete on expiration</TableCell>
              <TableCell>Notifications</TableCell>
              <TableCell>Friends</TableCell>
              <TableCell>
                {selectedItem.length ? (
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={handleClickButtonDeleteSelectedItem}>
                    <DeleteIcon />
                  </IconButton>
                ) : null}
              </TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userEventList.map((row) => (
              <CustomTableRow
                key={row.id}
                row={row}
                openEditPopup={openEditPopup}
                selected={selectedItem}
                selectedItemIntoChange={selectedItemIntoChange}
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
