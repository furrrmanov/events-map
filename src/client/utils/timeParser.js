import moment from 'moment'

export const parsingDateFromUnix = (date) => {
  return moment.unix(date / 1000).format('YYYY-MM-DD')
}

export const parsingTimeFromUnix = (date) => {
  return moment.unix(date / 1000).format('H:mm')
}
