<template>
    <div>
        <div>
            <div id="app">
                <!-- default props -->
                <vue-slider
                    ref="slider"
                    v-model="value"
                    v-bind="options"
                ></vue-slider>
                <h1>{{ value+1 }} Tháng</h1>
                <div class="text-center"><img :src="img[value]"></div>
            </div>
        </div>
    </div>
</template>


<script>

    import VueSlider from 'vue-slider-component'
    import 'vue-slider-component/theme/antd.css'

    export default {
        name: "Timeline",
        created(){
            this.options.max = this.img.length-1;
        },
        data() {
            return {
                value: 0,
                img:[
                    '/static/images/img/29178202_10155611160481902_2368052290280387080_n.jpg',
                    '/static/images/img/29196266_10155611161466902_574032068915669988_n.jpg',
                    '/static/images/img/29177523_10155611160486902_6519226545273092314_n.jpg',
                    '/static/images/img/29196737_10155611160471902_7081364125781004355_n.jpg',
                    '/static/images/img/29177019_10155611160641902_935063838919572588_n.jpg',
                    '/static/images/img/29196289_10155611160651902_3629857836251233956_n.jpg',
                    '/static/images/img/29196557_10155611160706902_7629439334441929721_n.jpg',
                    '/static/images/img/29176985_10155611160711902_811311055990218995_n.jpg',
                    '/static/images/img/29177894_10155611160881902_2946957827822416717_n.jpg',
                    '/static/images/img/29177698_10155611160906902_1258187698948010653_n.jpg',
                    '/static/images/img/29177599_10155611160911902_4927501661612278532_n.jpg',
                    '/static/images/img/29178070_10155611160946902_7177002178044769855_n.jpg',
                    '/static/images/img/29244024_10155611161446902_7895190556646910954_n.jpg',
                    '/static/images/img/29243808_10155611161451902_7048967493411382551_n.jpg',
                    '/static/images/img/29177080_10155611161171902_6544364966686044178_n.jpg',
                    '/static/images/img/29216015_10155611161191902_5566701641418688077_n.jpg',
                    '/static/images/img/29196850_10155611161201902_4734761441512302656_n.jpg',
                    '/static/images/img/29196723_10155611160466902_2367751412786812638_n.jpg',
                    '/static/images/img/29216356_10155611161601902_3409971212884940848_n.jpg',
                    '/static/images/img/29197287_10155611161186902_2229437532014324187_n.jpg',
                    '/static/images/img/29197142_10155611161441902_345528604634560122_n.jpg',
                    '/static/images/img/29249884_10155611161576902_4399600430744941342_n.jpg',
                    '/static/images/img/29511181_10155642164611902_6571883908209231511_n.jpg',
                    '/static/images/img/31404134_10155725392666902_734570222083291069_n.jpg',
                    '/static/images/img/34863353_10155818459196902_2917644736703496192_n.jpg',
                    '/static/images/img/36857618_10155886777091902_8813680238975254528_n.jpg',
                    '/static/images/img/39509064_10155983817766902_6651857864132395008_n.jpg',
                    '/static/images/img/41501599_10156035091471902_7635314403214098432_n.jpg',
                    '/static/images/img/43577701_10156101499981902_1557775382604677120_n.jpg',
                    '/static/images/img/46886724_10156208214386902_3635059830261022720_n.jpg',
                    '/static/images/img/48385299_10156259432421902_6997931343703179264_n.jpg',
                    '/static/images/img/50436426_10156324043516902_7126898229370683392_n.jpg',
                    '/static/images/img/56293820_10156491327831902_7495445314296348672_n.jpg',
                    '/static/images/img/55922083_10156491327826902_6352558919172227072_n.jpg',
                    '/static/images/img/56490478_10156491327851902_7406628568890867712_n.jpg',
                    '/static/images/img/66253625_10156716912251902_5148229890142633984_n.jpg',
                    '/static/images/img/66066144_10156716912211902_1634331357884710912_n.jpg',
                    '/static/images/img/66416070_10156716912231902_1982638224744382464_n.jpg',
                    '/static/images/img/68695953_10156819417816902_784687754725294080_n.jpg',
                    '/static/images/img/72323909_10156943978951902_5236961096979447808_n.jpg',
                    '/static/images/img/71833807_10156943985231902_5436271734409920512_n.jpg',
                    '/static/images/img/79239682_10157113846146902_365998730505093120_n.jpg',

                ],
                options: {
                    dotSize: 14,
                    width: 'auto',
                    height: 4,
                    contained: false,
                    direction: 'ltr',
                    data: null,
                    min: 0,
                    max: 100,
                    interval: 1,
                    disabled: false,
                    clickable: true,
                    duration: 0.5,
                    adsorb: false,
                    lazy: false,
                    tooltip: 'focus',
                    tooltipPlacement: 'top',
                    tooltipFormatter: void 0,
                    useKeyboard: false,
                    enableCross: true,
                    fixed: false,
                    minRange: void 0,
                    maxRange: void 0,
                    order: true,
                    marks: false,
                    dotOptions: void 0,
                    process: true,
                    dotStyle: void 0,
                    railStyle: void 0,
                    processStyle: void 0,
                    tooltipStyle: void 0,
                    stepStyle: void 0,
                    stepActiveStyle: void 0,
                    labelStyle: void 0,
                    labelActiveStyle: void 0,
                }
            }
        },
        components: {
            'VueSlider': VueSlider
        }

    };
</script>

<style>

</style>
