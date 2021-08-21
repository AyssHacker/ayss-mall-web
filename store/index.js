import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters.js'
import {
	app,
	user
} from './modules/index.js'

Vue.use(Vuex)

export default new Vuex.Store({
	modules: {
		app,
		user
	},
	state: {
		
	},
	mutations: {
		
	},
	actions: {
		
	},
	getters
})