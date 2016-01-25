/**
 * LBS PlaceHolder
 * Date: 2011-06-06
 * ============================================
 * 直接调用:
 * PlaceHolder.init() //页面所有input
 * PlaceHolder.create(input) //单个或多个input
 * ============================================
 * PlaceHolder.className 
 * 为显示占位文本input添加类名  默认placeholder
 * ============================================
 **/

;(function() {
	var PlaceHolder = {
		_support: (function() {
			return 'placeholder' in document.createElement('input');
		})(),
		className: 'placeholder',
		init: function() {
			if (!PlaceHolder._support) {
				var inputs = document.getElementsByTagName('input');
				PlaceHolder.create(inputs);
			}
		},
		create: function(inputs) {
			if (PlaceHolder._support) return;
			var input = null,
				i = 0,
				n = inputs.length,
				holds = [];
			if (!n) inputs = [inputs];
			for (; i < n; i++) holds[i] = inputs[i];
			for (i = 0; i < n; i++) {
				input = holds[i];
				if (PlaceHolder.attr(input, 'placeholder') !== '' && PlaceHolder.attr(input, 'placeholder') !== null) {
					
					// if (input.type == 'password') {
					// 	var newInput = document.createElement('input');
					// 	newInput.type = 'text';
					// 	newInput.className = input.className + ' ' + PlaceHolder.className;
					// 	newInput.value = PlaceHolder.attr(input, 'placeholder');
					// 	PlaceHolder.after(newInput, input);
					// 	input.value === '' ? input.style.display = 'none' : newInput.style.display = 'none';
					// 	PlaceHolder._newInputBind(input, newInput);
					// } else {
					// 	if (input.value === '') PlaceHolder._setValue(input);
					// 	PlaceHolder._inputBind(input);
					// }

					var newInput = document.createElement('input');
						newInput.type = 'text';
						newInput.className = input.className + ' ' + PlaceHolder.className;
						newInput.style.cssText = input.style.cssText;
						newInput.value = PlaceHolder.attr(input, 'placeholder');
						PlaceHolder.after(newInput, input);
						input.value === '' ? input.style.display = 'none' : newInput.style.display = 'none';
						PlaceHolder._newInputBind(input, newInput);
				}
			}
		},
		_newInputBind: function(input, newInput) {
			if (PlaceHolder.attr(input, 'id') != '') {
				var labels = document.getElementsByTagName('label'),
					i = 0,
					len = labels.length;
				for (; i < len; i++) {
					if (labels[i].htmlFor === input.id) {
						labels[i].onclick = function() {
							newInput.style.display = 'none';
							input.style.display = '';
						}
					}
				}
			}
			PlaceHolder.on(newInput, 'focus', function() {
				newInput.style.display = 'none';
				input.style.display = '';
				input.focus();
			});
			PlaceHolder.on(input, 'focus', function() {
				newInput.style.display = 'none';
				input.style.display = '';
				input.select();
			});
			PlaceHolder.on(input, 'blur', function() {
				if (input.value === '') {
					newInput.style.display = '';
					input.style.display = 'none';
				}
			});
		},
		_inputBind: function(input) {
			PlaceHolder.on(input, 'focus', function() {
				if (input.value === PlaceHolder.attr(input, 'placeholder')) {
					input.value = '';
					PlaceHolder.removeClass(input, PlaceHolder.className);
					input.select();
				}
			});
			PlaceHolder.on(input, 'blur', function() {
				if (input.value === '') PlaceHolder._setValue(input);
			});
		},
		_setValue: function(input) {
			input.value = PlaceHolder.attr(input, 'placeholder');
			PlaceHolder.addClass(input, PlaceHolder.className);
		},
		on: function(el, type, fn) {
			if (el.addEventListener) el.addEventListener(type, fn, false);
			else el.attachEvent('on' + type, function() {
				return fn.call(el, event)
			});
		},
		hasClass: function(o, c) {
			return -1 < (' ' + o.className + ' ').indexOf(' ' + c + ' ');
		},
		addClass: function(o, c) {
			if (!PlaceHolder.hasClass(o, c)) o.className += ' ' + c;
		},
		removeClass: function(o, c) {
			if (PlaceHolder.hasClass(o, c)) {
				var reg = new RegExp('(\\s|^)' + c + '(\\s|$)');
				o.className = o.className.replace(reg, '');
			}
		},
		attr: function(o, v) {
			return o.v || o.getAttribute(v);
		},
		after: function(n, o) {
			var parent = o.parentNode;
			parent.lastChild == o ? parent.appendChild(n) : parent.insertBefore(n, o.nextSibling);
		}
	};
	window.PlaceHolder === undefined && (window.PlaceHolder = PlaceHolder);
}());