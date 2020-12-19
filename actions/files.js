export const SET_UPLOUD_FILES_REQUEST = 'SET_UPLOUD_FILES_REQUEST'
export const SET_DELETE_FILE_REQUEST = 'SET_DELETE_FILE_REQUEST'

export const setUploadFileToFirebaseDbRequest = (value) => ({
  type: SET_UPLOUD_FILES_REQUEST,
  value,
})

export const setDeletefileInfirebaseStorageRequest = () => ({
  type: SET_DELETE_FILE_REQUEST,
})
