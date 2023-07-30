<template>
	<view>
		<view class="search-box">
			<my-search @click="gotoSearch"></my-search>
		</view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item, index) in swiperList" :key="index">
				<navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id">
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>
		<view class="nav-list">
			<view class="nav-item" v-for="(item, index) in navList" :key="index" @click="navClickHandler(item)">
				<image class="nav-img" :src="item.image_src"></image>
			</view>
		</view>
		<view class="floor-list">
			<view class="floor-item" v-for="(item, index) in floorList" :key="index">
				<image class="floor-title" :src="item.floor_title.image_src"></image>
				<view class="floor-img-box">
					<navigator class="left-img-box" :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" :style="{ width: item.product_list[0].image_width + 'rpx' }" mode="widthFix"></image>
					</navigator>
					<view class="right-img-box">
						<navigator class="right-img-item" v-for="(idx, i) in item.product_list" :key="i" v-if="i !== 0" :url="idx.url">
							<image :src="idx.image_src" :style="{ width: idx.image_width + 'rpx' }" mode="widthFix"></image>
						</navigator>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js';
export default {
	mixins: [badgeMix],
	data() {
		return {
			swiperList: [],
			navList: [],
			floorList: []
		};
	},
	onLoad() {
		this.getSwiperList();
		this.getNavList();
		this.getFloorList();
	},
	methods: {
		async getSwiperList() {
			const { data: res } = await uni.$http.get('/api/public/v1/home/swiperdata');
			if (res.meta.status !== 200) {
				return uni.$showMsg();
			}
			this.swiperList = res.message;
		},
		async getNavList() {
			const { data: res } = await uni.$http.get('/api/public/v1/home/catitems');
			if (res.meta.status !== 200) {
				return uni.$showMsg();
			}
			this.navList = res.message;
		},
		navClickHandler(item) {
			if (item.name === '分类') {
				uni.switchTab({
					url: '/pages/cate/cate'
				});
			}
		},
		async getFloorList() {
			const { data: res } = await uni.$http.get('/api/public/v1/home/floordata');
			if (res.meta.status !== 200) {
				return uni.$showMsg();
			}
			res.message.forEach((floor) => {
				floor.product_list.forEach((prod) => {
					prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1];
				});
			});
			this.floorList = res.message;
		},
		gotoSearch() {
			uni.navigateTo({
				url: '/subpkg/search/search'
			});
		}
	}
};
</script>

<style lang="scss">
swiper {
	height: 330rpx;
	.swiper-item,
	image {
		width: 100%;
		height: 100%;
	}
}
.nav-list {
	display: flex;
	justify-content: space-around;
	margin: 15px 0;
	.nav-img {
		width: 128rpx;
		height: 140rpx;
	}
}
.floor-img-box {
	display: flex;
	padding-left: 10rpx;
}
.floor-title {
	width: 100%;
	height: 60rpx;
}
.right-img-box {
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}
.search-box {
	position: sticky;
	top: 0;
	z-index: 999;
}
</style>
