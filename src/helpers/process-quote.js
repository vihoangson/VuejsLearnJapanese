import { AppConst } from "../common/AppConst";

const QUOTE = `<div class="dev_quote chatQuote">
<div class="chatQuote__title">
    <span class="icon-quote"> <svg viewBox="0 0 10 10" id="icon_quote" xmlns="http://www.w3.org/2000/svg"><path d="M3.863 2.5a2.388 2.388 0 0 0-2.388 2.387c0 .191.031.372.076.549a1.476 1.476 0 1 1 .837 2.69l-.297-.03a2.38 2.38 0 0 1-2.09-2.358 3.862 3.862 0 0 1 3.862-3.862.313.313 0 0 1 0 .626zm5.825 0a2.387 2.387 0 0 0-2.387 2.387c0 .191.031.372.075.549a1.476 1.476 0 1 1 .837 2.69l-.298-.03a2.38 2.38 0 0 1-2.09-2.358 3.862 3.862 0 0 1 3.862-3.862.313.313 0 0 1 0 .626z"></path></svg>
    </span>
    <span class="piconname">
            {img}
            <span>{name}</span>
    </span>
    <time class="quoteTimeStamp chatQuote__timeStamp"><span>{time}</span></time>
</div>
<div class="quoteText">`;

export function processQuote(listUsers, content) {
    if (content !== undefined && content !== "") {
        // Get info quote
        let quoteInfo = QUOTE;

        if (content.match(AppConst.REGULAR.QUOTE_TAG)) {
            let toId = content.match(AppConst.REGULAR.QUOTE_TAG_USER_ID);

            let user = listUsers.find(function(x) {
                return x.id === parseInt(toId[0]);
            });
            if (user !== undefined) {
                let img =
                    '<img class=" _avatarHoverTip _avatarClickTip avatarClickTip avatarTiny _avatar _avatarAid2636653" src="' +
                    user.icon_img +
                    '"/>';
                quoteInfo = quoteInfo.replace(/{img}/g, img);
                quoteInfo = quoteInfo.replace(/{name}/g, user.name);
            } else {
                let img =
                    '<img class=" _avatarHoverTip _avatarClickTip avatarClickTip avatarTiny _avatar _avatarAid2636653" src="https://appdata.chatwork.com/avatar/ico_avatar_notfound.png"/>';
                quoteInfo = quoteInfo.replace(/{img}/g, img);
                quoteInfo = quoteInfo.replace(/{name}/g, "Cancelled User");
            }

            let timestamp = content.match(AppConst.REGULAR.QUOTE_TAG_TIME);
            quoteInfo = quoteInfo.replace(/{time}/g, function(matches) {
                var a = new Date(timestamp[0] * 1000);
                var year = a.getFullYear();
                var month = a.getMonth() + 1;
                var date = a.getDate();
                var hour = a.getHours();
                var min = a.getMinutes();
                var txtMonth = "";
                if (month < 10) txtMonth = "0" + month.toString();
                else txtMonth = month.toString();
                var time =
                    year + "/" + txtMonth + "/" + date + " " + hour + ":" + min;
                return time;
            });
        }

        if (content.match(AppConst.REGULAR.QUOTE_CONTENT)) {
            content = content.replace(AppConst.REGULAR.QUOTE_CONTENT, function(
                matchs
            ) {
                return (
                    quoteInfo + processQuote(listUsers, matchs) + "</div></div>"
                );
            });
        }
        return content;
    } else return content;
}
