const QUOTE = `<div class="dev_quote chatQuote">
    <div class="chatQuote__title">
    <span class="icon-quote"> <svg viewBox="0 0 10 10" id="icon_quote" xmlns="http://www.w3.org/2000/svg"><path d="M3.863 2.5a2.388 2.388 0 0 0-2.388 2.387c0 .191.031.372.076.549a1.476 1.476 0 1 1 .837 2.69l-.297-.03a2.38 2.38 0 0 1-2.09-2.358 3.862 3.862 0 0 1 3.862-3.862.313.313 0 0 1 0 .626zm5.825 0a2.387 2.387 0 0 0-2.387 2.387c0 .191.031.372.075.549a1.476 1.476 0 1 1 .837 2.69l-.298-.03a2.38 2.38 0 0 1-2.09-2.358 3.862 3.862 0 0 1 3.862-3.862.313.313 0 0 1 0 .626z"></path></svg></span>
        <span class="piconname">
            <img class=" _avatarHoverTip _avatarClickTip avatarClickTip avatarTiny _avatar _avatarAid3127618" data-aid="3127618" src="https://appdata.chatwork.com/avatar/3484/3484555.gif" data-cwtag="[picon:3127618]">
            <span>Hoang Sy Hung [PG]</span>
        </span>
        <time class="quoteTimeStamp chatQuote__timeStamp"><span data-cwtag="[date:1566463714]">22/8/2019 15:48</span></time>
    </div>
    <div class="quoteText">`;
const regExpQuote = /(?<=\[quote\])(.|\n)*?(?=\[\/quote\])/g;
export function processQuote(content) {
    if (content.match(regExpQuote)) {
        content = content.replace(regExpQuote, function(matchs) {
            return QUOTE + processQuote(matchs) + '</div></div>';
        });
    }
    return content;
}
