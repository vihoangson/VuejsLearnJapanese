export default {
    get_list_message: state => {
        return state.list_message;
    },
    get_current_user: state => {
        return state.current_user;
    },

    get_current_user_info: state => {
        return state.current_user_info;
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
};
