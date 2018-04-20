<template>
<div>
<i class="del_icon" @click="delAlert"></i>
 	<div class="alert_box">
			<div class="container">
				<h3>
					活动说明
				</h3>
				<p>
					即日起用通过邀请奖励页面邀请好友成为叮叮快修注册用户，每邀请一位好友成功注册，
					您将获得叮叮快修积分奖励100分，邀请越多，奖励越多。
				</p>
				<p>
					受邀好友成功注册同时也能获取积分奖励（1000分）；
				</p>
				<p>受邀用户必须为叮叮快修首次注册用户；</p>
				<p>
					如果发现任何违规套取奖励行为，视情节严重程度进行判罚：不予发放奖励、封停推荐有奖功能、冻结所有通过推荐有奖渠道获得的奖励、
					依法追究法律责任；
				</p>
				<h3>
					积分使用说明
				</h3>
				<p>积分仅限于用户叮叮快修下单抵扣现金使用，
				100积分抵用1元</p>
				<p>积分不可用于转增、兑现、交换商品等；</p>
				<p>积分使用使用有效期为一年，期限年满一年将自动清除；</p>
			</div>
    </div>
</div>

</template>
<script>
    export default {
    	props:["data"],
        data() {
            return {

            }
        },
        methods: {
        	delAlert(){
//            		this.data.isShow=false;
            	}
        },
        created() {

        }
    }
</script>
<style scoped lang="less">
.alert_box{
	overflow:hidden;
	background:red;
	width:692/50rem;
	height:1123/50rem;
	margin:0 auto;
	margin-top:75/50rem;
	background:url(../../../static/images/alert_box2.png) center no-repeat;
	background-size:100% 100%;
	>.container{
		color:#fff;
		font-family:PingFangSC-Regular ;
		width:100%;
		padding:0 1.7rem;
		margin-top:3.8rem;
		>h3{
		font-size:34/50rem;
		}
		>h3:last-of-type{
			margin-top: 1.2rem;
			margin-bottom:.4rem;
		}
		>p{
			margin: .2rem 0;
			color:#fff;
			line-height: 1.6em;
			font-size:24/50rem;
			font-family:PingFangSC-Regular ;
		}
	}
}
.del_icon{
	width:51/50rem;
	height:51/50rem;
	background:url(../../../static/images/del5.png) center no-repeat;
	background-size:100% 100%;
	position:absolute;
	right:.9rem;
	top:1.8rem;
}
</style>


