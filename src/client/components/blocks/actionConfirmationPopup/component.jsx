import React from 'react'

import { Wrapper, Button, ButtonContainer, Title } from './styles'

export default function ActionConfirmationPopup(props) {
  const { confirmDeleteEvent, cancelDeleteEvent } = props

  const handleClickButtonConfirm = () => {
    confirmDeleteEvent()
  }

  const handleClickButtonCancel = () => {
    cancelDeleteEvent()
  }
  return (
    <Wrapper>
      <Title>Are you sure ?</Title>
      <ButtonContainer>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClickButtonConfirm}>
          Yes
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleClickButtonCancel}>
          No
        </Button>
      </ButtonContainer>
    </Wrapper>
  )
}
