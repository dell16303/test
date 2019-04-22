// 主要处理逻辑

var app = new Vue({
	el: '#app',
	data: {
		showpage: null,  // main-list , like-list, webview
		showmode: null, // website, like
		webViewURL : null, 
		webViewTop : '0px', 
		webViewHeight : '200px', 
	},
	methods: {
		Init: function () {
			this.showmode = 'website';
			
			let mainView = document.getElementById('tab-webview');
			let bottomView = document.getElementById('bottom-bar'); 
			this.webViewTop = mainView.offsetTop + 'px';
			this.webViewHeight = (bottomView.offsetTop -mainView.offsetTop )  + 'px';
		},
		ChangeMode: function (mode) {
			this.showmode = mode;
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
		'showmode' : function (){
			if (this.showmode == 'website'){
				this.showpage = 'main-list';
			}else if (this.showmode == 'like'){
				this.showpage = 'like-list';
			}
		}
	}
})


//添加自定义事件监听：选择一个
window.addEventListener('selectWeb',function(event){
  var info = event.detail;
});


//添加自定义事件监听
window.addEventListener('changeMode',function(event){
	var info = event.detail;
	app.ChangeMode(info.mode);
});


//添加自定义事件监听
window.addEventListener('Init',function(event){
	var info = event.detail;
	app.Init(info.mode);
});
