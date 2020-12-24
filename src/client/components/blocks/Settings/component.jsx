import React, { useState, useEffect, createRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Checkbox from '@material-ui/core/Checkbox'
import SaveIcon from '@material-ui/icons/Save'
import { Button } from '@material-ui/core'
import { ExportToCsv } from 'export-to-csv'

import {
  setUploadFileToFirebaseDbRequest,
  setDeletefileInfirebaseStorageRequest,
  updateUserProfileRequest,
} from 'src/client/actions'
import {
  filteredEventListUserCreated,
  transformDataInCsv,
} from 'src/client/utils/dataMappers'
import NotificationsControls from 'src/client/components/blocks/NotificationsControls'

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
  ButtonWrapper,
} from './styles'

export default function Settings() {
  const dispatch = useDispatch()
  const userProfile = useSelector((state) => state.profiles.userProfile)
  const eventList = useSelector((state) => state.event.eventsList)
  const userEmail = useSelector((state) => state.user.email)
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

  const handleClickExport = () => {
    const data = filteredEventListUserCreated(eventList, userEmail)
    const dataCsv = transformDataInCsv(data)

    const options = {
      fieldSeparator: ';',
      quoteStrings: '"',
      decimalSeparator: '.',
      showLabels: false,
      showTitle: false,
      title: 'Events',
      useTextFile: false,
      useBom: true,
      filename: 'Events list',
      useKeysAsHeaders: true,
    }

    const csvExporter = new ExportToCsv(options)

    csvExporter.generateCsv(dataCsv)
  }

  const handleClickImport = () => {
    console.log('click')
  }

  return (
    <SettingsWrapper>
      <NotificationsControls />
      {/* <Wrapper>
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
      </Wrapper> */}
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
      <Wrapper>
        <Title>Event List</Title>
        <ButtonWrapper>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickExport}>
            EXPORT
          </Button>

          <Button
            variant="outlined"
            color="primary"
            onClick={handleClickImport}>
            IMPORT
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </SettingsWrapper>
  )
}
