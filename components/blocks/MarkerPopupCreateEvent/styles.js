import styled from 'styled-components'

import MaterialInput from '@material-ui/core/Input'
import MaterialCheckbox from '@material-ui/core/Checkbox'

export const PopupWrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
`

export const CheckboxContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

export const InputEmailContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-bottom: 15px;
}
`

export const Checkbox = styled(MaterialCheckbox)``

export const Title = styled.span`
  font-size: 15px;
`

export const Input = styled(MaterialInput)`
  width: 150px;
  margin-left: 15px;
`

export const InputDateContainer = styled.div`
  display: flex;
  justify-content: center;
`
