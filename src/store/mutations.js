export default {
  add_message (state, message){
    return state.list_message.push(message)
  },
  remove_message (state, message){
    let idx = state.list_message.indexOf(message);
    if(idx > -1)
      return state.list_message.splice(idx, 1);
  }
}