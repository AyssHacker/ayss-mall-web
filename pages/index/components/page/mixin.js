export default {
	data(){
		return {
			
		}
	},
	method: {
		onLink(linkObj){
			if(!linkObj) return false
			// 跳转到指定的页面 type=='PAGE'
			if(linkObj.type === 'PAGE'){
			  this.$navTo(linkObj.params.path, linkObj.params.query)	
			}
			return true
		}
	}
}