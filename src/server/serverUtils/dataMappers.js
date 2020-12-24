const transformDataList = (events, profiles) => {
  const eventList = events.reduce((acc, item) => {
    acc.push({ ...item[1], id: item[0] })
    return acc
  }, [])

  const userProfileList = profiles.reduce((acc, item) => {
    acc.push({ ...item[1], id: item[0] })
    return acc
  }, [])

  return eventList.reduce((acc, event) => {
    const owner = userProfileList.find((item) => item.owner === event.createdBy && item.completed !== true)
    acc.push({
      userDivicesToken: owner.devicesToken,
      event: event,
      eventId: event.id,
    })
    return acc
  }, [])
}

module.exports = {
  transformDataList,
}
