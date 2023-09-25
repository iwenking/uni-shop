<template>
	<view>
		<my-address></my-address>
		<view class="cart-title">
			<uni-icons type="shop" size="18"></uni-icons>
			<text class="cart-title-text">购物车</text>
		</view>

		<uni-swipe-action>
			<block v-for="(goods, i) in cart" :key="i">
				<uni-swipe-action-item :right-options="options" @click="swipeItemClickHandler(goods)">
					<my-goods :goods="goods" :showRadio="true" :showNum="true" @radio-change="radioChangeHandler" @num-change="numChangeHandler"></my-goods>
				</uni-swipe-action-item>
			</block>
		</uni-swipe-action>
	</view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js';
import { mapState, mapMutations } from 'vuex';
export default {
	mixins: [badgeMix],
	computed: {
		...mapState('m_cart', ['cart'])
	},
	data() {
		return {
			options: [
				{
					text: '删除',
					style: {
						backgroundColor: '#c00000'
					}
				}
			]
		};
	},
	methods: {
		...mapMutations('m_cart', ['updateGoodsState', 'updateGoodsCount','removeGoodsById']),
		radioChangeHandler(e) {
			this.updateGoodsState(e);
		},
		numChangeHandler(e) {
			this.updateGoodsCount(e);
		},
		swipeItemClickHandler(goods){
			this.removeGoodsById(goods.goods_id)
		}
	}
};
</script>

<style lang="scss">
.cart-title {
	height: 40px;
	display: flex;
	align-items: center;
	padding-left: 5px;
	border-bottom: 1px solid #efefef;
	.cart-title-text {
		font-size: 14px;
		margin-left: 10px;
	}
}
</style>
