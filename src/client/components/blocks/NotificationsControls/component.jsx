import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Checkbox from '@material-ui/core/Checkbox'
import SaveIcon from '@material-ui/icons/Save'
import { Button } from '@material-ui/core'

import { updateUserProfileRequest } from 'src/client/actions'

import { Wrapper, Title, CheckBoxWrapper, Text } from './styles'

export default function NotificationsControls() {
  const dispatch = useDispatch()
  const userProfile = useSelector((state) => state.profiles.userProfile)
  const [pushNotification, setpushNotification] = useState(true)
  const [emailNotification, setEmailNotification] = useState(true)

  useEffect(() => {
    setpushNotification(userProfile.pushNotification)
    setEmailNotification(userProfile.emailNotification)
  }, [userProfile])

  const handleChangePushNotificationCheckBox = ({ target }) => {
    setpushNotification(target.checked)
  }

  const handleChangeEmailNotificationCheckBox = ({ target }) => {
    setEmailNotification(target.checked)
  }

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

  return (
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
        variant="outlined"
        color="primary"
        size="small"
        type="submit"
        startIcon={<SaveIcon />}
        onClick={handleClickButtonSave}>
        Save
      </Button>
    </Wrapper>
  )
}
