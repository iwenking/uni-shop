<template>
	<view>
		<my-search @click="gotoSearch"></my-search>
		<view class="scrool-view-container">
			<!-- 左侧的滑动区域 -->
			<scroll-view class="left-scrool-view" scroll-y="true" :style="{ height: wh + 'px' }">
				<block v-for="(item, index) in cateList" :key="index">
					<view :class="['left-scroll-view-item', index === active ? 'active' : '']" @click="activeChanged(index)">{{ item.cat_name }}</view>
				</block>
			</scroll-view>
			<!-- 右侧的滑动区域 -->
			<scroll-view class="right-scrool-view" scroll-y="true" :style="{ height: wh + 'px' }" :scroll-top="scrollTop">
				<view class="cate-lv2" v-for="(idx, i) in cateLevel2" :key="i">
					<!-- 二级分类的标题 -->
					<view class="cate-lv2-title">/{{ idx.cat_name }}/</view>
					<!-- 当前二级分类下的三级分类列表 -->
					<view class="cate-lv3-list">
						<view class="cate-lv3-item" v-for="(item3, i3) in idx.children" :key="i3" @click="gotoGoodsList(item3)">
							<image :src="item3.cat_icon"></image>
							<text>{{ item3.cat_name }}</text>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			wh: 0,
			cateList: [],
			active: 0,
			cateLevel2: [],
			scrollTop: 0
		};
	},
	onLoad() {
		const sysInfo = uni.getSystemInfoSync(); //获取当前设备的信息
		this.wh = sysInfo.windowHeight - 50;
		this.getCateList();
	},
	methods: {
		async getCateList() {
			const { data: res } = await uni.$http.get('/api/public/v1/categories');
			if (res.meta.status !== 200) {
				return uni.$showMsg();
			}
			this.cateList = res.message;
			this.cateLevel2 = res.message[0].children;
		},
		activeChanged(index) {
			this.active = index;
			this.cateLevel2 = this.cateList[index].children;
			this.scrollTop = this.scrollTop === 0 ? 1 : 0;
		},
		gotoGoodsList(item) {
			uni.navigateTo({
				url: '/subpkg/goods_list/goods_list?cid=' + item.cat_id
			});
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
.scrool-view-container {
	display: flex;
	.left-scrool-view {
		width: 120px;
		.left-scroll-view-item {
			background-color: #f7f7f7;
			line-height: 60px;
			text-align: center;
			font-size: 12px;
			&.active {
				background-color: #ffffff;
				position: relative;
				&:before {
					content: ' ';
					display: block;
					width: 3px;
					height: 30px;
					background-color: #c00000;
					position: absolute;
					top: 50%;
					left: 0;
					transform: translateY(-50%);
				}
			}
		}
	}
}
.cate-lv2-title {
	font-size: 12px;
	font-weight: bold;
	text-align: center;
	padding: 15px 0;
}
.cate-lv3-list {
	display: flex;
	flex-wrap: wrap;
	.cate-lv3-item {
		width: 33.33%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-bottom: 10px;
		image {
			width: 60px;
			height: 60px;
		}
		text {
			font-size: 12px;
		}
	}
}
</style>