<template>
	<div id="chat-box">
		<div class="chat-box-header">
			<div class="header-name">
				<div class="room-logo">
					<img src="https://appdata.chatwork.com/icon/736/736137.rsz.jpg" alt />
				</div>
				<h1 class="title">
					<span>SNS TOOL</span>
				</h1>
			</div>
		</div>
		<div class="chat-box-content" id="chat-box-content" :style="{'height': `${myStyles}px`}">
			<div class="timeline">
				<div class="timeline-message">
					<div
						class="timeline-message-body"
						v-for="(item, index) in list_message"
						:key="`item-${index}`"
					>
						<div class="timeline-avatar">
							<img :src="item.image" alt class="avatar" />
						</div>
						<div class="timeline-content">
							<div class="timeline-content-header">
								<p class="timeline-content-header-username">{{item.name}}</p>
								<p class="timeline-content-header-organization">{{item.organization}}</p>
							</div>
							<div class="timeline-content-message">{{item.content}}</div>
						</div>
					</div>
				</div>
			</div>
			<div class="chat-input">
				<div class="chat-tool">
					<picker
						v-show="showEmojiPicker"
						title="Pick your emoji..."
						emoji="point_up"
						@select="addEmoji"
					/>
					<div>
						<ul class="send-tool">
							<li class="emoji" @click="toggleEmojiPicker">
								<span class="icon-container">
									<svg viewBox="0 0 10 10" id="icon_emoticon" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M5 9.063A4.063 4.063 0 1 1 5 .937a4.063 4.063 0 0 1 0 8.126M5 0a5 5 0 1 0 .001 10.001A5 5 0 0 0 5 0m0 7.188a2.49 2.49 0 0 1-2.153-1.25h-.708a3.121 3.121 0 0 0 5.722 0h-.708A2.49 2.49 0 0 1 5 7.188M6.406 5c.431 0 .781-.357.781-.875s-.417-1.065-.906-1c-.428.057-.656.482-.656 1s.35.875.781.875m-2.813.003c.431 0 .781-.357.781-.875s-.228-.943-.656-1c-.489-.065-.906.482-.906 1s.35.875.781.875"
										/>
									</svg>
								</span>
							</li>
							<li class="emoji">
								<span class="icon-container">
									<svg viewBox="0 0 10 10" id="icon_mention" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M6.875 7.188c-1.329 0-2.188-.979-2.188-2.188 0-1.208.859-2.188 2.188-2.188 1.329 0 2.188.979 2.188 2.188 0 1.208-.859 2.188-2.188 2.188m0-5.313C4.977 1.875 3.75 3.274 3.75 5s1.227 3.125 3.125 3.125S10 6.726 10 5 8.773 1.875 6.875 1.875M0 1.875v.937h1.563v5.313h.938V2.812h1.563v-.937H.001z"
										/>
									</svg>
								</span>
							</li>
							<li class="emoji">
								<span class="icon-container">
									<svg viewBox="0 0 10 10" id="icon_sendfile" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M8.534 5.884l.001-.001a3.126 3.126 0 0 0-4.42-4.418L.816 4.764A2.21 2.21 0 0 0 3.942 7.89l3.299-3.299a1.367 1.367 0 0 0-1.932-1.932L2.342 5.626a.469.469 0 0 0 .663.663l2.968-2.967v-.001a.43.43 0 0 1 .606.606h-.001L3.28 7.226a1.273 1.273 0 0 1-1.8-1.799h.001l3.298-3.299a2.188 2.188 0 0 1 3.094 3.093L4.574 8.52a.469.469 0 0 0 .663.663l3.299-3.299z"
										/>
									</svg>
								</span>
							</li>
							<li class="emoji">
								<span class="icon-container">
									<svg viewBox="0 0 10 10" id="icon_live" xmlns="http://www.w3.org/2000/svg">
										<path
											d="M5.313 6.719c0 .259-.21.469-.469.469H1.406a.469.469 0 0 1-.469-.469V3.281c0-.259.21-.469.469-.469h3.438c.259 0 .469.21.469.469v3.438zm0-4.844H.938A.937.937 0 0 0 0 2.813v4.375c0 .518.42.938.938.938h4.375a.937.937 0 0 0 .938-.938V2.813a.938.938 0 0 0-.938-.938zm3.906 4.55l-.735-.276a.312.312 0 0 1-.203-.292V4.142c0-.13.081-.247.203-.293l.735-.276v2.851zm.148-3.687l-1.563.586a.47.47 0 0 0-.304.439v2.476c0 .196.121.37.304.439l1.563.586a.47.47 0 0 0 .634-.439V3.177a.469.469 0 0 0-.634-.439z"
										/>
									</svg>
								</span>
							</li>
						</ul>
					</div>
					<div class="submit-container">
						<span class="enter-action">
							<input type="checkbox" name id="chkenter" />
						</span>
						<label for="chkenter">
							<span class="txt-enter-action">Press Enter to send</span>
						</label>
						<div
							id="_sendButton"
							class="chatInput__submit _cwBN button"
							role="button"
							tabindex="2"
							aria-disabled="false"
							@click="sendMessage"
						>Send</div>
					</div>
				</div>
				<div class="chat-textarea">
					<textarea
          ref="textarea"
						cols="30"
						rows="10"
						placeholder="Enter your message here"
						v-model="message"
						@input="$emit('input', $event.target.value)"
					></textarea>
				</div>
			</div>
			<div class="sideContentResizeCtrlArea cwResizeHandleCol"></div>
		</div>
	</div>
