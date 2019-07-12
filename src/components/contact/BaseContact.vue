<template>
	<div id="base-contact">
		<div>
			Contacts
		</div>
		<div class="base-contact-content">
			<div>
			    <span @click="selectedInvite">Invite by Email</span>
			    <span @click="selectedSearch">User search</span>
			</div>
			<div>
				<keep-alive>
					<component :is="selectedComponent"></component>
				</keep-alive>
			</div>
		</div>
	</div>
</template>

<script>
// import axios from 'axios'
import Invite from './Invite.vue'
import Search from './Search.vue'
export default {
	name: "BaseContact",
	components: {Invite,Search},
	mixins: [],
	props: {
	},
	data () {
		return {
            selectedComponent: ''
		}
	},
	computed: {
	},
	watch: {
	},
	created () {},
	mounted () {},
	methods: {
        selectedInvite () {
            this.selectedComponent =  Invite
		},
        selectedSearch () {
            this.selectedComponent =  Search
        }
	}
}
</script>

<style scoped>

</style>
