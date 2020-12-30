import React, { createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button } from '@material-ui/core'

import {
  setUploadFileToFirebaseDbRequest,
  setDeletefileInfirebaseStorageRequest,
} from 'src/client/actions'

import {
  DeleteOutlineIcon,
  Wrapper,
  Title,
  Input,
  Form,
  Img,
  ImgWrapper,
} from './styles'

export default function MarkerControls() {
  const dispatch = useDispatch()
  const userProfile = useSelector((state) => state.profiles.userProfile)
  const fileUploadInputRef = createRef()

  const handleClickButtonDelete = () => {
    dispatch(setDeletefileInfirebaseStorageRequest())
  }

  const onChangeUploadButton = ({ target }) => {
    dispatch(setUploadFileToFirebaseDbRequest(target.files[0]))
    fileUploadInputRef.current.value = ''
  }

  return (
    <Wrapper>
      <Title>Custom Marker</Title>
      <Form enctype="multipart/form-data" method="post">
        <Input
          disabled={userProfile.iconUrl ? true : false}
          accept="image/*"
          id="outlined-button-file"
          type="file"
          ref={fileUploadInputRef}
          onChange={onChangeUploadButton}
        />
        <label htmlFor="outlined-button-file">
          <Button
            disabled={userProfile.iconUrl ? true : false}
            variant="outlined"
            component="span">
            Upload
          </Button>
        </label>
      </Form>
      <span>size 64 x 64</span>
      <ImgWrapper>
        {userProfile.iconUrl ? (
          <Img src={userProfile.iconUrl} alt="icon"></Img>
        ) : null}
        {userProfile.iconUrl ? (
          <DeleteOutlineIcon onClick={handleClickButtonDelete} />
        ) : null}
      </ImgWrapper>
    </Wrapper>
  )
}
