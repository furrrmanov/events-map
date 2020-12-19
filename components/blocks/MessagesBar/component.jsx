import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'

import { clearSnackbar } from 'actions'



export default function MessagesBar() {
  const dispatch = useDispatch()
  const DURATION_IN_MILISECONDS = 2500

  const { successMessage, isOpen } = useSelector((state) => state.messages)

  function handleClose() {
    dispatch(clearSnackbar())
  }

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={DURATION_IN_MILISECONDS}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
      <Alert onClose={handleClose} severity="success">
        {successMessage}
      </Alert>
    </Snackbar>
  )
}
