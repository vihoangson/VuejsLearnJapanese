<script>
export default {
    name: 'DynamicType',
    props: {
        string: {
            required: true,
            type: String
        }
    },
    render(h) {
        const render = {
            template: '<pre>' + this.string + '</pre>',
            methods: {
                test() {
                    alert('OK');
                }
            }
        };
        return h(render);
    }
};
</script>

<style scoped>
.reply-message {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    height: 18px;
    background-color: #66a300;
    border-radius: 2px 0 0 2px;
    padding: 2px 4px 2px 3px;
    cursor: pointer;
}
.reply-message:hover {
    background-color: #598f00;
}
.reply-message-icon {
    width: 12px;
    height: 16px;
    fill: #ffffff;
    margin-right: 3px;
}
svg:not(:root) {
    overflow: hidden;
    margin-top: -5px;
}
.reply-message-txticon {
    color: #ffffff;
    font-weight: 750;
    font-size: 12px;
}
.to-message {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    height: 18px;
    background-color: #66a300;
    border-radius: 2px 0 0 2px;
    padding: 4px 4px 2px 3px;
    cursor: pointer;
}
.to-message:hover {
    background-color: #598f00;
}
.to-message-icon {
    width: 12px;
    height: 16px;
    fill: #ffffff;
    margin-right: 3px;
}
svg:not(:root) {
    overflow: hidden;
}
.to-message-txticon {
    color: #ffffff;
    font-weight: 750;
    font-size: 12px;
}
</style>
