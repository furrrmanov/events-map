import React, { useState, createRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import Papa from 'papaparse'
import { Button } from '@material-ui/core'
import Checkbox from '@material-ui/core/Checkbox'
import { ExportToCsv } from 'export-to-csv'

import {
  filteredEventListUserCreated,
  transformDataInCsv,
  generateEventsListFromCsvFile,
  removingDuplicateEvents,
  filteringDeletedEvents,
  transformDataList
} from 'src/client/utils/dataMappers'
import {
  getRequestOnSendEventInFirebaseDb,
  getDeleteItemRequest,
} from 'src/client/actions'
import { getEventsListFirebaseDB } from 'src/client/utils/fireBase'

import {
  Wrapper,
  Title,
  ButtonWrapper,
  DownloadPopup,
  Form,
  Input,
  CheckBoxWrapper,
  Text,
  ButtonClose,
  Container,
} from './styles'

export default function EventsControls() {
  const dispatch = useDispatch()
  const eventList = useSelector((state) => state.event.eventsList)
  const userEmail = useSelector((state) => state.user.email)
  const fileUploadInputRef = createRef()
  const [showDownloadPopup, setShowDownloadPopup] = useState(false)
  const [overwriteExisting, setOverwriteExisting] = useState(false)
  const [downloadFile, setDownloadFile] = useState(null)
  const [deletedRecords, setDeletedRecords] = useState(false)

  const handleClickExport = async () => {
    const response = await getEventsListFirebaseDB()
    const allEventsList = filteredEventListUserCreated(transformDataList(response), userEmail)
    const listOfEventsWithoutDeleted = filteringDeletedEvents(allEventsList)
    console.log(listOfEventsWithoutDeleted)
    const dataCsv = transformDataInCsv(
      deletedRecords ? allEventsList : listOfEventsWithoutDeleted
    )

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
    setShowDownloadPopup(true)
  }

  const handleChangeOverwriteExistingCheckBox = ({ target }) => {
    setOverwriteExisting(target.checked)
  }

  const handleChangeDeleteRecordsCheckBox = ({ target }) => {
    setDeletedRecords(target.checked)
  }

  const onChangeImportButton = ({ target }) => {
    setDownloadFile(target.files[0])
    fileUploadInputRef.current.value = ''
  }

  const hadleOnClickConfirmeImport = () => {
    Papa.parse(downloadFile, {
      download: true,
      header: true,
      complete: (results) => {
        if (overwriteExisting) {
          const overwriteExistingEvents = removingDuplicateEvents(
            eventList,
            results.data
          )
          overwriteExistingEvents.forEach((dublicateEvent) => {
            dispatch(
              getDeleteItemRequest({
                itemId: dublicateEvent.id,
                collectionName: '/events',
                collectionRoot: 'events/',
              })
            )
          })
        }
        const eventsListOfFile = generateEventsListFromCsvFile(results.data)
        const listOfEventsWithoutDeleted = filteringDeletedEvents(eventsListOfFile)
        listOfEventsWithoutDeleted.forEach((event) => {
          dispatch(getRequestOnSendEventInFirebaseDb(event))
        })
      },
    })
    setShowDownloadPopup(false)
  }

  const handleClickClosePopup = () => {
    setShowDownloadPopup(false)
    setDownloadFile(null)
  }

  return (
    <Wrapper>
      <Title>Event List</Title>
      <CheckBoxWrapper>
        <Text>Export deleted records</Text>
        <Checkbox
          checked={deletedRecords}
          onChange={handleChangeDeleteRecordsCheckBox}
        />
      </CheckBoxWrapper>
      <ButtonWrapper>
        <Button variant="outlined" color="primary" onClick={handleClickExport}>
          EXPORT
        </Button>

        <Button variant="outlined" color="primary" onClick={handleClickImport}>
          IMPORT
        </Button>
      </ButtonWrapper>
      {showDownloadPopup ? (
        <DownloadPopup>
          <ButtonClose onClick={handleClickClosePopup} />
          <Form enctype="multipart/form-data" method="post">
            <Input
              id="import-csv-button"
              type="file"
              ref={fileUploadInputRef}
              onChange={onChangeImportButton}
            />
            <label htmlFor="import-csv-button">
              <Button variant="outlined" component="span">
                Upload
              </Button>
            </label>
          </Form>
          <CheckBoxWrapper>
            <Text>Overwrite existing events</Text>
            <Checkbox
              checked={overwriteExisting}
              onChange={handleChangeOverwriteExistingCheckBox}
            />
          </CheckBoxWrapper>
          <Container>
            <Button
              disabled={!downloadFile}
              variant="outlined"
              color="primary"
              onClick={hadleOnClickConfirmeImport}>
              OK
            </Button>
          </Container>
        </DownloadPopup>
      ) : null}
    </Wrapper>
  )
}
