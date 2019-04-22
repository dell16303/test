// 初始化相关，与实际功能无关

mui('.mui-content').scroll();
mui('#offCanvasContentScroll').scroll();

mui.init({
	swipeBack:true ,//启用右滑关闭功能
	//preloadPages:[{
	//	id:'like-list',
	//	url:'like-list.html'           
	//},{
	//	id:'main-list',
	//	url:'main-list.html'
	//}
  //]
});

mui.plusReady(function() {
	
	mui.fire(plus.webview.currentWebview(), 'Init',null);
});