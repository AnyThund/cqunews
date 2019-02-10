/*
    必应的官方api有跨域问题, 直接引用不了, 所以先通过jsonp.afeld进行代理获取图片的url
 */
// let url = 'http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1';
// https://bing.ioliu.cn/v1?d=0 这个似乎直接就能用
let url = 'https://jsonp.afeld.me/?url=https%3A%2F%2Fcn.bing.com%2FHPImageArchive.aspx%3Fformat%3Djs%26idx%3D0%26n%3D1';
/* 利用ajax获取url */
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
    bodyBackground.style.backgroundAttachment = 'fixed';
}
getWallpaper(url);

/* 定义vue控件, 实现向前或向后切换每日一图的背景 */
var vCon = new Vue({
    el: '#container',
    data: {
		now_pic: 0,
		pic_info: null,
    },
    methods: {
        showPrePic: function() { // 前一天的图片, 最多可查看前六天
			console.log(this.now_pic);
			if(this.now_pic<6){
				let i = ++this.now_pic;
				let url = 'https://jsonp.afeld.me/?url=https%3A%2F%2Fcn.bing.com%2FHPImageArchive.aspx%3Fformat%3Djs%26idx%3D'+i+'%26n%3D1';
				getWallpaper(url);
			}else{
				this.now_pic = 6;
			}
        },
        showNextPic: function() { // 后一天的图片, 最多可查看后一天
			console.log(this.now_pic);
			if(this.now_pic>-1){
				let i = --this.now_pic;
				let url = 'https://jsonp.afeld.me/?url=https%3A%2F%2Fcn.bing.com%2FHPImageArchive.aspx%3Fformat%3Djs%26idx%3D'+i+'%26n%3D1';
				getWallpaper(url);
			}else{
				this.now_pic = -1;
			}
        }
    }
});

var vWeather = new Vue({
    el: '#weather',
    data: {
        city: "",
        weather_info: {},
        weathers: new Array(),
    },
    methods: {
        getWeather: function(){
            let url_weather = 'https://www.apiopen.top/weatherApi?city=';
            let city = document.getElementById('city');
            vWeather.city = city.value;
            let newURL = url_weather + city.value;
            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4){
                    if(xhr.status === 200){
                        vWeather.weather_info = JSON.parse(xhr.responseText);
                        vWeather.weathers = vWeather.weather_info.data.forecast;
                        vWeather.weathers.unshift(vWeather.weather_info.data.yesterday);
                        return true;
                    }else{
                        alert("失败!");
                    }
                }
            }
            xhr.open('GET', newURL);
            xhr.send()
        }
    }
});

var fullheight = $(window).height();
var dis;

$("#container").height(fullheight);
$("#weather").height(fullheight);

$(window).mousewheel(function(event){
    var wst = $(this).scrollTop();
    console.log(wst);
    if(wst==0&&event.deltaY<0){
        dis = fullheight;
        click_scroll(dis);
    }
    if(wst==fullheight&&event.deltaY>0){
        dis = 0;
        click_scroll(dis);
    }
});

function click_scroll(dis){
    $("html,body").animate({
        scrollTop: dis
    }, 500);
}
