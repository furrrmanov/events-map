import React, { useState, useEffect, createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Checkbox from '@material-ui/core/Checkbox'
import SaveIcon from '@material-ui/icons/Save'
import { Button } from '@material-ui/core'

import {
  setUploadFileToFirebaseDbRequest,
  setDeletefileInfirebaseStorageRequest,
  updateUserProfileRequest,
} from 'actions'

import {
  DeleteOutlineIcon,
  SettingsWrapper,
  Wrapper,
  Title,
  CheckBoxWrapper,
  Text,
  Input,
  Form,
  Img,
  ImgWrapper,
} from './styles'

export default function Settings() {
  const dispatch = useDispatch()
  const userProfile = useSelector((state) => state.profiles.userProfile)
  const [pushNotification, setpushNotification] = useState(true)
  const [emailNotification, setEmailNotification] = useState(true)
  const fileUploadInputRef = createRef()

  useEffect(() => {
    setpushNotification(userProfile.pushNotification)
    setEmailNotification(userProfile.emailNotification)
  }, [userProfile])

  const handleClickButtonSave = () => {
    const modifiedProfile = {
      ...userProfile,
      emailNotification: emailNotification,
      pushNotification: pushNotification,
    }

    dispatch(
      updateUserProfileRequest({
        collectionName: '/userProfiles',
        collectionRoot: 'userProfiles/',
        profile: modifiedProfile,
      })
    )
  }

  const handleClickButtonDelete = () => {
    dispatch(setDeletefileInfirebaseStorageRequest())
  }

  const handleChangePushNotificationCheckBox = ({ target }) => {
    setpushNotification(target.checked)
  }

  const handleChangeEmailNotificationCheckBox = ({ target }) => {
    setEmailNotification(target.checked)
  }

  const onChangeUploadButton = ({ target }) => {
    dispatch(setUploadFileToFirebaseDbRequest(target.files[0]))
    fileUploadInputRef.current.value = ''
  }

  return (
    <SettingsWrapper>
      <Wrapper>
        <Title>Notifications</Title>
        <CheckBoxWrapper>
          <Text>Push</Text>
          <Checkbox
            checked={pushNotification}
            onChange={handleChangePushNotificationCheckBox}
          />
        </CheckBoxWrapper>

        <CheckBoxWrapper>
          <Text>Email</Text>
          <Checkbox
            checked={emailNotification}
            onChange={handleChangeEmailNotificationCheckBox}
          />
        </CheckBoxWrapper>
        <Button
          variant="contained"
          color="primary"
          size="small"
          type="submit"
          startIcon={<SaveIcon />}
          onClick={handleClickButtonSave}>
          Save
        </Button>
      </Wrapper>
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
    </SettingsWrapper>
  )
}
