import { combineReducers } from 'redux'

import user from './userReducer'
import map from './mapReducer'
import event from './eventsReducer'
import profiles from './userProfilesReducer'
import messages from './messagesReducer'

export default combineReducers({ user, map, event, profiles, messages })
