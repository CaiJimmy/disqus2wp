import Vue from 'vue'
import App from './App'

import {
	MdButton,
	MdCard,
	MdCheckbox,
	MdField,
	MdList,
	MdSwitch,
	MdSubheader,
	MdDivider
} from 'vue-material/dist/components'
import 'vue-material/dist/vue-material.min.css'

Vue.use(MdButton)
Vue.use(MdCard)
Vue.use(MdField)
Vue.use(MdCheckbox)
Vue.use(MdList)
Vue.use(MdSwitch)
Vue.use(MdSubheader)
Vue.use(MdDivider)

Vue.config.productionTip = false;

new Vue({
	el: '#app',
	components: {
		App
	},
	template: '<App/>'
})
