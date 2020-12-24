import {
  USERS_PROFILE_LIST_REQUEST,
  SET_USERS_PROFILE_LIST,
  SET_USER_PROFILE,
} from 'src/client/actions'

const initialState = {
  userProfilesList: [],
  userProfile: {
    owner: '',
    iconName: '',
    iconType: '',
    iconUrl: '',
    devicesToken: [],
    emailNotification: true,
    pushNotification: true,
  },
}

export default function profiles(state = initialState, { type, payload }) {
  switch (type) {
    case USERS_PROFILE_LIST_REQUEST:
      return {
        ...state,
      }

    case SET_USERS_PROFILE_LIST: {
      return {
        ...state,
        userProfilesList: payload,
      }
    }

    case SET_USER_PROFILE: {
      return {
        ...state,
        userProfile: payload,
      }
    }
    default:
      return state
  }
}
