import styled from 'styled-components'

import MaterialDeleteOutlineIcon from '@material-ui/icons/DeleteOutline'

export const DeleteOutlineIcon = styled(MaterialDeleteOutlineIcon)`
  cursor: pointer;
  :hover {
    transform: rotateY(180deg);
  }
`

export const SettingsWrapper = styled.div`
  display: inline-flex;
  justify-content: center;
  width: 100%;
  align-items: start;
`

export const Title = styled.span`
  font-size: 20px;
  font-weight: bold;
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

export const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

export const Text = styled.div`
  font-size: 16px;
`

export const Input = styled.input`
  display: none;
`

export const Form = styled.form`
  display: flex;
  justify-content: center;
  margin: 8px auto;
`

export const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 100px;
`

export const ImgWrapper = styled.div`
  width: 64px;
  height: 64px;
  margin-top: 5px;
  position: relative;
`
