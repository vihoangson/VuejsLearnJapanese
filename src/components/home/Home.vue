<template>
    <div id="home">
        <status></status>
    </div>
</template>


<script>
    import Status from "../japanese/Status";
import { API } from '../../services/api';
import { ApiConst } from '../../common/ApiConst';
import { AppConst } from '../../common/AppConst';

import Notice from '../global/Notice';
import Header from '../global/Header';
import Room from '../room/RoomChat';
import Chat from '../chat/ChatBox';
import Rooms from '../room/Rooms';
import DeleteRoom from '../room/DeleteRoom';
import Group from '../group/Group';
import AddUser from '../room/AddUser';
import EditUser from '../room/EditUser';
import ShowUser from '../room/ShowUser';
import ChatSetting from '../room/ChatSetting';
import Contact from '../contact/Contact';
import PersonalInfo from '../personal_info/PersonalInfo';
import EditPersonalInfo from '../personal_info/EditPersonalInfo';
import RemoveUser from '../contact/RemoveUser';
import TaskList from '../task_management/TaskList';
import EditTaskContent from '../task_management/EditTaskContent';
export default {
    name: 'Home',
    components: {
        Status
    },
    data() {

    }


};
</script>
