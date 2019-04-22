// 主要处理逻辑

var app = new Vue({
	el: '#app',
	data: {
		showpage: null,  // main-list , like-list, webview
		likemode: null, 
		readmode: false, 
		webViewURL : null, 
		webViewTop : '0px', 
		webViewHeight : '200px', 
	},
	methods: {
		Init: function () {
			this.likemode = false;
			
			let mainView = document.getElementById('tab-webview');
			let bottomView = document.getElementById('bottom-bar'); 
			this.webViewTop = mainView.offsetTop + 'px';
			this.webViewHeight = (bottomView.offsetTop -mainView.offsetTop )  + 'px';
		},
		ChangeLikeMode: function () {
			this.likemode = !this.likemode;
		},
		ChangeReadMode: function () {
			this.readmode = !this.readmode;
		},
		SelectWeb: function (webInfo) {
			this.webViewURL = webInfo.url;
			this.showpage = 'webview';
		},
		SelectLike: function (pageInfo) {
			this.webViewURL = pageInfo.url;
			this.showpage = 'webview';
		}
	},
	watch :{
		'showpage' : function(){
			let windowInfo = {
					styles: {
						top :  this.webViewTop,
						height: this.webViewHeight, 
						statusbar: {
							background: "#f7f7f7",
						}
					},
					show: {
						aniShow: "zoom-fade-out",
						duration: 300
					}
				};
			if (this.showpage == 'main-list'){
				windowInfo.url = 'main-list.html';
				windowInfo.id = 'main-list';
				mui.openWindow(windowInfo);
			}else if (this.showpage == 'like-list'){
				windowInfo.url = 'like-list.html';
				windowInfo.id = 'like-list';
				mui.openWindow(windowInfo);
			}else if (this.showpage == 'webview'){
				windowInfo.url = this.webViewURL;
				windowInfo.id = 'webview';
				mui.openWindow(windowInfo);
			} 
		} ,
		'likemode' : function (){
			if (this.likemode == false){
				this.showpage = 'main-list';
			}else if (this.likemode == true){
				this.showpage = 'like-list';
			}
		}
	},
  computed: {
    likemodeOpenStr: function () {
      return this.likemode ? '关闭' :"开启";
		},
		readmodeOpenStr: function () {
      return this.readmode ? '关闭' :"开启";
		}
  }
})


//添加自定义事件监听
window.addEventListener('Init',function(event){
	var info = event.detail;
	app.Init(info.mode);
});
