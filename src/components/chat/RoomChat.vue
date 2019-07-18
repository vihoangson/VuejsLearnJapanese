<template>
    <div class="room">
        <div class="room-header">
            <div class="my-chat">
                <span>
                    <svg viewBox="0 0 10 10" id="icon_home" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M8.438 8.438H6.563V6.563a1.563 1.563 0 1 0-3.126 0v1.875H1.562V5.469L5 2.031l3.438 3.438v2.969zM5 .625L.625 5v4.375h3.751V6.562a.625.625 0 1 1 1.25 0v2.813h3.751V5L5.002.625z"
                        />
                    </svg>
                </span>
            </div>
            <div class="filter-list">
                <select name id>
                    <option value>All Chats</option>
                </select>
            </div>
            <div class="create-room">
                <span>
                    <svg viewBox="0 0 10 10" id="icon_plus" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M4.375.625v3.75H.625v1.25h3.75v3.75h1.25v-3.75h3.75v-1.25h-3.75V.625z"
                        />
                    </svg>
                </span>
            </div>
        </div>
        <div class="room-body">
            <ul>
                <li>
                    <div class="name">
                        <div class="room-image">
                            <img src="https://appdata.chatwork.com/icon/736/736137.rsz.jpg" alt />
                        </div>
                        <div class="room-name">
                            <span>SNS TOOL</span>
                        </div>
                    </div>
                </li>
                <li style="display:none">
                    <div class="name">
                        <div class="room-image">
                            <img src="https://appdata.chatwork.com/icon/736/736137.rsz.jpg" alt />
                        </div>
                        <div class="room-name">
                            <span>SNS TOOL</span>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>
<style>
.room {
    position: absolute;
    left: 0;
    top: 0;
    width: 256px;
    height: 100%;
    background-color: #f2f2f2;
    z-index: 2;
}
.room-header {
    display: flex;
    align-items: center;
    box-sizing: border-box;
    padding: 8px;
    height: 41px;
    background-color: #fff;
    border-bottom: 1px solid #cccccc;
}

.room-header .my-chat {
    box-sizing: border-box;
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 2px;
    text-decoration: none;
    cursor: pointer;
    user-select: none;
    width: 24px;
    height: 24px;
    padding: 0;
    border-color: transparent;
    background-color: transparent;
    color: #1a1a1a;
    fill: #1a1a1a;
    margin-right: 4px;
}
.room-header .create-room {
    box-sizing: border-box;
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    justify-content: center;
    border-style: solid;
    border-width: 1px;
    border-radius: 2px;
    text-decoration: none;
    cursor: pointer;
    user-select: none;
    width: 24px;
    height: 24px;
    padding: 0;
    border-color: transparent;
    background-color: transparent;
    color: #1a1a1a;
    fill: #1a1a1a;
}
.create-room:hover,
.my-chat:hover {
    background-color: rgba(0, 0, 0, 0.1);
    border-color: transparent;
    color: #1a1a1a;
    fill: #1a1a1a;
}
.create-room svg,
.my-chat svg {
    width: 16px;
    height: 16px;
}
.filter-list {
    margin-right: auto;
    width: calc(100% - 24px * 2 - 4px * 2);
    flex-grow: 0;
    flex-shrink: 1;
}
.filter-list select {
    width: 100%;
}
.room-body {
    height: calc(100% - 41px);
}
.room-body ul {
    list-style: none;
    padding: 0;
    margin: 0;
}
.room-body ul li {
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    fill-opacity: 0;
    background-color: rgb(242, 242, 242);
    padding: 8px calc(28px) 8px 8px;
    transition: background 0.2s linear 0s;
    border-width: 1px;
    border-style: solid;
    border-color: transparent;
    border-image: initial;
}
.room-body ul li .name {
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    width: 100%;
}
.room-image {
    margin-right: 8px;
    width: 32px;
    height: 32px;
    flex-shrink: 0;
}
.room-image img {
    box-sizing: border-box;
    width: 32px;
    height: 32px;
    border-radius: 50%;
}
.room-name {
    width: calc((100% - 32px) - 8px);
}
</style>
<script>
export default {
    name: 'Room'
};
</script>
