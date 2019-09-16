export const AppConst = {
           SOCKET_ADDRESS: 'http://172.16.100.35:3001',
           LOCAL_USER: 'user',
           LOCAL_USER_INFO: 'user_info',
           LOCAL_MESSAGE_BY_ROOM: 'message_by_room',
           MESSAGE_TYPE: {
               CREATE: 0,
               EDIT: 1,
               DELETE: 2
           },
           ACCEPTED_FILES: '.jpg,.jpeg,.png,.gif,.sql,.txt,.zip,.rar,.doc,.docx,.docm,.xls,.xlsx,.xlsm,.ppt,.pptx,.pptm,.pdf,.pps',
           ACCEPTED_IMG_FILES: '.jpg,.png,.jpeg,.gif',
           MAX_FILE_SIZE: 100,
           MAX_FILE: 10,
           EVENT_MESSAGE: {
               SEND: 'send_message',
               JOIN_BY_LIST_ROOM: 'join_by_list_rooms',
               JOIN_NEW_ROOM: 'join_by_new_room',
               CHANNEL_NEW_ROOM: 'channel_new_room',
               ADD_NEW_ROOM: 'add_new_room',
               REMOVE_ROOM: 'remove_room',
               CHANNEL_REMOVE_ROOM: 'channel_remove_room',
               CHANGE_ROOM: 'change_room',
               CHANNEL_CHANGE_ROOM: 'channel_change_room',
               LEAVE_ROOM: 'leave_room'
           },
           REGULAR: {
               TO_ALL: /(\[toall])/g,
               TO: /(\[to:([0-9])+])/g,
               REPY: /(\[reply mid:([0-9]+) to:([0-9]+)\])/g,
               REPLY_TO_ID: /(?<=to:)([0-9]+)/g,
               TAG_INFO: /(?<=\[info\])(.|\n)*?(?=\[\/info\])/g,
               TAG_CODE: /(?<=\[code\])(.|\n)*?(?=\[\/code\])/g,
               TAG_TITLE: /(?<=\[title\])(.|\n)*?(?=\[\/title\])/g,
               ALL_TAG: /(\[\/?\w+)(.*?\])/g,
               PREVIEW: /(\[preview id:([0-9]+) ht:([0-9]+)\])/g,
               ATTRIBUTE_ID: /(?<=id:)([0-9]+)/g,
               PREVIEW_HEIGHT: /(?<=ht:)([0-9]+)/g,
               DOWNLOAD: /(\[download id:([0-9]+)\])(.|\n)*?(?=\[\/download\])/g,
               QUOTE_CONTENT: /(?<=\[quote uid:([0-9]+) time:([0-9]+)\])(.|\n)*?(?=\[\/quote\])/g,
               QUOTE_TAG: /(\[quote uid:([0-9]+) time:([0-9]+)\])/g,
               QUOTE_TAG_USER_ID: /(?<=uid:)([0-9]+)/g,
               QUOTE_TAG_TIME: /(?<=time:)([0-9]+)/g,
               LINK: /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g,
               TAG_SCRIPT: /(<script)|(<\/script>)/g,
               EMOJI: /:\)|:\(|:D|8-\)|:o|;\)|;\(|\(sweat\)|:\||:\*|:p|\(blush\)|:\^\)|\|-\)|\(inlove\)|\]:\)|\(talk\)|\(yawn\)|\(puke\)|\(emo\)|8-\||:#\)|\(nod\)|\(shake\)|\(\^\^;\)|\(whew\)|\(clap\)|\(bow\)|\(roger\)|\(flex\)|\(dance\)|\(:\/\)|\(gogo\)|\(think\)|\(please\)|\(quick\)|\(anger\)|\(devil\)|\(lightbulb\)|\(\*\)|\(h\)|\(F\)|\(cracker\)|\(eat\)|\(\^\)|\(coffee\)|\(beer\)|\(handshake\)|\(y\)/g
           },
           EMOJI: [
               {
                   id: 0,
                   name: 'Smiling face',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_smile.gif',
                   code: ':)'
               },
               {
                   id: 1,
                   name: 'Sad face',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_sad.gif',
                   code: ':('
               },
               {
                   id: 2,
                   name: 'Laughing face',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_more_smile.gif',
                   code: ':D'
               },
               {
                   id: 3,
                   name: 'Smiling face with sunglasses',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_lucky.gif',
                   code: '8-)'
               },
               {
                   id: 4,
                   name: 'Hushed face',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_surprise.gif',
                   code: ':o'
               },
               {
                   id: 5,
                   name: 'Winking face',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_wink.gif',
                   code: ';)'
               },
               {
                   id: 6,
                   name: 'Crying face',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_tears.gif',
                   code: ';('
               },
               {
                   id: 7,
                   name: 'Face with cold sweat',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_sweat.gif',
                   code: '(sweat)'
               },
               {
                   id: 8,
                   name: 'Silent face',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_mumu.gif',
                   code: ':|'
               },
               {
                   id: 9,
                   name: 'Kiss face',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_kiss.gif',
                   code: ':*'
               },
               {
                   id: 10,
                   name: 'Tongue face',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_tongueout.gif',
                   code: ':p'
               },
               {
                   id: 11,
                   name: 'Blushing face',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_blush.gif',
                   code: '(blush)'
               },
               {
                   id: 12,
                   name: 'Frowning face',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_wonder.gif',
                   code: ':^)'
               },
               {
                   id: 13,
                   name: 'Sleeping face',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_snooze.gif',
                   code: '|-)'
               },
               {
                   id: 14,
                   name: 'Smiling face with hearts',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_love.gif',
                   code: '(inlove)'
               },
               {
                   id: 15,
                   name: 'Bragging face',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_grin.gif',
                   code: ']:)'
               },
               {
                   id: 16,
                   name: 'Speaking face',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_talk.gif',
                   code: '(talk)'
               },
               {
                   id: 17,
                   name: 'Sleepy face',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_yawn.gif',
                   code: '(yawn)'
               },
               {
                   id: 18,
                   name: 'Vomiting face',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_puke.gif',
                   code: '(puke)'
               },
               {
                   id: 19,
                   name: 'Hair flip face',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_ikemen.gif',
                   code: '(emo)'
               },
               {
                   id: 20,
                   name: 'Glasses face',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_otaku.gif',
                   code: '8-|'
               },
               {
                   id: 21,
                   name: 'Grinning face',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_ninmari.gif',
                   code: ':#)'
               },
               {
                   id: 22,
                   name: 'Nodding face',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_nod.gif',
                   code: '(nod)'
               },
               {
                   id: 23,
                   name: 'Shaking head face',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_shake.gif',
                   code: '(shake)'
               },
               {
                   id: 24,
                   name: 'Grinning face with sweat',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_wry_smile.gif',
                   code: '(^^;)'
               },
               {
                   id: 25,
                   name: 'Sweating face',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_whew.gif',
                   code: '(whew)'
               },
               {
                   id: 26,
                   name: 'Clapping hands',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_clap.gif',
                   code: '(clap)'
               },
               {
                   id: 27,
                   name: 'Bowing Person',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_bow.gif',
                   code: '(bow)'
               },
               {
                   id: 28,
                   name: 'Saluting face',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_roger.gif',
                   code: '(roger)'
               },
               {
                   id: 29,
                   name: 'Flexing Person',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_muscle.gif',
                   code: '(flex)'
               },
               {
                   id: 30,
                   name: 'Dancer',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_dance.gif',
                   code: '(dance)'
               },
               {
                   id: 31,
                   name: 'Funny face',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_komanechi.gif',
                   code: '(:/)'
               },
               {
                   id: 32,
                   name: 'Raised fist',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_gogo.gif',
                   code: '(gogo)'
               },
               {
                   id: 33,
                   name: 'Thinking face',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_think.gif',
                   code: '(think)'
               },
               {
                   id: 34,
                   name: 'Please',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_please.gif',
                   code: '(please)'
               },
               {
                   id: 35,
                   name: 'Hurrying face',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_quick.gif',
                   code: '(quick)'
               },
               {
                   id: 36,
                   name: 'Angry face',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_anger.gif',
                   code: '(anger)'
               },
               {
                   id: 37,
                   name: 'Smiling face with horns',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_devil.gif',
                   code: '(devil)'
               },
               {
                   id: 38,
                   name: 'Lightbulb',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_lightbulb.gif',
                   code: '(lightbulb)'
               },
               {
                   id: 39,
                   name: 'Star',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_star.gif',
                   code: '(*)'
               },
               {
                   id: 40,
                   name: 'Trembling heart',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_heart.gif',
                   code: '(h)'
               },
               {
                   id: 41,
                   name: 'Blooming flower',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_flower.gif',
                   code: '(F)'
               },
               {
                   id: 42,
                   name: 'Firecracker',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_cracker.gif',
                   code: '(cracker)'
               },
               {
                   id: 43,
                   name: 'Food',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_eat.gif',
                   code: '(eat)'
               },
               {
                   id: 44,
                   name: 'Cake',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_cake.gif',
                   code: '(^)'
               },
               {
                   id: 45,
                   name: 'Coffee',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_coffee.gif',
                   code: '(coffee)'
               },
               {
                   id: 46,
                   name: 'Beer',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_beer.gif',
                   code: '(beer)'
               },
               {
                   id: 47,
                   name: 'Handshake',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_handshake.gif',
                   code: '(handshake)'
               },
               {
                   id: 48,
                   name: 'Thumbs up',
                   src:
                       'https://assets.chatwork.com/images/emoticon2x/emo_yes.gif',
                   code: '(y)'
               }
           ],
           HEIGHT_IMG_PREVIEW:120
       };
