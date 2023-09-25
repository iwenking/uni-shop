export default {
	namespaced: true,
	state: () => ({
		cart: JSON.parse(uni.getStorageSync('cart') || '[]'),

	}),
	mutations: {
		addToCart(state, goods) {
			const findResult = state.cart.find(x => x.goods_id === goods.goods_id)
			if (!findResult) {
				state.cart.push(goods)
			} else {
				findResult.goods_count++
			}
			
			this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state){
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		updateGoodsState(state,goods){
			const findResult = state.cart.find(x=>x.goods_id === goods.goods_id)
			if(findResult){
				findResult.goods_state =goods.goods_state
				this.commit('m_cart/saveToStorage')
			}
		}
	},
	getters: {
		total(state) {
			let c = 0;
			state.cart.forEach(x => c += x.goods_count)
			return c
		}
	}
}