// let url = 'http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1';
let url = 'https://jsonp.afeld.me/?url=https%3A%2F%2Fcn.bing.com%2FHPImageArchive.aspx%3Fformat%3Djs%26idx%3D0%26n%3D1';
function getWallpaper(url){
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function(){
        if(xhr.readyState === 4){
    	    if(xhr.status === 200){
                return wallpaper(xhr.responseText);
            }else{
                alert('失败！');
            }
        }
    }
    xhr.open('GET', url);
    xhr.send();
}
function wallpaper(data){
    let bodyBackground = document.getElementsByTagName("body")[0];
    let info = JSON.parse(data);
	let bg_url = "http://s.cn.bing.net" + info.images[0].url;
	vCon.pic_info = info.images[0].copyright;
    bodyBackground.style.backgroundImage = 'url('+ bg_url + ')';
    bodyBackground.style.backgroundRepeat = 'no-repeat';
    bodyBackground.style.backgroundPosition = 'center';
    bodyBackground.style.backgroundSize = 'cover';
}
getWallpaper(url);

var vCon = new Vue({
    el: '#container',
    data: {
		now_pic: 0,
		pic_info: null,
    },
    methods: {
        showPrePic: function(){
			console.log(this.now_pic);
			if(this.now_pic<6){
				let i = ++this.now_pic;
				let url = 'https://jsonp.afeld.me/?url=https%3A%2F%2Fcn.bing.com%2FHPImageArchive.aspx%3Fformat%3Djs%26idx%3D'+i+'%26n%3D1';
				getWallpaper(url);
			}else{
				this.now_pic = 6;
			}
        },
        showNextPic: function(){
			console.log(this.now_pic);
			if(this.now_pic>-6){
				let i = --this.now_pic;
				let url = 'https://jsonp.afeld.me/?url=https%3A%2F%2Fcn.bing.com%2FHPImageArchive.aspx%3Fformat%3Djs%26idx%3D'+i+'%26n%3D1';
				getWallpaper(url);
			}else{
				this.now_pic = -6;
			}
        }
    }
});
