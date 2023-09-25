<template>
	<view>
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>
		<block v-for="(goods,i) in cart" :key="i">
			<my-goods :goods='goods' :showRadio='true' :showNum ='true' @radio-change='radioChangeHandler' @num-change='numChangeHandler'></my-goods>
		</block>
	</view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js';
import {mapState,mapMutations} from "vuex"
export default {
	mixins:[badgeMix],
	computed:{
		...mapState('m_cart',['cart'])
	},
	data() {
		return {};
	},
	methods:{
		...mapMutations('m_cart',['updateGoodsState']),
		radioChangeHandler(e){
			this.updateGoodsState(e)
		},
		numChangeHandler(e){
			console.log(e);
		}
	}
};
</script>

<style lang="scss">
	.cart-title{
		height: 40px;
		display: flex;
		align-items: center;
		padding-left: 5px;
		border-bottom:1px solid #efefef ;
		.cart-title-text{
			font-size: 14px;
			margin-left: 10px;
		}
	}
</style>