</template>
<script>
import { Picker } from "emoji-mart-vue";
import TextareaEmojiPicker from "../global/TextareaEmojiPicker";
const EVENT_SEND = "send_message";
// const EVENT_RESPONSE = "response_message";

export default {
	name: 'ChatBox',
	components: {
		Picker,
		TextareaEmojiPicker
	},
	props: {
		value: {
			type: String,
			default: ""
		}
	},
	data() {
		return {
			height: 0,
			message: "",
			list_message: this.$store.getters.get_list_message,
			showEmojiPicker: false
		};
	},
	created() {
		window.addEventListener("resize", this.handleResize);
		this.handleResize();
	},
	methods: {
		handleResize() {
			this.height = window.innerHeight - 45;
		},
		sendMessage() {
			let msg = {
				image: "https://appdata.chatwork.com/avatar/3196/3196108.png",
				name: "Hoang Sy Hung",
				organization: "Lampart Co., Ltd",
				content: this.message,
				create_datetim: new Date()
			};
			this.$socket.emit(EVENT_SEND, msg);

			this.message = "";
		},
		toggleEmojiPicker() {
			this.showEmojiPicker = !this.showEmojiPicker;
		},
		addEmoji(emoji) {
			const textarea = this.$refs.textarea;
			const cursorPosition = textarea.selectionEnd;
			const start = this.value.substring(0, textarea.selectionStart);
			const end = this.value.substring(textarea.selectionStart);
      const text = start + emoji.native + end;
      this.$emit("input", text);
      this.message += text;
			textarea.focus();
			this.$nextTick(() => {
				textarea.selectionEnd = cursorPosition + emoji.native.length;
      });
      this.showEmojiPicker = false;
		}
	},
	computed: {
		myStyles() {
			return this.height - 45;
		}
	}
};
</script>
<style>
#chat-box {
	position: absolute;
	top: 0;
	right: 0;
	left: 256px;
	height: 100%;
	min-width: 700px;
	z-index: 1;
}
.chat-box-header {
	box-sizing: border-box;
	height: 41px;
	padding-right: 8px;
	padding-left: 8px;
	border-left: 1px solid #b3b3b3;
	border-bottom: 1px solid #cccccc;
	background-color: #fff;
}
.chat-box-header .header-name {
	box-sizing: border-box;
	display: flex;
	align-items: center;
	padding-right: 40px;
	height: 100%;
	max-width: calc(100% - 292px);
}
.room-logo {
	box-sizing: border-box;
	display: flex;
	align-items: center;
	height: 100%;
	max-width: calc(100% - 292px);
}
.room-logo img {
	box-sizing: border-box;
	width: 24px;
	height: 24px;
	border-radius: 50%;
	flex-shrink: 0;
}
.chat-box-header .title {
	display: -webkit-box;
	display: -ms-flexbox;
	display: flex;
	height: 24px;
	padding-left: 8px;
	max-width: calc(100% - 24px - 8px);
	position: relative;
	font-size: 16px;
	font-weight: 700;
	margin: 0;
	vertical-align: middle;
	line-height: 25px;
}
.title span {
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	display: inline-block;
	box-sizing: border-box;
	max-width: 100%;
	padding-right: 24px;
}
.chat-box-content {
	position: absolute;
	right: 300px;
	left: 0;
	min-width: 400px;
	background: #fff;
	border-right: 1px solid #b3b3b3;
	border-left: 1px solid #cccccc;
	z-index: -1;
}
.titmeline-message {
	position: relative;
	transition: 0.1s linear;
	zoom: 1;
	border-top: 1px solid transparent;
	border-bottom: 1px solid transparent;
}
.timeline-message-body {
	padding: 8px 16px;
}
.timeline-avatar {
	float: left;
}
.timeline-content {
	zoom: 1;
	padding-left: 40px;
	padding-right: 40px;
}
.timeline-content-header {
	white-space: nowrap;
	text-overflow: ellipsis;
	overflow: hidden;
	width: 95%;
}
.timeline-content-header-username {
	display: inline;
	font-weight: 700;
	cursor: pointer;
	color: #0084b2;
}
.timeline-content-header-organization {
	display: inline;
	margin-left: 4px;
	color: #666666;
	font-size: 11px;
}
.timeline-avatar img {
	border: solid 1px transparent;
	border-radius: 50% 50% 0 50%;
	background-color: #fff;
}
.sideContentResizeCtrlArea {
	position: absolute;
	background: rgba(0, 0, 0, 0.2);
	width: 3px;
	top: 0;
	bottom: 0;
	opacity: 0;
	z-index: 2;
	left: 0;
	border-left: 1px solid #b3b3b3;
}
.chat-input {
	width: 97%;
	position: absolute;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 1000;
	text-align: center;
	margin: 0 auto;
}
.chat-textarea {
	border: 1px solid #b3b3b3;
}
.chat-input textarea {
	border-radius: 0;
	box-shadow: none;
	box-sizing: border-box;
	width: 100%;
	outline: 0;
	margin: 0;
	padding: 5px;
	border: none;
	background: #fffde3;
	overflow-y: hidden;
	min-height: 50px;
	font-size: 14px;
	resize: none;
}
textarea:focus:-webkit-placeholder {
	color: transparent;
}
.chat-tool {
	position: relative;
	display: flex;
	align-items: center;
	background: #fff;
	height: 34px;
	padding: 0 8px;
	border: 1px solid #b3b3b3;
	border-bottom: 1px solid #b3b3b3;
	justify-content: space-between;
}
.send-tool {
	display: flex;
	align-items: center;
	list-style: none;
	padding-left: 0px;
}
.emoji {
	border-color: transparent;
	background-color: transparent;
	color: #1a1a1a;
	fill: #1a1a1a;
	box-sizing: border-box;
	width: 24px;
	height: 24px;
	padding: 4px;
	margin-right: 8px;
	border-radius: 2px;
	cursor: pointer;
}
.emoji:hover {
	background-color: rgba(0, 0, 0, 0.1);
}
.icon-container {
	width: 16px;
	height: 16px;
}
.chatInput__submit {
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
	padding: 0 12px;
	min-width: 26px;
	min-height: 26px;
	line-height: 26px;
	font-size: 13px;
	border-color: #216493;
	background-color: #216493;
	color: #fff;
	fill: #fff;
	vertical-align: middle;
	text-align: center;
}
.chatInput__submit:hover {
	border-color: #006a9c;
	background-color: #006a9c;
	color: #fff;
	fill: #fff;
}
.txt-enter-action {
	margin-right: 5px;
	cursor: pointer;
}
.emoji-mart {
	position: absolute;
	left: 10px;
}

.emoji-trigger {
	position: absolute;
	top: 10px;
	right: 10px;
	cursor: pointer;
	height: 20px;
}

.emoji-trigger path {
	transition: 0.1s all;
}

.emoji-trigger:hover path {
	fill: #000000;
}

.emoji-trigger.triggered path {
	fill: darken(#fec84a, 15%);
}
</style>
