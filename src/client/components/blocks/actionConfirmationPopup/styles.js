import styled from 'styled-components'

import MaterialButton from '@material-ui/core/Button'

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  background-color: #e8dede;
  padding: 10px;
  border-radius: 10px;
  width: 280px;
  height: 155px;
  z-index: 1000;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`

export const Title = styled.span`
  font-size: 20px;
  padding-bottom: 30px;
`

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-around;
`

export const Button = styled(MaterialButton)`
  height: 30px;
`
