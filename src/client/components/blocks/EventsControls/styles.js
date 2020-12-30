import styled from 'styled-components'

import MaterialCloseIcon from '@material-ui/icons/Close'

export const ButtonClose = styled(MaterialCloseIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -110px;
  margin-left: 150px;
  cursor: pointer;
`

export const Form = styled.form`
  display: flex;
  justify-content: center;
  margin: 8px auto;
`
export const Input = styled.input`
  display: none;
`

export const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Text = styled.div`
  font-size: 16px;
`

export const DownloadPopup = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 360px;
  height: 230px;
  background-color: #d6dcff;
  border-radius: 10px;
`

export const ButtonWrapper = styled.div`
  display: flex;
  height: 100px;
  justify-content: space-around;
  flex-direction: column;
  margin-top: 2px;
`

export const Title = styled.span`
  font-size: 20px;
  font-weight: bold;
  padding-bottom: 10px;
`

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0px;
  margin-left: 50px;
  text-align: center;
  align-items: center;
`

export const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  align-items: center;
  margin-top: 25px;
`
