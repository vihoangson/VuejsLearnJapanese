export default {
  get_list_message: state => {
    return state.list_message
  },
  getContactDisplay: state => {
    return state.openContactDisplay
  },
  getProfileDisplay: state => {
    return state.openProfileDisplay
  },
  getProfileEdit: state => {
      return state.openProfileEdit
  }

}
