import { isFunction } from 'lodash';

export default {
    props: {
        isModal: Boolean,
        isHotKey: Boolean
    },
    methods: {
        // confirmUnsaved(beforeDialogShow) {},
        // confirmDialog(props, yesCallback, noCallback) {},
        showPageInModal(pageComponent, events) {
            this.$modal.show(
                pageComponent,
                {},
                {
                    // Modal properties - https://github.com/euvl/vue-js-modal#properties
                    name: pageComponent.name,
                    height: 'auto',
                    width: '70%',
                    scrollable: true,
                    clickToClose: false
                },
                {
                    // Modal events: before-open, opened, before-close, closed
                    // 'before-open': event => {
                    //     if (isFunction(beforeOpen)) {
                    //         beforeOpen();
                    //     }
                    // },
                    open: event => {
                        if (typeof events !== 'undefined') {
                            if (isFunction(events['open'])) {
                                events['open'](event);
                            }
                        }
                    }
                    // 'before-close': event => {},
                    // closed: event => {
                    //     console.log(event);
                    // }
                }
            );
        }
    }
};
