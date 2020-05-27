import Vue from 'vue'
import VueRouter from 'vue-router'
import Playsong from '../components/Song.vue';
Vue.use(VueRouter);
const router = new VueRouter({
	mode: "hash",
	routes: [{
		path: '/',
		redirect: '/playsong/1'
	}, {
		path: '/playsong/:id',
		name: 'playsong',
		component: Playsong
	}]
});
export default router;
