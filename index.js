/**
 * =================================================
 * toast
 * Created by zhouck on 2016/04/07
 * =================================================
 */
;
(function(undefined) {
	"use strict"

	var _global;
	/*工具函数 -start*/
	// 对象合并
	function extend(o, n, override) {
		for(var key in n) {
			if(n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)) {
				o[key] = n[key];
			}
		}
		return o;
	}
	/*工具函数 -end*/
	
	// 插件构造函数 - 返回数组结构
	function MyToast(opt) {
		this._initial(opt);
	}
	MyToast.prototype = {
		constructor: this,
		_initial: function(opt) {
			// 默认参数
			var def = {
				message: '',
				time: 1500
			};
			//配置参数
			this.def = extend(def, opt, true);
		},
		show: function() {
			// toast停留时间
			var time = this.def.time;
			var el = document.createElement("div");
			el.setAttribute("class", "z-toast");
			el.innerHTML = this.def.message;
			document.body.appendChild(el);
			el.classList.add("fadeIn");
			setTimeout(function() {
				el.classList.remove("fadeIn");
				el.classList.add("fadeOut");
				// 监听动画结束，移除toast
				el.addEventListener("animationend", function() {
					document.body.removeChild(el);
				});
				el.addEventListener("webkitAnimationEnd", function() {
					document.body.removeChild(el);
				});

			}, time);
		},

	}

	// 最后将插件对象暴露给全局对象
	_global = (function() {
		return this || (0, eval)('this');
	}());
	if(typeof module !== "undefined" && module.exports) {
		module.exports = MyToast;
	} else if(typeof define === "function" && define.amd) {
		define(function() {
			return MyToast;
		});
	} else {
		!('MyToast' in _global) && (_global.MyToast = MyToast);
	}
}());
