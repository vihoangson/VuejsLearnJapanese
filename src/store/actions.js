import { API } from '../services/api';
import { ApiConst } from '../common/ApiConst';

export default {
    setAllUser({ commit }, message) {
        commit('set_all_user', message);
    },
    setListContact({ commit }, message) {
        commit('set_list_contact', message);
    },
    setLoadingPage({ commit }, message) {
        commit('set_loading_page', message);
    },
    setMyContact({ commit }, message) {
        commit('set_my_contact', message);
    },
    addMessage({ commit }, message) {
        commit('add_message', message);
    },
    editMessage({ commit }, message) {
        commit('edit_message', message);
    },
    removeMessage({ commit }, message) {
        commit('remove_message', message);
    },
    notReadMessage({ commit }, obj) {
        commit('not_read_message', obj);
    },
    setCurrentUser({ commit }, obj) {
        commit('set_current_user', obj);
    },
    setCurrentRoom({ commit }, obj) {
        commit('set_current_room', obj);
    },
    setCurrentGroup({ commit }, obj) {
        commit('set_current_group', obj);
    },
    setListRoom({ commit }, obj) {
        commit('set_list_room', obj);
    },
    setListRoomByGroup({ commit }, obj) {
        commit('set_list_room_by_group', obj);
    },
    setListGroup({ commit }, obj) {
        commit('set_list_group', obj);
    },
    setListUser({ commit }, obj) {
        commit('set_list_user', obj);
    },
    saveToListMember({ commit }, obj) {
        commit('set_to_list_member', obj);
    },

    setListUserByRoomId({ commit }, obj) {
        commit('set_list_user_by_room_id', obj);
    },
    setListNotUserByRoomId({ commit }, obj) {
        commit('set_list_not_user_by_room_id', obj);
    },
    setAdminRoom({ commit }, obj) {
        commit('is_admin_room', obj);
    },
    setNotification({ commit }, obj) {
        commit('set_notification', obj);
    },
    addNewRoom({ commit }, obj) {
        commit('new_room', obj);
    },
    setCurrentUserInfo({ commit }, obj) {
        commit('set_current_user_info', obj);
    },
    setContactDisplay({ commit }, style) {
        commit('setContactDisplay', style);
    },
    setProfileDisplay({ commit }, style) {
        commit('setProfileDisplay', style);
    },
    setProfileEdit({ commit }, style) {
        commit('setProfileEdit', style);
    },
    setIsShowToMemberList({ commit }, isShow) {
        commit('setIsShowToMemberList', isShow);
    },
    setUserIdToDelete({ commit }, id) {
        commit('setUserIdToDelete', id);
    },
    setTaskDisplay({ commit }, style) {
        commit('setTaskDisplay', style);
    },
    setTaskEditDisplay({ commit }, style) {
        commit('setTaskEditDisplay', style);
    },
    setUserTaskList({ commit }, obj) {
        commit('setUserTaskList', obj);
    },
    setEditTaskDetail({ commit }, obj) {
        commit('setEditTaskDetail', obj);
    },
    removeRoomById({ commit }, obj) {
        commit('removeRoomById', obj);
    },
    getWaitingAccept({commit},obj){
        let data = [];
        API.GET(ApiConst.UTILITY_GET_INIT, data).then(res => {
            commit('getWaitingAccept', {number_waiting_accept: res.data.getWaitAccept});
        });
    },
    setListRoomSocket({commit},obj) {
        commit('setListRoomSocket',obj)
    },
    setWord({commit},obj){

        commit('setWord', {word: [
                {
                    "k2": "あ",
                    "k3": "a"
                },
                {
                    "k2": "い",
                    "k3": "i"
                },
                {
                    "k2": "う",
                    "k3": "u"
                },
                {
                    "k2": "え",
                    "k3": "e"
                },
                {
                    "k2": "お",
                    "k3": "o"
                },
                {
                    "k2": "か",
                    "k3": "ka"
                },
                {
                    "k2": "き",
                    "k3": "ki"
                },
                {
                    "k2": "く",
                    "k3": "ku"
                },
                {
                    "k2": "け",
                    "k3": "ke"
                },
                {
                    "k2": "こ",
                    "k3": "ko"
                },
                {
                    "k2": "た",
                    "k3": "ta"
                },
                {
                    "k2": "ち",
                    "k3": "chi"
                },
                {
                    "k2": "つ",
                    "k3": "tsu"
                },
                {
                    "k2": "て",
                    "k3": "te"
                },
                {
                    "k2": "と",
                    "k3": "to"
                },
                {
                    "k2": "さ",
                    "k3": "sa"
                },
                {
                    "k2": "し",
                    "k3": "si"
                },
                {
                    "k2": "つ",
                    "k3": "su"
                },
                {
                    "k2": "せ",
                    "k3": "se"
                },
                {
                    "k2": "そ",
                    "k3": "so"
                },
                {
                    "k2": "な",
                    "k3": "na"
                },
                {
                    "k2": "に",
                    "k3": "ni"
                },
                {
                    "k2": "ぬ",
                    "k3": "nu"
                },
                {
                    "k2": "ね",
                    "k3": "ne"
                },
                {
                    "k2": "の",
                    "k3": "no"
                },
                {
                    "k2": "は",
                    "k3": "ha"
                },
                {
                    "k2": "ひ",
                    "k3": "hi"
                },
                {
                    "k2": "ふ",
                    "k3": "fu"
                },
                {
                    "k2": "へ",
                    "k3": "he"
                },
                {
                    "k2": "ほ",
                    "k3": "ho"
                },
                {
                    "k2": "ま",
                    "k3": "ma"
                },
                {
                    "k2": "み",
                    "k3": "mi"
                },
                {
                    "k2": "む",
                    "k3": "mu"
                },
                {
                    "k2": "め",
                    "k3": "me"
                },
                {
                    "k2": "も",
                    "k3": "mo"
                },
                {
                    "k2": "や",
                    "k3": "ya"
                },
                {
                    "k2": "ゆ",
                    "k3": "yu"
                },
                {
                    "k2": "よ",
                    "k3": "yo"
                },
                {
                    "k2": "ら",
                    "k3": "ra"
                },
                {
                    "k2": "り",
                    "k3": "ri"
                },
                {
                    "k2": "る",
                    "k3": "ru"
                },
                {
                    "k2": "れ",
                    "k3": "re"
                },
                {
                    "k2": "ろ",
                    "k3": "ro"
                },
                {
                    "k2": "わ",
                    "k3": "wa"
                },
                {
                    "k2": "を",
                    "k3": "wo"
                },
                {
                    "k2": "が",
                    "k3": "ga"
                },
                {
                    "k2": "ぎ",
                    "k3": "gi"
                },
                {
                    "k2": "ぐ",
                    "k3": "gu"
                },
                {
                    "k2": "げ",
                    "k3": "ge"
                },
                {
                    "k2": "ご",
                    "k3": "go"
                },
                {
                    "k2": "ざ",
                    "k3": "za"
                },
                {
                    "k2": "じ",
                    "k3": "zi"
                },
                {
                    "k2": "ず",
                    "k3": "zu"
                },
                {
                    "k2": "ぜ",
                    "k3": "ze"
                },
                {
                    "k2": "ぞ",
                    "k3": "zo"
                },
                {
                    "k2": "だ",
                    "k3": "da"
                },
                {
                    "k2": "ぢ",
                    "k3": "di"
                },
                {
                    "k2": "づ",
                    "k3": "du"
                },
                {
                    "k2": "で",
                    "k3": "de"
                },
                {
                    "k2": "ど",
                    "k3": "do"
                },
                {
                    "k2": "ば",
                    "k3": "ba"
                },
                {
                    "k2": "び",
                    "k3": "bi"
                },
                {
                    "k2": "ぶ",
                    "k3": "bu"
                },
                {
                    "k2": "べ",
                    "k3": "be"
                },
                {
                    "k2": "ぼ",
                    "k3": "bo"
                },
                {
                    "k2": "ぱ",
                    "k3": "pa"
                },
                {
                    "k2": "ぴ",
                    "k3": "pi"
                },
                {
                    "k2": "ぷ",
                    "k3": "pu"
                },
                {
                    "k2": "ぺ",
                    "k3": "pe"
                },
                {
                    "k2": "ぽ",
                    "k3": "po"
                },
                {
                    "k2": "ん",
                    "k3": "n"
                },
                {
                    "k2": "ア",
                    "k3": "a"
                },
                {
                    "k2": "イ",
                    "k3": "i"
                },
                {
                    "k2": "ウ",
                    "k3": "u"
                },
                {
                    "k2": "エ",
                    "k3": "e"
                },
                {
                    "k2": "オ",
                    "k3": "o"
                },
                {
                    "k2": "カ",
                    "k3": "ka"
                },
                {
                    "k2": "キ",
                    "k3": "ki"
                },
                {
                    "k2": "ク",
                    "k3": "ku"
                },
                {
                    "k2": "ケ",
                    "k3": "ke"
                },
                {
                    "k2": "コ",
                    "k3": "ko"
                },
                {
                    "k2": "タ",
                    "k3": "ta"
                },
                {
                    "k2": "チ",
                    "k3": "chi"
                },
                {
                    "k2": "ツ",
                    "k3": "tsu"
                },
                {
                    "k2": "テ",
                    "k3": "te"
                },
                {
                    "k2": "ト",
                    "k3": "to"
                },
                {
                    "k2": "サ",
                    "k3": "sa"
                },
                {
                    "k2": "シ",
                    "k3": "si"
                },
                {
                    "k2": "ス",
                    "k3": "su"
                },
                {
                    "k2": "セ",
                    "k3": "se"
                },
                {
                    "k2": "ソ",
                    "k3": "so"
                },
                {
                    "k2": "ナ",
                    "k3": "na"
                },
                {
                    "k2": "ニ",
                    "k3": "ni"
                },
                {
                    "k2": "ヌ",
                    "k3": "nu"
                },
                {
                    "k2": "ネ",
                    "k3": "ne"
                },
                {
                    "k2": "ノ",
                    "k3": "no"
                },
                {
                    "k2": "ハ",
                    "k3": "ha"
                },
                {
                    "k2": "ヒ",
                    "k3": "hi"
                },
                {
                    "k2": "フ",
                    "k3": "fu"
                },
                {
                    "k2": "ヘ",
                    "k3": "he"
                },
                {
                    "k2": "ホ",
                    "k3": "ho"
                },
                {
                    "k2": "マ",
                    "k3": "ma"
                },
                {
                    "k2": "ミ",
                    "k3": "mi"
                },
                {
                    "k2": "ム",
                    "k3": "mu"
                },
                {
                    "k2": "メ",
                    "k3": "me"
                },
                {
                    "k2": "モ",
                    "k3": "mo"
                },
                {
                    "k2": "ヤ",
                    "k3": "ya"
                },
                {
                    "k2": "ユ",
                    "k3": "yu"
                },
                {
                    "k2": "ヨ",
                    "k3": "yo"
                },
                {
                    "k2": "ラ",
                    "k3": "ra"
                },
                {
                    "k2": "リ",
                    "k3": "ri"
                },
                {
                    "k2": "ル",
                    "k3": "ru"
                },
                {
                    "k2": "レ",
                    "k3": "re"
                },
                {
                    "k2": "ロ",
                    "k3": "ro"
                },
                {
                    "k2": "ワ",
                    "k3": "wa"
                },
                {
                    "k2": "ヲ",
                    "k3": "wo"
                },
                {
                    "k2": "ガ",
                    "k3": "ga"
                },
                {
                    "k2": "ギ",
                    "k3": "gi"
                },
                {
                    "k2": "グ",
                    "k3": "gu"
                },
                {
                    "k2": "ゲ",
                    "k3": "ge"
                },
                {
                    "k2": "ゴ",
                    "k3": "go"
                },
                {
                    "k2": "ザ",
                    "k3": "za"
                },
                {
                    "k2": "ジ",
                    "k3": "zi"
                },
                {
                    "k2": "ズ",
                    "k3": "zu"
                },
                {
                    "k2": "ゼ",
                    "k3": "ze"
                },
                {
                    "k2": "ゾ",
                    "k3": "zo"
                },
                {
                    "k2": "ダ",
                    "k3": "da"
                },
                {
                    "k2": "ヂ",
                    "k3": "di"
                },
                {
                    "k2": "ヅ",
                    "k3": "du"
                },
                {
                    "k2": "デ",
                    "k3": "de"
                },
                {
                    "k2": "ド",
                    "k3": "do"
                },
                {
                    "k2": "バ",
                    "k3": "ba"
                },
                {
                    "k2": "ビ",
                    "k3": "bi"
                },
                {
                    "k2": "ブ",
                    "k3": "bu"
                },
                {
                    "k2": "べ",
                    "k3": "be"
                },
                {
                    "k2": "ボ",
                    "k3": "bo"
                },
                {
                    "k2": "パ",
                    "k3": "pa"
                },
                {
                    "k2": "ピ",
                    "k3": "pi"
                },
                {
                    "k2": "プ",
                    "k3": "pu"
                },
                {
                    "k2": "ペ",
                    "k3": "pe"
                },
                {
                    "k2": "ポ",
                    "k3": "po"
                },
                {
                    "k2": "ン",
                    "k3": "n"
                }
            ]});
    },
};
