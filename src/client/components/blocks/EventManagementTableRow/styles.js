import styled from 'styled-components'

import MaterialTableCell from '@material-ui/core/TableCell'
import MaterialButton from '@material-ui/core/Button'

export const Button = styled(MaterialButton)`
  margin-left: 10px !important;
`

export const TableCell = styled(MaterialTableCell)`
  text-align: center;
  overflow: auto !important;
  flex-wrap: nowrap !important;
  padding: 5px !important;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
`
