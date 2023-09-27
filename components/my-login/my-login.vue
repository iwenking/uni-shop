<template>
	<view class="login-container">
		<uni-icons type="contact-filled" size="100" color='#afafaf'></uni-icons>
		<button type="primary" class="btn-login" open-type='getUserInfo' @getuserinfo='getUserInfo'>一键登录</button>
		<text class="tips-text">登录后尽享更多权益</text>
	</view>
</template>

<script>
	import {mapMutations} from "vuex"
	export default {
		name:"my-login",
		data() {
			return {
				
			};
		},
		methods:{
			...mapMutations('m_user',['updateUserInfo','updateToken']),
			getUserInfo(e){
				// console.log(e);
				if(e.detail.errMsg !=='getUserInfo:ok') return uni.$showMsg("您取消了登录授权!")
				this.updateUserInfo(e.detail)
				this.getToken(e.detail)
			},
			async getToken(info){
				const res = await uni.login().catch(err=>err)
				if (res.errMsg !== 'login:ok') return nui.$showError("登录失败!")
				
				const query = {
					code:res.code,
					encryptedData:info.encryptedData,
					iv:info.iv,
					rawData:info.rawData,
					signature:info.signature,
				}
				const {data:loginResult} = await uni.$http.post("/api/public/v1/users/wxlogin",query)
				this.updateToken(loginResult.meta.msg)
				if(loginResult.meta.status !== 200) return uni.$showMsg("登录失败!")
				// uni.$showMsg("登录成功!")
			}
		}
	}
</script>

<style lang="scss">
.login-container{
	height: 750rpx;
	background-color: #f8f8f8f8;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	position: relative;
	overflow: hidden;
	&::after{
		content: " ";
		display: block;
		width: 100%;
		height: 40px;
		background-color: white;
		position: absolute;
		bottom: 0;
		left: 0;
		border-radius: 100%;
		transform: translateY(50%);
	}
	.btn-login{
		width: 90%;
		border-radius: 100px;
		margin: 15px 0;
		background-color: #c00000;
	}
	.tips-text{
		font-size: 12px;
		color: gray;
	}
}
</style>