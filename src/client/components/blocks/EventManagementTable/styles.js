import styled from 'styled-components'

import MaterialTableCell from '@material-ui/core/TableCell'
import MaterialTable from '@material-ui/core/Table'
import MaterialCloseIcon from '@material-ui/icons/Close'

export const CloseIcon = styled(MaterialCloseIcon)`
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -150px;
  margin-left: 173px;
  cursor: pointer;
`

export const TableCell = styled(MaterialTableCell)`
  text-align: center !important;
  overflow: auto !important;
  flex-wrap: nowrap !important;
  padding: 5px !important;
`

export const Table = styled(MaterialTable)`
  minwidth: 700px;
`

export const PopupWrapper = styled.div`
  display: grid;
  background-color: #dadada;
  border-radius: 5px;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 300px;
  margin-top: -150px;
  margin-left: -200px;
`
