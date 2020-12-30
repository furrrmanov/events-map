const transformDataList = (events, profiles) => {
  const map = (data) => {
    return data.reduce((acc, item) => {
      acc.push({ ...item[1], id: item[0] })
      return acc
    }, [])
  }

  const eventList = map(events)
  const userProfileList = map(profiles)

  return eventList.reduce((acc, event) => {
    const owner = userProfileList.find(
      (item) =>
        item.owner === event.createdBy &&
        item.completed !== true &&
        item.deleted === false
    )
    acc.push({
      userDivicesToken: owner.devicesToken,
      event: event,
      notificationOption: owner,
      eventId: event.id,
    })
    return acc
  }, [])
}

module.exports = {
  transformDataList,
}
