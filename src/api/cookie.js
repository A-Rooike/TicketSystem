//设置cookie,增加到vue实例方便全局调用
 
export  function setCookie (c_name, value, expiredays) {
 
  var exdate = new Date();

  exdate.setDate(exdate.getDate() + expiredays);

  document.cookie = c_name + "=" + value + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());

};

export   function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (arr = document.cookie.match(reg)){
   		return (arr[2]);
  	}else{
		return false
	}
 }
 export function delCookie (name) {
	var exp = new Date();
	exp.setTime(exp.getTime() - 1);
	var cval = getCookie(name);
	if (cval){
	 	document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
	}
};