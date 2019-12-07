# webclient

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## Template code
```javascript
this.$root.$emit('push-notice', {message:'Upload successfully', alert: 'alert-success'});

this.$root.$emit('push-notice', {message:'Upload Fail', alert: 'alert-danger'});

this.$store.dispatch('setLoadingPage',true);
this.$store.dispatch('setLoadingPage',false);
```
```javascript
Toast message
this.$bvToast.toast('up', {
    title: 'Notice',
    autoHideDelay: AppConst.timeAutoHideDelay,
    toaster: 'b-toaster-bottom-right',
    appendToast: true
});
this.$bvToast.toast('up', {
    title: 'Notice',
    autoHideDelay: 1000,
    toaster: 'b-toaster-bottom-right',
    appendToast: true
});
```
```javascript
Modal 
this.$bvModal.msgBoxConfirm('Are you sure?',{
    title: 'Please Confirm',
    size: 'sm',
    buttonSize: 'sm',
    okVariant: 'danger',
    okTitle: 'YES',
    cancelTitle: 'NO',
    footerClass: 'p-2',
    hideHeaderClose: false,
    centered: true
}).then(e=>{
    if(e === true){
        // Do st true
    }else{
        // Do st false
    }
})

//Listening to modal changes via $root events

this.$root.$on('bv::modal::show', (bvEvent, modalId) => {
  console.log('Modal is about to be shown', bvEvent, modalId)
})
this.$root.$on('bv::modal::hide', (bvEvent, modalId) => {
  console.log('Modal is about to be hide', bvEvent, modalId)
})
```

