/**
 * Smokescreen v0.1.2 - Chris Smoak <chris.smoak@gmail.com>
 * A Flash player written in JavaScript.
 *
 * Copyright 2010, RevShock
 *
 * Date: 2010-05-27
 */
var Smokescreen = function (url, element, width, height, name, params) {
	goog = {};
	goog.global = this;
	goog.provide = function (a) {
		a = a.split(".");
		var b = goog.global;
		for (var c in a) {
			var d = a[c];
			d in b || (b[d] = {});
			b = b[d]
		}
	};
	goog.require = function () {};
	var fljs = {},
		BrowserDetect = {
			init: function () {
				this.browser = this.searchString(this.dataBrowser) || "An unknown browser";
				this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "an unknown version";
				this.OS = this.searchString(this.dataOS) || "an unknown OS"
			},
			searchString: function (a) {
				for (var b = 0; b < a.length; b++) {
					var c = a[b].string,
						d = a[b].prop;
					this.versionSearchString = a[b].versionSearch || a[b].identity;
					if (c) {
						if (c.indexOf(a[b].subString) != -1) return a[b].identity
					} else if (d) return a[b].identity
				}
			},
			searchVersion: function (a) {
				var b = a.indexOf(this.versionSearchString);
				if (b != -1) return parseFloat(a.substring(b + this.versionSearchString.length + 1))
			},
			dataBrowser: [{
				string: navigator.userAgent,
				subString: "Chrome",
				identity: "Chrome"
			},
			{
				string: navigator.vendor,
				subString: "Apple",
				identity: "Safari",
				versionSearch: "Version"
			},
			{
				prop: window.opera,
				identity: "Opera"
			},
			{
				string: navigator.userAgent,
				subString: "Firefox",
				identity: "Firefox"
			},
			{
				string: navigator.userAgent,
				subString: "MSIE",
				identity: "Explorer",
				versionSearch: "MSIE"
			}],
			dataOS: [{
				string: navigator.platform,
				subString: "Win",
				identity: "Windows"
			},
			{
				string: navigator.userAgent,
				subString: "iPad",
				identity: "iPad"
			},
			{
				string: navigator.userAgent,
				subString: "iPhone",
				identity: "iPhone"
			},
			{
				string: navigator.platform,
				subString: "Mac",
				identity: "Mac"
			}]
		};
	BrowserDetect.init();
	fljs.agent = BrowserDetect;
	fljs.addConstants = function (a, b) {
		for (var c in b) a[c] = b[c]
	};
	fljs.addMethods = function (a, b) {
		for (var c in b) a.prototype[c] = b[c]
	};
	fljs.addStaticMethods = function (a, b) {
		for (var c in b) a[c] = b[c]
	};
	fljs.addEvents = function (a, b) {
		for (var c in b) {
			var d = b[c],
				e = d[0],
				f = d[2];
			a.prototype["__add" + e] = d[1];
			a.prototype["__remove" + e] = f
		}
	};
	fljs.now = function () {
		return +new Date
	};
	fljs.inherits = function (a, b) {
		function c() {}
		c.prototype = b.prototype;
		a.superClass_ = b.prototype;
		a.prototype = new c;
		a.prototype.constructor = a
	};
	fljs.base = function (a, b) {
		var c = arguments.callee.caller;
		if (c.superClass_) return c.superClass_.constructor.apply(a, Array.prototype.slice.call(arguments, 1));
		for (var d = Array.prototype.slice.call(arguments, 2), e = false, f = a.constructor; f; f = f.superClass_ && f.superClass_.constructor) if (f.prototype[b] === c) e = true;
		else if (e) return f.prototype[b].apply(a, d);
		if (a[b] === c) return a.constructor.prototype[b].apply(a, d);
		else throw Error("invalid base call");
	};
	fljs.bind = function (a, b) {
		var c = b || this;
		if (arguments.length > 2) {
			var d = Array.prototype.slice.call(arguments, 2);
			return function () {
				var e = Array.prototype.slice.call(arguments);
				Array.prototype.unshift.apply(e, d);
				return a.apply(c, e)
			}
		} else return function () {
			return a.apply(c, arguments)
		}
	};
	fljs.DummyConsole = function () {};
	fljs.addMethods(fljs.DummyConsole, {
		info: function () {}
	});
	fljs.DummyConsole._instance = new fljs.DummyConsole;
	fljs.console = function () {
		return fljs.debug ? console : fljs.DummyConsole._instance
	};
	fljs.ext = {};
	var flash = {};
	flash.display = {};
	flash.display.BlendMode = function () {};
	fljs.addConstants(flash.display.BlendMode, {
		ADD: "add",
		ALPHA: "alpha",
		DARKEN: "darken",
		DIFFERENCE: "difference",
		ERASE: "erase",
		HARDLIGHT: "hardlight",
		INVERT: "invert",
		LAYER: "layer",
		LIGHTEN: "lighten",
		MULTIPLY: "multiply",
		NORMAL: "normal",
		OVERLAY: "overlay",
		SCREEN: "screen",
		SUBTRACT: "subtract"
	});
	flash.events = {};
	flash.events.Event = function (a, b, c) {
		this.type = a;
		this.bubbles = b;
		this.cancelable = c
	};
	fljs.addConstants(flash.events.Event, {
		ACTIVATE: "activate",
		ADDED: "added",
		ADDED_TO_STAGE: "addedToStage",
		CANCEL: "cancel",
		CHANGE: "change",
		CLOSE: "close",
		COMPLETE: "complete",
		CONNECT: "connect",
		DEACTIVATE: "deactivate",
		DISPLAYING: "displaying",
		ENTER_FRAME: "enterFrame",
		FULLSCREEN: "fullscreen",
		ID3: "id3",
		INIT: "init",
		MOUSE_LEAVE: "mouseLeave",
		OPEN: "open",
		REMOVED: "removed",
		REMOVED_FROM_STAGE: "removedFromStage",
		RENDER: "render",
		RESIZE: "resize",
		SCROLL: "scroll",
		SELECT: "select",
		SOUND_COMPLETE: "soundComplete",
		TAB_CHILDREN_CHANGE: "tabChildrenChange",
		TAB_ENABLED_CHANGE: "tabEnabledChange",
		TAB_INDEX_CHANGE: "tabIndexChange",
		UNLOAD: "unload"
	});
	fljs.addMethods(flash.events.Event, {
		clone: function () {},
		formatToString: function (a) {
			return "[" + a + this.buildPropertiesString_(arguments) + "]"
		},
		buildPropertiesString_: function (a) {
			for (var b = [], c = 0; c < a.length; c++) c > 0 && b.push(a[c] + "=" + this[a[c]]);
			return b.join(" ")
		},
		isDefaultPrevented: function () {
			return this.returnValue_
		},
		stopImmediatePropagation: function () {
			this.stopPropagation()
		},
		toString: function () {
			return this.formatToString("Event", "type", "bubbles", "cancelable")
		}
	});
	flash.events.MouseEvent = function (a, b, c, d, e, f, g, j, h, m, k, l, n, p) {
		flash.events.Event.call(this, a, b, c);
		this.localX = d;
		this.localY = e;
		this.relatedObject = f;
		this.ctrlKey = g;
		this.altKey = j;
		this.shiftKey = h;
		this.buttonDown = m;
		this.delta = k;
		this.commandKey = l;
		this.controlKey = n;
		this.clickCount = p
	};
	fljs.inherits(flash.events.MouseEvent, flash.events.Event);
	fljs.addConstants(flash.events.MouseEvent, {
		CLICK: "click",
		DOUBLE_CLICK: "doubleClick",
		MOUSE_DOWN: "mouseDown",
		MOUSE_MOVE: "mouseMove",
		MOUSE_OUT: "mouseOut",
		MOUSE_OVER: "mouseOver",
		MOUSE_UP: "mouseUp",
		MOUSE_WHEEL: "mouseWheel",
		ROLL_OUT: "rollOut",
		ROLL_OVER: "rollOver"
	});
	flash.events.FullScreenEvent = function () {};
	fljs.addConstants(flash.events.FullScreenEvent, {
		FULL_SCREEN: "fullScreen"
	});
	flash.events.KeyboardEvent = function (a, b, c, d, e, f, g, j, h) {
		flash.events.Event(a, b, c);
		this.charCode = d;
		this.keyCode = e;
		this.keyLocation = f;
		this.ctrlKey = g;
		this.altKey = j;
		this.shiftKey = h
	};
	fljs.inherits(flash.events.KeyboardEvent, flash.events.Event);
	fljs.addConstants(flash.events.KeyboardEvent, {
		KEY_DOWN: "keyDown",
		KEY_UP: "keyUp"
	});
	flash.events.FocusEvent = function () {};
	fljs.addConstants(flash.events.FocusEvent, {
		KEY_FOCUS_CHANGE: "keyFocusChange",
		MOUSE_FOCUS_CHANGE: "mouseFocusChange"
	});
	flash.events.IEventDispatcher = function () {};
	fljs.addMethods(flash.events.IEventDispatcher, {
		addEventListener: function () {},
		dispatchEvent: function () {},
		hasEventListener: function () {},
		removeEventListener: function () {},
		willTrigger: function () {}
	});
	flash.events.EventDispatcher = function () {
		this._listenerCount = {};
		this._listeners = {}
	};
	fljs.addMethods(flash.events.EventDispatcher, {
		addEventListener: function (a, b, c, d, e) {
			a in this._listeners || (this._listeners[a] = []);
			this._listeners[a].push([b, c, d, e]);
			if (!this._listenerCount[a]) {
				this["__add" + a] && this["__add" + a]();
				this._listenerCount[a] = 0
			}
			this._listenerCount[a] += 1
		},
		dispatchEvent: function (a) {
			var b = this._listeners[a.type];
			for (var c in b) b[c][0](a)
		},
		hasEventListener: function (a) {
			return this._listeners[a] && this._listeners[a].length > 0
		},
		removeEventListener: function (a, b, c) {
			var d = this._listeners[a];
			for (var e in d) d[e][0] == b && d[e][1] == c && d.splice(e, 1);
			this._listenerCount[a] -= 1;
			if (!this._listenerCount[a]) {
				this["__remove" + a] && this["__remove" + a]();
				this._listenerCount[a] = 0
			}
		},
		willTrigger: function (a) {
			return this.hasEventListener(a)
		}
	});
	flash.geom = {};
	flash.geom.ColorTransform = function (a, b, c, d, e, f, g, j) {
		if (typeof a == "undefined") a = 1;
		if (typeof b == "undefined") b = 1;
		if (typeof c == "undefined") c = 1;
		if (typeof d == "undefined") d = 1;
		if (typeof e == "undefined") e = 0;
		if (typeof f == "undefined") f = 0;
		if (typeof g == "undefined") g = 0;
		if (typeof j == "undefined") j = 0;
		this.alphaMultiplier = d;
		this.alphaOffset = j;
		this.blueMultiplier = c;
		this.blueOffset = g;
		this.greenMultiplier = b;
		this.greenOffset = f;
		this.redMultiplier = a;
		this.redOffset = e;
		this.__default = this.alphaMultiplier == 1 && this.blueMultiplier == 1 && this.greenMultiplier == 1 && this.redMultiplier == 1 && this.alphaOffset == 0 && this.blueOffset == 0 && this.greenOffset == 0 && this.redOffset == 0;
		fljs.console("cxform")
	};
	fljs.addMethods(flash.geom.ColorTransform, {
		concat: function (a) {
			return new flash.geom.ColorTransform(this.redMultiplier * a.redMultiplier, this.greenMultiplier * a.greenMultiplier, this.blueMultiplier * a.blueMultiplier, this.alphaMultiplier * a.alphaMultiplier, Math.min(255, this.redOffset + a.redOffset), Math.min(255, this.greenOffset + a.greenOffset), Math.min(255, this.blueOffset + a.blueOffset), Math.min(255, this.alphaOffset + a.alphaOffset))
		},
		toString: function () {},
		__toSvgString: function () {
			return [this.redMultiplier, 0, 0, 0, this.redOffset, 0, this.greenMultiplier, 0, 0, this.greenOffset, 0, 0, this.blueMultiplier, 0, this.blueOffset, 0, 0, 0, this.alphaMultiplier, this.alphaOffset].toString()
		}
	});
	flash.geom.ColorTransform.identity = new flash.geom.ColorTransform;
	flash.geom.Matrix = function (a, b, c, d, e, f) {
		if (typeof a == "undefined") a = 1;
		if (typeof b == "undefined") b = 0;
		if (typeof c == "undefined") c = 0;
		if (typeof d == "undefined") d = 1;
		if (typeof e == "undefined") e = 0;
		if (typeof f == "undefined") f = 0;
		this.a = a;
		this.b = b;
		this.c = c;
		this.d = d;
		this.tx = e;
		this.ty = f;
		this.__default = this.a == 1 && this.b == 0 && this.c == 0 && this.d == 1 && this.tx == 0 && this.ty == 0
	};
	fljs.addMethods(flash.geom.Matrix, {
		clone: function () {
			return new flash.geom.Matrix(this.a, this.b, this.c, this.d, this.tx, this.ty)
		},
		concat: function (a) {
			var b = this.a * a.b + this.b * a.d,
				c = this.c * a.a + this.d * a.c,
				d = this.c * a.b + this.d * a.d,
				e = this.tx * a.a + this.ty * a.c + a.tx,
				f = this.tx * a.b + this.ty * a.d + a.ty;
			this.a = this.a * a.a + this.b * a.c;
			this.b = b;
			this.c = c;
			this.d = d;
			this.tx = e;
			this.ty = f
		},
		createBox: function () {},
		createGradientBox: function () {},
		deltaTransformPoint: function () {},
		identity: function () {},
		invert: function () {},
		rotate: function () {},
		scale: function (a, b) {
			this.a *= a;
			this.d *= b;
			this.tx *= a;
			this.ty *= b
		},
		toString: function () {},
		transformPoint: function () {},
		translate: function () {},
		__toSvgString: function () {
			return "matrix(" + [this.a, this.b, this.c, this.d, this.tx, this.ty] + ")"
		}
	});
	flash.geom.Transform = function (a) {
		this._target = a;
		this._colorTransform = new flash.geom.ColorTransform;
		this._matrix = new flash.geom.Matrix
	};
	fljs.addMethods(flash.geom.Transform, {
		setTarget: function (a) {
			this._target = a
		},
		getColorTransform: function () {
			return this._colorTransform
		},
		setColorTransform: function (a) {
			this._colorTransform = a;
			this._target.__setColorTransform(a)
		},
		getConcatenatedColorTransform: function () {
			for (var a = this._colorTransform, b = this._target, c = fljs.Player.getInstance(); b && b != c;) {
				var d = b.getTransform().getColorTransform();
				if (!d.__default) {
					a = d;
					break
				}
				b = b.getParent()
			}
			return a
		},
		getMatrix: function () {
			return this._matrix
		},
		setMatrix: function (a) {
			this._matrix =
			a;
			this._target.__setMatrix(a)
		},
		notify: function () {
			this._target.__setMatrix(this._matrix);
			this._target.__setColorTransform(this._colorTransform)
		}
	});
	flash.display.DisplayObject = function () {
		flash.events.EventDispatcher.call(this);
		this._alpha = 1;
		this.blendMode_ = flash.display.BlendMode.NORMAL;
		this._transform = new flash.geom.Transform(this);
		this.enterFrameListener = fljs.bind(this.onEnterFrame_, this);
		fljs.Player.getInstance().dispatcher.addEventListener(flash.events.Event.ENTER_FRAME, this.enterFrameListener);
		this.__simpleColorTransform = true;
		this.__asContext = null;
		(this._clipElement = new fljs.dom.Element).create(fljs.dom.Namespace.Svg, "g");
		this.id = "clip" + flash.display.DisplayObject.id++;
		this._mouseEventHandler = fljs.bind(this.dispatchMouseEvent, this)
	};
	fljs.inherits(flash.display.DisplayObject, flash.events.EventDispatcher);
	fljs.addMethods(flash.display.DisplayObject, {
		getBounds: function (a) {
			var b = this.element_.getElement().getBBox();
			if (a == this) return new flash.geom.Rectangle(b.x, b.y, b.width, b.height);
			else {
				var c = new flash.geom.Point(b.x, b.y);
				c = a.globalToLocal(this.localToGlobal(c));
				b = new flash.geom.Point(b.x + b.width, b.y + b.height);
				b = a.globalToLocal(this.localToGlobal(b));
				return new flash.geom.Rectangle(c.x, c.y, b.x - c.x, b.y - c.y)
			}
		},
		getRect: function () {},
		globalToLocal: function (a) {
			var b = this._svgCtm();
			a = this._SvgApplyMatrixToPoint(a, b);
			return new flash.geom.Point(a.x, a.y)
		},
		hitTestObject: function (a) {
			a = a.getBounds(this);
			var b = this.getBounds(this);
			return a.x + a.width <= b.x && a.x >= b.x + b.width && a.y + a.height <= b.y && a.y >= b.y + b.height
		},
		hitTestPoint: function (a, b) {
			a = new flash.geom.Point(a, b);
			a = this.globalToLocal(a);
			b = this.getBounds(this);
			return a.x >= b.x && a.x <= b.x + b.width && a.y > b.y && a.y <= b.y + b.height
		},
		_svgApplyMatrixToPoint: function (a, b) {
			var c = fljs.Player.getInstance().element.getElement().createSVGPoint();
			c.x = a.x;
			c.y = a.y;
			return c = c.matrixTransform(b)
		},
		_svgCtm: function () {
			var a = this.element_.getElement(),
				b;
			try {
				b = a.parentNode.getScreenCTM()
			} catch (c) {
				b = getScreenCTM(a.parentNode)
			}
			return b
		},
		localToGlobal: function (a) {
			var b = this._svgCtm();
			a = this._SvgApplyMatrixToPoint(a, b.inverse());
			return new flash.geom.Point(a.x, a.y)
		},
		onEnterFrame_: function () {},
		__setColorTransform: function (a) {
			this.element_.getElement().setAttributeNS(null, "opacity", a.alphaMultiplier);
			this.element_.getElement().setAttributeNS(null, "stroke-opacity", a.alphaMultiplier);
			this.element_.getElement().setAttributeNS(null, "fill-opacity", a.alphaMultiplier);
			this.__simpleColorTransform = true
		},
		setColorTransform: function () {},
		__setHitTarget: function (a) {
			this.setVisible(false);
			this.element_.getElement().setAttributeNS(null, "pointer-events", "all");
			this._hitTargetFor = a;
			this.addEventListeners()
		},
		makeClipPath: function () {
			this.getClipPath()
		},
		getClipPath: function () {
			this._clipPath || this.buildClipPath();
			return this._clipPath
		},
		buildClipPath: function () {
			var a = new fljs.dom.Element;
			a.create(fljs.dom.Namespace.Svg, "clipPath");
			var b = "clip" + flash.display.DisplayObject.id++;
			a.sets([
				["id", b],
				[null, "clipPathUnits", "userSpaceOnUse"]
			]);
			a.update();
			this.__clipElement = a;
			a = this._clipPath = new fljs.dom.Element;
			a.create(fljs.dom.Namespace.Svg, "g");
			a.set(null, "clip-path", "url(#" + b + ")");
			a.update();
			this._clipElement.element.parentNode.replaceChild(a.element, this._clipElement.element);
			this._clipElement = a;
			this.buildClipParts(this);
			fljs.Player.getInstance().defs.append(this.__clipElement)
		},
		buildClipParts: function (a) {
			if (!this._parentClipPaths) this._parentClipPaths = {};
			this._parentClipPaths[a.id] = a
		},
		__setMatrix: function (a) {
			this.element_.getElement().setAttributeNS(null, "transform", a.__toSvgString());
			if (this._parentClipPaths) for (var b in this._parentClipPaths) {
				a = this._parentClipPaths[b];
				this.updateClipParts && this.updateClipParts(a)
			}
		},
		addEventListeners: function () {
			var a = this._buttonEventHandler = fljs.bind(this._hitTargetFor.updateButtonState, this._hitTargetFor),
				b = flash.events.MouseEvent;
			this.addEventListener(b.CLICK, a, true);
			this.addEventListener(b.MOUSE_OVER, a, true);
			this.addEventListener(b.MOUSE_OUT, a, true);
			this.addEventListener(b.MOUSE_DOWN, a, true);
			this.addEventListener(b.MOUSE_UP, a, true)
		},
		removeFromStage: function () {
			fljs.Player.getInstance().dispatcher.removeEventListener(flash.events.Event.ENTER_FRAME, this.enterFrameListener)
		},
		updateClipDepth: function (a) {
			if (this.__clipDepth) {
				if (a != this.__clipDepth) if (a < this.__clipDepth) {;
				} else if (a > this.__clipDepth) {}
			} else {
				this.makeClipPath();
				this.__clipDepth = a;
				var b = this._parent;
				b.element_.getElement();
				var c = b.clipPathForDepth(this._depth);
				c && c.getClipPath();
				var d = document.createDocumentFragment();
				for (var e in b.displayList_) {
					var f = b.displayList_[e].displayObject;
					if (e > this._depth && e <= a && f._mask == c) {
						d.appendChild(f._clipElement.element);
						f._mask = this
					}
				}
				this.getClipPath().element.appendChild(d)
			}
		},
		getName: function () {
			return this._name
		},
		setName: function (a) {
			this._parent && this._parent.setChildName(this, a);
			this._name = a
		},
		getStage: function () {
			return this._parent && this._parent.getStage ? this._parent.getStage() : null
		},
		getTransform: function () {
			return this._transform
		},
		setTransform: function (a) {
			this._transform = a;
			this._transform.setTarget(this);
			this._transform.notify()
		},
		getMatrix: function () {
			return this._transform._matrix
		},
		setMatrix: function (a) {
			this._transform.setMatrix(a)
		},
		getVisible: function () {
			return this._visible
		},
		setVisible: function (a) {
			a = (this._visible = !! a) ? "visible" : "hidden";
			this.element_.getElement().setAttributeNS(null, "visibility", a)
		},
		getParent: function () {
			return this._parent
		},
		setParent: function (a) {
			if (this._parent != a) this._parent = a
		},
		getAs2Object: function () {
			if (!this._as2Object) this._as2Object = new fljs.swf.act.MovieClip(this);
			return this._as2Object
		},
		dispatchMouseEvent: function (a) {
			var b = {};
			b.click = flash.events.MouseEvent.CLICK;
			b.touchend = flash.events.MouseEvent.CLICK;
			b.mouseover = flash.events.MouseEvent.MOUSE_OVER;
			b.mouseout = flash.events.MouseEvent.MOUSE_OUT;
			b.mousedown = flash.events.MouseEvent.MOUSE_DOWN;
			b.mouseup = flash.events.MouseEvent.MOUSE_UP;
			b.touchstart = flash.events.MouseEvent.MOUSE_DOWN;
			b.touchend = flash.events.MouseEvent.MOUSE_UP;
			this.dispatchEvent(new flash.events.MouseEvent(b[a.type]))
		},
		getWidth: function () {
			return this.element_.element.getBBox().width
		},
		setWidth: function (a) {
			var b = this.getWidth(),
				c = this.getMatrix(),
				d = new flash.geom.Matrix;
			d.scale(a / b, 1);
			d.concat(c);
			d.tx = c.tx;
			d.ty = c.ty;
			this.setMatrix(d)
		},
		getHeight: function () {
			return this.element_.element.getBBox().height
		}
	});
	fljs.addEvents(flash.display.DisplayObject, [
		[flash.events.MouseEvent.MOUSE_OVER, function () {
			this.element_.element.addEventListener("mouseover", this._mouseEventHandler, false)
		},


		function () {
			this.element_.element.removeEventListener("mouseover", this._mouseEventHandler)
		}],
		[flash.events.MouseEvent.MOUSE_OUT, function () {
			this.element_.element.addEventListener("mouseout", this._mouseEventHandler, false)
		},


		function () {
			this.element_.element.removeEventListener("mouseout", this._mouseEventHandler)
		}],
		[flash.events.MouseEvent.MOUSE_DOWN, function () {
			this.element_.element.addEventListener("mousedown", this._mouseEventHandler, false)
		},


		function () {
			this.element_.element.removeEventListener("mousedown", this._mouseEventHandler)
		}],
		[flash.events.MouseEvent.MOUSE_UP, function () {
			this.element_.element.addEventListener("mouseup", this._mouseEventHandler, false)
		},


		function () {
			this.element_.element.removeEventListener("mouseup", this._mouseEventHandler)
		}]
	]);
	flash.display.DisplayObject.id = 1;
	flash.display.InteractiveObject = function () {
		flash.display.DisplayObject.call(this)
	};
	fljs.inherits(flash.display.InteractiveObject, flash.display.DisplayObject);
	flash.display.DisplayObjectContainer = function () {
		flash.display.InteractiveObject.call(this);
		this.element_ = this._clipElement;
		this.graphics_ = new flash.display.Graphics(this);
		this.displayList_ = [];
		this.__childNames = {}
	};
	fljs.inherits(flash.display.DisplayObjectContainer, flash.display.InteractiveObject);
	fljs.addMethods(flash.display.DisplayObjectContainer, {
		addChild: function (a) {
			var b = 0;
			for (var c in this.displayList_) b = Math.max(c, b);
			return this.addChildAt(a, b + 1)
		},
		addChildAt: function (a, b) {
			a._depth = b;
			a.setParent(this);
			var c = this.element_.getElement(),
				d = this.clipPathForDepth(b);
			if (d) c = d.getClipPath().element;
			var e = this.displayList_[b],
				f;
			if (e) f = e.displayObject;
			if (e && !f.__clipDepth) {
				c.replaceChild(a._clipElement.element, f._clipElement.element);
				f.removeFromStage()
			} else {
				e && this.removeChildAt(b);
				if ((e = this.dispObjAfterIndex(b)) && d) if (e._mask != d) e = null;
				e ? c.insertBefore(a._clipElement.element, e._clipElement.element) : c.appendChild(a._clipElement.element)
			}
			this.displayList_[b] = {
				displayObject: a
			};
			a.__name && this.setChildName(a, null, a.__name);
			if (this._parentClipPaths) for (var g in this._parentClipPaths) a.buildClipParts(this._parentClipPaths[g]);
			if (d) a._mask = d;
			return a
		},
		dispObjAfterIndex: function (a) {
			var b, c = null;
			for (var d in this.displayList_) if (d > a) {
				b = c ? Math.min(b, d) : d;
				c = this.displayList_[b].displayObject
			}
			return c
		},
		areInaccessibleObjectsUnderPoint: function () {
			return false
		},
		contains: function () {},
		getChildAt: function (a) {
			return (a = this.displayList_[a]) ? a.displayObject : null
		},
		getChildByName: function (a) {
			return this.childrenByName_[a]
		},
		removeChildAt: function (a) {
			var b = this.displayList_[a];
			if (b) {
				b = b.displayObject;
				var c;
				c = (c = this.clipPathForDepth(a)) ? c.getClipPath().element : this.element_.getElement();
				var d = b._clipElement.element;
				if (b.__clipDepth) {
					b.getClipPath();
					var e = document.createDocumentFragment();
					for (var f in this.displayList_) {
						var g = this.displayList_[f].displayObject;
						if (g._mask == b) {
							g._mask = null;
							e.appendChild(g._clipElement.element)
						}
					}
					c.replaceChild(e, d)
				} else c.removeChild(d);
				b.setParent(null);
				b.removeFromStage();
				b._name && delete this.__childNames[b._name];
				delete this.displayList_[a];
				return b
			} else fljs.console("doc").info("removeChildAt:" + a + " failed")
		},
		removeChildren: function () {
			for (var a in this.displayList_) this.removeChildAt(a)
		},
		setChildIndex: function () {},
		swapChildren: function () {},
		swapChildrenAt: function () {},
		setChildName: function (a, b) {
			a._name && delete this.__childNames[a._name];
			this.__childNames[b] = a
		},
		buildClipParts: function (a) {
			fljs.base(this, "buildClipParts", a);
			this.graphics_.buildClipParts(a);
			for (var b in this.displayList_) {
				var c = this.displayList_[b].displayObject;
				c.buildClipParts && c.buildClipParts(a)
			}
		},
		updateClipParts: function (a) {
			this.graphics_.updateClipParts(a);
			for (var b in this.displayList_) {
				var c = this.displayList_[b].displayObject;
				c.updateClipParts && c.updateClipParts(a)
			}
		},
		updateColorTransform: function () {
			for (var a in this.displayList_) {
				var b = this.displayList_[a].displayObject;
				b.updateColorTransform && b.updateColorTransform()
			}
		},
		__setColorTransform: function (a) {
			fljs.base(this, "__setColorTransform", a);
			this.updateColorTransform()
		},
		clipPathForDepth: function (a) {
			var b = -1;
			for (var c in this.displayList_) {
				var d = this.displayList_[c].displayObject;
				if (d.__clipDepth) if (a > c && a <= d.__clipDepth) b = Math.max(c, b)
			}
			return b > -1 ? this.displayList_[b].displayObject : null
		}
	});
	flash.display.Stage = function () {
		flash.display.DisplayObjectContainer.call(this);
		var a = fljs.Player.getInstance(),
			b = a.header.FrameSize.Xmax - a.header.FrameSize.Xmin,
			c = a.header.FrameSize.Ymax - a.header.FrameSize.Ymin;
		this._clipElement.sets([
			[null, "width", b],
			[null, "height", c]
		]);
		this._clipElement.update();
		this.align_ = flash.display.StageAlign.TOP_LEFT;
		this.displayState_ = flash.display.StageDisplayState.NORMAL;
		this.frameRate_ = 30;
		a = fljs.Player.getInstance();
		b = a.header.FrameSize.Xmax - a.header.FrameSize.Xmin;
		c =
		a.header.FrameSize.Ymax - a.header.FrameSize.Ymin;
		a = this._bg = new fljs.dom.Element;
		a.create(fljs.dom.Namespace.Svg, "rect");
		a.sets([
			[null, "x", 0],
			[null, "y", 0],
			[null, "width", b],
			[null, "height", c],
			[null, "stroke", "none"],
			[null, "fill", this.colorToSvgString(0)]
		]);
		a.update();
		(b = this._clipElement.element.firstChild) ? this._clipElement.getElement().insertBefore(a.element, b) : this._clipElement.getElement().appendChild(a.element)
	};
	fljs.inherits(flash.display.Stage, flash.display.DisplayObjectContainer);
	fljs.addMethods(flash.display.Stage, {
		initialize: function () {
			this.setBackgroundColor_(0)
		},
		invalidate: function () {},
		isFocusInaccessible: function () {},
		runFrameLoop_: function () {},
		onEnterFrame_: function () {
			for (var a in this.children_) this.children_.onEnterFrame()
		},
		colorToSvgString: function (a) {
			return "rgb(" + [a >> 16 & 255, a >> 8 & 255, a & 255] + ")"
		},
		setBackgroundColor_: function (a) {
			this._bg.set(null, "fill", this.colorToSvgString(a));
			this._bg.update()
		},
		onMouseMove: function (a) {
			this._mouseX = a.clientX;
			this._mouseY = a.clientY
		},
		getStage: function () {
			return this
		},
		getFrameRate: function () {
			return this.frameRate_
		},
		setFrameRate: function (a) {
			this.frameRate_ = a = Math.max(Math.min(a, 1E3), 0.01)
		}
	});
	flash.display.GradientType = function () {};
	fljs.addConstants(flash.display.GradientType, {
		LINEAR: "linear",
		RADIAL: "radial"
	});
	flash.display.SpreadMethod = function () {};
	fljs.addConstants(flash.display.SpreadMethod, {
		PAD: "pad",
		REFLECT: "reflect",
		REPEAT: "repeat"
	});
	flash.display.InterpolationMethod = function () {};
	fljs.addConstants(flash.display.InterpolationMethod, {
		LINEAR_RGB: "linearRGB",
		RGB: "rgb"
	});
	flash.display.Graphics = function (a) {
		this.__target = a;
		this.setDisplayObject(a);
		this._parentClipPaths = {};
		this._clipParts = {};
		this._parts = []
	};
	fljs.addMethods(flash.display.Graphics, {
		clear: function () {
			for (var a in this._parts) this.parentEl.removeChild(this._parts[a]);
			this._parts = [];
			this._clipParts = {};
			this._parentClipPaths = {}
		},
		opacityWithXform: function (a) {
			var b = this.displayObject_.getTransform().getConcatenatedColorTransform();
			return b.__default ? a : Math.max(0, Math.min(255, Math.round(a * 255 * b.alphaMultiplier + b.alphaOffset))) / 255
		},
		setDisplayObject: function (a) {
			this.displayObject_ = a;
			this.parentEl = this.displayObject_.element_.element
		},
		__colorToSvgString: function (a) {
			var b =
			a >> 16 & 255,
				c = a >> 8 & 255;
			a = a & 255;
			if (!this.displayObject_.getTransform().getConcatenatedColorTransform().__default) {
				var d = this.displayObject_.getTransform().getConcatenatedColorTransform();
				b = Math.max(0, Math.min(255, Math.round(b * d.redMultiplier + d.redOffset)));
				c = Math.max(0, Math.min(255, Math.round(c * d.greenMultiplier + d.greenOffset)));
				a = Math.max(0, Math.min(255, Math.round(a * d.blueMultiplier + d.blueOffset)))
			}
			return "rgb(" + [b, c, a] + ")"
		},
		clipTransforms: function (a) {
			for (var b = [], c = this.displayObject_;;) {
				var d = c.getMatrix().__toSvgString();
				b.push(d);
				if (c == a) break;
				c = c.getParent()
			}
			return b
		},
		buildClipParts: function (a) {
			this._parentClipPaths[a.id] = a;
			var b = this.clipTransforms(a).join(" ");
			if (this.tag) {
				var c = this.tag.def.paths;
				for (var d in c) {
					var e = c[d],
						f;
					f = fljs.agent.browser == "Safari" ? e.clone() : e.use();
					f.set(null, "transform", b);
					f.update();
					this.addClipPart(a, e, f)
				}
			}
		},
		addClipPart: function (a, b, c) {
			this._clipParts[a.id] || (this._clipParts[a.id] = {});
			this._clipParts[a.id][b.id] = c;
			a.__clipElement.append(c)
		},
		updateClipParts: function (a) {
			var b = this.clipTransforms(a);
			for (a = a;;) {
				if (this._parentClipPaths[a.id]) {
					var c = b.join(" "),
						d = this._clipParts[a.id];
					for (var e in d) {
						var f = d[e];
						f.set(null, "transform", c);
						f.update()
					}
				}
				if (!a || !a.getTransform) break;
				c = a.getMatrix().__toSvgString();
				b.push(c);
				a = a.getParent()
			}
		},
		useTag: function (a, b, c) {
			var d = this.displayObject_.getTransform().getConcatenatedColorTransform();
			d.__default || (b = d);
			this.tag = a;
			this.cloning = c;
			this.use = a.def.use(b, null, this.cloning);
			this.parentEl.appendChild(this.use.element)
		},
		setColorTransform: function (a) {
			if (this.use) {
				var b =
				this.use.element;
				this.use = this.tag.def.use(a, null, this.cloning);
				this.parentEl.replaceChild(this.use.element, b)
			}
		}
	});
	flash.display.Graphics.patternId = 1;
	flash.display.Graphics.pathId = 1;
	flash.display.IBitmapDrawable = function () {};
	flash.display.StageAlign = function () {};
	fljs.addConstants(flash.display.StageAlign, {
		TOP: "top",
		BOTTOM: "bottom",
		LEFT: "left",
		RIGHT: "right",
		TOP_LEFT: "topLeft",
		TOP_RIGHT: "topRight",
		BOTTOM_LEFT: "bottomLeft",
		BOTTOM_RIGHT: "bottomRight"
	});
	flash.display.StageDisplayState = function () {};
	fljs.addConstants(flash.display.StageDisplayState, {
		FULL_SCREEN: "fullScreen",
		NORMAL: "normal"
	});
	fljs.swf = {};
	fljs.swf.tag = {};
	fljs.swf.tag.End = function () {};
	fljs.addMethods(fljs.swf.tag.End, {
		read: function () {},
		evaluate: function () {}
	});
	fljs.swf.tag.ShowFrame = function () {};
	fljs.addMethods(fljs.swf.tag.ShowFrame, {
		read: function () {},
		evaluate: function () {}
	});
	flash.display.Shape = function () {
		flash.display.DisplayObject.call(this);
		this.element_ = this._clipElement;
		this.graphics_ = new flash.display.Graphics(this)
	};
	fljs.inherits(flash.display.Shape, flash.display.DisplayObject);
	fljs.addMethods(flash.display.Shape, {
		buildClipParts: function (a) {
			fljs.base(this, "buildClipParts", a);
			this.graphics_.buildClipParts(a)
		},
		updateClipParts: function (a) {
			this.graphics_.updateClipParts(a)
		},
		useTag: function (a, b, c) {
			this.tag = a;
			this.graphics_.useTag(a, b, c);
			if (b) {
				this.setColorTransform(b);
				this.element_.getElement().setAttributeNS(null, "opacity", b.alphaMultiplier)
			}
		},
		updateColorTransform: function () {
			this.graphics_.setColorTransform(this.getTransform().getConcatenatedColorTransform())
		},
		__setColorTransform: function (a) {
			fljs.base(this, "__setColorTransform", a);
			this.graphics_.setColorTransform(a)
		}
	});
	fljs.swf.tag.PlaceObject = function () {};
	fljs.addMethods(fljs.swf.tag.PlaceObject, {
		read: function (a, b) {
			var c = a.stream.byteIndex;
			this.CharacterId = a.readUI16();
			this.Depth = a.readUI16();
			this.Matrix = a.readMATRIX();
			a.stream.align();
			if (a.stream.byteIndex != c + b.TagLength) {
				fljs.console("parse").info("reading cxform");
				this.ColorTransform = a.readCXFORM()
			}
			a.stream.align()
		},
		buildMatrix_: function () {
			return new flash.geom.Matrix(this.Matrix.ScaleX, this.Matrix.RotateSkew0, this.Matrix.RotateSkew1, this.Matrix.ScaleY, this.Matrix.TranslateX, this.Matrix.TranslateY)
		},
		buildColorTransform_: function () {
			var a = this.ColorTransform;
			return new flash.geom.ColorTransform(a.RedMultTerm, a.GreenMultTerm, a.BlueMultTerm, a.AlphaMultTerm, a.RedAddTerm, a.GreenAddTerm, a.BlueAddTerm, a.AlphaAddTerm)
		},
		evaluate: function (a, b, c, d) {
			b = fljs.console("eval");
			c = a.dictionary[this.CharacterId];
			var e;
			if (c instanceof fljs.swf.tag.DefineShape || c instanceof fljs.swf.tag.DefineShape2) {
				e = new flash.display.Shape;
				e.getTransform().setMatrix(this.buildMatrix_());
				this.ColorTransform && e.getTransform().setColorTransform(this.buildColorTransform_());
				e.useTag(c)
			} else if (c instanceof fljs.swf.tag.DefineBitsJPEG2) {
				e = c.buildBitmap(fljs.Player.getInstance());
				e.getTransform().setMatrix(this.buildMatrix_())
			} else if (c instanceof fljs.swf.tag.DefineButton2) {
				e = c.build(a);
				e.getTransform().setMatrix(this.buildMatrix_())
			}
			e ? d.addChildAt(e, this.Depth) : b.info("not recognized: " + [this.CharacterId, this.Name])
		}
	});
	fljs.swf.tag.RemoveObject = function () {};
	fljs.addMethods(fljs.swf.tag.RemoveObject, {
		read: function (a) {
			this.CharacterId = a.readUI16();
			this.Depth = a.readUI16()
		},
		evaluate: function (a, b, c, d) {
			d.removeChildAt(this.Depth)
		}
	});
	fljs.swf.tag.PlaceObject2 = function () {};
	fljs.addMethods(fljs.swf.tag.PlaceObject2, {
		read: function (a) {
			this.startByteIndex = a.stream.byteIndex;
			fljs.console("parse");
			this.PlaceFlagHasClipActions = a.readUB(1);
			this.PlaceFlagHasClipDepth = a.readUB(1);
			this.PlaceFlagHasName = a.readUB(1);
			this.PlaceFlagHasRatio = a.readUB(1);
			this.PlaceFlagHasColorTransform = a.readUB(1);
			this.PlaceFlagHasMatrix = a.readUB(1);
			this.PlaceFlagHasCharacter = a.readUB(1);
			this.PlaceFlagMove = a.readUB(1);
			this.Depth = a.readUI16();
			if (this.PlaceFlagHasCharacter) this.CharacterId = a.readUI16();
			if (this.PlaceFlagHasMatrix) this.Matrix = a.readMATRIX();
			if (this.PlaceFlagHasColorTransform) this.ColorTransform = a.readCXFORMWITHALPHA();
			if (this.PlaceFlagHasRatio) this.Ratio = a.readUI16();
			if (this.PlaceFlagHasName) this.Name = a.readSTRING();
			if (this.PlaceFlagHasClipDepth) this.ClipDepth = a.readUI16();
			if (this.PlaceFlagHasClipActions) this.ClipActions = a.readCLIPACTIONS()
		},
		buildMatrix_: function () {
			return new flash.geom.Matrix(this.Matrix.ScaleX, this.Matrix.RotateSkew0, this.Matrix.RotateSkew1, this.Matrix.ScaleY, this.Matrix.TranslateX, this.Matrix.TranslateY)
		},
		buildColorTransform_: function () {
			var a = this.ColorTransform;
			return new flash.geom.ColorTransform(a.RedMultTerm, a.GreenMultTerm, a.BlueMultTerm, a.AlphaMultTerm, a.RedAddTerm, a.GreenAddTerm, a.BlueAddTerm, a.AlphaAddTerm)
		},
		evaluate: function (a, b, c, d) {
			var e;
			c = fljs.console("place");
			if (this.PlaceFlagMove && this.PlaceFlagHasCharacter) e = d.getChildAt(this.Depth);
			var f;
			if (this.ColorTransform) f = this.buildColorTransform_();
			if (this.PlaceFlagHasCharacter) {
				b = a.dictionary[this.CharacterId];
				var g;
				if (b instanceof fljs.swf.tag.DefineShape || b instanceof fljs.swf.tag.DefineEditText || b instanceof fljs.swf.tag.DefineText || b instanceof fljs.swf.tag.DefineSprite || b instanceof fljs.swf.tag.DefineButton2) g = b.build(a, f);
				if (g) {
					this.Matrix && g.getTransform().setMatrix(this.buildMatrix_());
					d.addChildAt(g, this.Depth);
					if (e) this.Matrix || g.getTransform().setMatrix(e.getTransform().getMatrix());
					if (g.__clipActions == null) g.__clipActions = {};
					if (this.ClipActions) {
						f = fljs.swf.ClipEventFlags;
						d = this.ClipActions.ClipActionRecords;
						for (var j in d) {
							e = d[j];
							for (var h in fljs.swf.ClipEventFlags) if (e.EventFlags & f[h]) {
								g.__clipActions[h] || (g.__clipActions[h] = []);
								g.__clipActions[h].push(e)
							}
						}
					}
					if (b instanceof fljs.swf.tag.DefineSprite || b instanceof fljs.swf.tag.DefineButton2) g.onCreate()
				} else {
					c.info("not recognized: " + [this.CharacterId, this.Name]);
					e && d.removeChildAt(this.Depth)
				}
			} else if (this.PlaceFlagMove) {
				g = d.getChildAt(this.Depth);
				if (!g) return;
				h = false;
				if (this.Matrix) {
					g.getTransform().setMatrix(this.buildMatrix_());
					h = true
				}
				if (f) {
					g.getTransform().setColorTransform(f);
					h = true
				}
				if (h && a.renderTextAsGlyphs) if (g.text_ || g._text) if (g.getParent()) {
					j = 0;
					h = g._clipElement.element;
					h = b = h.parentNode;
					b = h.parentNode;
					d = h.nextSibling;
					b.removeChild(h);
					f && g.getTransform().setColorTransform(f);
					this.Matrix && g.getTransform().setMatrix(this.buildMatrix_());
					d ? b.insertBefore(h, d) : b.appendChild(h)
				}
			}
			if (g) {
				this.PlaceFlagHasClipDepth && g.updateClipDepth(this.ClipDepth);
				this.Name && g.setName(this.Name);
				if (g && this.PlaceFlagHasCharacter) {
					if (g.__clipActions.ClipEventInitialize) {
						f = [];
						for (j in g.__clipActions.ClipEventInitialize) f.push.apply(f, g.__clipActions.ClipEventInitialize[j].Actions);
						a.doActions(g, f)
					}
					if (g.__clipActions.ClipEventLoad) {
						f = [];
						for (j in g.__clipActions.ClipEventLoad) f.push.apply(f, g.__clipActions.ClipEventLoad[j].Actions);
						a.doActions(g, f)
					}
					if (g.__clipActions.ClipEventEnterFrame) {
						f = [];
						for (j in g.__clipActions.ClipEventEnterFrame) f.push.apply(f, g.__clipActions.ClipEventEnterFrame[j].Actions);
						a.dispatcher.addEventListener(flash.events.Event.ENTER_FRAME, fljs.bind(a.doActions, a, g, f))
					}
				}
			}
		}
	});
	fljs.swf.build = {};
	fljs.swf.build.SvgUtils = function () {};
	fljs.addMethods(fljs.swf.build.SvgUtils, {
		toSvgColorString: function (a) {
			return "rgb(" + [a.Red, a.Green, a.Blue] + ")"
		},
		toSvgOpacity: function (a) {
			return a.Alpha == null ? 1 : a.Alpha / 255
		},
		toSvgMatrixString: function (a) {
			return (new flash.geom.Matrix(a.ScaleX, a.RotateSkew0, a.RotateSkew1, a.ScaleY, a.TranslateX, a.TranslateY)).__toSvgString()
		},
		toMatrix: function (a) {
			return new flash.geom.Matrix(a.ScaleX, a.RotateSkew0, a.RotateSkew1, a.ScaleY, a.TranslateX, a.TranslateY)
		}
	});
	fljs.swf.def = {};
	fljs.swf.def.BitmapDef = function () {
		(this.element = new fljs.dom.Element).create(fljs.dom.Namespace.Svg, "image")
	};
	fljs.addMethods(fljs.swf.def.BitmapDef, {
		setCharaId: function (a) {
			this.id = "bitmap-" + a;
			this.ref = "#" + this.id;
			this.element.set("id", this.id)
		},
		define: function () {
			this.element.update();
			this._define(this.element.element)
		},
		use: function () {
			var a = new fljs.dom.Element;
			a.create(fljs.dom.Namespace.Svg, "use");
			a.sets([
				[fljs.dom.Namespace.Xlink, "xlink:href", this.ref]
			]);
			a.update();
			return a
		},
		_define: function (a) {
			fljs.Player.getInstance().defs.element.appendChild(a)
		}
	});
	fljs.swf.def.BitmapFillDef = function () {
		var a = this.element = new fljs.dom.Element;
		a.create(fljs.dom.Namespace.Svg, "pattern");
		this.type = "Bitmap";
		this.id = "pattern-" + fljs.swf.def.BitmapFillDef.patternId++;
		this.ref = "#" + this.id;
		a.set("id", this.id)
	};
	fljs.addMethods(fljs.swf.def.BitmapFillDef, {
		setBitmapId: function (a) {
			a = fljs.Player.getInstance().dictionary[a];
			if (!a) return false;
			this.bitmap = a;
			this.element.append(a.def.use());
			return true
		},
		define: function () {
			this.element.update();
			this._define(this.element.element)
		},
		use: function () {
			var a = new fljs.dom.Element;
			a.create(fljs.dom.Namespace.Svg, "use");
			a.sets([
				[fljs.dom.Namespace.Xlink, "xlink:href", this.ref]
			]);
			a.update();
			return a
		},
		_define: function (a) {
			fljs.Player.getInstance().defs.element.appendChild(a)
		}
	});
	fljs.swf.def.BitmapFillDef.patternId = 1;
	fljs.swf.def.GradientFillDef = function () {
		this.element = new fljs.dom.Element;
		this.stops = [];
		this.type = "Gradient"
	};
	fljs.addMethods(fljs.swf.def.GradientFillDef, {
		create: function (a) {
			var b = this.element;
			b.create(fljs.dom.Namespace.Svg, a);
			this.id = "gradient-" + fljs.swf.def.GradientFillDef.gradientId++;
			this.ref = "#" + this.id;
			b.set("id", this.id)
		},
		addStop: function (a) {
			this.stops.push(a);
			this.element.append(a.element)
		},
		define: function () {
			this.element.update();
			this._define(this.element.element)
		},
		use: function (a) {
			var b = this.element.clone(false);
			b.id = "gradient-" + fljs.swf.def.GradientFillDef.gradientId++;
			b.ref = "#" + b.id;
			b.set("id", b.id);
			for (var c in this.stops) b.append(this.stops[c].use(a));
			b.update();
			this._define(b.element);
			return b
		},
		_define: function (a) {
			fljs.Player.getInstance().defs.element.appendChild(a)
		}
	});
	fljs.swf.def.GradientFillDef.gradientId = 1;
	fljs.swf.def.GradientFillStopDef = function () {
		(this.element = new fljs.dom.Element).create(fljs.dom.Namespace.Svg, "stop")
	};
	fljs.addMethods(fljs.swf.def.GradientFillStopDef, {
		create: function (a) {
			var b = this.element;
			b.create(fljs.dom.Namespace.Svg, a);
			b.set("id", this.id)
		},
		setColor: function (a, b) {
			this.rgba = a;
			this.element.sets([
				[null, "stop-color", this._colorToSvgColor(a, b)],
				[null, "stop-opacity", this._colorToSvgOpacity(a)]
			])
		},
		define: function () {
			this.element.update();
			this._define(this.element.element)
		},
		use: function (a) {
			var b = this.element.clone(false);
			a = [
				[null, "stop-color", this._colorToSvgColor(this.rgba, a)]
			];
			b.sets(a);
			b.update();
			return b
		},
		_define: function (a) {
			fljs.Player.getInstance().defs.element.appendChild(a)
		},
		_colorToSvgColor: function (a, b) {
			var c = a >> 24 & 255,
				d = a >> 16 & 255;
			a = a >> 8 & 255;
			if (b) {
				c = Math.max(0, Math.min(255, Math.round(c * b.redMultiplier + b.redOffset)));
				d = Math.max(0, Math.min(255, Math.round(d * b.greenMultiplier + b.greenOffset)));
				a = Math.max(0, Math.min(255, Math.round(a * b.blueMultiplier + b.blueOffset)))
			}
			return "rgb(" + [c, d, a] + ")"
		},
		_colorToSvgOpacity: function (a, b) {
			a = (a & 255) / 255;
			if (b) a = Math.max(0, Math.min(1, Math.round(a * b.alphaMultiplier + b.alphaOffset)));
			return a
		}
	});
	fljs.swf.def.GradientFillStopDef.gradientStopId = 1;
	fljs.swf.def.PathDef = function () {
		var a = this.element = new fljs.dom.Element;
		a.create(fljs.dom.Namespace.Svg, "path");
		this.id = "path" + fljs.swf.def.PathDef.pathId++;
		this.ref = "#" + this.id;
		a.set("id", this.id);
		a.update()
	};
	fljs.addMethods(fljs.swf.def.PathDef, {
		setStroke: function (a) {
			(this.stroke = a) ? this.element.sets([
				[null, "stroke-width", a.thickness],
				[null, "stroke", this._colorToSvgColor(a.color)],
				[null, "stroke-opacity", this._colorToSvgOpacity(a.color)]
			]) : this.element.set(null, "stroke", "none")
		},
		setFill: function (a) {
			if (this.fill = a) switch (a.type) {
			case "Solid":
				this._setSolidFill(a);
				break;
			case "Bitmap":
				this._setBitmapFill(a);
				break;
			case "Gradient":
				this._setGradientFill(a);
				break
			} else this.element.set(null, "fill", "none")
		},
		_setSolidFill: function () {},
		_setBitmapFill: function (a) {
			this.element.sets([
				[null, "fill", "url(" + a.ref + ")"],
				[null, "fill-opacity", 1]
			])
		},
		_setGradientFill: function () {},
		define: function () {
			this.element.update();
			this._define(this.element.element)
		},
		use: function (a, b) {
			var c = new fljs.dom.Element;
			c.create(fljs.dom.Namespace.Svg, "use");
			document.getElementById(this.id);
			var d = [
				[fljs.dom.Namespace.Xlink, "xlink:href", this.ref]
			],
				e = this.stroke;
			e && c.sets([
				[null, "stroke-width", e.thickness],
				[null, "stroke", this._colorToSvgColor(e.color, a)],
				[null, "stroke-opacity", this._colorToSvgOpacity(e.color)]
			]);
			if (e = this.fill) switch (e.type) {
			case "Solid":
				c.set(null, "fill", this._colorToSvgColor(e.color, a));
				c.set(null, "fill-opacity", this._colorToSvgOpacity(e.color));
				break;
			case "Bitmap":
				break;
			case "Gradient":
				c.sets([
					[null, "fill", "url(" + e.use(a).ref + ")"],
					[null, "fill-opacity", 1]
				]);
				break
			}
			c.sets(d);
			b && b.append(c);
			c.update();
			return c
		},
		clone: function () {
			var a = this.element.clone(true);
			a.set("id", null);
			return a
		},
		_colorToSvgColor: function (a, b) {
			var c = a >> 24 & 255,
				d = a >> 16 & 255;
			a = a >> 8 & 255;
			if (b) {
				c = Math.max(0, Math.min(255, Math.round(c * b.redMultiplier + b.redOffset)));
				d = Math.max(0, Math.min(255, Math.round(d * b.greenMultiplier + b.greenOffset)));
				a = Math.max(0, Math.min(255, Math.round(a * b.blueMultiplier + b.blueOffset)))
			}
			return "rgb(" + [c, d, a] + ")"
		},
		_colorToSvgOpacity: function (a, b) {
			a = (a & 255) / 255;
			if (b) a = Math.max(0, Math.min(1, Math.round(a * b.alphaMultiplier + b.alphaOffset)));
			return a
		},
		_define: function (a) {
			fljs.Player.getInstance().defs.element.appendChild(a)
		}
	});
	fljs.swf.def.PathDef.pathId = 1;
	fljs.swf.def.ShapeDef = function () {
		(this.element = new fljs.dom.Element).create(fljs.dom.Namespace.Svg, "g");
		this.parts = [];
		this.paths = [];
		this.images = [];
		this.cxforms = {};
		this.cxformCount = 0
	};
	fljs.addMethods(fljs.swf.def.ShapeDef, {
		setCharaId: function (a) {
			this.id = "chara-" + a;
			this.ref = "#" + this.id;
			this.element.set("id", this.id)
		},
		addPath: function (a) {
			this.paths.push(a);
			this.parts.push(a);
			this.element.append(a.element)
		},
		addImage: function (a) {
			this.images.push(a);
			this.parts.push(a);
			this.element.append(a.element)
		},
		define: function () {
			this.element.update();
			fljs.Player.getInstance();
			this._define(this.element.element)
		},
		use: function (a, b, c) {
			if (c) {
				a = this.element.clone(true);
				b && b.append(a);
				return a
			}
			if (!a) a = flash.geom.ColorTransform.identity;
			c = a.__toSvgString();
			a = c in this.cxforms ? this.cxforms[c] : (this.cxforms[c] = this.useDef(a));
			c = new fljs.dom.Element;
			c.create(fljs.dom.Namespace.Svg, "use");
			document.getElementById(a.id);
			b && b.append(c);
			c.element.setAttributeNS(fljs.dom.Namespace.Xlink, "xlink:href", a.ref);
			return c
		},
		useDef: function (a) {
			var b = new fljs.dom.Element;
			b.create(fljs.dom.Namespace.Svg, "g");
			var c = [this.id, this.cxformCount++].join("-");
			b.sets([
				["id", c]
			]);
			b.update();
			this._define(b.element);
			var d = this.parts;
			for (var e in d) d[e].use(a, b);
			return {
				element: b,
				id: c,
				ref: "#" + c
			}
		},
		_define: function (a) {
			fljs.Player.getInstance().defs.element.appendChild(a)
		}
	});
	fljs.swf.def.ImageDef = function () {
		var a = this.element = new fljs.dom.Element;
		a.create(fljs.dom.Namespace.Svg, "g");
		this.id = "image-def-" + fljs.swf.def.ImageDef.id++;
		this.ref = "#" + this.id;
		a.set("id", this.id)
	};
	fljs.addMethods(fljs.swf.def.ImageDef, {
		setBitmapId: function (a) {
			a = fljs.Player.getInstance().dictionary[a];
			if (!a) return false;
			this.bitmap = a;
			this._use = a.def.use();
			this.element.append(this._use);
			return true
		},
		define: function () {
			this.element.update();
			this._define(this.element.element)
		},
		use: function (a, b) {
			a = new fljs.dom.Element;
			a.create(fljs.dom.Namespace.Svg, "use");
			a.sets([
				[fljs.dom.Namespace.Xlink, "xlink:href", this.ref]
			]);
			a.update();
			b && b.append(a);
			return a
		},
		_define: function (a) {
			fljs.Player.getInstance().defs.element.appendChild(a)
		}
	});
	fljs.swf.def.ImageDef.id = 1;
	fljs.swf.BigEndianStringStream = function (a) {
		this.buffer = a;
		this.bitIndex = this.byteIndex = this._byte = 0;
		this.byteIndexForBits = -1;
		this.logger = fljs.console("parse")
	};
	fljs.addMethods(fljs.swf.BigEndianStringStream, {
		length: function () {
			return this.buffer.length
		},
		hasMore: function () {
			return this.byteIndex < this.buffer.length
		},
		skipBytes: function (a) {
			this.byteIndex += a
		},
		readBytes: function (a) {
			for (var b = [], c = 0; c < a; c++) b.push(this.buffer.charCodeAt(this.byteIndex++) & 255);
			return b
		},
		align: function () {
			this.bitIndex = 8
		},
		nextUByte: function () {
			return this.buffer.charCodeAt(this.byteIndex++) & 255
		},
		nextSByte: function () {
			var a = this.buffer.charCodeAt(this.byteIndex++) & 255;
			if (a >= 128) a -= 256;
			return a
		},
		nextUShort: function () {
			var a = ((this.buffer.charCodeAt(this.byteIndex++) & 255) << 8) + (this.buffer.charCodeAt(this.byteIndex++) & 255);
			if (a < 0) a += 65536;
			return a
		}
	});
	fljs.swf.ClipEventFlags = {
		ClipEventKeyUp: -2147483648,
		ClipEventKeyDown: 1073741824,
		ClipEventMouseUp: 536870912,
		ClipEventMouseDown: 268435456,
		ClipEventMouseMove: 134217728,
		ClipEventUnload: 67108864,
		ClipEventEnterFrame: 33554432,
		ClipEventLoad: 16777216,
		ClipEventDragOver: 8388608,
		ClipEventRollOut: 4194304,
		ClipEventRollOver: 2097152,
		ClipEventReleaseOutside: 1048576,
		ClipEventRelease: 524288,
		ClipEventPress: 262144,
		ClipEventInitialize: 131072,
		ClipEventData: 65536,
		ClipEventConstruct: 1024,
		ClipEventKeyPress: 512,
		ClipEventDragOut: 256
	};
	fljs.swf.FillStyleTypes = {
		SolidFill: 0,
		LinearGradientFill: 16,
		RadialGradientFill: 18,
		FocalRadialGradientFill: 19,
		RepeatingBitmapFill: 64,
		ClippedBitmapFill: 65,
		NonSmoothedRepeatingBitmapFill: 66,
		NonSmoothedClippedBitmapFill: 67
	};
	fljs.swf.SpreadMethods = {
		Pad: 0,
		Reflect: 1,
		Repeat: 2
	};
	fljs.swf.InterpolationMethods = {
		Rgb: 0,
		LinearRgb: 1
	};
	fljs.swf.build.ShapeBuilder = function (a) {
		this.context = a;
		this.utils = new fljs.swf.build.SvgUtils
	};
	fljs.addMethods(fljs.swf.build.ShapeBuilder, {
		build: function (a) {
			var b = this.parseSwfPaths(a),
				c = [];
			for (var d in b) c.push([this.buildPaths(b[d][0]), this.buildPaths(b[d][1])]);
			return this.buildDefinition(a, c)
		},
		parseSwfPaths: function (a) {
			var b = 0,
				c = 0,
				d = 0,
				e = 0,
				f = 0,
				g = 0,
				j = a.Shapes.ShapeRecords,
				h = this.stateNewStyles(a.Shapes.FillStyles),
				m = this.stateNewStyles(a.Shapes.LineStyles),
				k = [],
				l = 0,
				n = 0,
				p = 0,
				u = 1,
				o = {
					x1: 0,
					y1: 0
				},
				q = [],
				s = this;
			a = function () {
				o.parts = q;
				o.flipped = false;
				o.x2 = q[q.length - 1].x2;
				o.y2 = q[q.length - 1].y2;
				o.key1 =
				s.pointKey(o.x1, o.y1);
				o.key2 = s.pointKey(o.x2, o.y2);
				o.key = u += 1;
				l && h[l].edges.push(o);
				if (n) h[n].edges.push({
					parts: q,
					flipped: true,
					x1: o.x2,
					y1: o.y2,
					x2: o.x1,
					y2: o.y1,
					key1: o.key2,
					key2: o.key1,
					key: u += 1
				});
				p && m[p].edges.push(o);
				o = {
					x1: o.x2,
					y1: o.y2
				};
				q = []
			};
			var r = function () {
				k.push([h, m])
			},
				t = function (w) {
					return Math.round(w * 100) / 100
				};
			for (var v in j) {
				g = j[v];
				switch (g.type) {
				case "STRAIGHT":
					f = b + g.DeltaX;
					g = c + g.DeltaY;
					q.push({
						x1: t(b),
						y1: t(c),
						x2: t(f),
						y2: t(g)
					});
					b = f;
					c = g;
					break;
				case "CURVED":
					d = b + g.ControlDeltaX;
					e = c + g.ControlDeltaY;
					f = d + g.AnchorDeltaX;
					g = e + g.AnchorDeltaY;
					q.push({
						x1: t(b),
						y1: t(c),
						cx: t(d),
						cy: t(e),
						x2: t(f),
						y2: t(g)
					});
					b = f;
					c = g;
					break;
				case "NONEDGE":
					q.length && a();
					if (g.StateNewStyles) {
						r();
						h = this.stateNewStyles(g.FillStyles);
						m = this.stateNewStyles(g.LineStyles)
					}
					if (g.StateLineStyle) p = g.LineStyle;
					if (g.StateFillStyle0) l = g.FillStyle0;
					if (g.StateFillStyle1) n = g.FillStyle1;
					if (g.StateMoveTo) {
						b = g.MoveDeltaX;
						c = g.MoveDeltaY;
						o.x1 = b;
						o.y1 = c
					}
					break
				}
			}
			q.length && a();
			r();
			return k
		},
		stateNewStyles: function (a) {
			var b = [{
				edges: [],
				style: null
			}];
			for (var c in a) b.push({
				edges: [],
				style: a[c]
			});
			return b
		},
		buildPaths: function (a) {
			var b = [],
				c, d, e, f, g, j, h, m, k, l;
			for (e = 0; e < a.length; e++) {
				d = a[e].edges;
				if (d.length != 0) {
					j = {};
					edgeIndexCount = {};
					m = [];
					for (f = h = 0; f < d.length; f++) {
						c = d[f];
						if (c.key1 == c.key2) {
							c.picked = true;
							h += 1;
							m.push([c])
						} else {
							c.picked = false;
							j[c.key1] || (j[c.key1] = []);
							j[c.key1].push(c)
						}
					}
					for (f = 0; f < d.length; f++) {
						if (h == d.length) break;
						c = d[f];
						if (!c.picked) {
							k = [c];
							c.picked = true;
							h += 1;
							l = j[c.key1];
							for (g = 0; g < l.length; g++) if (l[g] == c) {
								l.splice(g, 1);
								break
							}
							g = c.key1;
							for (c = c.key2; c != g;) {
								l = j[c];
								if (typeof l == "undefined") break;
								if (l.length == 0) break;
								c = l.shift();
								k.push(c);
								c.picked = true;
								h += 1;
								c = c.key2
							}
							m.push(k)
						}
					}
					m.length && b.push({
						path: m,
						style: a[e].style
					})
				}
			}
			return b
		},
		pointKey: function (a, b) {
			return [a, b].join(",")
		},
		buildDefinition: function (a, b) {
			var c = new fljs.swf.def.ShapeDef;
			c.setCharaId(a.ShapeId);
			for (var d in b) {
				a = b[d][0];
				for (var e in a) {
					var f = a[e];
					if (this.isImagePath(f)) {
						var g = new fljs.swf.def.ImageDef;
						this.buildImageDef(g, f);
						c.addImage(g)
					} else {
						f.style.def = this.buildFillDef(f.style);
						f = this.buildPathDefinition(f.path, f.style, null);
						c.addPath(f)
					}
				}
				a = b[d][1];
				for (e in a) {
					f = a[e];
					f = this.buildPathDefinition(f.path, null, f.style);
					c.addPath(f)
				}
			}
			c.define();
			return c
		},
		sameStyle: function (a, b) {
			if (!a || !b) return false;
			if (a.def && b.def && a.def.fill && b.def.fill) if (a.def.fill.type == "Solid" && b.def.fill.type == "Solid") {
				if (a.def.fill.color != b.def.fill.color) return false
			} else return false;
			else if (a.def && b.def && (a.def.fill || b.def.fill)) return false;
			var c, d;
			c = a.HasFillFlag && a.FillType.Color ? a.FillType.Color : a.Color;
			if (b.HasFillFlag && b.FillType.Color) bcolor = b.FillType.Color;
			else d = b.Color;
			if (c && d) {
				if (this.rgbaToColor(c) != this.rgbaToColor(d)) return false;
				if (a.Width != b.Width) return false
			} else if (c || d) return false;
			return true
		},
		buildPathDefinition: function (a, b, c) {
			var d = new fljs.swf.def.PathDef;
			this.setPathLineStyle(d, c);
			this.setPathFillStyle(d, b);
			d.element.set(null, "d", this.pathToString(a));
			d.define();
			return d
		},
		isImagePath: function (a) {
			if (a.path.length != 1 || a.path[0].length != 1 || a.path[0][0].parts.length != 4 || !a.style) return false;
			var b = a.style.FillStyleType,
				c = fljs.swf.FillStyleTypes;
			if (!(b == c.RepeatingBitmapFill || b == c.ClippedBitmapFill || b == c.NonSmoothedRepeatingBitmapFill || b == c.NonSmoothedClippedBitmapFill)) return false;
			if (!fljs.Player.getInstance().dictionary[a.style.BitmapId]) return false;
			a = a.path[0][0].parts;
			for (b = 0; b < a.length; b++) {
				if (typeof a[b].cx != "undefined") return false;
				if (b < a.length - 1) {
					var d = a[b],
						e = a[b + 1],
						f, g, j;
					if (d.flipped) {
						f = d.x2;
						c = d.y2;
						g = d.x1;
						d = d.y1
					} else {
						f = d.x1;
						c = d.y1;
						g = d.x2;
						d = d.y2
					}
					if (e.flipped) {
						j = e.x1;
						e = e.y1
					} else {
						j = e.x2;
						e = e.y2
					}
					f = (f - g) * (j - g);
					c = (c - d) * (e - d);
					g = f + c;
					if (Math.abs(g) > 0.01) {
						if (!f || !c) return false;
						if (Math.abs(g / f) > 0.01 || Math.abs(g / c) > 0.01) return false
					}
				}
			}
			return true
		},
		buildImageDef: function (a, b) {
			a.setBitmapId(b.style.BitmapId);
			for (var c = [], d = 0, e = 0, f = b.path[0][0].parts, g = 0; g < f.length; g++) {
				var j = f[g],
					h = Math.abs(j.x2 - j.x1);
				j = Math.abs(j.y2 - j.y1);
				if (h > d) d = h;
				if (j > e) e = j
			}
			a._use.set(null, "x", 0);
			a._use.set(null, "y", 0);
			a._use.set(null, "width", d);
			a._use.set(null, "height", e);
			if (b = b.style.BitmapMatrix) {
				b = this.utils.toMatrix(b);
				b.a /= 20;
				b.b /= 20;
				b.c /= 20;
				b.d /= 20;
				c.push("translate(" + [b.tx, b.ty] + ")");
				b.tx = 0;
				b.ty = 0;
				c.push(b.__toSvgString())
			}
			a._use.set(null, "transform", c.toString());
			a._use.update();
			a.element.update();
			a.define()
		},
		appendPathToDef: function (a, b) {
			a = a.element.element;
			b = a.getAttributeNS(null, "d") + " " + this.pathToString(b);
			a.setAttributeNS(null, "d", b)
		},
		pathToString: function (a) {
			var b, c, d = [];
			for (var e in a) {
				var f = a[e];
				d.push("M", f[0].x1, f[0].y1);
				for (var g in f) {
					b = f[g];
					if (b.flipped) for (var j = b.parts.length - 1; j >= 0; j--) {
						c = b.parts[j];
						typeof c.cx == "undefined" ? d.push("L", c.x1, c.y1) : d.push("Q", c.cx, c.cy, c.x1, c.y1)
					} else for (j in b.parts) {
						c = b.parts[j];
						typeof c.cx == "undefined" ? d.push("L", c.x2, c.y2) : d.push("Q", c.cx, c.cy, c.x2, c.y2)
					}
				}
			}
			return d.join(" ")
		},
		setPathLineStyle: function (a, b) {
			if (b) {
				var c = {};
				c = b.HasFillFlag ? b.FillType.Color ? {
					thickness: Math.max(b.Width, 1),
					color: this.rgbaToColor(b.FillType.Color)
				} : {
					thickness: 1,
					color: 0
				} : {
					thickness: Math.max(b.Width, 1),
					color: this.rgbaToColor(b.Color)
				};
				a.setStroke(c)
			} else a.setStroke(null)
		},
		setPathFillStyle: function (a, b) {
			if (b) if (b.FillStyleType == fljs.swf.FillStyleTypes.SolidFill) this.setPathSolidFillStyle(a, b);
			else b.def && a.setFill(b.def);
			else a.setFill(null)
		},
		setPathSolidFillStyle: function (a, b) {
			a.setFill({
				type: "Solid",
				color: this.rgbaToColor(b.Color)
			})
		},
		buildFillDef: function (a) {
			if (!a) return null;
			var b = a.FillStyleType,
				c = fljs.swf.FillStyleTypes;
			return b == c.LinearGradientFill || b == c.RadialGradientFill || b == c.FocalRadialGradientFill ? this.buildGradientFillDef(a) : b == c.RepeatingBitmapFill || b == c.ClippedBitmapFill || b == c.NonSmoothedRepeatingBitmapFill || b == c.NonSmoothedClippedBitmapFill ? this.buildBitmapFillDef(a) : null
		},
		buildGradientFillDef: function (a) {
			var b = new fljs.swf.def.GradientFillDef,
				c = [];
			if (a.FillStyleType == fljs.swf.FillStyleTypes.LinearGradientFill) {
				b.create("linearGradient");
				c.push([null, "x1", -819.2], [null, "x2", 819.2])
			} else {
				b.create("radialGradient");
				c.push([null, "cx", 0], [null, "cy", 0], [null, "r", 819.2])
			}
			c.push([null, "gradientUnits", "userSpaceOnUse"]);
			c.push([null, "gradientTransform", this.utils.toSvgMatrixString(a.GradientMatrix)]);
			var d, e = fljs.swf.SpreadMethods;
			switch (a.Gradient.SpreadMode) {
			case e.Pad:
				d = "pad";
				break;
			case e.Reflect:
				d = "reflect";
				break;
			case e.Repeat:
				d = "repeat";
				break
			}
			c.push([null, "spreadMethod", d]);
			var f;
			d = fljs.swf.InterpolationMethods;
			switch (a.Gradient.InterpolationMode) {
			case d.LinearRgb:
				f = "linearRGB";
				break;
			case d.Rgb:
				f = "rgb";
				break
			}
			c.push([null, "color-interpolation", f]);
			a = a.Gradient.GradientRecords;
			for (var g in a) {
				f = a[g];
				d = new fljs.swf.def.GradientFillStopDef;
				d.setColor(this.rgbaToColor(f.Color));
				e = [];
				e.push([null, "offset", f.Ratio / 255]);
				d.element.sets(e);
				d.element.update();
				b.addStop(d)
			}
			b.element.sets(c);
			b.define();
			return b
		},
		buildBitmapFillDef: function (a) {
			var b = new fljs.swf.def.BitmapFillDef;
			if (!b.setBitmapId(a.BitmapId)) {
				b.define();
				return b
			}
			var c = [];
			c.push([null, "patternUnits", "userSpaceOnUse"], [null, "x", 0], [null, "y", 0], [null, "width", b.bitmap.Width], [null, "height", b.bitmap.Height]);
			var d = [];
			if (a = a.BitmapMatrix) {
				a = this.utils.toMatrix(a);
				a.a /= 20;
				a.b /= 20;
				a.c /= 20;
				a.d /= 20;
				d.push("translate(" + [a.tx, a.ty] + ")");
				a.tx = 0;
				a.ty =
				0;
				d.push(a.__toSvgString())
			}
			c.push([null, "patternTransform", d.toString()]);
			b.element.sets(c);
			b.define();
			return b
		},
		rgbaToColor: function (a) {
			var b = (a.Red << 24) + (a.Green << 16) + (a.Blue << 8);
			b |= typeof a.Alpha != "undefined" ? a.Alpha : 255;
			return b
		}
	});
	fljs.swf.tag.DefineShape = function () {};
	fljs.addMethods(fljs.swf.tag.DefineShape, {
		read: function (a) {
			a.beginContext(fljs.swf.tag.DefineShape);
			this.defId = this.ShapeId = a.readUI16();
			this.ShapeBounds = a.readRECT();
			a.stream.align();
			this.Shapes = a.readSHAPEWITHSTYLE();
			a.endContext()
		},
		waitForBitmaps: function () {
			var a = fljs.Player.getInstance();
			this.bitmapIds = this.findBitmaps(this);
			this.waiting = 0;
			var b = fljs.Player.getInstance().mainTimeline.resources,
				c = [];
			for (var d in this.bitmapIds) if (b.waiting(d)) {
				this.waiting += 1;
				b.listen(d, fljs.bind(this.onLoad, this, a))
			} else c.push(d);
			for (var e in c) delete this.bitmapIds[c[e]]
		},
		onLoad: function (a, b) {
			if (this.bitmapIds[b]) {
				delete this.bitmapIds[b];
				this.waiting -= 1
			}
			this.waiting == 0 && this.evaluate(a)
		},
		evaluate: function (a) {
			this.bitmapIds || this.waitForBitmaps();
			if (!(this.waiting > 0)) {
				this.def = (new fljs.swf.build.ShapeBuilder).build(this);
				a.addDefinition(this, this.ShapeId)
			}
		},
		findBitmaps: function (a) {
			var b = {};
			this.findBitmapsForStyles(b, a.Shapes.FillStyles);
			a = a.Shapes.ShapeRecords;
			for (var c in a) {
				var d = a[c];
				d.type == "NONEDGE" && d.StateNewStyles && this.findBitmapsForStyles(b, d.FillStyles)
			}
			return b
		},
		findBitmapsForStyles: function (a, b) {
			var c = fljs.swf.FillStyleTypes;
			for (var d in b) {
				var e = b[d],
					f = e.FillStyleType;
				if (f == c.RepeatingBitmapFill || f == c.ClippedBitmapFill || f == c.NonSmoothedRepeatingBitmapFill || f == c.NonSmoothedClippedBitmapFill) a[e.BitmapId] = true
			}
		},
		build: function (a, b, c) {
			a = new flash.display.Shape;
			a.useTag(this, b, c);
			return a
		}
	});
	fljs.dom = {};
	fljs.dom.Namespace = {
		Svg: "http://www.w3.org/2000/svg",
		Xlink: "http://www.w3.org/1999/xlink"
	};
	fljs.dom.Element = function (a) {
		this.element = a;
		this.changes = []
	};
	fljs.addMethods(fljs.dom.Element, {
		create: function (a, b) {
			if (arguments.length == 1) {
				b = a;
				this.element = document.createElement(b)
			} else this.element = document.createElementNS(a, b);
			this.changes = []
		},
		set: function (a, b, c) {
			if (arguments.length == 2) {
				c = b;
				b = a;
				this.changes.push([b, c])
			} else this.changes.push([a, b, c])
		},
		sets: function (a) {
			this.changes.push.apply(this.changes, a)
		},
		update: function () {
			var a = this.element,
				b = this.changes;
			for (var c in b) {
				var d = b[c];
				d.length == 2 ? a.setAttribute(d[0], d[1]) : a.setAttributeNS(d[0], d[1], d[2])
			}
			this.changes = []
		},
		append: function (a) {
			this.element.appendChild(a.element)
		},
		appendText: function (a) {
			this.element.appendChild(document.createTextNode(a))
		},
		clone: function (a) {
			var b = new fljs.dom.Element;
			b.element = this.element.cloneNode(a);
			b.changes = [];
			return b
		},
		remove: function (a) {
			this.element.removeChild(a.element)
		},
		getElement: function () {
			return this.element
		}
	});
	fljs.swf.build.FontBuilder = function (a, b) {
		this.tag = a;
		this.player = b
	};
	fljs.addMethods(fljs.swf.build.FontBuilder, {
		buildDef: function () {
			var a = this.buildGlyphPaths();
			return this.player.renderTextAsGlyphs ? this.buildFontDef(a) : this.buildShapeDef(a)
		},
		buildFontDef: function (a) {
			var b = this.tag,
				c = this.player.element.getElement().ownerDocument,
				d = c.createElementNS("http://www.w3.org/2000/svg", "font"),
				e = c.createElementNS("http://www.w3.org/2000/svg", "font-face");
			e.setAttributeNS(null, "font-family", "font-" + b.FontId);
			e.setAttributeNS(null, "units-per-em", 51.2);
			d.appendChild(e);
			for (var f in a) {
				e =
				c.createElementNS("http://www.w3.org/2000/svg", "glyph");
				e.setAttributeNS(null, "unicode", String.fromCharCode(b.CodeTable[f]));
				b.FontAdvanceTable && e.setAttributeNS(null, "horiz-adv-x", b.FontAdvanceTable[f] / 20);
				e.setAttributeNS(null, "d", a[f]);
				d.appendChild(e)
			}
			return [{
				element: d
			}]
		},
		buildShapeDef: function (a) {
			var b = this.tag,
				c = [];
			for (var d in a) {
				var e = new fljs.dom.Element;
				e.create(fljs.dom.Namespace.Svg, "path");
				var f = ["font", b.FontId, b.FontFlagsBold, b.FontFlagsItalic, b.CodeTable[d]].join("-");
				if (document.getElementById(f)) rar.rar = rar;
				e.sets([
					["id", f],
					["d", a[d]]
				]);
				e.update();
				c.push(e)
			}
			return c
		},
		buildGlyphPaths: function () {
			for (var a = [], b = this.tag.GlyphShapeTable, c = 0, d = b.length; c < d; c++) {
				var e = this.buildPath(this.buildGlyph(b[c]));
				a.push(e)
			}
			return a
		},
		buildGlyph: function (a) {
			var b = 0,
				c = 0,
				d = 0,
				e = 0,
				f = 0,
				g = 0;
			a = a.ShapeRecords;
			var j = [],
				h = [],
				m = 1;
			if (this.tag instanceof fljs.swf.tag.DefineFont3) m = 20;
			var k = function (n) {
				return Math.round(n * 100) / 100 / m
			};
			for (var l in a) {
				g = a[l];
				switch (g.type) {
				case "STRAIGHT":
					f = b + g.DeltaX;
					g = c + g.DeltaY;
					h.push({
						x1: k(b),
						y1: k(c),
						x2: k(f),
						y2: k(g)
					});
					b = f;
					c = g;
					break;
				case "CURVED":
					d = b + g.ControlDeltaX;
					e = c + g.ControlDeltaY;
					f = d + g.AnchorDeltaX;
					g = e + g.AnchorDeltaY;
					h.push({
						x1: k(b),
						y1: k(c),
						cx: k(d),
						cy: k(e),
						x2: k(f),
						y2: k(g)
					});
					b = f;
					c = g;
					break;
				case "NONEDGE":
					if (g.StateMoveTo) {
						h.length && j.push(h);
						b = g.MoveDeltaX;
						c = g.MoveDeltaY;
						h = []
					}
					break
				}
			}
			h.length && j.push(h);
			return j
		},
		buildPath: function (a) {
			var b = [],
				c = this.player.renderTextAsGlyphs ? -1 : 1,
				d;
			for (var e in a) {
				var f = a[e];
				b.push("M", f[0].x1, f[0].y1 * c);
				for (var g in f) {
					d = f[g];
					typeof d.cx == "undefined" ? b.push("L", d.x2, d.y2 * c) : b.push("Q", d.cx, d.cy * c, d.x2, d.y2 * c)
				}
			}
			b.length == 0 && b.push("M", 0, 0);
			return b.join(" ")
		}
	});
	fljs.swf.build.FontBuilder.id = 1;
	fljs.swf.tag.DefineFont = function () {};
	fljs.addMethods(fljs.swf.tag.DefineFont, {
		read: function (a) {
			this.FontId = a.readUI16();
			this.OffsetTable = [a.readUI16()];
			var b = this.OffsetTable[0] / 2;
			this.NumGlyphs = b;
			for (var c = 1; c < b; c++) this.OffsetTable.push(a.readUI16());
			this.GlyphShapeTable = [];
			for (c = 0; c < b; c++) this.GlyphShapeTable.push(a.readSHAPE())
		},
		evaluate: function (a) {
			this.CodeTable = [];
			for (var b in this.GlyphShapeTable) this.CodeTable.push(b);
			this.FontName = "font-no-info-" + this.FontId;
			this.FontFlagsItalic = this.FontFlagsBold = false;
			a.fontsWithoutInfo[this.FontId] =
			this;
			b = (new fljs.swf.build.FontBuilder(this, a)).buildDef();
			a.defineFont2(this.FontId, this.GlyphShapeTable, b, this.FontName, this.FontFlagsBold, this.FontFlagsItalic, this.CodeTable)
		}
	});
	fljs.swf.tag.SetBackgroundColor = function () {};
	fljs.addMethods(fljs.swf.tag.SetBackgroundColor, {
		read: function (a) {
			this.BackgroundColor = a.readRGB()
		},
		evaluate: function (a) {
			a.stage.setBackgroundColor_((this.BackgroundColor.Red << 16) + (this.BackgroundColor.Green << 8) + this.BackgroundColor.Blue)
		}
	});
	fljs.swf.tag.DoAbc = function () {};
	fljs.addMethods(fljs.swf.tag.DoAbc, {
		read: function (a, b) {
			var c = a.stream.byteIndex;
			this.Flags = a.readUI32();
			this.Name = a.readString();
			b = b.TagLength - (a.stream.byteIndex - c);
			c = [];
			for (var d = 0; d < b; d++) c.push(String.fromCharCode(a.readUB()));
			this.AbcData = c.join("")
		},
		evaluate: function () {}
	});
	fljs.swf.tag.SoundStreamBlock = function () {};
	fljs.addMethods(fljs.swf.tag.SoundStreamBlock, {
		read: function (a, b) {
			this.SampleCount = a.readUI16();
			this.Mp3SoundData = a.readMp3SoundData(b.TagLength - 2)
		},
		evaluate: function (a, b, c, d) {
			if (d == a.mainTimeline) if (b = d.audioStream) {
				b.shouldBuffer() && b.buffer();
				c = a.mainTimeline.currentFrameIndex_;
				if (!b.playing && b.frameShouldPlay(c)) {
					b.playFrame(c);
					a.sync.start(c)
				}
			}
		},
		duration: function () {
			var a = 0;
			for (var b in this.Mp3SoundData.Mp3Frames) {
				var c = this.Mp3SoundData.Mp3Frames[b],
					d;
				d = c.MpegVersion == 3 ? 1152 : 576;
				var e = {
					0: 11025,
					1: 12E3,
					2: 8E3
				}[c.SamplingRate];
				e *= {
					0: 1,
					2: 2,
					3: 4
				}[c.MpegVersion];
				a += 1E3 * d / e / (c.ChannelMode == 3 ? 1 : 2)
			}
			return a
		}
	});
	fljs.swf.SwfStreamingSoundReader = function (a, b) {
		this.stream = new fljs.swf.SwfStream(new fljs.swf.StringStream(a));
		this.container = b;
		b.soundStream = this;
		this.tagMap = {
			19: fljs.swf.tag.SoundStreamBlock
		};
		this.currentTimeOffset = this.currentPlayer = 0;
		this.data = [];
		this.dataDurations = [];
		this.container.needAudio();
		for (a = 0; a < 2; a++) {
			b = this.container.audio[a];
			b.currentTimeOffset = 0;
			b.addEventListener("load", fljs.bind(this.onLoadSrc, this, a), true)
		}
		this.lastBufferAt = null;
		this.swfFrames = {};
		this.duration = this.swfFrameNum =
		0;
		this.playing = false;
		this.nextTime = null;
		this.waitingForLoad = false;
		this.dataOffset = 0;
		this.player = fljs.Player.getInstance()
	};
	fljs.addMethods(fljs.swf.SwfStreamingSoundReader, {
		controlFrame: function () {},
		timeDiff: function (a) {
			var b = this.container.audio[this.currentPlayer];
			return 1E3 * (b.currentTime + b.currentTimeOffset) - this.swfFrames[a]
		},
		currentTime: function () {
			var a = this.container.audio[this.currentPlayer];
			return 1E3 * (a.currentTime + a.currentTimeOffset)
		},
		play: function (a) {
			a = this.swfFrames[a];
			if (a == null) a = 0;
			a /= 1E3;
			this.nextTime = a;
			this.playing = true;
			if (!this.waitingForLoad) {
				var b = this.container.audio[this.currentPlayer];
				b.currentTime =
				a - b.currentTimeOffset;
				b.fljsPlaying = true;
				this.player.playing && b.play()
			}
		},
		stop: function () {
			this.playing = false;
			var a = this.container.audio[this.currentPlayer];
			a.fljsPlaying = false;
			a.pause()
		},
		silence: function () {
			return ""
		},
		onLoadSrc: function (a) {
			var b = this.container.audio[a],
				c = this.container.audio[1 - a];
			b.fljsWaiting = false;
			if (this.nextTime != null) {
				b.currentTime = this.nextTime - b.currentTimeOffset;
				this.nextTime = null
			} else b.currentTime = c.currentTime + c.currentTimeOffset - b.currentTimeOffset;
			if (this.playing) {
				b.fljsPlaying =
				true;
				this.player.playing && b.play()
			}
			c.fljsPlaying = false;
			c.pause();
			this.currentPlayer = a;
			this.waitingForLoad = false
		},
		processBlock: function (a, b) {
			a = new fljs.swf.StringStream(this.stream.stream.buffer);
			a.byteIndex = b.Mp3SoundData.byteIndex;
			a = a.readBytes(b.Mp3SoundData.byteCount).join("");
			this.data.push(String(a));
			if (b.SampleCount) {
				a = b.duration();
				b = a * (b.Mp3SoundData.SeekSamples / b.SampleCount);
				this.swfFrames[this.swfFrameNum] = this.duration + b;
				this.sync && this.sync.setFrameTime(this.swfFrameNum, this.duration + b);
				this.duration += a
			} else a = 0;
			this.dataDurations.push(a / 1E3);
			this.blocks += 1;
			return this.blocks < fljs.swf.SwfStreamingSoundReader.bufferBlocks
		},
		buffer: function () {
			this.blocks = 0;
			this.readTags(fljs.bind(this.processBlock, this), this.stream.stream.byteIndex);
			for (var a = this.container.audio[this.currentPlayer], b = this.container.audio[1 - this.currentPlayer]; this.currentTimeOffset + this.dataDurations[this.dataOffset] < a.currentTime + a.currentTimeOffset;) {
				this.currentTimeOffset += this.dataDurations[this.dataOffset];
				this.dataOffset += 1
			}
			a = "data:audio/mpeg;base64," + btoa(this.data.slice(this.dataOffset).join(""));
			b.currentTimeOffset = this.currentTimeOffset;
			b.setAttribute("src", a);
			this.waitingForLoad = true;
			b.fljsWaiting = true;
			b.load();
			this.lastBufferAt = fljs.now()
		},
		readTags: function (a, b) {
			var c = fljs.console("soundstream");
			if (b) this.stream.stream.seek(b);
			else this.stream.header = this.stream.readSwfHeader();
			for (var d, e; this.stream.hasMore();) {
				d = this.stream.readRecordHeader();
				e = this.tagMap[d.TagType];
				b = this.stream.stream.byteIndex;
				if (e) {
					e = new e;
					e.read(this.stream, d, this, a, fljs.Player.getInstance().stage);
					if (!a(d, e)) return
				} else {
					this.stream.skipBytes(d.TagLength);
					if (d.TagType == 1) this.swfFrameNum += 1
				}
				if (this.stream.stream.byteIndex != b + d.TagLength) {
					c.info("expected " + (b + d.TagLength) + " but got " + this.stream.stream.byteIndex);
					return
				}
			}
		}
	});
	fljs.swf.SwfStreamingSoundReader.rebufferDuration = 9E4;
	fljs.swf.SwfStreamingSoundReader.bufferBlocks = 4500;
	fljs.swf.tag.SoundStreamHead = function () {};
	fljs.addMethods(fljs.swf.tag.SoundStreamHead, {
		read: function (a) {
			a.readUB(4);
			this.PlaybackSoundRate = a.readUB(2);
			this.PlaybackSoundSize = a.readUB(1);
			this.PlaybackSoundType = a.readUB(1);
			this.StreamSoundCompression = a.readUB(4);
			this.StreamSoundRate = a.readUB(2);
			this.StreamSoundSize = a.readUB(1);
			this.StreamSoundType = a.readUB(1);
			this.StreamSoundSampleCount = a.readUI16();
			if (this.StreamSoundCompression == 2) this.LatencySeek = a.readSI16()
		},
		evaluate: function (a, b, c, d) {
			if (!this.processed) {
				d.soundStreamHead = this;
				if (d == a.mainTimeline) {
					d.audioStream = fljs.agent.browser == "Firefox" ? new fljs.player.ExtAudioStream(a, d, "audio/" + a.name + "-" + (d.def ? d.def.defId : "main") + ".wav") : new fljs.player.SwfAudioStream(a, d);
					a.sync = new fljs.player.AudioSync(a.header.FrameRate);
					a.sync.setAudio(d.audioStream);
					d.audioStream.buffer()
				}
				this.processed = true
			}
		}
	});
	fljs.swf.tag.DefineFont2 = function () {};
	fljs.addMethods(fljs.swf.tag.DefineFont2, {
		read: function (a) {
			var b;
			this.FontId = a.readUI16();
			this.FontFlagsHasLayout = a.readUB(1);
			this.FontFlagsShiftJIS = a.readUB(1);
			this.FontFlagsSmallText = a.readUB(1);
			this.FontFlagsANSI = a.readUB(1);
			this.FontFlagsWideOffsets = a.readUB(1);
			this.FontFlagsWideCodes = a.readUB(1);
			a.FontFlagsWideCodes = this.FontFlagsWideCodes;
			this.FontFlagsItalic = a.readUB(1);
			this.FontFlagsBold = a.readUB(1);
			this.LanguageCode = a.readLangCode();
			this.FontNameLen = a.readUI8();
			var c = [];
			for (b = 0; b < this.FontNameLen; b++) c.push(String.fromCharCode(a.readUI8()));
			this.FontName = c.join("");
			this.NumGlyphs = a.readUI16();
			this.OffsetTable = [];
			if (this.FontFlagsWideOffsets) {
				for (b = 0; b < this.NumGlyphs; b++) this.OffsetTable.push(a.readUI32());
				this.CodeTableOffset = a.readUI32()
			} else {
				for (b = 0; b < this.NumGlyphs; b++) this.OffsetTable.push(a.readUI16());
				this.CodeTableOffset = a.readUI16()
			}
			this.GlyphShapeTable = [];
			for (b = 0; b < this.NumGlyphs; b++) this.GlyphShapeTable.push(a.readShape());
			this.CodeTable = [];
			if (this.FontFlagsWideCodes) for (b = 0; b < this.NumGlyphs; b++) this.CodeTable.push(a.readUI16());
			else for (b = 0; b < this.NumGlyphs; b++) this.CodeTable.push(a.readUI8());
			if (this.FontFlagsHasLayout) {
				this.FontAscent = a.readSI16();
				this.FontDescent = a.readSI16();
				this.FontLeading = a.readSI16();
				this.FontAdvanceTable = [];
				for (b = 0; b < this.NumGlyphs; b++) this.FontAdvanceTable.push(a.readSI16());
				this.FontBoundsTable = [];
				for (b = 0; b < this.NumGlyphs; b++) {
					this.FontBoundsTable.push(a.readRECT());
					a.stream.align()
				}
				this.KerningCount = a.readUI16();
				this.FontKerningTable = [];
				for (b = 0; b < this.KerningCount; b++) this.FontKerningTable.push(a.readKerningRecord())
			}
		},
		evaluate: function (a) {
			var b = (new fljs.swf.build.FontBuilder(this, a)).buildDef();
			a.defineFont2(this.FontId, this.GlyphShapeTable.length, b, this.FontName, this.FontFlagsBold, this.FontFlagsItalic, this.CodeTable, this)
		}
	});
	flash.text = {};
	flash.text.TextFormatAlign = function () {};
	fljs.addConstants(flash.text.TextFormatAlign, {
		CENTER: "center",
		JUSTIFY: "justify",
		LEFT: "left",
		RIGHT: "right"
	});
	flash.text.TextFormat = function (a, b, c, d, e, f, g, j, h, m, k, l, n, p) {
		if (typeof a == "undefined") a = null;
		this.font = a;
		if (typeof b == "undefined") b = null;
		this.size = b;
		if (typeof c == "undefined") c = null;
		this.color = c;
		if (typeof d == "undefined") d = null;
		this.bold = d;
		if (typeof e == "undefined") e = null;
		this.italic = e;
		if (typeof f == "undefined") f = null;
		this.underline = f;
		if (typeof g == "undefined") g = null;
		this.url = g;
		if (typeof j == "undefined") j = null;
		this.target = j;
		if (typeof h == "undefined") h = flash.text.TextFormatAlign.LEFT;
		this.align = h;
		if (typeof m == "undefined") m = null;
		this.leftMargin = m;
		if (typeof k == "undefined") k = null;
		this.rightMargin = k;
		if (typeof l == "undefined") l = null;
		this.indent = l;
		if (typeof n == "undefined") n = null;
		this.leading = n;
		if (typeof p == "undefined") p = 1;
		this.alpha = p
	};
	flash.text.TextField = function () {
		flash.display.InteractiveObject.call(this);
		var a = this.element_ = new fljs.dom.Element;
		a.create(fljs.dom.Namespace.Svg, "g");
		this._clipElement.element.appendChild(this.element_.getElement());
		this.font_ = {
			family: "times",
			size: 12
		};
		this.fill_ = {
			color: 0
		};
		this.textFormat_ = new flash.text.TextFormat(this.font_.family, this.font_.size, this.fill_.color, false, false, false, null, null, flash.text.TextFormatAlign.LEFT, 0, 0, 0, 0);
		if (fljs.Player.getInstance().renderTextAsGlyphs) {
			a = Math.round(this.font_.size * 0.85);
			var b = Math.round(0 - this.font_.size / 2 + a);
			a = this._text = this.text_ = new fljs.dom.Element;
			a.create(fljs.dom.Namespace.Svg, "text");
			a.sets([
				[null, "fill", this.__colorToSvgString(this.font_.color)],
				[null, "font-family", this.font_.family],
				[null, "font-size", this.font_.size],
				[null, "font-family", this.font_.family],
				[null, "x", 0],
				[null, "y", b]
			]);
			a.update();
			this.element_.append(a)
		} else {
			a = this._text = new fljs.dom.Element;
			a.create(fljs.dom.Namespace.Svg, "g");
			a.update();
			this.element_.append(a)
		}
		this._textContent = ""
	};
	fljs.inherits(flash.text.TextField, flash.display.InteractiveObject);
	fljs.addMethods(flash.text.TextField, {
		setTextMatrix: function (a) {
			this._textMatrix = a;
			this._text.set(null, 'transform', a.__toSvgString());
			this._text.update()
		},
		__setSpans: function (a) {
			var b = [];
			this.spans = [];
			if (fljs.Player.getInstance().renderTextAsGlyphs) {
				var c = this.text_.getElement().ownerDocument;
				for (var d in a) {
					var e = a[d],
						f = c.createElementNS("http://www.w3.org/2000/svg", "tspan"),
						g = e.format.indent,
						j = [g];
					for (var h in e.advances) {
						g += e.advances[h];
						j.push(g)
					}
					f.appendChild(c.createTextNode(e.text));
					f.setAttributeNS(null, "x", j.join(" "));
					f.setAttributeNS(null, "y", e.format.leading);
					f.setAttributeNS(null, "font-size", e.format.size);
					f.setAttributeNS(null, "fill", this.__colorToSvgString(e.format.color));
					f.setAttributeNS(null, "fill-opacity", this.textOpacityWithXform(e.format.alpha));
					this.text_.getElement().appendChild(f);
					this.spans.push({
						def: e,
						element: f
					});
					b.push(e.text)
				}
			} else {
				fljs.Player.getInstance();
				c = this._text;
				for (d in a) {
					e = a[d];
					f = e.format;
					j = e.advances;
					var m = new fljs.dom.Element;
					m.create(fljs.dom.Namespace.Svg, "g");
					m.sets([
						["transform", ["translate(", f.indent, ",", f.leading, ")"].join("")],
						["fill", this.__colorToSvgString(f.color)],
						["fill-opacity", this.opacityWithXform(f.alpha)]
					]);
					m.update();
					h = g = 0;
					for (var k = e.text.length; h < k; h++) {
						var l = new fljs.dom.Element;
						l.create(fljs.dom.Namespace.Svg, "use");
						var n = ["font", f.fontid, f.bold, f.italic, e.text.charCodeAt(h)].join("-");
						l.sets([
							[fljs.dom.Namespace.Xlink, "xlink:href", "#" + n],
							["transform", ["translate(", g, ")scale(", f.size * 20 / 1024, ")"].join("")]
						]);
						l.update();
						m.append(l);
						g += j[h]
					}
					c.append(m);
					this.spans.push({
						def: e,
						element: m
					});
					b.push(e.text)
				}
			}
			this._textContent = b.join("")
		},
		__colorToSvgString: function (a) {
			var b =
			a >> 16 & 255,
				c = a >> 8 & 255;
			a = a & 255;
			var d = this.getTransform().getConcatenatedColorTransform();
			if (!d.__default) {
				b = Math.max(0, Math.min(255, Math.round(b * d.redMultiplier + d.redOffset)));
				c = Math.max(0, Math.min(255, Math.round(c * d.greenMultiplier + d.greenOffset)));
				a = Math.max(0, Math.min(255, Math.round(a * d.blueMultiplier + d.blueOffset)))
			}
			return "rgb(" + [b, c, a] + ")"
		},
		opacityWithXform: function (a) {
			return a
		},
		textOpacityWithXform: function (a) {
			var b = this.getTransform().getConcatenatedColorTransform();
			return b.__default ? a : Math.max(0, Math.min(255, Math.round(a * 255 * b.alphaMultiplier + b.alphaOffset))) / 255
		},
		__setColorTransform: function (a) {
			if (fljs.Player.getInstance().renderTextAsGlyphs) for (var b in this.spans) {
				var c = this.spans[b];
				a = c.def;
				c = c.element;
				c.setAttributeNS(null, "color", this.__colorToSvgString(a.format.color));
				c.setAttributeNS(null, "fill-opacity", this.textOpacityWithXform(a.format.alpha))
			} else {
				fljs.base(this, "__setColorTransform", a);
				for (b in this.spans) {
					c = this.spans[b];
					a = c.def;
					c = c.element;
					c.sets([
						[null, "color", this.__colorToSvgString(a.format.color)]
					]);
					c.update()
				}
			}
		},
		setHeight: function (a) {
			this.height_ = a
		},
		setWidth: function (a) {
			this.width_ = a
		},
		getDefaultTextFormat: function () {
			return this.textFormat_
		},
		setDefaultTextFormat: function (a) {
			if (fljs.Player.getInstance().renderTextAsGlyphs) {
				var b = this.textFormat_;
				this.textFormat_ = a;
				if (b.align != this.textFormat_.align) switch (this.textFormat_.align) {
				case flash.text.TextFormatAlign.LEFT:
					this.text_.getElement().setAttribute("x", this.x);
					this.text_.getElement().setAttribute("text-anchor", "start");
					break;
				case flash.text.TextFormatAlign.CENTER:
					this.text_.getElement().setAttribute("x", this.x + this.width / 2);
					this.text_.getElement().setAttribute("text-anchor", "middle");
					break;
				case flash.text.TextFormatAlign.LEFT:
					this.text_.getElement().setAttribute("x", this.x + this.width);
					this.text_.getElement().setAttribute("text-anchor", "end");
					break;
				default:
				}
				if (b.font != this.textFormat_.font) {
					a = fljs.Player.getInstance().lookupFontByStyle(this.textFormat_.font, this.textFormat_.bold, this.textFormat_.italic);
					this.text_.getElement().setAttributeNS(null, "font-family", a)
				}
				if (b.bold != this.textFormat_.bold) {
					a =
					this.textFormat_.bold ? "bold" : "";
					this.text_.getElement().setAttribute("font-weight", a)
				}
				if (b.italic != this.textFormat_.italic) {
					a = this.textFormat_.italic ? "italic" : "";
					this.text_.getElement().setAttribute("font-style", a)
				}
				if (b.color != this.textFormat_.color) {
					this.fill_ = {
						color: this.textFormat_.color
					};
					this.text_.set(null, "fill", this.__colorToSvgString(this.fill_.color))
				}
				if (b.size != this.textFormat_.size) {
					this.font_ = {
						size: this.textFormat_.size,
						family: this.textFormat_.font
					};
					this.text_.getElement().setAttribute("font-size", this.textFormat_.size)
				}
				b.alpha != this.textFormat_.alpha && this.text_.getElement().setAttribute("opacity", this.textFormat_.alpha)
			}
		}
	});
	fljs.swf.tag.DefineEditText = function () {};
	fljs.addMethods(fljs.swf.tag.DefineEditText, {
		read: function (a) {
			this.CharacterId = a.readUI16();
			this.Bounds = a.readRECT();
			a.stream.align();
			this.HasText = a.readUB(1);
			this.WordWrap = a.readUB(1);
			this.Multiline = a.readUB(1);
			this.Password = a.readUB(1);
			this.ReadOnly = a.readUB(1);
			this.HasTextColor = a.readUB(1);
			this.HasMaxLength = a.readUB(1);
			this.HasFont = a.readUB(1);
			this.HasFontClass = a.readUB(1);
			this.AutoSize = a.readUB(1);
			this.HasLayout = a.readUB(1);
			this.NoSelect = a.readUB(1);
			this.Border = a.readUB(1);
			this.WasStatic = a.readUB(1);
			this.HTML = a.readUB(1);
			this.UseOutlines = a.readUB(1);
			if (this.HasFont) this.FontId = a.readUI16();
			if (this.HasFontClass) this.FontClass = a.readString();
			if (this.HasFont) this.FontHeight = a.readUI16() / a.twipsPerPixel;
			if (this.HasTextColor) this.TextColor = a.readRGBA();
			if (this.HasMaxLength) this.MaxLength = a.readUI16();
			if (this.HasLayout) {
				this.Align = a.readUI8();
				this.LeftMargin = a.readUI16();
				this.RightMargin = a.readUI16();
				this.Indent = a.readUI16();
				this.Leading = a.readUI16()
			}
			this.VariableName = a.readString();
			if (this.HasText) this.InitialText = a.readString()
		},
		evaluate: function (a) {
			a.addDefinition(this, this.CharacterId)
		},
		_build: function (a) {
			a = a.element.getElement().ownerDocument;
			var b = a.createElement("text");
			b.setAttribute("font-family", "font-" + String(this.FontId));
			b.setAttribute("font-size", this.FontHeight);
			var c = this.TextColor,
				d = 0;
			d += c.Red << 16;
			d += c.Green << 8;
			d += c.Blue;
			b.setAttribute("fill", d);
			var e, f;
			if (this.Align) {
				if (this.Align == 1) {
					e = this.Bounds.Xmax;
					f = "end"
				}
			} else {
				e = this.Bounds.Xmin;
				f = "start"
			}
			b.setAttribute("x", e);
			b.setAttribute("text-anchor", f);
			b.setAttribute("y", this.Bounds.Ymax);
			b.appendChild(a.createTextNode(this.InitialText ? this.InitialText : ""));
			return b
		},
		build: function (a, b) {
			return this._buildTextField(a, b)
		},
		_buildTextField: function (a, b) {
			var c = new flash.text.TextField;
			b && c.getTransform().setColorTransform(b);
			c.text = this.InitialText;
			c.x = this.Bounds.Xmin;
			c.y = this.Bounds.Ymin;
			c.setWidth(this.Bounds.Xmax - this.Bounds.Xmin);
			c.setHeight(this.Bounds.Ymax - this.Bounds.Ymin);
			b = new flash.text.TextFormat;
			switch (this.Align) {
			case 0:
				b.align = flash.text.TextFormatAlign.LEFT;
				break;
			case 1:
				b.align = flash.text.TextFormatAlign.RIGHT;
				break;
			case 2:
				b.align = flash.text.TextFormatAlign.CENTER;
				break;
			case 3:
				b.align = flash.text.TextFormatAlign.JUSTIFY;
				break
			}
			if (a = a.fonts2[this.FontId]) {
				b.bold = a.bold;
				b.italic = a.italic;
				b.font = a.name
			}
			a = this.TextColor;
			var d = 0;
			d += a.Red << 16;
			d += a.Green << 8;
			d += a.Blue;
			b.color = d;
			b.leading = this.Leading;
			b.leftMargin = this.LeftMargin;
			b.rightMargin = this.RightMargin;
			b.indent = this.Indent;
			b.size = this.FontHeight;
			c.setDefaultTextFormat(b);
			return c
		}
	});
	fljs.swf.tag.RemoveObject2 = function () {};
	fljs.addMethods(fljs.swf.tag.RemoveObject2, {
		read: function (a) {
			this.Depth = a.readUI16()
		},
		evaluate: function (a, b, c, d) {
			d.removeChildAt(this.Depth)
		}
	});
	fljs.swf.build.JpegBuilder = function () {};
	fljs.addMethods(fljs.swf.build.JpegBuilder, {
		parseJpeg: function (a, b, c, d) {
			b = String(b.readBytes(c).join(""));
			var e = new fljs.swf.BigEndianStringStream(b),
				f, g, j = fljs.Player.getInstance(),
				h;
			if (e.nextUShort() == 65497) {
				h = d && j.jpegTables ? 6 : 4;
				e.nextUShort();
				e.nextUShort()
			} else h = d && j.jpegTables ? 2 : 0;
			for (var m = 0; e.byteIndex < c;) {
				f = e.nextUShort();
				g = e.nextUShort();
				if (f == 65472) {
					e.nextUByte();
					a.Height = e.nextUShort();
					a.Width = e.nextUShort();
					break
				}
				if (f == 65497) m = e.byteIndex - 6;
				else e.skipBytes(g - 2)
			}
			if (m) b = b.substr(0, m) + b.substr(m + 6);
			if (h) b = b.substr(h);
			a.DataUri = "data:image/jpeg;base64," + btoa((d && j.jpegTables ? j.jpegTables : "") + b)
		},
		parseJpegTables: function (a, b, c) {
			b = String(b.readBytes(c).join(""));
			var d = new fljs.swf.BigEndianStringStream(b),
				e = 0;
			if (d.nextUShort() == 65497) {
				e = 4;
				d.nextUShort();
				d.nextUShort()
			}
			a.JpegTables = b.substr(e, c - e - 2)
		}
	});
	fljs.swf.tag.DefineBitsJPEG2 = function () {};
	fljs.addMethods(fljs.swf.tag.DefineBitsJPEG2, {
		read: function (a, b) {
			this.CharacterId = a.readUI16();
			b = b.TagLength - 2;
			(new fljs.swf.build.JpegBuilder).parseJpeg(this, a, b, true)
		},
		evaluate: function (a) {
			this.defId = "image" + this.CharacterId;
			a.addDefinition(this, this.CharacterId);
			a = new fljs.swf.def.BitmapDef;
			a.setCharaId(this.defId);
			a.element.sets([
				[fljs.dom.Namespace.Xlink, "xlink:href", this.DataUri],
				[null, "x", 0],
				[null, "y", 0],
				[null, "width", this.Width],
				[null, "height", this.Height]
			]);
			a.define();
			this.def = a
		}
	});
	flash.display.Sprite = function () {
		flash.display.DisplayObjectContainer.call(this)
	};
	fljs.inherits(flash.display.Sprite, flash.display.DisplayObjectContainer);
	fljs.addMethods(flash.display.Sprite, {
		startDrag: function () {},
		stopDrag: function () {},
		getGraphics: function () {
			return this.graphics_
		}
	});
	flash.display.Scene = function () {};
	flash.ui = {};
	flash.ui.Keyboard = function () {};
	fljs.addStaticMethods(flash.ui.Keyboard, {
		isAccessible: function () {}
	});
	fljs.addConstants(flash.ui.Keyboard, {
		BACKSPACE: 8,
		CAPS_LOCK: 20,
		CONTROL: 17,
		DELETE: 46,
		DOWN: 40,
		END: 35,
		ENTER: 13,
		ESCAPE: 27,
		F1: 112,
		F10: 121,
		F11: 122,
		F12: 123,
		F13: 124,
		F14: 125,
		F15: 126,
		F2: 113,
		F3: 114,
		F4: 115,
		F5: 116,
		F6: 117,
		F7: 118,
		F8: 119,
		F9: 120,
		HOME: 36,
		INSERT: 45,
		LEFT: 37,
		NUMPAD_0: 96,
		NUMPAD_1: 97,
		NUMPAD_2: 98,
		NUMPAD_3: 99,
		NUMPAD_4: 100,
		NUMPAD_5: 101,
		NUMPAD_6: 102,
		NUMPAD_7: 103,
		NUMPAD_8: 104,
		NUMPAD_9: 105,
		NUMPAD_ADD: 107,
		NUMPAD_DECIMAL: 110,
		NUMPAD_DIVIDE: 111,
		NUMPAD_ENTER: 108,
		NUMPAD_MULTIPLY: 106,
		NUMPAD_SUBTRACT: 109,
		PAGE_DOWN: 34,
		PAGE_UP: 33,
		RIGHT: 39,
		SHIFT: 16,
		SPACE: 32,
		TAB: 9,
		UP: 38
	});
	fljs.swf.AudioStreamReader = function (a, b) {
		this.player = a;
		this.delegate = b;
		this.reader = new fljs.swf.TagReader(a.parser.reader.stream.stream.buffer);
		this.reader.readSwfHeader()
	};
	fljs.addMethods(fljs.swf.AudioStreamReader, {
		hasMore: function () {
			return this.reader.stream.hasMore()
		},
		read: function (a) {
			for (var b = 0, c = this.delegate, d = this.reader, e = [0]; d.stream.hasMore();) {
				var f = d.readTagHeader();
				switch (f.tagClass()) {
				case fljs.swf.tag.SoundStreamBlock:
					f = d.readTag(f);
					c.onSoundStreamBlockTag(f, null, e[0]);
					b++;
					if (b == a) return;
					break;
				case fljs.swf.tag.ShowFrame:
					f = d.readTag(f);
					c.onShowFrameTag(f, null, e[0]);
					e[0] += 1;
					break;
				default:
					d.skipTag(f);
					c.onUnknownTag && c.onUnknownTag(f, null, e[0]);
					break
				}
			}
		}
	});
	fljs.player = {};
	fljs.player.ResourceManager = function () {
		this.frames = {};
		this.res = {};
		this.streams = {};
		this.listeners = {}
	};
	fljs.addMethods(fljs.player.ResourceManager, {
		addToFrame: function (a, b) {
			this.frames[b] || (this.frames[b] = {});
			this.frames[b][a] = true;
			this.res[a] = b
		},
		remove: function (a) {
			if (this.listeners[a]) for (var b in this.listeners[a]) this.listeners[a][b](a);
			b = this.res[a];
			delete this.listeners[a];
			delete this.frames[b][a];
			delete this.res[a]
		},
		addStream: function (a) {
			this.streams[a.id] = a
		},
		frameReady: function (a) {
			for (var b = 0; b <= a; b++) {
				var c = this.frames[a];
				if (c) for (var d in c) return false
			}
			for (b in this.streams) if (!this.streams[b].frameReady(a)) return false;
			return true
		},
		listen: function (a, b) {
			var c = this.listeners[a];
			c || (c = this.listeners[a] = []);
			c.push(b)
		},
		waiting: function (a) {
			return a in this.res
		},
		newId: function () {
			return fljs.player.ResourceManager.id++
		}
	});
	fljs.player.ResourceManager.id = 1;
	fljs.player.ExtAudioStream = function (a, b, c) {
		this.id = b.resources.newId();
		b.resources.addStream(this);
		b = this.audio = a.allocAudio();
		b.addEventListener("canplaythrough", fljs.bind(this.onAudioLoad, this), true);
		b.setAttribute("src", c);
		b.load();
		this.frames = {};
		this.playing = false;
		this.audioStreamReader = new fljs.swf.AudioStreamReader(a, this);
		this.duration = 0;
		this.maxFrame = -1
	};
	fljs.addMethods(fljs.player.ExtAudioStream, {
		pingLoad: function () {},
		frameReady: function (a) {
			if (this.maxFrame < a) return false;
			if (typeof this.frames[a] != "undefined") return true;
			else {
				for (a = a; a > 0 && typeof this.frames[a] == "undefined";) a--;
				return a == 0 ? true : this.frameReady(a)
			}
		},
		frameShouldPlay: function (a) {
			for (a = a; a > 0;) {
				if (a in this.frames) return !!this.frames[a];
				a--
			}
			return false
		},
		setFrameDuration: function (a, b) {
			this.frames[a] = b
		},
		onAudioLoad: function () {
			fljs.console("audio").info("onAudioLoad: " + this.audio.readyState + ", " + this.audio.duration);
			if (!this.started && this.playing) {
				this.audio.currentTime = this.frames[this.frame];
				this.audio.play()
			}
			this.started = true
		},
		playFrame: function (a) {
			fljs.console("audio").info("playFrame:" + this.audio.readyState);
			if (this.audio.readyState >= 2) {
				this.frame = a;
				this.audio.currentTime = this.frames[a];
				this.audio.play();
				this.started = true
			}
			this.playing = true
		},
		pause: function () {
			this.audio.pause();
			this.playing = false
		},
		controlsFrame: function () {},
		currentTime: function () {
			return this.audio.currentTime * 1E3
		},
		setSync: function (a) {
			this.sync = a
		},
		shouldBuffer: function () {
			var a = fljs.now() - this.lastBufferAt;
			return !this.lastBufferAt || a > fljs.swf.SwfStreamingSoundReader.rebufferDuration
		},
		buffer: function () {
			var a = this.audioStreamReader;
			a.hasMore() && a.read(fljs.swf.SwfStreamingSoundReader.bufferBlocks);
			this.lastBufferAt = fljs.now()
		},
		onSoundStreamBlockTag: function (a, b, c) {
			this.maxFrame = c;
			b = a.duration();
			a = this.duration + b * (a.Mp3SoundData.SeekSamples / a.SampleCount);
			this.frames[c] = a / 1E3;
			this.duration += b;
			this.sync.setFrameTime(c, a)
		},
		onShowFrameTag: function () {}
	});
	fljs.player.SwfAudioStream = function (a, b) {
		this.id = b.resources.newId();
		b.resources.addStream(this);
		this.player = a;
		this.target = b;
		this.soundStream = new fljs.swf.SwfStreamingSoundReader(a.parser.reader.stream.stream.buffer, b);
		this.playing = false
	};
	fljs.addMethods(fljs.player.SwfAudioStream, {
		pingLoad: function () {},
		frameReady: function (a) {
			if (typeof this.soundStream.swfFrames[a] != "undefined") return this.soundStream.duration >= this.soundStream.swfFrames[a];
			else {
				for (a = a; a > 0 && typeof this.soundStream.swfFrames[a] == "undefined";) a--;
				return a == 0 ? true : this.frameReady(a)
			}
		},
		frameShouldPlay: function (a) {
			for (a = a; a > 0;) {
				if (a in this.soundStream.swfFrames) return true;
				a--
			}
			return false
		},
		setFrameDuration: function () {},
		playFrame: function (a) {
			this.soundStream.play(a);
			this.playing = true
		},
		pause: function () {
			this.soundStream.stop();
			this.playing = false
		},
		controlsFrame: function (a) {
			return this.soundStream.controlFrame(a)
		},
		timeDiff: function (a) {
			return this.soundStream.timeDiff(a)
		},
		currentTime: function () {
			return this.soundStream.currentTime()
		},
		setSync: function (a) {
			this.soundStream.sync = a
		},
		shouldBuffer: function () {
			var a = fljs.now() - this.soundStream.lastBufferAt;
			return !this.soundStream.lastBufferAt || a > fljs.swf.SwfStreamingSoundReader.rebufferDuration
		},
		buffer: function () {
			this.soundStream.buffer()
		}
	});
	flash.display.MovieClip = function () {
		flash.display.Sprite.call(this);
		var a = new flash.display.Scene;
		a.labels = [];
		a.name = "Scene 1";
		a.numFrames = 1;
		this.frameData_ = [{
			scripts: [],
			parts: [],
			tags: [],
			label: "",
			repeat: false
		}];
		this.labels_ = {};
		this.sceneIndices_ = {};
		this.currentSceneIndex_ = 0;
		this.scenes_ = [a];
		this.currentFrameIndex_ = 0;
		this.currentLabel_ = null;
		this._enabled = false;
		this.totalFrames_ = this.framesLoaded_ = 1;
		this.next_ = null;
		this.playing_ = true;
		this.audio = [];
		fljs.Player.getInstance();
		this.id = flash.display.MovieClip.id++;
		this.element_.getElement().setAttribute("id", "mc" + this.id);
		this.__buttonStateDown = this.__buttonStateOver = this.firstFrame = false;
		this.resources = new fljs.player.ResourceManager
	};
	fljs.inherits(flash.display.MovieClip, flash.display.Sprite);
	fljs.addMethods(flash.display.MovieClip, {
		gotoAndPlay: function (a, b) {
			this.gotoAnd_(a, b, true)
		},
		gotoAndStop: function (a, b) {
			this.gotoAnd_(a, b, false)
		},
		gotoAnd_: function (a, b, c) {
			var d, e;
			if (typeof a.valueOf() == "string") if (d = this.labels_[a]) {
				d = d.frame - 1;
				e = 0
			} else return;
			else if (!b) {
				d = a - 1;
				if (d == -1) d = 0;
				a = this.globalFrameIndexToLocal_(d);
				d = a[0];
				e = a[1]
			}
			this.next_ = {
				frameIndex: d,
				sceneIndex: e,
				play: c
			};
			this.next_.clear = d != this.currentFrameIndex_ + 1
		},
		globalFrameIndexToLocal_: function (a) {
			for (var b = 0; a >= this.scenes_[b].numFrames;) {
				a -= this.scenes_[b].numFrames;
				b += 1
			}
			return [a, b]
		},
		nextFrame: function () {
			var a = this.currentFrameIndex_ + 1,
				b = this.currentSceneIndex_;
			if (a == this.scenes_[this.currentSceneIndex_].numFrames) if (this.totalFrames_ > 1) {
				a = 0;
				b += 1;
				if (b == this.scenes_.length) b = 0
			} else {
				this.next_ = null;
				return
			}
			this.next_ = {
				frameIndex: a,
				sceneIndex: b,
				play: this.next_ ? this.next_.play : this.playing_
			}
		},
		nextScene: function () {
			var a = this.currentSceneIndex_ + 1;
			if (a == this.scenes_.length) a = 0;
			this.next_ = {
				frameIndex: 0,
				sceneIndex: a,
				play: true
			}
		},
		play: function () {
			this.next_ =
			this.next_ ? {
				frameIndex: this.next_.frameIndex,
				sceneIndex: this.next_.sceneIndex,
				play: true,
				clear: this.next_.clear
			} : {
				frameIndex: this.currentFrameIndex_,
				sceneIndex: this.currentSceneIndex_,
				play: true
			}
		},
		prevFrame: function () {
			var a = this.currentFrameIndex_ - 1,
				b = this.currentSceneIndex_;
			if (a == -1) {
				b -= 1;
				if (b == -1) b = this.scenes_.length - 1;
				a = this.scenes_[b].numFrames - 1
			}
			this.next_ = {
				frameIndex: a,
				sceneIndex: b,
				play: this.next_ ? this.next_.play : this.playing_
			}
		},
		prevScene: function () {
			var a = this.currentSceneIndex_ - 1;
			if (a == -1) a = this.scenes_.length - 1;
			frameIndex = this.scenes_[a].numFrames - 1;
			this.next_ = {
				frameIndex: frameIndex,
				sceneIndex: a,
				play: true
			}
		},
		stop: function () {
			var a;
			if (this.next_) a = this.next_.clear;
			this.next_ = {
				frameIndex: this.currentFrameIndex_,
				sceneIndex: this.currentSceneIndex_,
				play: false,
				stop: true,
				clear: a
			}
		},
		clear: function () {
			for (var a in this.displayList_) this.removeChildAt(a)
		},
		onNewFrame: function () {
			if (this.getStage()) if (this.frameReady(this.currentFrameIndex_)) {
				this.pendingFrame = false;
				var a = this.frameData_[this.currentFrameIndex_];
				if (a.label) this.currentLabel_ = a.label;
				for (var b = 0; b < a.tags.length; b++) {
					var c = a.tags[b];
					c[0] && c[0].evaluate(fljs.Player.getInstance(), null, null, this)
				}
				if (a.parts) for (b in a.parts) this.addChildAt(a.parts[b], b)
			} else this.pendingFrame = true
		},
		onEnterFrame: function () {
			var a = false;
			if (a = this.pendingFrame ? true : this.pickNextFrame()) {
				this.onNewFrame();
				if (this.pendingFrame) return
			}(a = this._as2Object) && a._onEnterFrame && fljs.Player.getInstance().interpreter.callback(a, a._onEnterFrame)
		},
		onCreate: function () {
			this.next_ = {
				frameIndex: 0,
				sceneIndex: 0,
				play: !this._enabled && this.totalFrames_ > 1
			};
			this.setCurrentFrame();
			this.onNewFrame()
		},
		setCurrentFrame: function () {
			this.updateSoundStream();
			this.currentFrameIndex_ = this.next_.frameIndex;
			this.currentSceneIndex_ = this.next_.sceneIndex;
			this.playing_ = this.next_.play;
			this.next_ = null
		},
		pickNextFrame: function () {
			if (this.playing_) if (!this.next_) {
				var a = this.currentFrameIndex_ + 1,
					b = this.currentSceneIndex_;
				if (a == this.scenes_[this.currentSceneIndex_].numFrames) if (a == this.totalFrames_) if (this.totalFrames_ > 1) {
					this.clear();
					this.next_ = {
						frameIndex: 0,
						sceneIndex: 0,
						play: true
					}
				} else {
					this.playing_ = false;
					this.next_ = null
				} else this.next_ = {
					frameIndex: a,
					sceneIndex: b + 1,
					play: true
				};
				else this.next_ = {
					frameIndex: a,
					sceneIndex: b,
					play: this.playing_
				}
			}
			if (this.next_) if (this._enabled) this.next_.play = false;
			a = this.next_ && !this.next_.stop && this.next_.frameIndex != this.currentFrameIndex_;
			if (this.next_) {
				a && this.next_.clear && this.removeChildren();
				this.setCurrentFrame();
				this.next_ = null
			}
			return a
		},
		onEnterFrame_: function (a) {
			fljs.console("mc").info("mc#" + this.id + " frame#" + this.currentFrameIndex_);
			this.onEnterFrame(a)
		},
		updateSoundStream: function () {
			if (this.audioStream) if (this.next_) if (this.next_.play != this.playing_) if (this.next_.playing) this.audioStream.frameShouldPlay(this.next_.frameIndex) && this.audioStream.playFrame(this.next_.frameIndex);
			else this.audioStream.pause();
			else this.next_.play && this.next_.frameIndex != this.currentFrameIndex_ + 1 && this.audioStream.frameShouldPlay(this.next_.frameIndex) && this.audioStream.playFrame(this.next_.frameIndex);
			else this.audioStream.pause()
		},
		addFrameScript: function () {
			for (var a, b, c = 0; c < arguments.length; c += 2) {
				a = arguments[c];
				b = this.globalFrameIndexToLocal_(a);
				a = b[0];
				b = b[1];
				this.scenes_[b].frameData_[a].scripts.push(arguments[c + 1])
			}
		},
		updateButtonState: function (a) {
			if (this._enabled) {
				var b = flash.events.MouseEvent,
					c = flash.events.KeyboardEvent,
					d, e;
				switch (a.type) {
				case b.CLICK:
					e = d = true;
					break;
				case b.MOUSE_OVER:
					d = true;
					e = this.__buttonStateDown;
					break;
				case b.MOUSE_OUT:
					d = false;
					e = this.__buttonStateDown;
					break;
				case b.MOUSE_DOWN:
					d = this.__buttonStateOver;
					e = true;
					break;
				case b.MOUSE_UP:
					d = this.__buttonStateOver;
					e = false;
					break;
				case c.KEY_DOWN:
					d = this.__buttonStateOver;
					e = true;
					break;
				case c.KEY_UP:
					d = this.__buttonStateOver;
					e = false;
					break
				}
				var f;
				if (this.__buttonStateOver != d) f = d ? e ? this.__buttonStateDown ? "CondOutDownToOverDown" : "CondIdleToOverDown" : "CondIdleToOverUp" : e ? "CondOverDownToOutDown" : "CondOverUpToIdle";
				else if (this.__buttonStateDown != e) if (e) {
					if (d) f = "CondOverUpToOverDown"
				} else f = d ? "CondOverDownToOverUp" : "CondOutDownToIdle";
				a = d ? e ? "down" : "over" : "up";
				this.__buttonStateOver =
				d;
				this.__buttonStateDown = e;
				this.gotoAndStop("_" + a);
				if (f) for (var g in this.__buttonActions) {
					d = this.__buttonActions[g];
					d[f] && fljs.Player.getInstance().doActions(this, d.Actions)
				}
			}
		},
		needAudio: function () {
			for (var a = fljs.Player.getInstance(), b = 0; b < 2; b++) this.audio[b] = a.allocAudio()
		},
		frameReady: function (a) {
			return this.frameData_[a] && this.frameData_[a].loaded && this.resources.frameReady(a)
		},
		getEnabled: function () {
			return this._enabled
		},
		setEnabled: function (a) {
			this._enabled = !! a
		}
	});
	flash.display.MovieClip.id = 1;
	fljs.swf.tag.DefineSprite = function () {};
	fljs.addMethods(fljs.swf.tag.DefineSprite, {
		read: function (a) {
			this.defId = this.SpriteId = a.readUI16();
			this.FrameCount = a.readUI16();
			this.frameData_ = [{
				tags: []
			}];
			this.labels_ = {};
			this.framesLoaded_ = 0;
			this.totalFrames_ = this.FrameCount
		},
		evaluate: function (a) {
			a.addDefinition(this, this.SpriteId)
		},
		build: function (a, b) {
			a = new flash.display.MovieClip;
			a.def = this;
			b && a.getTransform().setColorTransform(b);
			b = new flash.display.Scene;
			b.labels = [];
			b.name = "Scene 1";
			b.numFrames = this.FrameCount;
			a.frameData_ = [];
			for (var c = 0; c < this.FrameCount; c++) {
				var d = {
					scripts: [],
					parts: [],
					tags: [],
					label: ""
				};
				d.tags = this.frameData_[c].tags;
				d.loaded = this.frameData_[c].loaded;
				a.frameData_.push(d)
			}
			a.labels_ = this.labels_;
			a.sceneIndices_ = {};
			a.currentSceneIndex_ = 0;
			a.scenes_ = [b];
			a.currentFrameIndex_ = 0;
			a.currentLabel_ = null;
			a._enabled = false;
			a.framesLoaded_ = this.FrameCount;
			a.totalFrames_ = this.FrameCount;
			a.next_ = null;
			a.playing_ = true;
			return a
		}
	});
	fljs.swf.tag.DefineSound = function () {};
	fljs.addMethods(fljs.swf.tag.DefineSound, {
		read: function (a, b) {
			this.SoundId = a.readUI16();
			this.SoundFormat = a.readUB(4);
			this.SoundRate = a.readUB(2);
			this.SoundSize = a.readUB(1);
			this.SoundType = a.readUB(1);
			this.SoundSampleCount = a.readUI32();
			this.Mp3SoundData = this.SoundData = a.readMp3SoundData(b.TagLength - 2 - 1 - 4)
		},
		evaluate: function (a) {
			a.sounds[this.SoundId] = this
		}
	});
	fljs.swf.tag.StartSound = function () {};
	fljs.addMethods(fljs.swf.tag.StartSound, {
		read: function (a) {
			this.SoundId = a.readUI16();
			this.SoundInfo = a.readSoundInfo()
		},
		evaluate: function (a, b) {
			var c = a.sounds[this.SoundId];
			if (!c.player) {
				c.player = a.allocAudio();
				b = new fljs.swf.StringStream(a.reader.stream.stream.buffer);
				b.byteIndex = c.Mp3SoundData.byteIndex;
				b = b.readBytes(c.Mp3SoundData.byteCount).join("");
				b = "data:audio/mpeg;base64," + btoa(b);
				c.player.setAttribute("src", b)
			}
			var d = c.player;
			if (this.SoundInfo.SyncStop) {
				d.fljsPlaying = false;
				d.pause()
			} else if (this.SoundInfo.SyncNoMultiple) {
				d.fljsPlaying =
				true;
				a.playing && d.play()
			} else {
				d.addEventListener("load", function () {
					d.currentTime = 0;
					d.fljsPlaying = true;
					a.playing && d.play()
				}, true);
				d.load()
			}
		}
	});
	fljs.swf.tag.DefineShape2 = function () {};
	fljs.inherits(fljs.swf.tag.DefineShape2, fljs.swf.tag.DefineShape);
	fljs.addMethods(fljs.swf.tag.DefineShape2, {
		read: function (a, b) {
			a.beginContext(fljs.swf.tag.DefineShape2);
			a.endByteIndex = a.stream.byteIndex + b.TagLength;
			this.ShapeId = a.readUI16();
			this.ShapeBounds = a.readRECT();
			a.stream.align();
			this.Shapes = a.readSHAPEWITHSTYLE();
			a.endContext()
		}
	});
	fljs.swf.tag.SoundStreamHead2 = function () {};
	fljs.inherits(fljs.swf.tag.SoundStreamHead2, fljs.swf.tag.SoundStreamHead);
	fljs.swf.tag.DefineFontInfo = function () {};
	fljs.addMethods(fljs.swf.tag.DefineFontInfo, {
		read: function (a) {
			this.FontId = a.readUI16();
			this.FontNameLen = a.readUI8();
			var b = [];
			for (i = 0; i < this.FontNameLen; i++) b.push(String.fromCharCode(a.readUI8()));
			this.FontName = b.join("");
			a.readUB(2);
			this.FontFlagsSmallText = a.readUB(1);
			this.FontFlagsShiftJis = a.readUB(1);
			this.FontFlagsAnsi = a.readUB(1);
			this.FontFlagsItalic = a.readUB(1);
			this.FontFlagsBold = a.readUB(1);
			this.FontFlagsWideCodes = a.readUB(1);
			b = fljs.Player.getInstance().fontsWithoutInfo[this.FontId];
			this.CodeTable = [];
			if (this.FontFlagsWideCodes) for (i = 0; i < b.NumGlyphs; i++) this.CodeTable.push(a.readUI16());
			else for (i = 0; i < this.NumGlyphs; i++) this.CodeTable.push(a.readUI8());
			this.GlyphShapeTable = b.GlyphShapeTable
		},
		evaluate: function (a) {
			var b = (new fljs.swf.build.FontBuilder(this, a)).buildDef();
			a.defineFont2(this.FontId, this.GlyphShapeTable.length, b, this.FontName, this.FontFlagsBold, this.FontFlagsItalic, this.CodeTable)
		}
	});
	fljs.swf.tag.DefineText = function () {};
	fljs.addMethods(fljs.swf.tag.DefineText, {
		read: function (a) {
			this.CharacterId = a.readUI16();
			this.TextBounds = a.readRECT();
			a.stream.align();
			this.TextMatrix = a.readMATRIX();
			this.GlyphBits = a.readUI8();
			this.AdvanceBits = a.readUI8();
			a.GlyphBits = this.GlyphBits;
			a.AdvanceBits = this.AdvanceBits;
			a.context = fljs.swf.tag.DefineText;
			this.TextRecords = a.readTEXTRECORDS();
			a.context = null
		},
		buildMatrix_: function () {
			return new flash.geom.Matrix(this.TextMatrix.ScaleX, this.TextMatrix.RotateSkew0, this.TextMatrix.RotateSkew1, this.TextMatrix.ScaleY, this.TextMatrix.TranslateX, this.TextMatrix.TranslateY)
		},
		evaluate: function (a) {
			a.addDefinition(this, this.CharacterId)
		},
		build: function (a, b) {
			return this._buildTextField(a, b)
		},
		_buildTextField: function (a, b) {
			if (!this.TextRecords || !this.TextRecords.length) return null;
			this.FontId = this.TextRecords[0].FontId;
			this.Bounds = this.TextBounds;
			var c = a.fonts2[this.FontId];
			a = [];
			var d;
			fljs.console("definetext");
			var e, f, g = 0,
				j;
			for (var h in this.TextRecords) {
				var m = this.TextRecords[h];
				d = new flash.text.TextFormat;
				if (c) {
					d.bold = c.bold;
					d.italic = c.italic;
					d.font = c.name;
					d.fontid = this.FontId
				}
				if (m.TextColor) {
					var k = m.TextColor;
					e = 0;
					e += k.Red << 16;
					e += k.Green << 8;
					e += k.Blue;
					if (typeof m.TextColor.Alpha != "undefined") d.alpha = m.TextColor.Alpha / 255
				}
				d.color = e;
				if (m.YOffset != null) {
					f = m.YOffset;
					g = 0
				};
				d.leading = f;
				if (m.XOffset != null) g = m.XOffset;
				d.indent = g;
				if (m.TextHeight != null) j = m.TextHeight;
				d.size = j;
				m = m.GlyphEntries;
				k = [];
				var l = [];
				if (m) for (var n in m) {
					var p = m[n];
					c ? k.push(String.fromCharCode(c.codeTable[p.GlyphIndex])) : k.push(String.fromCharCode(p.GlyphIndex));
					l.push(p.GlyphAdvance);
					g += p.GlyphAdvance
				}
				a.push({
					text: k.join(""),
					advances: l,
					format: d
				})
			}
			this.Indent = this.RightMargin = this.LeftMargin = this.Leading = this.Align = 0;
			this.FontHeight = this.TextRecords[0].TextHeight;
			this.TextColor = this.TextRecords[0].TextColor;
			e = new flash.text.TextField;
			e.setTextMatrix(this.buildMatrix_());
			b && e.getTransform().setColorTransform(b);
			e.x = this.Bounds.Xmin;
			e.y = this.Bounds.Ymin;
			e.setWidth(this.Bounds.Xmax - this.Bounds.Xmin);
			e.setHeight(this.Bounds.Ymax - this.Bounds.Ymin);
			e.setDefaultTextFormat(d);
			e.__setSpans(a);
			return e
		}
	});
	fljs.swf.tag.DefineFontInfo2 = function () {};
	fljs.addMethods(fljs.swf.tag.DefineFontInfo2, {
		read: function (a, b) {
			var c = a.stream.byteIndex;
			this.FontId = a.readUI16();
			this.FontNameLen = a.readUI8();
			var d = [];
			for (i = 0; i < this.FontNameLen; i++) d.push(String.fromCharCode(a.readUI8()));
			this.FontName = d.join("");
			a.readUB(2);
			this.FontFlagsSmallText = a.readUB(1);
			this.FontFlagsShiftJis = a.readUB(1);
			this.FontFlagsAnsi = a.readUB(1);
			this.FontFlagsItalic = a.readUB(1);
			this.FontFlagsBold = a.readUB(1);
			this.FontFlagsWideCodes = a.readUB(1);
			this.LanguageCode = a.readLangCode();
			b =
			b.TagLength - (a.stream.byteIndex - c);
			this.CodeTable = [];
			if (this.FontFlagsWideCodes) {
				b = b / 2;
				for (i = 0; i < b; i++) this.CodeTable.push(a.readUI16())
			} else {
				b = b;
				for (i = 0; i < b; i++) this.CodeTable.push(a.readUI8())
			}
		},
		evaluate: function (a) {
			this.GlyphShapeTable = a.fontsWithoutInfo[this.FontId].GlyphShapeTable;
			var b = (new fljs.swf.build.FontBuilder(this, a)).buildDef();
			a.defineFont2(this.FontId, this.GlyphShapeTable.length, b, this.FontName, this.FontFlagsBold, this.FontFlagsItalic, this.CodeTable)
		}
	});
	fljs.swf.tag.DefineShape3 = function () {};
	fljs.inherits(fljs.swf.tag.DefineShape3, fljs.swf.tag.DefineShape);
	fljs.addMethods(fljs.swf.tag.DefineShape3, {
		read: function (a) {
			a.beginContext(fljs.swf.tag.DefineShape3);
			this.ShapeId = a.readUI16();
			this.ShapeBounds = a.readRECT();
			a.stream.align();
			this.Shapes = a.readSHAPEWITHSTYLE();
			a.endContext()
		}
	});
	fljs.swf.tag.DoAction = function () {};
	fljs.addMethods(fljs.swf.tag.DoAction, {
		read: function (a, b) {
			this.Actions = a.readActionRecords(b.TagLength)
		},
		evaluate: function (a, b, c, d) {
			a.doActions(d, this.Actions)
		}
	});
	fljs.swf.tag.Protect = function () {};
	fljs.addMethods(fljs.swf.tag.Protect, {
		read: function (a, b) {
			a.skipBytes(b.TagLength)
		},
		evaluate: function () {}
	});
	flash.display.FrameLabel = function () {};
	fljs.swf.tag.DefineButton2 = function () {};
	fljs.addMethods(fljs.swf.tag.DefineButton2, {
		read: function (a, b) {
			var c = a.stream.byteIndex;
			a.context = fljs.swf.tag.DefineButton2;
			this.ButtonId = a.readUI16();
			a.readUB(7);
			this.TrackAsMenu = a.readUB(1);
			this.ActionOffset = a.readUI16();
			this.Characters = a.readButtonRecords();
			this.Actions = this.ActionOffset ? a.readButtonCondActions(b.TagLength - (a.stream.byteIndex - c)) : [];
			a.context = null
		},
		evaluate: function (a) {
			a.addDefinition(this, this.ButtonId)
		},
		build: function (a, b) {
			if (b && b.__default) b = null;
			var c = new flash.display.MovieClip;
			c.def = this;
			c.setEnabled(true);
			c.trackAsMenu = this.TrackAsMenu;
			c.__buttonActions = this.Actions;
			var d = [
				["ButtonStateUp", "up"],
				["ButtonStateDown", "down"],
				["ButtonStateOver", "over"],
				["ButtonStateHitTest", "hitTest"]
			],
				e = new flash.display.Scene;
			e.labels = [];
			e.name = "Scene 1";
			e.numFrames = 3;
			c.frameData_ = [];
			c.labels_ = {};
			var f, g = 0;
			for (var j in d) {
				var h = d[j][0],
					m = d[j][1];
				f = null;
				for (var k in this.Characters) {
					var l = this.Characters[k];
					if (l[h]) {
						f || (f = new flash.display.Sprite);
						var n = this.buildStateDisplayObject(a, l, false);
						n && f.addChildAt(n, l.PlaceDepth)
					}
				}
				for (k in this.Characters) {
					l = this.Characters[k];
					if (l.ButtonStateHitTest) {
						f || (f = new flash.display.Sprite);
						if (n = this.buildStateDisplayObject(a, l, true)) {
							n.__setHitTarget(c);
							f.addChild(n)
						}
					}
				}
				if (m != "hitTest") {
					h = new flash.display.FrameLabel;
					h.name = "_" + m;
					h.frame = g + 1;
					m = {
						scripts: [],
						parts: [],
						tags: [],
						label: h.name,
						loaded: true
					};
					f && m.parts.push(f);
					c.frameData_.push(m);
					c.labels_[h.name] = h
				}
				g += 1
			}
			c.sceneIndices_ = {};
			c.currentSceneIndex_ = 0;
			c.scenes_ = [e];
			c.currentFrameIndex_ = 0;
			c.currentLabel_ =
			c.frameData_[c.currentFrameIndex_].label;
			c._enabled = true;
			c.framesLoaded_ = 3;
			c.totalFrames_ = 3;
			c.next_ = null;
			c.playing_ = false;
			c.gotoAndStop(1);
			b && c.getTransform().setColorTransform(b);
			return c
		},
		buildStateDisplayObject: function (a, b, c) {
			var d = this.buildColorTransform(b.ColorTransform),
				e = this.buildMatrix(b.PlaceMatrix);
			c = (fljs.agent.OS == "iPad" || fljs.agent.OS == "iPhone") && c;
			b = a.dictionary[b.CharacterId];
			var f;
			if (b instanceof fljs.swf.tag.DefineShape || b instanceof fljs.swf.tag.DefineEditText || b instanceof fljs.swf.tag.DefineText || b instanceof fljs.swf.tag.DefineSprite) f = b.build(a, d, c);
			if (f) {
				f.setMatrix(e);
				f.__clipActions = {};
				b instanceof fljs.swf.tag.DefineSprite && f.onCreate()
			}
			return f
		},
		buildMatrix: function (a) {
			return new flash.geom.Matrix(a.ScaleX, a.RotateSkew0, a.RotateSkew1, a.ScaleY, a.TranslateX, a.TranslateY)
		},
		buildColorTransform: function (a) {
			a = new flash.geom.ColorTransform(a.RedMultTerm, a.GreenMultTerm, a.BlueMultTerm, a.AlphaMultTerm, a.RedAddTerm, a.GreenAddTerm, a.BlueAddTerm, a.AlphaAddTerm);
			return a.__default ? null : a
		}
	});
	fljs.swf.tag.DefineText2 = function () {};
	fljs.inherits(fljs.swf.tag.DefineText2, fljs.swf.tag.DefineText);
	fljs.addMethods(fljs.swf.tag.DefineText2, {
		read: function (a) {
			this.CharacterId = a.readUI16();
			this.TextBounds = a.readRECT();
			a.stream.align();
			this.TextMatrix = a.readMATRIX();
			this.GlyphBits = a.readUI8();
			this.AdvanceBits = a.readUI8();
			a.GlyphBits = this.GlyphBits;
			a.AdvanceBits = this.AdvanceBits;
			a.context = fljs.swf.tag.DefineText2;
			this.TextRecords = a.readTEXTRECORDS();
			a.context = null
		}
	});
	fljs.swf.tag.JpegTables = function () {};
	fljs.addMethods(fljs.swf.tag.JpegTables, {
		read: function (a, b) {
			if (b.TagLength != 0) {
				a = a.readBytes(b.TagLength).join("");
				var c = new fljs.swf.BigEndianStringStream(a);
				fljs.console("jpeg").info("" + b.TagType);
				b = 0;
				if (c.nextUShort() == 65497) {
					b = 4;
					c.nextUShort();
					c.nextUShort()
				}
				this.JPEGData = a.substr(b, a.length - b - 2)
			}
		},
		evaluate: function (a) {
			a.jpegTables = this.JPEGData
		}
	});
	fljs.swf.tag.DefineBits = function () {};
	fljs.inherits(fljs.swf.tag.DefineBits, fljs.swf.tag.DefineBitsJPEG2);
	fljs.addMethods(fljs.swf.tag.DefineBits, {
		read: function (a, b) {
			this.CharacterId = a.readUI16();
			b = b.TagLength - 2;
			(new fljs.swf.build.JpegBuilder).parseJpeg(this, a, b, true)
		}
	});
	fljs.swf.tag.FrameLabel = function () {};
	fljs.addMethods(fljs.swf.tag.FrameLabel, {
		read: function (a) {
			this.Name = a.readString()
		},
		evaluate: function (a, b, c, d) {
			if (d == a.stage) d = a.mainTimeline;
			d.frameData_[d.framesLoaded_].label = this.Name;
			a = d.labels_[this.Name] = new flash.display.FrameLabel;
			a.frame = d.framesLoaded_ + 1;
			a.name = this.Name
		}
	});
	fljs.zip_inflate = {};
	var zip_WSIZE = 32768,
		zip_STORED_BLOCK = 0,
		zip_STATIC_TREES = 1,
		zip_DYN_TREES = 2,
		zip_lbits = 9,
		zip_dbits = 6,
		zip_INBUFSIZ = 32768,
		zip_INBUF_EXTRA = 64,
		zip_slide, zip_wp, zip_fixed_tl = null,
		zip_fixed_td, zip_fixed_bl, fixed_bd, zip_bit_buf, zip_bit_len, zip_method, zip_eof, zip_copy_leng, zip_copy_dist, zip_tl, zip_td, zip_bl, zip_bd, zip_inflate_data, zip_inflate_pos, zip_MASK_BITS = new Array(0, 1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095, 8191, 16383, 32767, 65535),
		zip_cplens = new Array(3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0),
		zip_cplext = new Array(0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99),
		zip_cpdist = new Array(1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577),
		zip_cpdext = new Array(0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13),
		zip_border = new Array(16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15);

	function zip_HuftList() {
		this.list = this.next = null
	}

	function zip_HuftNode() {
		this.n = this.b = this.e = 0;
		this.t = null
	}

	function zip_HuftBuild(a, b, c, d, e, f) {
		this.BMAX = 16;
		this.N_MAX = 288;
		this.status = 0;
		this.root = null;
		this.m = 0;
		var g = new Array(this.BMAX + 1),
			j, h, m, k, l, n, p, u = new Array(this.BMAX + 1),
			o, q, s, r = new zip_HuftNode,
			t = new Array(this.BMAX);
		k = new Array(this.N_MAX);
		var v, w = new Array(this.BMAX + 1),
			y, x, z;
		z = this.root = null;
		for (l = 0; l < g.length; l++) g[l] = 0;
		for (l = 0; l < u.length; l++) u[l] = 0;
		for (l = 0; l < t.length; l++) t[l] = null;
		for (l = 0; l < k.length; l++) k[l] = 0;
		for (l = 0; l < w.length; l++) w[l] = 0;
		j = b > 256 ? a[256] : this.BMAX;
		o = a;
		q = 0;
		l = b;
		do {
			g[o[q]]++;
			q++
		} while (--l > 0);
		if (g[0] == b) {
			this.root = null;
			this.status = this.m = 0
		} else {
			for (n = 1; n <= this.BMAX; n++) if (g[n] != 0) break;
			p = n;
			if (f < n) f = n;
			for (l = this.BMAX; l != 0; l--) if (g[l] != 0) break;
			m = l;
			if (f > l) f = l;
			for (y = 1 << n; n < l; n++, y <<= 1) if ((y -= g[n]) < 0) {
				this.status = 2;
				this.m = f;
				return
			}
			if ((y -= g[l]) < 0) {
				this.status = 2;
				this.m = f
			} else {
				g[l] += y;
				w[1] = n = 0;
				o = g;
				q = 1;
				for (s = 2; --l > 0;) w[s++] = n += o[q++];
				o = a;
				l = q = 0;
				do
				if ((n = o[q++]) != 0) k[w[n]++] = l;
				while (++l < b);
				b = w[m];
				w[0] = l = 0;
				o = k;
				q = 0;
				k = -1;
				v = u[0] = 0;
				s = null;
				for (x = 0; p <= m; p++) for (a = g[p]; a-- > 0;) {
					for (; p > v + u[1 + k];) {
						v += u[1 + k];
						k++;
						x = (x = m - v) > f ? f : x;
						if ((h = 1 << (n = p - v)) > a + 1) {
							h -= a + 1;
							for (s = p; ++n < x;) {
								if ((h <<= 1) <= g[++s]) break;
								h -= g[s]
							}
						}
						if (v + n > j && v < j) n = j - v;
						x = 1 << n;
						u[1 + k] = n;
						s = new Array(x);
						for (h = 0; h < x; h++) s[h] = new zip_HuftNode;
						z = z == null ? (this.root = new zip_HuftList) : (z.next = new zip_HuftList);
						z.next = null;
						z.list = s;
						t[k] = s;
						if (k > 0) {
							w[k] = l;
							r.b = u[k];
							r.e = 16 + n;
							r.t = s;
							n = (l & (1 << v) - 1) >> v - u[k];
							t[k - 1][n].e = r.e;
							t[k - 1][n].b = r.b;
							t[k - 1][n].n = r.n;
							t[k - 1][n].t = r.t
						}
					}
					r.b = p - v;
					if (q >= b) r.e = 99;
					else if (o[q] < c) {
						r.e = o[q] < 256 ? 16 : 15;
						r.n = o[q++]
					} else {
						r.e = e[o[q] - c];
						r.n =
						d[o[q++] - c]
					}
					h = 1 << p - v;
					for (n = l >> v; n < x; n += h) {
						s[n].e = r.e;
						s[n].b = r.b;
						s[n].n = r.n;
						s[n].t = r.t
					}
					for (n = 1 << p - 1;
					(l & n) != 0; n >>= 1) l ^= n;
					for (l ^= n;
					(l & (1 << v) - 1) != w[k];) {
						v -= u[k];
						k--
					}
				}
				this.m = u[1];
				this.status = y != 0 && m != 1 ? 1 : 0
			}
		}
	}
	function zip_GET_BYTE() {
		if (zip_inflate_data.length == zip_inflate_pos) return -1;
		return zip_inflate_data.charCodeAt(zip_inflate_pos++) & 255
	}
	function zip_NEEDBITS(a) {
		for (; zip_bit_len < a;) {
			zip_bit_buf |= zip_GET_BYTE() << zip_bit_len;
			zip_bit_len += 8
		}
	}

	function zip_GETBITS(a) {
		return zip_bit_buf & zip_MASK_BITS[a]
	}
	function zip_DUMPBITS(a) {
		zip_bit_buf >>= a;
		zip_bit_len -= a
	}

	function zip_inflate_codes(a, b, c) {
		var d, e, f;
		if (c == 0) return 0;
		for (f = 0;;) {
			zip_NEEDBITS(zip_bl);
			e = zip_tl.list[zip_GETBITS(zip_bl)];
			for (d = e.e; d > 16;) {
				if (d == 99) return -1;
				zip_DUMPBITS(e.b);
				d -= 16;
				zip_NEEDBITS(d);
				e = e.t[zip_GETBITS(d)];
				d = e.e
			}
			zip_DUMPBITS(e.b);
			if (d == 16) {
				zip_wp &= zip_WSIZE - 1;
				a[b + f++] = zip_slide[zip_wp++] = e.n
			} else {
				if (d == 15) break;
				zip_NEEDBITS(d);
				zip_copy_leng = e.n + zip_GETBITS(d);
				zip_DUMPBITS(d);
				zip_NEEDBITS(zip_bd);
				e = zip_td.list[zip_GETBITS(zip_bd)];
				for (d = e.e; d > 16;) {
					if (d == 99) return -1;
					zip_DUMPBITS(e.b);
					d -= 16;
					zip_NEEDBITS(d);
					e = e.t[zip_GETBITS(d)];
					d = e.e
				}
				zip_DUMPBITS(e.b);
				zip_NEEDBITS(d);
				zip_copy_dist = zip_wp - e.n - zip_GETBITS(d);
				for (zip_DUMPBITS(d); zip_copy_leng > 0 && f < c;) {
					zip_copy_leng--;
					zip_copy_dist &= zip_WSIZE - 1;
					zip_wp &= zip_WSIZE - 1;
					a[b + f++] = zip_slide[zip_wp++] = zip_slide[zip_copy_dist++]
				}
			}
			if (f == c) return c
		}
		zip_method = -1;
		return f
	}

	function zip_inflate_stored(a, b, c) {
		var d;
		d = zip_bit_len & 7;
		zip_DUMPBITS(d);
		zip_NEEDBITS(16);
		d = zip_GETBITS(16);
		zip_DUMPBITS(16);
		zip_NEEDBITS(16);
		if (d != (~zip_bit_buf & 65535)) return -1;
		zip_DUMPBITS(16);
		zip_copy_leng = d;
		for (d = 0; zip_copy_leng > 0 && d < c;) {
			zip_copy_leng--;
			zip_wp &= zip_WSIZE - 1;
			zip_NEEDBITS(8);
			a[b + d++] = zip_slide[zip_wp++] = zip_GETBITS(8);
			zip_DUMPBITS(8)
		}
		if (zip_copy_leng == 0) zip_method = -1;
		return d
	}

	function zip_inflate_fixed(a, b, c) {
		if (zip_fixed_tl == null) {
			var d, e = new Array(288);
			for (d = 0; d < 144; d++) e[d] = 8;
			for (; d < 256; d++) e[d] = 9;
			for (; d < 280; d++) e[d] = 7;
			for (; d < 288; d++) e[d] = 8;
			zip_fixed_bl = 7;
			d = new zip_HuftBuild(e, 288, 257, zip_cplens, zip_cplext, zip_fixed_bl);
			if (d.status != 0) {
				alert("HufBuild error: " + d.status);
				return -1
			}
			zip_fixed_tl = d.root;
			zip_fixed_bl = d.m;
			for (d = 0; d < 30; d++) e[d] = 5;
			zip_fixed_bd = 5;
			d = new zip_HuftBuild(e, 30, 0, zip_cpdist, zip_cpdext, zip_fixed_bd);
			if (d.status > 1) {
				zip_fixed_tl = null;
				alert("HufBuild error: " + d.status);
				return -1
			}
			zip_fixed_td = d.root;
			zip_fixed_bd = d.m
		}
		zip_tl = zip_fixed_tl;
		zip_td = zip_fixed_td;
		zip_bl = zip_fixed_bl;
		zip_bd = zip_fixed_bd;
		return zip_inflate_codes(a, b, c)
	}

	function zip_inflate_dynamic(a, b, c) {
		var d, e, f, g, j, h, m, k = new Array(316);
		for (d = 0; d < k.length; d++) k[d] = 0;
		zip_NEEDBITS(5);
		h = 257 + zip_GETBITS(5);
		zip_DUMPBITS(5);
		zip_NEEDBITS(5);
		m = 1 + zip_GETBITS(5);
		zip_DUMPBITS(5);
		zip_NEEDBITS(4);
		d = 4 + zip_GETBITS(4);
		zip_DUMPBITS(4);
		if (h > 286 || m > 30) return -1;
		for (e = 0; e < d; e++) {
			zip_NEEDBITS(3);
			k[zip_border[e]] = zip_GETBITS(3);
			zip_DUMPBITS(3)
		}
		for (; e < 19; e++) k[zip_border[e]] = 0;
		zip_bl = 7;
		e = new zip_HuftBuild(k, 19, 19, null, null, zip_bl);
		if (e.status != 0) return -1;
		zip_tl = e.root;
		zip_bl = e.m;
		g = h + m;
		for (d = f = 0; d < g;) {
			zip_NEEDBITS(zip_bl);
			j = zip_tl.list[zip_GETBITS(zip_bl)];
			e = j.b;
			zip_DUMPBITS(e);
			e = j.n;
			if (e < 16) k[d++] = f = e;
			else if (e == 16) {
				zip_NEEDBITS(2);
				e = 3 + zip_GETBITS(2);
				zip_DUMPBITS(2);
				if (d + e > g) return -1;
				for (; e-- > 0;) k[d++] = f
			} else {
				if (e == 17) {
					zip_NEEDBITS(3);
					e = 3 + zip_GETBITS(3);
					zip_DUMPBITS(3)
				} else {
					zip_NEEDBITS(7);
					e = 11 + zip_GETBITS(7);
					zip_DUMPBITS(7)
				}
				if (d + e > g) return -1;
				for (; e-- > 0;) k[d++] = 0;
				f = 0
			}
		}
		zip_bl = zip_lbits;
		e = new zip_HuftBuild(k, h, 257, zip_cplens, zip_cplext, zip_bl);
		if (zip_bl == 0) e.status = 1;
		if (e.status != 0) return -1;
		zip_tl = e.root;
		zip_bl = e.m;
		for (d = 0; d < m; d++) k[d] = k[d + h];
		zip_bd = zip_dbits;
		e = new zip_HuftBuild(k, m, 0, zip_cpdist, zip_cpdext, zip_bd);
		zip_td = e.root;
		zip_bd = e.m;
		if (zip_bd == 0 && h > 257) return -1;
		if (e.status != 0) return -1;
		return zip_inflate_codes(a, b, c)
	}
	function zip_inflate_start() {
		if (zip_slide == null) zip_slide = new Array(2 * zip_WSIZE);
		zip_bit_len = zip_bit_buf = zip_wp = 0;
		zip_method = -1;
		zip_eof = false;
		zip_copy_leng = zip_copy_dist = 0;
		zip_tl = null
	}

	function zip_inflate_internal(a, b, c) {
		var d, e;
		for (d = 0; d < c;) {
			if (zip_eof && zip_method == -1) return d;
			if (zip_copy_leng > 0) {
				if (zip_method != zip_STORED_BLOCK) for (; zip_copy_leng > 0 && d < c;) {
					zip_copy_leng--;
					zip_copy_dist &= zip_WSIZE - 1;
					zip_wp &= zip_WSIZE - 1;
					a[b + d++] = zip_slide[zip_wp++] = zip_slide[zip_copy_dist++]
				} else {
					for (; zip_copy_leng > 0 && d < c;) {
						zip_copy_leng--;
						zip_wp &= zip_WSIZE - 1;
						zip_NEEDBITS(8);
						a[b + d++] = zip_slide[zip_wp++] = zip_GETBITS(8);
						zip_DUMPBITS(8)
					}
					if (zip_copy_leng == 0) zip_method = -1
				}
				if (d == c) return d
			}
			if (zip_method == -1) {
				if (zip_eof) break;
				zip_NEEDBITS(1);
				if (zip_GETBITS(1) != 0) zip_eof = true;
				zip_DUMPBITS(1);
				zip_NEEDBITS(2);
				zip_method = zip_GETBITS(2);
				zip_DUMPBITS(2);
				zip_tl = null;
				zip_copy_leng = 0
			}
			switch (zip_method) {
			case 0:
				e = zip_inflate_stored(a, b + d, c - d);
				break;
			case 1:
				e = zip_tl != null ? zip_inflate_codes(a, b + d, c - d) : zip_inflate_fixed(a, b + d, c - d);
				break;
			case 2:
				e = zip_tl != null ? zip_inflate_codes(a, b + d, c - d) : zip_inflate_dynamic(a, b + d, c - d);
				break;
			default:
				e = -1;
				break
			}
			if (e == -1) {
				if (zip_eof) return 0;
				return -1
			}
			d += e
		}
		return d
	}

	function zip_inflate(a) {
		var b, c, d;
		zip_inflate_start();
		zip_inflate_data = a;
		zip_inflate_pos = 0;
		b = new Array(1024);
		for (a = "";
		(c = zip_inflate_internal(b, 0, b.length)) > 0;) for (d = 0; d < c; d++) a += String.fromCharCode(b[d]);
		zip_inflate_data = null;
		return a
	}
	fljs.swf.tag.DefineBitsJpeg3 = function () {};
	fljs.inherits(fljs.swf.tag.DefineBitsJpeg3, fljs.swf.tag.DefineBitsJPEG2);
	fljs.addMethods(fljs.swf.tag.DefineBitsJpeg3, {
		read: function (a, b) {
			var c = a.stream.byteIndex;
			this.CharacterId = a.readUI16();
			var d = fljs.Player.getInstance();
			d.mainTimeline && d.mainTimeline.resources.addToFrame(this.CharacterId, d.mainTimeline.framesLoaded_);
			if (d.loadExtResources) {
				a.skipBytes(b.TagLength - 2);
				d = "img/" + d.name + "-" + this.CharacterId + ".png";
				fljs.console("image").info(d);
				c = new Image;
				c.addEventListener("load", fljs.bind(this.onLoadImage, this, a, b, c), false);
				fljs.Player.getInstance().delayFrame++;
				c.src =
				d
			} else {
				d = this.AlphaDataOffset = a.readUI32();
				(new fljs.swf.build.JpegBuilder).parseJpeg(this, a, d, true);
				d = b.TagLength - (a.stream.byteIndex - c);
				c = a.stream.byteIndex;
				var e = new Image;
				e.width = this.Width;
				e.height = this.Height;
				e.addEventListener("load", fljs.bind(this.onLoadData, this, a, b, e, c, d));
				fljs.Player.getInstance().delayFrame++;
				e.src = this.DataUri
			}
		},
		onLoadData: function (a, b, c, d, e) {
			a = a.stream.buffer.substr(d + 2, e - 2);
			a = zip_inflate(a);
			a = new fljs.swf.SwfStream(new fljs.swf.StringStream(a));
			b = document.createElement("canvas");
			b.width = this.Width;
			b.height = this.Height;
			d = b.getContext("2d");
			d.drawImage(c, 0, 0);
			c = d.getImageData(0, 0, this.Width, this.Height);
			e = c.data;
			for (var f = 0; f < this.Width * this.Height * 4;) {
				e[f + 3] = a.readUI8();
				f += 4
			}
			d.putImageData(c, 0, 0);
			this.DataUri = b.toDataURL();
			c = fljs.Player.getInstance();
			if (c.dictionary) {
				this.evaluate(c);
				c.delayFrame--;
				c.mainTimeline.resources.remove(this.CharacterId)
			} else this.callback(this);
			return true
		},
		onLoadImage: function (a, b, c) {
			this.Width = c.width;
			this.Height = c.height;
			a = document.createElement("canvas");
			a.width = this.Width;
			a.height = this.Height;
			a.getContext("2d").drawImage(c, 0, 0);
			this.DataUri = a.toDataURL();
			c = fljs.Player.getInstance();
			this.evaluate(c);
			c.setTimeout(fljs.bind(this.afterLoadImage, this));
			return true
		},
		afterLoadImage: function () {
			c = fljs.Player.getInstance();
			c.delayFrame--;
			c.mainTimeline.resources.remove(this.CharacterId)
		},
		evaluate: function (a) {
			this.defId = "image" + this.CharacterId;
			a.addDefinition(this, this.CharacterId);
			a = new fljs.swf.def.BitmapDef;
			a.setCharaId(this.defId);
			a.element.sets([
				[fljs.dom.Namespace.Xlink, "xlink:href", this.DataUri],
				[null, "x", 0],
				[null, "y", 0],
				[null, "width", this.Width],
				[null, "height", this.Height]
			]);
			a.define();
			this.def = a
		}
	});
	fljs.swf.tag.ExportAssets = function () {};
	fljs.addMethods(fljs.swf.tag.ExportAssets, {
		read: function (a) {
			this.Count = a.readUI16();
			this.Tags = [];
			this.Names = [];
			for (var b = 0; b < this.Count; b++) {
				this.Tags[b] = a.readUI16();
				this.Names[b] = a.readString()
			}
		},
		evaluate: function (a) {
			for (var b = 0; b < this.Tags.length; b++) a.assets[this.Names[b]] = this.Tags[b]
		}
	});
	fljs.swf.tag.PlaceObject3 = function () {};
	fljs.inherits(fljs.swf.tag.PlaceObject3, fljs.swf.tag.PlaceObject2);
	fljs.addMethods(fljs.swf.tag.PlaceObject3, {
		read: function (a) {
			this.startByteIndex = a.stream.byteIndex;
			this.PlaceFlagHasClipActions = a.readUB(1);
			this.PlaceFlagHasClipDepth = a.readUB(1);
			this.PlaceFlagHasName = a.readUB(1);
			this.PlaceFlagHasRatio = a.readUB(1);
			this.PlaceFlagHasColorTransform = a.readUB(1);
			this.PlaceFlagHasMatrix = a.readUB(1);
			this.PlaceFlagHasCharacter = a.readUB(1);
			this.PlaceFlagMove = a.readUB(1);
			a.readUB(3);
			this.PlaceFlagHasImage = a.readUB(1);
			this.PlaceFlagHasClassName = a.readUB(1);
			this.PlaceFlagHasCacheAsBitmap =
			a.readUB(1);
			this.PlaceFlagHasBlendMode = a.readUB(1);
			this.PlaceFlagHasFilterList = a.readUB(1);
			this.Depth = a.readUI16();
			if (this.PlaceFlagHasClassName || this.PlaceFlagHasImage && this.PlaceFlagHasCharacter) this.ClassName = a.readString();
			if (this.PlaceFlagHasCharacter) this.CharacterId = a.readUI16();
			if (this.PlaceFlagHasMatrix) this.Matrix = a.readMATRIX();
			if (this.PlaceFlagHasColorTransform) this.ColorTransform = a.readCXFORMWITHALPHA();
			if (this.PlaceFlagHasRatio) this.Ratio = a.readUI16();
			if (this.PlaceFlagHasName) this.Name = a.readSTRING();
			if (this.PlaceFlagHasClipDepth) this.ClipDepth = a.readUI16();
			if (this.PlaceFlagHasFilterList) this.SurfaceFilterList = a.readFilterList();
			if (this.PlaceFlagHasBlendMode) this.BlendMode = a.readUI8();
			if (this.PlaceFlagHasClipActions) this.ClipActions = a.readCLIPACTIONS()
		}
	});
	fljs.swf.tag.DefineShape4 = function () {};
	fljs.inherits(fljs.swf.tag.DefineShape4, fljs.swf.tag.DefineShape);
	fljs.addMethods(fljs.swf.tag.DefineShape4, {
		read: function (a) {
			a.beginContext(fljs.swf.tag.DefineShape4);
			this.ShapeId = a.readUI16();
			this.ShapeBounds = a.readRECT();
			this.EdgeBounds = a.readRECT();
			a.readUB(6);
			this.UsesNonScalingStrokes = a.readUB(1);
			this.UsesScalingStrokes = a.readUB(1);
			this.Shapes = a.readSHAPEWITHSTYLE();
			a.endContext()
		}
	});
	fljs.swf.tag.DefineBitsLossless2 = function () {};
	fljs.addMethods(fljs.swf.tag.DefineBitsLossless2, {
		read: function (a, b) {
			var c = a.stream.byteIndex;
			this.CharacterId = a.readUI16();
			this.BitmapFormat = a.readUI8();
			this.BitmapWidth = a.readUI16();
			this.BitmapHeight = a.readUI16();
			if (this.BitmapFormat == 3) this.BitmapColorTableSize = a.readUI8();
			a = a.stream.buffer.substr(a.stream.byteIndex + 2, b.TagLength - (a.stream.byteIndex - c) - 2);
			a = zip_inflate(a);
			a = new fljs.swf.SwfStream(new fljs.swf.StringStream(a));
			b = document.createElement("canvas");
			b.width = this.BitmapWidth;
			b.height =
			this.BitmapHeight;
			c = b.getContext("2d");
			var d = c.createImageData(this.BitmapWidth, this.BitmapHeight),
				e = d.data;
			if (this.BitmapFormat == 3) {
				this.ColorTableRgb = [];
				for (var f = 0; f < this.BitmapColorTableSize + 1; f++) this.ColorTableRgb[f] = a.readRGBA();
				var g = Math.floor((this.BitmapWidth + 3) / 4) * 4;
				for (var j = f = 0; f < this.BitmapWidth * this.BitmapHeight * 4;) {
					var h = this.ColorTableRgb[a.readUI8()];
					e[f++] = h.Red;
					e[f++] = h.Green;
					e[f++] = h.Blue;
					e[f++] = h.Alpha;
					j++;
					if (j == this.BitmapWidth) {
						a.skipBytes(g - this.BitmapWidth);
						j = 0
					}
				}
			} else for (f =
			0; f < this.BitmapWidth * this.BitmapHeight * 4;) {
				h = a.readARGB();
				e[f++] = h.Red;
				e[f++] = h.Green;
				e[f++] = h.Blue;
				e[f++] = h.Alpha
			}
			c.putImageData(d, 0, 0);
			this.DataUri = b.toDataURL()
		},
		evaluate: function (a) {
			a.addDefinition(this, this.CharacterId);
			this.Width = this.BitmapWidth;
			this.Height = this.BitmapHeight;
			this.defId = "image" + this.CharacterId;
			a = new fljs.swf.def.BitmapDef;
			a.setCharaId(this.defId);
			a.element.sets([
				[fljs.dom.Namespace.Xlink, "xlink:href", this.DataUri],
				[null, "x", 0],
				[null, "y", 0],
				[null, "width", this.Width],
				[null, "height", this.Height]
			]);
			a.define();
			this.def = a
		}
	});
	fljs.swf.tag.DefineBitsLossless = function () {};
	fljs.addMethods(fljs.swf.tag.DefineBitsLossless, {
		read: function (a, b) {
			var c = a.stream.byteIndex;
			this.CharacterId = a.readUI16();
			this.BitmapFormat = a.readUI8();
			this.BitmapWidth = a.readUI16();
			this.BitmapHeight = a.readUI16();
			if (this.BitmapFormat == 3) this.BitmapColorTableSize = a.readUI8();
			a = a.stream.buffer.substr(a.stream.byteIndex + 2, b.TagLength - (a.stream.byteIndex - c) - 2);
			a = zip_inflate(a);
			a = new fljs.swf.SwfStream(new fljs.swf.StringStream(a));
			b = document.createElement("canvas");
			b.width = this.BitmapWidth;
			b.height =
			this.BitmapHeight;
			c = b.getContext("2d");
			var d = c.createImageData(this.BitmapWidth, this.BitmapHeight),
				e = d.data;
			if (this.BitmapFormat == 3) {
				this.ColorTableRgb = [];
				for (var f = 0; f < this.BitmapColorTableSize + 1; f++) this.ColorTableRgb[f] = a.readRGB();
				var g = Math.floor((this.BitmapWidth + 3) / 4) * 4;
				for (var j = f = 0; f < this.BitmapWidth * this.BitmapHeight * 4;) {
					var h = this.ColorTableRgb[a.readUI8()];
					e[f++] = h.Red;
					e[f++] = h.Green;
					e[f++] = h.Blue;
					e[f++] = 255;
					j++;
					if (j == this.BitmapWidth) {
						a.skipBytes(g - this.BitmapWidth);
						j = 0
					}
				}
			} else if (this.BitmapFormat == 4) {
				g = Math.floor((this.BitmapWidth * 2 + 3) / 4) * 4;
				for (j = f = 0; f < this.BitmapWidth * this.BitmapHeight * 4;) {
					h = a.readPix15();
					e[f++] = h.Red;
					e[f++] = h.Green;
					e[f++] = h.Blue;
					e[f++] = 255;
					j++;
					if (j == this.BitmapWidth) {
						a.skipBytes(g - this.BitmapWidth);
						j = 0
					}
				}
			} else if (this.BitmapFormat == 5) for (f = 0; f < this.BitmapWidth * this.BitmapHeight * 4;) {
				h = a.readARGB();
				e[f++] = h.Red;
				e[f++] = h.Green;
				e[f++] = h.Blue;
				e[f++] = 255
			}
			c.putImageData(d, 0, 0);
			this.DataUri = b.toDataURL()
		},
		evaluate: function (a) {
			a.addDefinition(this, this.CharacterId);
			this.Width = this.BitmapWidth;
			this.Height = this.BitmapHeight;
			this.defId = "image" + this.CharacterId;
			a = new fljs.swf.def.BitmapDef;
			a.setCharaId(this.defId);
			a.element.sets([
				[fljs.dom.Namespace.Xlink, "xlink:href", this.DataUri],
				[null, "x", 0],
				[null, "y", 0],
				[null, "width", this.Width],
				[null, "height", this.Height]
			]);
			a.define();
			this.def = a
		}
	});
	fljs.swf.tag.DefineFont3 = function () {};
	fljs.addMethods(fljs.swf.tag.DefineFont3, {
		read: function (a) {
			var b;
			this.FontId = a.readUI16();
			this.FontFlagsHasLayout = a.readUB(1);
			this.FontFlagsShiftJIS = a.readUB(1);
			this.FontFlagsSmallText = a.readUB(1);
			this.FontFlagsANSI = a.readUB(1);
			this.FontFlagsWideOffsets = a.readUB(1);
			this.FontFlagsWideCodes = a.readUB(1);
			a.FontFlagsWideCodes = this.FontFlagsWideCodes;
			this.FontFlagsItalic = a.readUB(1);
			this.FontFlagsBold = a.readUB(1);
			this.LanguageCode = a.readLangCode();
			this.FontNameLen = a.readUI8();
			var c = [];
			for (b = 0; b < this.FontNameLen; b++) c.push(String.fromCharCode(a.readUI8()));
			this.FontName = c.join("");
			this.NumGlyphs = a.readUI16();
			this.OffsetTable = [];
			if (this.FontFlagsWideOffsets) {
				for (b = 0; b < this.NumGlyphs; b++) this.OffsetTable.push(a.readUI32());
				this.CodeTableOffset = a.readUI32()
			} else {
				for (b = 0; b < this.NumGlyphs; b++) this.OffsetTable.push(a.readUI16());
				this.CodeTableOffset = a.readUI16()
			}
			this.GlyphShapeTable = [];
			for (b = 0; b < this.NumGlyphs; b++) this.GlyphShapeTable.push(a.readShape());
			this.CodeTable = [];
			for (b = 0; b < this.NumGlyphs; b++) this.CodeTable.push(a.readUI16());
			if (this.FontFlagsHasLayout) {
				this.FontAscent =
				a.readSI16();
				this.FontDescent = a.readSI16();
				this.FontLeading = a.readSI16();
				this.FontAdvanceTable = [];
				for (b = 0; b < this.NumGlyphs; b++) this.FontAdvanceTable.push(a.readSI16());
				this.FontBoundsTable = [];
				for (b = 0; b < this.NumGlyphs; b++) {
					this.FontBoundsTable.push(a.readRECT());
					a.stream.align()
				}
				this.KerningCount = a.readUI16();
				this.FontKerningTable = [];
				for (b = 0; b < this.KerningCount; b++) this.FontKerningTable.push(a.readKerningRecord())
			}
		},
		evaluate: function (a) {
			var b = (new fljs.swf.build.FontBuilder(this, a)).buildDef();
			a.defineFont2(this.FontId, this.GlyphShapeTable.length, b, this.FontName, this.FontFlagsBold, this.FontFlagsItalic, this.CodeTable, this)
		}
	});
	fljs.swf.tag.DoInitAction = function () {};
	fljs.addMethods(fljs.swf.tag.DoInitAction, {
		read: function (a, b) {
			this.SpriteId = a.readUI16();
			this.Actions = a.readActionRecords(b.TagLength - 2 - 1);
			this.ActionEndFlag = a.readUI8()
		},
		evaluate: function (a) {
			if (!this.processed) {
				this.processed = true;
				a.doInitAction(this)
			}
		}
	});
	fljs.swf.tag.tagMap = {
		0: fljs.swf.tag.End,
		1: fljs.swf.tag.ShowFrame,
		2: fljs.swf.tag.DefineShape,
		4: fljs.swf.tag.PlaceObject,
		5: fljs.swf.tag.RemoveObject,
		6: fljs.swf.tag.DefineBits,
		8: fljs.swf.tag.JpegTables,
		9: fljs.swf.tag.SetBackgroundColor,
		10: fljs.swf.tag.DefineFont,
		11: fljs.swf.tag.DefineText,
		12: fljs.swf.tag.DoAction,
		13: fljs.swf.tag.DefineFontInfo,
		14: fljs.swf.tag.DefineSound,
		15: fljs.swf.tag.StartSound,
		18: fljs.swf.tag.SoundStreamHead,
		19: fljs.swf.tag.SoundStreamBlock,
		20: fljs.swf.tag.DefineBitsLossless,
		21: fljs.swf.tag.DefineBitsJPEG2,
		22: fljs.swf.tag.DefineShape2,
		24: fljs.swf.tag.Protect,
		26: fljs.swf.tag.PlaceObject2,
		28: fljs.swf.tag.RemoveObject2,
		32: fljs.swf.tag.DefineShape3,
		33: fljs.swf.tag.DefineText2,
		34: fljs.swf.tag.DefineButton2,
		35: fljs.swf.tag.DefineBitsJpeg3,
		36: fljs.swf.tag.DefineBitsLossless2,
		37: fljs.swf.tag.DefineEditText,
		39: fljs.swf.tag.DefineSprite,
		43: fljs.swf.tag.FrameLabel,
		45: fljs.swf.tag.SoundStreamHead2,
		48: fljs.swf.tag.DefineFont2,
		56: fljs.swf.tag.ExportAssets,
		59: fljs.swf.tag.DoInitAction,
		62: fljs.swf.tag.DefineFontInfo2,
		70: fljs.swf.tag.PlaceObject3,
		75: fljs.swf.tag.DefineFont3,
		82: fljs.swf.tag.DoAbc,
		83: fljs.swf.tag.DefineShape4
	};
	fljs.swf.SwfStream = function (a) {
		this.stream = a;
		this.twipsPerPixel = 20;
		this.logger = fljs.console("parse")
	};
	fljs.addMethods(fljs.swf.SwfStream, {
		_mark: function (a, b) {
			this.debug && this.logger.info(a + ": " + b)
		},
		hasMore: function () {
			return this.stream.hasMore()
		},
		skipBytes: function (a) {
			this.stream.skipBytes(a)
		},
		readBytes: function (a) {
			return this.stream.readBytes(a)
		},
		readUI8: function () {
			return this.stream.nextUByte()
		},
		readUI16: function () {
			var a = this.stream.nextUShort();
			this._mark("readUI16", a);
			return a
		},
		readUI32: function () {
			return this.stream.nextULong()
		},
		readSI8: function () {
			return this.stream.nextSByte()
		},
		readSI16: function () {
			return this.stream.nextSShort()
		},
		readSI32: function () {
			return this.stream.nextSLong()
		},
		readUB: function (a) {
			return this.stream.nextUBits(a)
		},
		readSB: function (a) {
			return this.stream.nextSBits(a)
		},
		readFB: function (a) {
			return this.stream.nextFBits(a)
		},
		readFIXED: function () {
			return this.readFixed()
		},
		readFixed: function () {
			return this.stream.nextFLong()
		},
		readFIXED8: function () {
			return this.readFixed8()
		},
		readFixed8: function () {
			return this.stream.nextFShort()
		},
		readFLOAT16: function () {
			return this.stream.nextHalfFloat()
		},
		readFLOAT: function () {
			return this.readFloat()
		},
		readFloat: function () {
			return this.stream.nextSingleFloat()
		},
		readFloats: function (a) {
			for (var b = [], c = 0; c < a; c++) b.push(this.readFloat());
			return b
		},
		readDOUBLE: function () {
			return this.stream.nextDoubleFloat()
		},
		readDouble: function () {
			return this.stream.nextDoubleFloat()
		},
		readEncodedU32: function () {
			return this.stream.nextEncodedULong()
		},
		readString: function () {
			return this.stream.nextString()
		},
		readSTRING: function () {
			return this.stream.nextString()
		},
		readSwfHeader: function () {
			var a = String.fromCharCode(this.readUI8(), this.readUI8(), this.readUI8()),
				b = this.readUI8(),
				c = this.readUI32();
			if (a == "CWS") {
				var d = fljs.console("rar");
				d.info("deflating...");
				var e = this.stream.buffer.substr(this.stream.byteIndex + 2);
				d.info("unzipping...");
				e = zip_inflate(e);
				d.info("streaming...");
				this.stream = new fljs.swf.StringStream(e);
				d.info("done");
				d.info(this.stream.buffer.length)
			}
			d = this.readRECT();
			e = this.readFIXED8();
			var f = this.readUI16();
			return this.header = {
				Signature: a,
				Version: b,
				FileLength: c,
				FrameSize: d,
				FrameRate: e,
				FrameCount: f
			}
		},
		readLANGCODE: function () {
			return {
				LanguageCode: this.readUI8()
			}
		},
		readRecordHeader: function () {
			var a = this.readUI16(),
				b = a & 63;
			a = a >> 6 & 1023;
			if (b == 63) b = this.readSI32();
			return {
				TagType: a,
				TagLength: b,
				byteIndex: this.stream.byteIndex
			}
		},
		readMATRIX: function () {
			return this.readMatrix()
		},
		readCXFORM: function () {
			var a = this.readUB(1),
				b = this.readUB(1),
				c = this.readUB(4),
				d = 1,
				e = 1,
				f = 1;
			if (b) {
				d = this.readSB(c) / 256;
				e = this.readSB(c) / 256;
				f = this.readSB(c) / 256
			}
			var g = 0,
				j = 0,
				h = 0;
			if (a) {
				g = this.readSB(c);
				j = this.readSB(c);
				h = this.readSB(c)
			}
			return {
				HasAddTerms: a,
				HasMultTerms: b,
				Nbits: c,
				RedMultTerm: d,
				GreenMultTerm: e,
				BlueMultTerm: f,
				RedAddTerm: g,
				GreenAddTerm: j,
				BlueAddTerm: h,
				AlphaMultTerm: 1,
				AlphaAddTerm: 0
			}
		},
		readCXFORMWITHALPHA: function () {
			this.stream.align();
			var a = this.readUB(1),
				b = this.readUB(1),
				c = this.readUB(4),
				d = 1,
				e = 1,
				f = 1,
				g = 1;
			if (b) {
				d = this.readSB(c) / 256;
				e = this.readSB(c) / 256;
				f = this.readSB(c) / 256;
				g = this.readSB(c) / 256
			}
			var j = 0,
				h = 0,
				m = 0,
				k = 0;
			if (a) {
				j = this.readSB(c);
				h = this.readSB(c);
				m = this.readSB(c);
				k = this.readSB(c)
			}
			return {
				HasAddTerms: a,
				HasMultTerms: b,
				Nbits: c,
				RedMultTerm: d,
				GreenMultTerm: e,
				BlueMultTerm: f,
				AlphaMultTerm: g,
				RedAddTerm: j,
				GreenAddTerm: h,
				BlueAddTerm: m,
				AlphaAddTerm: k
			}
		},
		readFILTERLIST: function () {},
		readCLIPACTIONS: function () {
			this.readUI16();
			var a = this.readClipEventFlags(),
				b = this.readClipActionRecords();
			return {
				AllEventFlags: a,
				ClipActionRecords: b
			}
		},
		readClipActionRecords: function () {
			for (var a = [], b; b = this.readClipActionRecord();) a.push(b);
			return a
		},
		readClipActionRecord: function () {
			var a = this.readClipEventFlags();
			if (!a) return null;
			var b = this.readUI32(),
				c = b,
				d;
			if (a & fljs.swf.ClipEventFlags.ClipEventKeyPress) {
				d = this.readUI8();
				c -= 1
			}
			c = this.readActionRecords(c);
			return {
				EventFlags: a,
				ActionRecordSize: b,
				KeyCode: d,
				Actions: c
			}
		},
		readActionRecords: function (a) {
			for (var b = this.stream.byteIndex, c = []; this.stream.byteIndex != b + a;) c.push(this.readActionRecord());
			if (c.length) {
				a = c[c.length - 1];
				a.ActionCode != 0 && c.push({
					code: "0x0",
					address: a.address + a.Length,
					ActionCode: 0,
					Action: "End"
				})
			}
			return c
		},
		readActionRecord: function () {
			var a = this.stream.byteIndex,
				b = this.readUI8();
			a = {
				code: "0x" + b.toString(16),
				address: a,
				ActionCode: b
			};
			if (b >= 128) a.Length = this.readUI16();
			switch (b) {
			case 129:
				a.Action = "ActionGotoFrame";
				a.Frame = this.readUI16();
				break;
			case 131:
				a.Action = "ActionGetUrl";
				a.UrlString = this.readString();
				a.TargetString = this.readString();
				break;
			case 4:
				a.Action = "ActionNextFrame";
				break;
			case 5:
				a.Action = "ActionPrevFrame";
				break;
			case 6:
				a.Action = "ActionPlay";
				break;
			case 7:
				a.Action = "ActionStop";
				break;
			case 8:
				a.Action = "ActionToggleQuality";
				break;
			case 9:
				a.Action = "ActionStopSounds";
				break;
			case 138:
				a.Action = "ActionWaitForFrame";
				a.Frame = this.readUI16();
				a.SkipCount = this.readUI8();
				break;
			case 139:
				a.Action = "ActionSetTarget";
				a.TargetName = this.readString();
				break;
			case 8:
				a.Action = "ActionToggleQuality";
				break;
			case 139:
				a.Action = "ActionSetTarget";
				a.TargetName = this.readString();
				break;
			case 140:
				a.Action = "ActionGotoLabel";
				a.Label = this.readString();
				break;
			case 150:
				this.readActionPush(a);
				break;
			case 153:
				a.Action = "ActionJump";
				a.BranchOffset = this.readSI16();
				break;
			case 157:
				a.Action = "ActionIf";
				a.BranchOffset = this.readSI16();
				break;
			case 154:
				a.Action = "ActionGetUrl2";
				a.SendVarsMethod = this.readUB(2);
				a.Reserved = this.readUB(4);
				a.LoadTargetFlag = this.readUB(1);
				a.LoadVariablesFlag = this.readUB(1);
				break;
			case 159:
				this.readActionGotoFrame2(a);
				break;
			case 141:
				a.Action = "ActionWaitForFrame2";
				a.SkipCount = this.readUI8();
				break;
			case 136:
				this.readActionConstantPool(a);
				break;
			case 155:
				this.readActionDefineFunction(a);
				break;
			case 148:
				this.readActionWith(a);
				break;
			case 135:
				a.Action = "ActionStoreRegister";
				a.RegisterNumber = this.readUI8();
				break;
			case 142:
				this.readActionDefineFunction2(a);
				break;
			case 143:
				this.readActionTry(a);
				break;
			default:
				a.Action = "Unknown";
				break
			}
			return a
		},
		readActionPush: function (a) {
			for (var b = a.Length, c = this.stream.byteIndex, d = []; this.stream.byteIndex < c + b;) {
				var e = this.readUI8(),
					f;
				switch (e) {
				case 0:
					f = this.readString();
					break;
				case 1:
					f = this.readFloat();
					break;
				case 4:
				case 5:
				case 8:
					f = this.readUI8();
					break;
				case 6:
					f = this.readDouble();
					break;
				case 7:
					f = this.readUI32();
					break;
				case 9:
					f = this.readUI16();
					break
				}
				d.push({
					Type: e,
					Value: f
				})
			}
			a.Action = "ActionPush";
			a.Values = d
		},
		readActionGotoFrame2: function (a) {
			this.readUB(6);
			var b =
			this.readUB(1),
				c = this.readUB(1),
				d;
			if (b) d = this.readUI16();
			a.Action = "ActionGotoFrame2";
			a.SceneBiasFlag = b;
			a.PlayFlag = c;
			a.SceneBias = d
		},
		readActionConstantPool: function (a) {
			for (var b = a.Length, c = this.stream.byteIndex, d = [], e = 0; this.stream.byteIndex < c + b;) {
				var f = this.readString();
				e > 0 && d.push(f);
				e++
			}
			a.Action = "ActionConstantPool";
			a.Count = b;
			a.ConstantPool = d
		},
		readActionDefineFunction: function (a) {
			for (var b = this.readString(), c = this.readUI16(), d = [], e = 0; e < c; e++) d.push(this.readString());
			e = this.readUI16();
			var f = this.readActionRecords(e);
			a.Action = "ActionDefineFunction";
			a.FunctionName = b;
			a.NumParams = c;
			a.Params = d;
			a.CodeSize = e;
			a.Code = f
		},
		readActionWith: function (a) {
			var b = this.readUI16(),
				c = this.readActionRecords(b);
			a.Action = "ActionWith";
			a.Size = b;
			a.Code = c
		},
		readActionDefineFunction2: function (a) {
			a.FunctionName = this.readString();
			a.NumParams = this.readUI16();
			a.RegisterCount = this.readUI8();
			a.PreloadParentFlag = this.readUB(1);
			a.PreloadRootFlag = this.readUB(1);
			a.SupressSuperFlag = this.readUB(1);
			a.PreloadSuperFlag = this.readUB(1);
			a.SupressArgumentsFlag =
			this.readUB(1);
			a.PreloadArgumentsFlag = this.readUB(1);
			a.SupressThisFlag = this.readUB(1);
			a.PreloadThisFlag = this.readUB(1);
			this.readUB(7);
			a.PreloadGlobalFlag = this.readUB(1);
			a.Parameters = [];
			for (var b = 0; b < a.NumParams; b++) a.Parameters.push(this.readRegisterParam());
			a.CodeSize = this.readUI16();
			b = this.readActionRecords(a.CodeSize);
			a.Action = "ActionDefineFunction2";
			a.Code = b
		},
		readRegisterParam: function () {
			return {
				Register: this.readUI8(),
				ParamName: this.readString()
			}
		},
		readActionTry: function (a) {
			this.readUB(5);
			a.CatchInRegisterFlag =
			this.readUB(1);
			a.FinallyBlockFlag = this.readUB(1);
			a.CatchBlockFlag = this.readUB(1);
			a.TrySize = this.readUI16();
			a.CatchSize = this.readUI16();
			a.FinallySize = this.readUI16();
			if (a.CatchInRegisterFlag) a.CatchRegister = this.readUI8();
			else a.CatchName = this.readString();
			this.skipBytes(a.TrySize);
			this.skipBytes(a.CatchSize);
			this.skipBytes(a.FinallySize)
		},
		readClipEventFlags: function () {
			return this.header.Version <= 5 ? this.readUB(16) << 16 : this.readUB(32)
		},
		readRGB: function () {
			return {
				Red: this.readUI8(),
				Green: this.readUI8(),
				Blue: this.readUI8()
			}
		},
		readRGBA: function () {
			return {
				Red: this.readUI8(),
				Green: this.readUI8(),
				Blue: this.readUI8(),
				Alpha: this.readUI8()
			}
		},
		readARGB: function () {
			return {
				Alpha: this.readUI8(),
				Red: this.readUI8(),
				Green: this.readUI8(),
				Blue: this.readUI8()
			}
		},
		readRect: function () {
			this.stream.align();
			var a = this.readUB(5);
			return {
				Nbits: a,
				Xmin: this.readSB(a) / this.twipsPerPixel,
				Xmax: this.readSB(a) / this.twipsPerPixel,
				Ymin: this.readSB(a) / this.twipsPerPixel,
				Ymax: this.readSB(a) / this.twipsPerPixel
			}
		},
		readRECT: function () {
			return this.readRect()
		},
		readShapeWithStyle: function () {
			this.stream.align();
			var a = this.readFILLSTYLEARRAY(),
				b = this.readLINESTYLEARRAY();
			this.stream.align();
			var c = this.readUB(4),
				d = this.readUB(4);
			this.NumFillBits = c;
			this.NumLineBits = d;
			var e = this.readSHAPERECORDS();
			return {
				FillStyles: a,
				LineStyles: b,
				NumFillBits: c,
				NumLineBits: d,
				ShapeRecords: e
			}
		},
		readSHAPEWITHSTYLE: function () {
			return this.readShapeWithStyle()
		},
		readSHAPERECORDS: function () {
			for (var a = [], b = this.readSHAPERECORD(); !b.isEndOfShape;) {
				a.push(b);
				b = this.readSHAPERECORD()
			}
			this.stream.align();
			return a
		},
		readSHAPERECORD: function () {
			return this.readUB(1) == 0 ? this.readNonEdgeSHAPERECORD() : this.readEdgeSHAPERECORD()
		},
		readNonEdgeSHAPERECORD: function () {
			var a = this.readUB(1),
				b = this.readUB(1),
				c = this.readUB(1),
				d = this.readUB(1),
				e = this.readUB(1);
			if (a == 0 && b == 0 && c == 0 && d == 0 && e == 0) return {
				isEndOfShape: true,
				type: "END"
			};
			else {
				var f, g, j;
				if (e) {
					f = this.readUB(5);
					g = this.readSB(f);
					j = this.readSB(f)
				}
				var h;
				if (d) h = this.readUB(this.NumFillBits);
				var m;
				if (c) m = this.readUB(this.NumFillBits);
				var k;
				if (b) k = this.readUB(this.NumLineBits);
				var l, n, p, u;
				if (a) {
					l = this.readFILLSTYLEARRAY();
					n = this.readLINESTYLEARRAY();
					this.stream.align();
					p = this.readUB(4);
					u = this.readUB(4);
					this.NumFillBits = p;
					this.NumLineBits = u
				}
				return {
					isEndOfShape: false,
					type: "NONEDGE",
					StateNewStyles: a,
					StateLineStyle: b,
					StateFillStyle1: c,
					StateFillStyle0: d,
					StateMoveTo: e,
					MoveBits: f,
					MoveDeltaX: g / this.twipsPerPixel,
					MoveDeltaY: j / this.twipsPerPixel,
					FillStyle0: h,
					FillStyle1: m,
					LineStyle: k,
					FillStyles: l,
					LineStyles: n,
					NumFillBits: p,
					NumLineBits: u
				}
			}
		},
		readEdgeSHAPERECORD: function () {
			return this.readUB(1) == 1 ? this.readSTRAIGHTEDGERECORD() : this.readCURVEDEDGERECORD()
		},
		readSTRAIGHTEDGERECORD: function () {
			var a = this.readUB(4),
				b = this.readUB(1),
				c;
			if (b == 0) c = this.readUB(1);
			var d;
			if (b == 1 || c == 0) {
				d = this.readSB(a + 2);
				if (c == 0) e = 0
			}
			var e;
			if (b == 1 || c == 1) {
				e = this.readSB(a + 2);
				if (c == 1) d = 0
			}
			return {
				isStraightEdge: true,
				type: "STRAIGHT",
				NumBits: a,
				GeneralLineFlag: b,
				VertLineFlag: c,
				DeltaX: d / this.twipsPerPixel,
				DeltaY: e / this.twipsPerPixel
			}
		},
		readCURVEDEDGERECORD: function () {
			var a = this.readUB(4),
				b = this.readSB(a + 2),
				c = this.readSB(a + 2),
				d =
				this.readSB(a + 2),
				e = this.readSB(a + 2);
			return {
				isCurvedEdge: true,
				type: "CURVED",
				NumBits: a,
				ControlDeltaX: b / this.twipsPerPixel,
				ControlDeltaY: c / this.twipsPerPixel,
				AnchorDeltaX: d / this.twipsPerPixel,
				AnchorDeltaY: e / this.twipsPerPixel
			}
		},
		readFILLSTYLEARRAY: function () {
			var a = this.readUI8();
			if (this.context == fljs.swf.tag.DefineShape2 || this.context == fljs.swf.tag.DefineShape3 || this.context == fljs.swf.tag.DefineShape4) if (a == 255) a = a = this.readUI16();
			for (var b = [], c = 0; c < a; c++) b[c] = this.readFILLSTYLE();
			return b
		},
		readFILLSTYLE: function () {
			var a =
			this.readUI8(),
				b;
			if (a == 0) b = this.context == fljs.swf.tag.DefineShape3 || this.context == fljs.swf.tag.DefineShape4 ? this.readRGBA() : this.readRGB();
			var c, d;
			if (a == 16 || a == 18) {
				c = this.readMatrix();
				d = this.readGRADIENT()
			}
			if (a == 19) {
				c = this.readMatrix();
				d = this.readFOCALGRADIENT()
			}
			var e, f;
			if (a == 64 || a == 65 || a == 66 || a == 67) {
				e = this.readUI16();
				f = this.readMatrix()
			}
			this.stream.align();
			return {
				FillStyleType: a,
				Color: b,
				GradientMatrix: c,
				Gradient: d,
				BitmapId: e,
				BitmapMatrix: f
			}
		},
		readLINESTYLEARRAY: function () {
			var a = this.readUI8();
			if (a == 255) a = a = this.readUI16();
			var b = [];
			if (this.context == fljs.swf.tag.DefineShape4) for (var c = 0; c < a; c++) b[c] = this.readLINESTYLE2();
			else for (c = 0; c < a; c++) b[c] = this.readLINESTYLE();
			return b
		},
		readLINESTYLE: function () {
			var a = this.readUI16(),
				b;
			b = this.context == fljs.swf.tag.DefineShape || this.context == fljs.swf.tag.DefineShape2 ? this.readRGB() : this.readRGBA();
			return {
				Width: a / this.twipsPerPixel,
				Color: b
			}
		},
		readLINESTYLE2: function () {
			var a = this.readUI16(),
				b = this.readUB(2),
				c = this.readUB(2),
				d = this.readUB(1),
				e = this.readUB(1),
				f = this.readUB(1),
				g = this.readUB(1);
			this.readUB(5);
			var j = this.readUB(1),
				h = this.readUB(2),
				m;
			if (c == 2) m = this.readUI16();
			var k;
			if (d == 0) k = this.readRGBA();
			var l;
			if (d == 1) l = this.readFILLSTYLE();
			return {
				Width: a / this.twipsPerPixel,
				StartCapStyle: b,
				JoinStyle: c,
				HasFillFlag: d,
				NoHScaleFlag: e,
				NoVScaleFlag: f,
				PixelHintingFlag: g,
				NoClose: j,
				EndCapStyle: h,
				MiterLimitFactor: m,
				Color: k,
				FillType: l
			}
		},
		readGRADIENT: function () {
			this.stream.align();
			for (var a = this.readUB(2), b = this.readUB(2), c = this.readUB(4), d = [], e = 0; e < c; e++) d.push(this.readGRADRECORD());
			return {
				SpreadMode: a,
				InterpolationMode: b,
				NumGradients: c,
				GradientRecords: d
			}
		},
		readFOCALGRADIENT: function () {
			this.stream.align();
			for (var a = this.readUB(2), b = this.readUB(2), c = this.readUB(4), d = [], e = 0; e < c; e++) d.push(this.readGRADRECORD());
			e = this.readFIXED8();
			return {
				SpreadMode: a,
				InterpolationMode: b,
				NumGradients: c,
				GradientRecords: d,
				FocalPoint: e
			}
		},
		readGRADRECORD: function () {
			var a = this.readUI8(),
				b;
			b = this.context == fljs.swf.tag.DefineShape || this.context == fljs.swf.tag.DefineShape2 ? this.readRGB() : this.readRGBA();
			return {
				Ratio: a,
				Color: b
			}
		},
		readID: function () {},
		readMatrix: function () {
			this.stream.align();
			var a = this.readUB(1),
				b, c, d;
			if (a) {
				b = this.readUB(5);
				c = this.readFB(b);
				d = this.readFB(b)
			}
			var e = this.readUB(1),
				f, g, j;
			if (e) {
				f = this.readUB(5);
				g = this.readFB(f);
				j = this.readFB(f)
			}
			var h = this.readUB(5),
				m = this.readSB(h),
				k = this.readSB(h);
			return {
				HasScale: a,
				NScaleBits: b,
				ScaleX: c,
				ScaleY: d,
				HasRotate: e,
				NRotateBits: f,
				RotateSkew0: g,
				RotateSkew1: j,
				NTranslateBits: h,
				TranslateX: m / this.twipsPerPixel,
				TranslateY: k / this.twipsPerPixel
			}
		},
		readSHAPE: function () {
			var a =
			this.readUB(4),
				b = this.readUB(4);
			this.NumFillBits = a;
			this.NumLineBits = b;
			var c = this.readSHAPERECORDS();
			return {
				NumFillBits: a,
				NumLineBits: b,
				ShapeRecords: c
			}
		},
		readShape: function () {
			return this.readSHAPE()
		},
		readTEXTRECORDS: function () {
			for (var a = [];;) {
				this.stream.align();
				if (this.readUB(1)) a.push(this.readTEXTRECORD());
				else {
					this.stream.align();
					break
				}
			}
			return a
		},
		readTEXTRECORD: function () {
			var a = this.readUB(3),
				b = this.readUB(1),
				c = this.readUB(1),
				d = this.readUB(1),
				e = this.readUB(1),
				f;
			if (b) f = this.readUI16();
			var g;
			if (c) g = this.context == fljs.swf.tag.DefineText2 ? this.readRGBA() : this.readRGB();
			var j;
			if (e) j = this.readSI16() / this.twipsPerPixel;
			var h;
			if (d) h = this.readSI16() / this.twipsPerPixel;
			var m;
			if (b) m = this.readUI16() / this.twipsPerPixel;
			for (var k = this.readUI8(), l = [], n = 0; n < k; n++) l.push(this.readGLYPHENTRY());
			return {
				StyleFlagsReserved: a,
				StyleFlagsHasFont: b,
				StyleFlagsHasColor: c,
				StyleFlagsHasYOffset: d,
				StyleFlagsHasXOffset: e,
				FontId: f,
				TextColor: g,
				XOffset: j,
				YOffset: h,
				TextHeight: m,
				GlyphCount: k,
				GlyphEntries: l
			}
		},
		readGLYPHENTRY: function () {
			return {
				GlyphIndex: this.readUB(this.GlyphBits),
				GlyphAdvance: this.readSB(this.AdvanceBits) / this.twipsPerPixel
			}
		},
		readLangCode: function () {
			return this.readUI8()
		},
		readKerningRecord: function () {
			var a, b;
			if (this.FontFlagsWideCodes) {
				a = this.readUI16();
				b = this.readUI16()
			} else {
				a = this.readUI8();
				b = this.readUI8()
			}
			var c = this.readSI16();
			return {
				FontKerningCode1: a,
				FontKerningCode2: b,
				FontKerningAdjustment: c
			}
		},
		readMp3SoundData: function (a) {
			for (var b = this.stream.byteIndex, c = this.readSI16(), d = this.stream.byteIndex, e = []; this.stream.byteIndex < b + a;) e.push(this.readMp3Frame(e.length));
			a = this.stream.byteIndex - d;
			return {
				SeekSamples: c,
				Mp3Frames: e,
				byteIndex: d,
				byteCount: a,
				buffer: this.stream.buffer
			}
		},
		readMp3Frame: function (a) {
			var b = this.readUB(11);
			if (b != 2047) throw new Error("readMp3Frame: Syncword is wrong in frame# " + a + " @ " + this.stream.byteIndex);
			a = this.readUB(2);
			var c = this.readUB(2),
				d = this.readUB(1),
				e = this.readUB(4),
				f = this.readUB(2),
				g = this.readUB(1);
			this.readUB(1);
			var j = this.readUB(2),
				h = this.readUB(2),
				m = this.readUB(1),
				k = this.readUB(1),
				l = this.readUB(2);
			d == 0 && this.readUI16();
			var n = Math.floor((a == {
				MPEG2_5: 0,
				MPEG2: 2,
				MPEG1: 3
			}.MPEG1 ? 144 : 72) * {
				1: [null, 32, 40, 48, 56, 64, 80, 96, 112, 128, 160, 192, 224, 256, 320],
				2: [null, 8, 16, 24, 32, 40, 48, 56, 64, 80, 96, 112, 128, 144, 160]
			}[{
				0: 2,
				2: 2,
				3: 1
			}[a]][e] * 1E3 / {
				0: [11025, 12E3, 8E3],
				2: [22050, 24E3, 16E3],
				3: [44100, 48E3, 32E3]
			}[a][f]) + g - 4,
				p = this.readBytes(n);
			return {
				Syncword: b,
				MpegVersion: a,
				Layer: c,
				ProtectionBit: d,
				Bitrate: e,
				SamplingRate: f,
				PaddingBit: g,
				ChannelMode: j,
				ModeExtension: h,
				Copyright: m,
				Original: k,
				Emphasis: l,
				byteCount: n,
				SampleData: p
			}
		},
		readSoundInfo: function () {
			this.readUB(2);
			var a =
			this.readUB(1),
				b = this.readUB(1),
				c = this.readUB(1),
				d = this.readUB(1),
				e = this.readUB(1),
				f = this.readUB(1),
				g;
			if (f) g = this.readUI32();
			var j;
			if (e) j = this.readUI32();
			var h;
			if (d) h = this.readUI16();
			var m, k;
			if (c) {
				m = this.readUI8();
				k = [];
				for (var l = 0; l < m; l++) k.push(this.readEnvelopeRecord())
			}
			return {
				SyncStop: a,
				SyncNoMultiple: b,
				HasEnvelope: c,
				HasLoops: d,
				HasOutPoint: e,
				HasInPoint: f,
				InPoint: g,
				OutPoint: j,
				LoopCount: h,
				EnvPoints: m,
				EnvelopeRecords: k
			}
		},
		readEnvelopeRecord: function () {
			return {
				Pos44: this.readUI32(),
				LeftLevel: this.readUI16(),
				RightLevel: this.readUI16()
			}
		},
		readButtonRecords: function () {
			for (var a = [], b; b = this.readButtonRecord();) a.push(b);
			return a
		},
		readButtonRecord: function () {
			var a = {};
			this.stream.align();
			this.readUB(2);
			a.ButtonHasBlendMode = this.readUB(1);
			a.ButtonHasFilterList = this.readUB(1);
			a.ButtonStateHitTest = this.readUB(1);
			a.ButtonStateDown = this.readUB(1);
			a.ButtonStateOver = this.readUB(1);
			a.ButtonStateUp = this.readUB(1);
			if (!a.ButtonHasBlendMode && !a.ButtonHasFilterList && !a.ButtonStateHitTest && !a.ButtonStateDown && !a.ButtonStateOver && !a.ButtonStateUp) return null;
			a.CharacterId = this.readUI16();
			a.PlaceDepth = this.readUI16();
			a.PlaceMatrix = this.readMatrix();
			if (this.context == fljs.swf.tag.DefineButton2) {
				a.ColorTransform = this.readCXFORMWITHALPHA();
				if (a.ButtonHasFilterList) a.FilterList = this.readFilterList();
				if (a.ButtonHasBlendMode) a.BlendMode = this.readUI8()
			}
			return a
		},
		readFilterList: function () {
			for (var a = [], b = this.readUI8(), c = 0; c < b; c++) a.push(this.readFilter());
			return a
		},
		readFilter: function () {
			var a = {};
			a.FilterId = this.readUI8();
			switch (a.FilterId) {
			case 0:
				a.DropShadowFilter =
				this.readDropShadowFilter();
				break;
			case 1:
				a.BlurFilter = this.readBlurFilter();
				break;
			case 2:
				a.GlowFilter = this.readGlowFilter();
				break;
			case 3:
				a.BevelFilter = this.readBevelFilter();
				break;
			case 4:
				a.GradientGlowFilter = this.readGradientGlowFilter();
				break;
			case 5:
				a.ConvolutionFilter = this.readConvolutionFilter();
				break;
			case 6:
				a.ColorMatrixFilter = this.readColorMatrixFilter();
				break;
			case 7:
				a.GradientBevelFitler = this.readGradientBevelFilter();
				break
			}
			return a
		},
		readColorMatrixFilter: function () {
			return {
				Matrix: this.readFloats(20)
			}
		},
		readConvolutionFilter: function () {
			var a = {};
			a.MatrixX = this.readUI8();
			a.MatrixY = this.readUI8();
			a.Divisor = this.readFloat();
			a.Bias = this.readFloat();
			a.Matrix = this.readFloats(a.MatrixX * a.MatrixY);
			a.DefaultColor = this.readRGBA();
			this.readUB(6);
			a.Clamp = this.readUB(1);
			a.PreserveAlpha = this.readUB(1);
			return a
		},
		readBlurFilter: function () {
			var a = {
				BlurX: this.readFixed(),
				BlurY: this.readFixed(),
				Passes: this.readUB(5)
			};
			this.readUB(3);
			return a
		},
		readDropShadowFilter: function () {
			return {
				DropShadowColor: this.readRGBA(),
				BlurX: this.readFixed(),
				BlurY: this.readFixed(),
				Angle: this.readFixed(),
				Distance: this.readFixed(),
				Strength: this.readFixed8(),
				InnerShadow: this.readUB(1),
				Knockout: this.readUB(1),
				CompositeSource: this.readUB(1),
				Passes: this.readUB(5)
			}
		},
		readGlowFilter: function () {
			return {
				GlowColor: this.readRGBA(),
				BlurX: this.readFixed(),
				BlurY: this.readFixed(),
				Strength: this.readFixed8(),
				InnerGlow: this.readUB(1),
				Knockout: this.readUB(1),
				CompositeSource: this.readUB(1),
				Passes: this.readUB(5)
			}
		},
		readBevelFilter: function () {
			return {
				ShadowColor: this.readRGBA(),
				HighlightColor: this.readRGBA(),
				BlurX: this.readFixed(),
				BlurY: this.readFixed(),
				Angle: this.readFixed(),
				Distance: this.readFixed(),
				Strength: this.readFixed8(),
				InnerShadow: this.readUB(1),
				Knockout: this.readUB(1),
				CompositeSource: this.readUB(1),
				OnTop: this.readUB(1),
				Passes: this.readUB(4)
			}
		},
		readGradientGlowFilter: function () {
			var a = {};
			a.NumColors = this.readUI8();
			a.GradientColors = [];
			for (var b = 0; b < a.NumColors; b++) a.GradientColors.push(this.readRGBA());
			a.GradientRatios = [];
			for (b = 0; b < a.NumColors; b++) a.GradientRatios.push(this.readUI8());
			a.BlurX = this.readFixed();
			a.BlurY = this.readFixed();
			a.Angle = this.readFixed();
			a.Distance = this.readFixed();
			a.Strength = this.readFixed8();
			a.InnerShadow = this.readUB(1);
			a.Knockout = this.readUB(1);
			a.CompositeSource = this.readUB(1);
			a.OnTop = this.readUB(1);
			a.Passes = this.readUB(4);
			return a
		},
		readGradientBevelFilter: function () {
			var a = {};
			a.NumColors = this.readUI8();
			a.GradientColors = [];
			for (var b = 0; b < a.NumColors; b++) a.GradientColors.push(this.readRGBA());
			a.GradientRatios = [];
			for (b = 0; b < a.NumColors; b++) a.GradientRatios.push(this.readUI8());
			a.BlurX = this.readFixed();
			a.BlurY = this.readFixed();
			a.Angle = this.readFixed();
			a.Distance = this.readFixed();
			a.Strength = this.readFixed8();
			a.InnerShadow = this.readUB(1);
			a.Knockout = this.readUB(1);
			a.CompositeSource = this.readUB(1);
			a.OnTop = this.readUB(1);
			a.Passes = this.readUB(4);
			return a
		},
		readButtonCondActions: function (a) {
			for (var b = [], c = this.stream.byteIndex, d; d = this.readUI16();) b.push(this.readButtonCondAction(d - 2));
			b.push(this.readButtonCondAction(a - (this.stream.byteIndex - c)));
			return b
		},
		readButtonCondAction: function (a) {
			var b = {};
			b.CondActionSize = a + 2;
			b.CondIdleToOverDown = this.readUB(1);
			b.CondOutDownToIdle = this.readUB(1);
			b.CondOutDownToOverDown = this.readUB(1);
			b.CondOverDownToOutDown = this.readUB(1);
			b.CondOverDownToOverUp = this.readUB(1);
			b.CondOverUpToOverDown = this.readUB(1);
			b.CondOverUpToIdle = this.readUB(1);
			b.CondIdleToOverUp = this.readUB(1);
			b.CondKeyPress = this.readUB(7);
			b.CondOverDownToIdle = this.readUB(1);
			b.Actions = this.readActionRecords(a - 2);
			return b
		},
		readPix15: function () {
			this.stream.align();
			this.readUB(1);
			return {
				Red: Math.floor(this.readUB(5) * 8.226),
				Green: Math.floor(this.readUB(5) * 8.226),
				Blue: Math.floor(this.readUB(5) * 8.226)
			}
		},
		beginContext: function (a) {
			this.context = a
		},
		endContext: function () {
			this.NumLineBits = this.NumFillBits = this.context = null
		}
	});
	fljs.swf.StringStream = function (a) {
		this.buffer = String(a);
		this.bitIndex = this.byteIndex = this._byte = 0;
		this.byteIndexForBits = -1;
		this.logger = fljs.console("parse")
	};
	fljs.addMethods(fljs.swf.StringStream, {
		length: function () {
			return this.buffer.length
		},
		hasMore: function () {
			return this.byteIndex < this.buffer.length
		},
		seek: function (a) {
			this._byte = 0;
			this.byteIndex = a;
			this.bitIndex = 0;
			this.byteIndexForBits = -1
		},
		skipBytes: function (a) {
			this.byteIndex += a
		},
		readBytes: function (a) {
			for (var b = [], c = 0; c < a; c++) b.push(String.fromCharCode(this.buffer.charCodeAt(this.byteIndex++) & 255));
			return b
		},
		readBytesRev: function (a) {
			for (var b = [], c = 0; c < a; c++) b.unshift(String.fromCharCode(this.buffer.charCodeAt(this.byteIndex++) & 255));
			return b
		},
		align: function () {
			this.bitIndex = 8
		},
		nextUByte: function () {
			return this.buffer.charCodeAt(this.byteIndex++) & 255
		},
		nextSByte: function () {
			var a = this.buffer.charCodeAt(this.byteIndex++) & 255;
			if (a >= 128) a -= 256;
			return a
		},
		nextUShort: function () {
			var a = (this.buffer.charCodeAt(this.byteIndex++) & 255) + ((this.buffer.charCodeAt(this.byteIndex++) & 255) << 8);
			if (a < 0) a += 65536;
			return a
		},
		nextSShort: function () {
			var a = this.nextUShort();
			if (a > 32767) a -= 65536;
			return a
		},
		nextULong: function () {
			var a = this.buffer.charCodeAt(this.byteIndex++) & 255,
				b = this.buffer.charCodeAt(this.byteIndex++) & 255,
				c = this.buffer.charCodeAt(this.byteIndex++) & 255,
				d = this.buffer.charCodeAt(this.byteIndex++) & 255;
			a = a + (b << 8) + (c << 16) + (d << 24);
			if (a < 0) a += 4294967296;
			return a
		},
		nextSLong: function () {
			var a = this.nextULong();
			if (a > 2147483647) a -= 4294967296;
			return a
		},
		nextEncodedULong: function () {
			var a = this.buffer.charCodeAt(this.byteIndex++) & 255;
			if (!(a & 128)) return a;
			a = a & 127 | (this.buffer.charCodeAt(this.byteIndex++) & 255) << 7;
			if (!(a & 16384)) return a;
			a = a & 16383 | (this.buffer.charCodeAt(this.byteIndex++) & 255) << 14;
			if (!(a & 2097152)) return a;
			a = a & 2097151 | (this.buffer.charCodeAt(this.byteIndex++) & 255) << 21;
			if (!(a & 268435456)) return a;
			return a = a & 268435455 | (this.buffer.charCodeAt(this.byteIndex++) & 255) << 28
		},
		nextString: function () {
			for (var a = [], b; b = this.nextUByte();) a.push(String.fromCharCode(b));
			return a.join("")
		},
		_nextByteForBits: function () {
			this._byte = this.nextUByte();
			this.bitIndex = 0;
			this.byteIndexForBits = this.byteIndex
		},
		nextUBits: function (a) {
			this.byteIndex != this.byteIndexForBits && this._nextByteForBits();
			for (var b =
			0, c = 0; c < a; c++) {
				this.bitIndex == 8 && this._nextByteForBits();
				b = (b << 1) + (this._byte >> 7 - this.bitIndex & 1);
				this.bitIndex += 1
			}
			return b
		},
		nextSBits: function (a, b) {
			b = this.nextUBits(a, b);
			if (b >> a - 1) b -= Math.pow(2, a);
			return b
		},
		nextFShort: function () {
			return this.nextSShort() * Math.pow(2, -8)
		},
		nextFLong: function () {
			return this.nextSLong() * Math.pow(2, -16)
		},
		nextFBits: function (a) {
			return this.nextSBits(a) * Math.pow(2, -16)
		},
		nextHalfFloat: function () {
			return this.nextUShort()
		},
		nextSingleFloat: function () {
			return this.nextULong()
		},
		nextDoubleFloat: function () {
			return this.nextULong() + this.nextULong()
		}
	});
	fljs.swf.TagHeader = function () {};
	fljs.addMethods(fljs.swf.TagHeader, {
		tagClass: function () {
			return fljs.swf.tag.tagMap[this.type]
		}
	});
	fljs.swf.TagReader = function (a) {
		this.stream = new fljs.swf.SwfStream(new fljs.swf.StringStream(a));
		this.tagMap = fljs.swf.tag.tagMap
	};
	fljs.addMethods(fljs.swf.TagReader, {
		position: function () {
			return this.stream.stream.byteIndex
		},
		readSwfHeader: function () {
			return this.stream.readSwfHeader()
		},
		readTagHeader: function () {
			var a = this.stream.readRecordHeader(),
				b = new fljs.swf.TagHeader;
			b.data = a;
			b.type = a.TagType;
			b.length = a.TagLength;
			return b
		},
		readTag: function (a, b) {
			var c = a.tagClass();
			if (c) {
				var d = new c;
				c = this.stream.stream.byteIndex;
				d.read(this.stream, a.data, this, null, fljs.Player.getInstance().stage);
				d.header = a;
				d.byteIndex = c;
				if (!b && this.stream.stream.byteIndex < c + a.length) this.stream.skipBytes(c + a.length - this.stream.stream.byteIndex);
				else b || this.checkLocation(d)
			}
			return d
		},
		skipTag: function (a) {
			this.stream.skipBytes(a.length)
		},
		checkLocation: function (a) {
			if (this.stream.stream.byteIndex != a.byteIndex + a.header.length) {
				fljs.console("parse");
			}
		}
	});
	fljs.swf.DefinitionParser = function (a) {
		this.reader = new fljs.swf.TagReader(a);
		this.pendingSprite = this.pendingHeader = null;
		this.done = false
	};
	fljs.addMethods(fljs.swf.DefinitionParser, {
		readHeader: function () {
			var a = this.reader.readSwfHeader();
			return this.reader.stream.header = a
		},
		readSomeTags: function (a) {
			fljs.console("parse");
			if (!this.done) {
				var b;
				b = this.pendingSprite ? this.pendingSprite.tag : a.mainTimeline;
				for (var c = this.reader, d = 0, e = c.stream.stream.byteIndex; c.stream.hasMore();) {
					var f = c.stream.stream.byteIndex,
						g;
					if (this.pendingHeader) {
						g = this.pendingHeader;
						this.pendingHeader = null
					} else g = c.readTagHeader();
					if (d > 0 && g.length > 2E4) {
						this.pendingHeader =
						g;
						a.mainTimeline.__bytesLoaded += e - c.stream.stream.byteIndex;
						return
					}
					var j = c.stream.stream.byteIndex;
					switch (g.tagClass()) {
					case fljs.swf.tag.DefineShape:
					case fljs.swf.tag.DefineShape2:
					case fljs.swf.tag.DefineShape3:
					case fljs.swf.tag.DefineShape4:
					case fljs.swf.tag.DefineFont:
					case fljs.swf.tag.DefineFont2:
					case fljs.swf.tag.DefineFont3:
					case fljs.swf.tag.DefineFontInfo:
					case fljs.swf.tag.DefineFontInfo2:
					case fljs.swf.tag.DefineText:
					case fljs.swf.tag.DefineText2:
					case fljs.swf.tag.DefineEditText:
					case fljs.swf.tag.DefineSound:
					case fljs.swf.tag.JpegTables:
					case fljs.swf.tag.DefineBits:
					case fljs.swf.tag.DefineBitsJPEG2:
					case fljs.swf.tag.DefineBitsLossless:
					case fljs.swf.tag.DefineBitsLossless2:
					case fljs.swf.tag.DefineButton2:
					case fljs.swf.tag.FrameLabel:
					case fljs.swf.tag.ExportAssets:
						var h =
						c.readTag(g);
						if (c.stream.stream.byteIndex != j + g.length) {
							rar.rar = true;
							return
						}
						h.evaluate(a, this, null, b);
						break;
					case fljs.swf.tag.DefineBitsJpeg3:
						c.readTag(g);
						if (c.stream.stream.byteIndex != j + g.length) {
							rar.rar = true;
							return
						}
						break;
					case fljs.swf.tag.DefineSprite:
						h = c.readTag(g, true);
						h.evaluate(a, this, null, a.stage);
						this.pendingSprite = {
							header: g,
							tag: h,
							endByteIndex: j + g.length
						};
						b = h;
						break;
					case fljs.swf.tag.PlaceObject:
					case fljs.swf.tag.RemoveObject:
					case fljs.swf.tag.SetBackgroundColor:
					case fljs.swf.tag.DoAction:
					case fljs.swf.tag.DoInitAction:
					case fljs.swf.tag.Protect:
					case fljs.swf.tag.StartSound:
					case fljs.swf.tag.SoundStreamHead:
					case fljs.swf.tag.SoundStreamBlock:
					case fljs.swf.tag.PlaceObject2:
					case fljs.swf.tag.PlaceObject3:
					case fljs.swf.tag.RemoveObject2:
					case fljs.swf.tag.SoundStreamHead2:
					case fljs.swf.tag.DoAbc:
					case fljs.swf.tag.End:
						h =
						c.readTag(g);
						b.frameData_[b.framesLoaded_].tags.push([h, g]);
						if (c.stream.stream.byteIndex != j + g.length) {
							rar.rar = true;
							return
						}
						break;
					case fljs.swf.tag.ShowFrame:
						c.readTag(g);
						b.frameData_[b.framesLoaded_].loaded = true;
						b.framesLoaded_ += 1;
						if (b.framesLoaded_ == b.totalFrames_) if (this.pendingSprite) {
							c.stream.stream.byteIndex < this.pendingSprite.endByteIndex && c.stream.skipBytes(this.pendingSprite.endByteIndex - c.stream.stream.byteIndex);
							b.__bytesLoaded = b.__bytesTotal;
							this.pendingSprite = null;
							b = a.mainTimeline
						} else {
							b.__bytesLoaded =
							b.__bytesTotal;
							this.done = true;
							return
						} else b.frameData_[b.framesLoaded_] = {
							tags: []
						};
						break;
					default:
						fljs.console("unk");
						c.skipTag(g)
					}
					d += c.stream.stream.byteIndex - f;
					if (d > 2E4) {
						a.mainTimeline.__bytesLoaded += c.stream.stream.byteIndex - e;
						return
					}
				}
			}
		}
	});
	fljs.swf.DefParser = fljs.swf.DefinitionParser;
	fljs.swf.act = {};
	fljs.swf.act.ActionInterpreter = function (a) {
		this.player = a;
		this.trace = false;
		this.consts = new fljs.swf.act.ConstantsPool;
		this.globals = new fljs.swf.act.Globals(a);
		this.traceLogger = fljs.console("trace")
	};
	fljs.swf.act.ActionInterpreter.ActionCode = {
		End: 0,
		NextFrame: 4,
		PreviousFrame: 5,
		Play: 6,
		Stop: 7,
		Subtract: 11,
		Multiply: 12,
		Divide: 13,
		Not: 18,
		Pop: 23,
		ToInteger: 24,
		GetVariable: 28,
		SetVariable: 29,
		Trace: 38,
		StartDrag: 39,
		EndDrag: 40,
		GetTime: 52,
		Delete: 58,
		DefineLocal: 60,
		CallFunction: 61,
		Return: 62,
		NewObject: 64,
		DefineLocal2: 65,
		InitObject: 67,
		TypeOf: 68,
		Add2: 71,
		Less2: 72,
		Equals2: 73,
		PushDuplicate: 76,
		GetMember: 78,
		SetMember: 79,
		Increment: 80,
		Decrement: 81,
		CallMethod: 82,
		Greater: 103,
		GotoFrame: 129,
		GetUrl: 131,
		StoreRegister: 135,
		ConstantPool: 136,
		WaitForFrame: 138,
		SetTarget: 139,
		GotoLabel: 140,
		DefineFunction2: 142,
		With: 148,
		Push: 150,
		Jump: 153,
		GetUrl2: 154,
		DefineFunction: 155,
		If: 157,
		GotoFrame2: 159
	};
	fljs.addMethods(fljs.swf.act.ActionInterpreter, {
		value: function (a, b) {
			switch (b.Type) {
			case 0:
			case 2:
			case 3:
			case 5:
			case 10:
			case 11:
				return b;
			case 1:
			case 6:
			case 7:
				return {
					Type: 1,
					Value: b.Value
				};
			case 4:
				return a.reg(b.Value);
			case 8:
			case 9:
				return {
					Type: 0,
					Value: this.consts.lookup(b.Value)
				};
			default:
				return "[ERR: unknown value]"
			}
		},
		callFunction: function (a, b, c, d) {
			a = new fljs.swf.act.Context(c, b.Context, this, false, b.Value.SupressThisFlag);
			for (var e = 0; e < b.Value.NumParams; e++) {
				var f = b.Value.Parameters[e].Register,
					g = d[e];
				g || (g = {
					Type: 3,
					Value: undefined
				});
				f ? a.setReg(f, g) : a.setLocal(b.Value.Parameters[e].ParamName, g)
			}
			f = 1;
			if (b.Value.PreloadThisFlag) {
				a.setReg(f, a.locals.get("this"));
				f += 1
			}
			if (b.Value.PreloadArgumentsFlag) {
				a.setReg(f, {
					Type: 3,
					Value: undefined
				});
				f += 1
			}
			if (b.Value.PreloadSuperFlag) {
				a.setReg(f, {
					Type: 3,
					Value: undefined
				});
				f += 1
			}
			if (b.Value.PreloadRootFlag) {
				a.setReg(f, a.locals.get("_root"));
				f += 1
			}
			if (b.Value.PreloadParentFlag) {
				a.setReg(f, a.locals.get("_parent"));
				f += 1
			}
			b.Value.PreloadGlobalFlag && a.setReg(f, a.locals.get("_global"));
			d = this.consts;
			this.consts = b.Consts;
			b = this.eval(c, b.Value.Code, a);
			this.consts = d;
			return b
		},
		callMethod: function (a, b, c, d) {
			var e;
			switch (b.Type) {
			case 0:
				a = new fljs.swf.act.String(b.Value);
				e = a.get(c).apply(a, d);
				break;
			case 3:
				break;
			case 11:
				c = b.Value.get(c);
				switch (c.Type) {
				case 10:
					e = c.Value.apply(b.Value, d);
					break;
				case 12:
					e = this.callFunction(a, c, b.Value, d);
					break
				}
				break
			}
			return e
		},
		callWith: function (a, b, c) {
			a = new fljs.swf.act.Context(c, a, this, true);
			this.eval(c, b.Value.Code, a)
		},
		callback: function (a, b, c) {
			c || (c = []);
			switch (b.Type) {
			case 10:
				b.Value.apply(a, c);
				break;
			case 12:
				this.callFunction(null, b, a, c);
				break
			}
		},
		eval: function (a, b, c) {
			c || (c = new fljs.swf.act.Context(a, null, this));
			for (var d = fljs.swf.act.ActionInterpreter.ActionCode, e = [], f = 0; f < b.length; f++) {
				var g = b[f];
				g = b[f];
				switch (g.ActionCode) {
				case d.ConstantPool:
					this.consts = new fljs.swf.act.ConstantsPool;
					for (var j in g.ConstantPool) this.consts.push(g.ConstantPool[j]);
					this.trace && e.push("ConstantPool = " + this.consts);
					break;
				case d.Push:
					for (j in g.Values) c.stack.push(this.value(c, g.Values[j]));
					if (this.trace) {
						var h = [];
						for (j in g.Values) h.push(this.value(c, g.Values[j]));
						e.push("Push(" + h + ")")
					}
					break;
				case d.GetVariable:
					g = c.stack.pop().Value;
					h = c.get(g);
					c.stack.push(h);
					this.trace && e.push("GetVariable(" + [g, h] + ")");
					break;
				case d.CallMethod:
					g = c.stack.pop().Value;
					var m = c.stack.pop(),
						k = c.stack.pop().Value;
					h = [];
					for (j = 0; j < k; j++) h.push(c.stack.pop());
					var l;
					if (g) l = this.callMethod(c, m, g, h);
					else switch (m.Type) {
					case 10:
						l = m.Value.apply(null, h);
						break;
					case 12:
						l = this.callFunction(c, m, null, h);
						break
					}
					if (typeof l == "undefined") l = {
						Type: 3,
						Value: undefined
					};
					c.stack.push(l);
					this.trace && e.push("Call(" + [m, g, h, l] + ")");
					break;
				case d.SetVariable:
					h = c.stack.pop();
					k = c.stack.pop().Value;
					m = k.split(":");
					if (m.length == 1) {
						a = c.self;
						g = m[0]
					} else {
						a = c.resolvePath(m[0]);
						g = m[1]
					}
					switch (h.Type) {
					case 0:
					case 1:
					case 2:
					case 3:
					case 5:
					case 6:
					case 7:
						a.set(g, {
							Type: h.Type,
							Value: h.Value
						});
						break;
					default:
						a.set(g, h);
						break
					}
					this.trace && e.push("Set: " + [k, g, h]);
					break;
				case d.Divide:
					g = c.stack.pop();
					h = c.stack.pop();
					k = {
						Type: 1,
						Value: h.Value / g.Value
					};
					if (fljs.Player.getInstance().swfVersion == 4 && (isNaN(k.Value) || k.Value == Number.POSITIVE_INFINITY || k.Value == Number.NEGATIVE_INFINITY)) k = {
						Type: 0,
						Value: "#ERROR#"
					};
					c.stack.push(k);
					this.trace && e.push([g, "/", h].toString());
					break;
				case d.Multiply:
					g = c.stack.pop();
					h = c.stack.pop();
					c.stack.push({
						Type: 1,
						Value: Number(g.Value) * Number(h.Value)
					});
					this.trace && e.push([g, "*", h].toString());
					break;
				case d.Equals2:
					g = c.stack.pop();
					h = c.stack.pop();
					c.stack.push({
						Type: 5,
						Value: g.Value == h.Value
					});
					this.trace && e.push([g, "==", h].toString());
					break;
				case d.Not:
					g = Number(c.stack.pop().Value);
					if (fljs.Player.getInstance().swfVersion == 4) g == 0 ? c.stack.push({
						Type: 1,
						Value: 1
					}) : c.stack.push({
						Type: 1,
						Value: 0
					});
					else c.stack.push({
						Type: 5,
						Value: !g
					});
					this.trace && e.push(["!", g].toString());
					break;
				case d.If:
					h = c.stack.pop();
					if (h.Value) {
						for (j = f + 1; b[j] && b[j].address != b[f + 1].address + g.BranchOffset;) if (g.BranchOffset > 0) j += 1;
						else j -= 1;
						f = j - 1
					}
					this.trace && e.push(["if(", h, ")", f].toString());
					break;
				case d.Pop:
					c.stack.pop();
					this.trace && e.push("pop");
					break;
				case d.WaitForFrame:
					if (c.self.get__framesloaded().Value < g.Frame + 1) f += 1 + g.SkipCount;
					this.trace && e.push("waitForFrame(" + [g.Frame + 1, g.SkipCount] + ")");
					break;
				case d.GotoFrame:
					c.self.gotoFrame({
						Type: 1,
						Value: g.Frame + 1
					});
					this.trace && e.push("gotoFrame(" + (g.Frame + 1) + ")");
					break;
				case d.GetUrl:
					c.self.getUrl({
						Type: 0,
						Value: g.UrlString
					}, {
						Type: 0,
						Value: g.TargetString
					});
					this.trace && e.push('getUrl("' + g.UrlString + '")');
					break;
				case d.GetUrl2:
					if (g.LoadTargetFlag) this.trace && e.push("unsupported getUrl call");
					else if (g.LoadVariablesFlag) this.trace && e.push("unsupported getUrl call");
					else {
						g.SendVarsMethod && this.trace && e.push("unsupported getUrl call");
						g = c.stack.pop();
						h = c.stack.pop();
						c.self.getUrl(h, g);
						this.trace && e.push('getUrl("' + h + '", "' + g + '")')
					}
					break;
				case d.Play:
					c.self.play();
					this.trace && e.push("play()");
					break;
				case d.Stop:
					c.self.stop();
					this.trace && e.push("stop()");
					break;
				case d.DefineFunction:
					if (g.FunctionName) {
						c.set(g.FunctionName, {
							Type: 12,
							Value: g,
							Consts: this.consts,
							Context: c
						});
						this.trace && e.push(g.FunctionName + " = function() {}")
					} else {
						c.stack.push({
							Type: 12,
							Value: g,
							Consts: this.consts,
							Context: c
						});
						this.trace && e.push("Push(function " + g.FunctionName + "() {})")
					}
					break;
				case d.SetTarget:
					c.setTarget(g.TargetName);
					this.trace && e.push("SetTarget(" + g.TargetName + ")");
					break;
				case d.PreviousFrame:
					c.self.prevFrame();
					this.trace && e.push("PrevFrame()");
					break;
				case d.NextFrame:
					c.self.nextFrame();
					this.trace && e.push("NextFrame()");
					break;
				case d.Jump:
					h = g.BranchOffset > 0 ? 1 : -1;
					for (j = f + 1; b[j] && b[j].address != b[f + 1].address + g.BranchOffset;) j += h;
					f = j - 1;
					this.trace && e.push("Jump(" + g.BranchOffset + ")");
					break;
				case d.NewObject:
					g =
					c.stack.pop().Value;
					k = c.stack.pop().Value;
					h = [];
					for (j = 0; j < k; j++) h.push(c.stack.pop());
					k = c.get(g);
					switch (k.Type) {
					case 11:
						a = new k.Value;
						a.init.apply(a, h);
						a = {
							Type: 11,
							Value: a
						};
						break
					}
					c.stack.push(a);
					this.trace && e.push("New(" + g + ")");
					break;
				case d.GetMember:
					g = c.stack.pop().Value;
					a = c.stack.pop();
					c.stack.push(a.Value.get(g));
					this.trace && e.push("GetMember (" + [a, g] + ")");
					break;
				case d.SetMember:
					h = c.stack.pop();
					g = c.stack.pop().Value;
					a = c.stack.pop();
					a.Value.set(g, h);
					this.trace && e.push("SetMember (" + [a, g, h] + ")");
					break;
				case d.InitObject:
					k = c.stack.pop().Value;
					a = new fljs.swf.act.Object;
					for (f = 0; f < k; f++) {
						h = c.stack.pop();
						g = c.stack.pop().Value;
						a.set(g, h)
					}
					this.trace && e.push("InitObject (" + [a, k] + ")");
					break;
				case d.Trace:
					h = c.stack.pop();
					this.traceLogger.info(h.Value);
					this.trace && e.push("Trace (" + h.Value + ")");
					break;
				case d.Increment:
					h = c.stack.pop();
					c.stack.push({
						Type: h.Type,
						Value: h.Value + 1
					});
					this.trace && e.push("Increment (" + h.Value + ")");
					break;
				case d.With:
					a = c.stack.pop();
					this.callWith(c, g, a.Value);
					this.trace && e.push("With (" + a + ")");
					break;
				case d.End:
					this.trace && e.push("End");
					break;
				case d.DefineFunction2:
					if (g.FunctionName) {
						c.set(g.FunctionName, {
							Type: 12,
							Value: g,
							Consts: this.consts,
							Context: c
						});
						this.trace && e.push(g.FunctionName + " = function() {}")
					} else {
						c.stack.push({
							Type: 12,
							Value: g,
							Consts: this.consts,
							Context: c
						});
						this.trace && e.push("Push(function " + g.FunctionName + "() {})")
					}
					this.trace && e.push("DefineFunction2(" + g.FunctionName + ")");
					break;
				case d.StoreRegister:
					c.setReg(g.RegisterNumber, c.stack[c.stack.length - 1]);
					this.trace && e.push("StoreRegister(" + g.RegisterNumber + ")");
					break;
				case d.GotoLabel:
					c.self.gotoFrame({
						Type: 0,
						Value: g.Label
					});
					this.trace && e.push("GotoLabel(" + g.Label + ")");
					break;
				case d.StartDrag:
					c.stack.pop();
					c.stack.pop();
					if (c.stack.pop().Value) {
						c.stack.pop();
						c.stack.pop();
						c.stack.pop();
						c.stack.pop()
					}
					break;
				case d.EndDrag:
					break;
				case d.Add2:
					h = c.stack.pop();
					k = c.stack.pop();
					g = h.Type == 0 || k.Type == 0 ? 0 : h.Type == 6 || k.Type == 6 ? 6 : h.Type == 1 || k.Type == 1 ? 1 : 7;
					c.stack.push({
						Type: g,
						Value: k.Value + h.Value
					});
					break;
				case d.Subtract:
					g = Number(c.stack.pop().Value);
					h = Number(c.stack.pop().Value);
					c.stack.push({
						Type: 1,
						Value: h - g
					});
					break;
				case d.DefineLocal:
					h = c.stack.pop();
					g = c.stack.pop().Value;
					c.setLocal(g, h);
					break;
				case d.PushDuplicate:
					h = c.stack[c.stack.length - 1];
					switch (h.Type) {
					case 0:
					case 1:
					case 2:
					case 3:
					case 5:
					case 6:
					case 7:
						g = {
							Type: h.Type,
							Value: h.Value
						};
						break;
					default:
						g = h;
						break
					}
					c.stack.push(g);
					break;
				case d.GetTime:
					c.stack.push({
						Type: 1,
						Value: fljs.now() - fljs.Player.getInstance().startTime
					});
					break;
				case d.Greater:
					h = c.stack.pop();
					k = c.stack.pop();
					c.stack.push({
						Type: 5,
						Value: k.Value > h.Value
					});
					break;
				case d.CallFunction:
					g = c.stack.pop().Value;
					k = c.stack.pop().Value;
					h = [];
					for (j = 0; j < k; j++) h.push(c.stack.pop());
					k = c.get(g);
					if (g) switch (k.Type) {
					case 10:
						l = k.Value.apply(null, h);
						break;
					case 12:
						l = this.callFunction(c, k, null, h);
						break
					}
					if (typeof l == "undefined") l = {
						Type: 3,
						Value: undefined
					};
					c.stack.push(l);
					break;
				case d.DefineLocal2:
					g = c.stack.pop().Value;
					g in c.locals || c.setLocal(g, {
						Type: 3,
						Value: undefined
					});
					break;
				case d.TypeOf:
					h = c.stack.pop();
					g = {
						0: "string",
						1: "number",
						2: "null",
						3: "undefined",
						5: "boolean",
						6: "number",
						7: "number",
						10: "function",
						11: "object",
						12: "function"
					}[h.Type];
					if (h.Value instanceof fljs.swf.act.MovieClip) g = "movieclip";
					c.stack.push({
						Type: 0,
						Value: g
					});
					break;
				case d.ToInteger:
					h = Number(c.stack.pop().Value);
					h = h >= 0 ? Math.floor(h) : Math.ceil(h);
					c.stack.push({
						Type: 1,
						Value: h
					});
					break;
				case d.Return:
					return c.stack.pop();
				case d.GotoFrame2:
					h = c.stack.pop();
					if (h.Type == 0) {
						m = h.Value.split(":");
						if (m.length == 1) {
							a = c.self;
							h = m[0]
						} else {
							a = c.resolvePath(m[0]);
							h = m[1]
						}
						h = parseInt(h) ? {
							Type: 1,
							Value: parseInt(h)
						} : {
							Type: 0,
							Value: h
						}
					} else {
						a = c.self;
						h = h
					}
					if (g.SceneBias) h.Value += g.SceneBias;
					g.PlayFlag ? c.self.gotoandPlay(h) : c.self.gotoFrame(h);
					break;
				case d.Less2:
					h = c.stack.pop().Value;
					k = c.stack.pop().Value;
					c.stack.push({
						Type: 5,
						Value: k < h
					});
					break;
				case d.Decrement:
					h = c.stack.pop();
					c.stack.push({
						Type: h.Type,
						Value: h.Value - 1
					});
					break;
				case d.Delete:
					g = c.stack.pop().Value;
					a = c.stack.pop();
					a.Value.del(g);
					break;
				default:
					rar.rar = rar;
					this.trace && e.push("skipped: 0x" + g.ActionCode.toString(16))
				}
			}
			this.trace && fljs.console("actions").info(e.join("\n"))
		}
	});
	fljs.swf.act.Context = function (a, b, c, d, e) {
		this.self = a;
		if (this.parent = b) this.root = b.root ? b.root : b;
		this.withCtx = d;
		this.stack = [];
		this.interp = c;
		this.locals = this.withCtx ? this.parent.locals : new fljs.swf.act.Object;
		if (!this.withCtx) {
			a = fljs.Player.getInstance().mainTimeline.getAs2Object();
			this.locals.set("_root", {
				Type: 11,
				Value: a
			});
			this.locals.set("_level0", {
				Type: 11,
				Value: a
			});
			this.locals.set("_global", {
				Type: 11,
				Value: c.globals
			});
			if (this.self) {
				for (c = this; !c.self;) c = c.parent;
				b = c.self;
				c = b.dispObj.getParent() ? b.dispObj.getParent().getAs2Object() : a
			} else b = c = a;
			this.locals.set("_parent", {
				Type: 11,
				Value: c
			});
			e || this.locals.set("this", {
				Type: 11,
				Value: b
			})
		}
		this.regs = []
	};
	fljs.addMethods(fljs.swf.act.Context, {
		set: function (a, b) {
			if (a in this.locals) this.locals.set(a, b);
			else {
				if (this.withCtx) if (a in this.self) {
					this.self.set(a, b);
					return
				}
				this.parent ? this.parent.set(a, b) : this.self.set(a, b)
			}
		},
		setLocal: function (a, b) {
			this.parent ? this.locals.set(a, b) : this.set(a, b)
		},
		get: function (a) {
			var b;
			b = this.locals.get(a);
			if (b.Type != 3) return b;
			if (this.withCtx) {
				b = this.self.get(a);
				if (b.Type != 3) return b
			}
			if (this.parent) return this.parent.get(a);
			else b = this.root ? this.root.get(a) : this.self.get(a);
			if (b.Type != 3) return b;
			return this.interp.globals.get(a)
		},
		reg: function (a) {
			return this.regs[a]
		},
		setReg: function (a, b) {
			this.regs[a] = b
		},
		resolvePath: function (a) {
			var b;
			b = a.indexOf(".") == -1 ? "/" : ".";
			a = a.split(b);
			b = this.self;
			if (a[0] == "" && a.length > 1) b = this.root ? this.root.self : this.self;
			for (var c in a) {
				var d = a[c];
				if (d) if (d != ".") b = d == ".." ? b.parent.Value : b.dispObj.__childNames[d].getAs2Object()
			}
			return b
		},
		setTarget: function (a) {
			if (a) {
				a = this.resolvePath(a);
				if (!this.origTarget) this.origTarget = this.self
			} else a = this.origTarget;
			this.self = a
		}
	});
	fljs.swf.act.ConstantsPool = function () {
		this.consts = []
	};
	fljs.addMethods(fljs.swf.act.ConstantsPool, {
		clear: function () {
			this.consts = []
		},
		push: function (a) {
			this.consts.push(a)
		},
		lookup: function (a) {
			return this.consts[a]
		}
	});
	fljs.swf.act.Object = function () {
		this.self = {};
		this.funcs = {};
		this.props = {}
	};
	fljs.swf.act.Object.Type = {
		Bool: 5,
		Func: 10
	};
	fljs.addMethods(fljs.swf.act.Object, {
		setNativeFunc: function (a, b) {
			this.funcs[a] = b
		},
		setNativeProperty: function (a, b) {
			this.props[a] = b
		},
		set: function (a, b) {
			if (this.props && a in this.props) this["set_" + this.props[a]](b);
			else this.self[a] = b
		},
		get: function (a) {
			if (this.funcs && a in this.funcs) return {
				Type: 10,
				Value: this[this.funcs[a]]
			};
			if (this.props && a in this.props) return this["get_" + this.props[a]]();
			else if (this.self && a in this.self) {
				a = this.self[a];
				return a == null ? {
					Type: 2,
					Value: null
				} : a
			} else return {
				Type: 3,
				Value: undefined
			}
		},
		del: function (a) {
			if (this.props && a in this.props) this["set_" + this.props[a]]({
				Type: 3,
				Value: undefined
			});
			else delete this.self[a]
		}
	});
	fljs.swf.act.MovieClip = function (a) {
		fljs.swf.act.Object.call(this);
		this.dispObj = a;
		this.logger = fljs.console("mcaction");
		this.funcs = fljs.swf.act.MovieClip.funcs;
		this.props = fljs.swf.act.MovieClip.props
	};
	fljs.inherits(fljs.swf.act.MovieClip, fljs.swf.act.Object);
	fljs.swf.act.MovieClip.props = {
		_framesloaded: "_framesloaded",
		_visible: "_visible",
		_x: "_x",
		_y: "_y",
		onEnterFrame: "onEnterFrame",
		onRollOver: "onRollOver",
		onRollOut: "onRollOut",
		onPress: "onPress",
		onRelease: "onRelease",
		_xmouse: "_ymouse",
		_xscale: "_xscale",
		_yscale: "_yscale",
		_width: "_width"
	};
	fljs.swf.act.MovieClip.funcs = {
		nextFrame: "nextFrame",
		prevFrame: "prevFrame",
		gotoFrame: "gotoFrame",
		gotoAndStop: "gotoFrame",
		gotoAndPlay: "gotoAndPlay",
		play: "play",
		stop: "stop",
		localToGlobal: "localToGlobal",
		hitTest: "hitTest",
		getBytesLoaded: "getBytesLoaded",
		getBytesTotal: "getBytesTotal"
	};
	fljs.addMethods(fljs.swf.act.MovieClip, {
		get: function (a) {
			var b = this.dispObj.__childNames[a];
			return b ? {
				Type: 11,
				Value: b.getAs2Object()
			} : fljs.base(this, "get", a)
		},
		nextFrame: function () {
			this.logger.info("nextFrame");
			this.dispObj.currentFrameIndex_ < this.dispObj.totalFrames_ - 1 && this.dispObj.nextFrame()
		},
		prevFrame: function () {
			this.logger.info("prevFrame");
			this.dispObj.currentFrameIndex_ > 0 && this.dispObj.prevFrame()
		},
		gotoFrame: function (a) {
			this.logger.info("gotoFrame: " + a);
			this.dispObj.gotoAndStop(a.Value)
		},
		gotoAndPlay: function (a) {
			this.logger.info("gotoAndPlay: " + a);
			this.dispObj.gotoAndPlay(a.Value)
		},
		play: function () {
			this.logger.info("play");
			this.dispObj.play()
		},
		stop: function () {
			this.logger.info("stop");
			this.dispObj.stop()
		},
		getUrl: function (a, b) {
			if (b.Value == "") window.location = a.Value;
			if (a.Value.substr(0, 10) == "FSCommand:") switch (a.Value.substr(10)) {
			case "quit":
				fljs.Player.getInstance().pause();
				break;
			case "fullscreen":
				break;
			case "allowscale":
				break;
			case "showmenu":
				break;
			case "exec":
				break;
			case "trapallkeys":
				break
			} else {
				b = b.Value;
				if (fljs.agent.OS == "iPhone" || fljs.agent.OS == "iPad") if (b == "_blank") b = "_self";
				window.open(a.Value, b);
				return {
					Type: 0,
					Value: ""
				}
			}
		},
		localToGlobal: function (a) {
			a = new flash.geom.Point(a.Value.get("x"), a.Value.get("y"));
			a = this.dispObj.localToGlobal(a);
			var b = new fljs.swf.act.Object;
			b.set("x", a.x);
			b.set("y", a.y);
			return {
				Type: 11,
				Value: b
			}
		},
		hitTest: function (a, b, c) {
			if (arguments.length == 1) {
				c = arguments[0];
				var d;
				if (c.Type != 0) d = c.Value;
				return {
					Type: 5,
					Value: this.dispObj.hitTestObject(d.Value.dispObj)
				}
			}
		},
		getBytesLoaded: function () {
			return {
				Type: 1,
				Value: this.dispObj.__bytesLoaded
			}
		},
		getBytesTotal: function () {
			return {
				Type: 1,
				Value: this.dispObj.__bytesTotal
			}
		},
		get__framesloaded: function () {
			return {
				Type: 1,
				Value: this.dispObj.framesLoaded_
			}
		},
		get__xscale: function () {
			return {
				Type: 1,
				Value: this.dispObj.scaleX
			}
		},
		set__xscale: function (a) {
			this.dispObj.scaleX = a.Value
		},
		get__yscale: function () {
			return {
				Type: 1,
				Value: this.dispObj.scaleY
			}
		},
		set__yscale: function (a) {
			this.dispObj.scaleY = a.Value
		},
		get__visible: function () {
			return {
				Type: 5,
				Value: this.dispObj.getVisible()
			}
		},
		set__visible: function (a) {
			this.dispObj.setVisible(a.Value)
		},
		get__x: function () {
			return {
				Type: 1,
				Value: this.dispObj.x
			}
		},
		set__x: function (a) {
			this.dispObj.x = a.Value
		},
		get__y: function () {
			return {
				Type: 1,
				Value: this.dispObj.y
			}
		},
		set__y: function (a) {
			this.dispObj.y = a.Value
		},
		set_onEnterFrame: function (a) {
			this._onEnterFrame = a
		},
		set_onRollOver: function (a) {
			this.set_onMouseEvent(flash.events.MouseEvent.MOUSE_OVER, a)
		},
		set_onRollOut: function (a) {
			this.set_onMouseEvent(flash.events.MouseEvent.MOUSE_OUT, a)
		},
		set_onPress: function (a) {
			this.set_onMouseEvent(flash.events.MouseEvent.MOUSE_DOWN, a)
		},
		set_onRelease: function (a) {
			this.set_onMouseEvent(flash.events.MouseEvent.MOUSE_UP, a)
		},
		set_onMouseEvent: function (a, b) {
			var c = this["_on" + a] && !(this["_on" + a].Type == 2 || this["_on" + a].Type == 3),
				d = !(b.Type == 2 || b.Type == 3);
			c && !d && this.dispObj.removeEventListener(a, this["_on" + a + "Handler"]);
			if (!c && d) {
				this["_on" + a + "Handler"] || (this["_on" + a + "Handler"] = fljs.bind(this.onMouseEventHandler, this, a));
				this.dispObj.addEventListener(a, this["_on" + a + "Handler"])
			}
			this["_on" + a] = b
		},
		get_xmouse: function () {
			return this.dispObj.get_mouseX()
		},
		get_ymouse: function () {
			return this.dispObj.get_mouseY()
		},
		onMouseEventHandler: function (a) {
			fljs.Player.getInstance().interpreter.callback(this, this["_on" + a])
		},
		get__width: function () {
			return {
				Type: 1,
				Value: this.dispObj.getWidth()
			}
		},
		set__width: function (a) {
			this.dispObj.setWidth(a.Value)
		}
	});
	fljs.swf.act.Mouse = function () {
		fljs.swf.act.Object.call(this);
		this.funcs = fljs.swf.act.Mouse.funcs;
		this.props = fljs.swf.act.Mouse.props
	};
	fljs.inherits(fljs.swf.act.Mouse, fljs.swf.act.Object);
	fljs.swf.act.Mouse.props = {};
	fljs.swf.act.Mouse.funcs = {
		hide: "hide",
		show: "show",
		addListener: "addListener",
		removeListener: "removeListener"
	};
	fljs.addMethods(fljs.swf.act.Mouse, {
		hide: function () {
			fljs.Player.getInstance().element.getElement().setAttributeNS(null, "cursor", 'url("img/nothing.cur")')
		},
		show: function () {
			fljs.Player.getInstance().element.getElement().setAttributeNS(null, "cursor", "")
		},
		addListener: function () {},
		removeListener: function () {}
	});
	fljs.swf.act.Mouse._self = {};
	fljs.swf.act.Mouse._props = {};
	fljs.swf.act.Mouse._funcs = {
		hide: "hide",
		show: "show"
	};
	fljs.addStaticMethods(fljs.swf.act.Mouse, {
		set: function (a, b) {
			delete this._funcs[a];
			delete this._props[a];
			this._self[a] = b
		},
		get: function (a) {
			var b = this._funcs[a];
			if (b) return {
				Type: 10,
				Value: this[b]
			};
			if (b = this._props[a]) return this[b];
			else {
				a = this._self[a];
				return a == null ? {
					Type: 2,
					Value: null
				} : a
			}
		},
		hide: function () {
			fljs.Player.getInstance().element.getElement().setAttributeNS(null, "cursor", 'url("img/nothing.cur")')
		},
		show: function () {
			fljs.Player.getInstance().element.getElement().setAttributeNS(null, "cursor", "")
		}
	});
	fljs.swf.act.Sound = function () {
		this.funcs = fljs.swf.act.Sound.funcs;
		this.props = {}
	};
	fljs.inherits(fljs.swf.act.Sound, fljs.swf.act.Object);
	fljs.swf.act.Sound.funcs = {
		attachSound: "attachSound",
		start: "start",
		stop: "stop"
	};
	fljs.addMethods(fljs.swf.act.Sound, {
		init: function (a) {
			this.target = a
		},
		attachSound: function (a) {
			var b = fljs.Player.getInstance();
			this.target = b.sounds[b.assets[a.Value]]
		},
		start: function () {
			var a = fljs.Player.getInstance();
			if (!this.audio) this.audio = a.allocAudio();
			var b = this.audio,
				c = this.target,
				d = new fljs.swf.StringStream(a.reader.stream.stream.buffer);
			d.byteIndex = c.Mp3SoundData.byteIndex;
			c = d.readBytes(c.Mp3SoundData.byteCount).join("");
			c = "data:audio/mpeg;base64," + btoa(c);
			b.setAttribute("src", c);
			b.addEventListener("load", function () {
				b.currentTime = 0;
				b.fljsPlaying = true;
				a.playing && b.play()
			}, true);
			b.load()
		},
		stop: function () {
			if (this.audio) {
				fljs.Player.getInstance();
				var a = this.audio;
				a.fljsPlaying = false;
				a.pause()
			}
		}
	});
	fljs.swf.act.Math = function () {
		this.funcs = fljs.swf.act.Math.funcs;
		this.props = fljs.swf.act.Math.props
	};
	fljs.inherits(fljs.swf.act.Math, fljs.swf.act.Object);
	fljs.swf.act.Math.props = {};
	fljs.swf.act.Math.funcs = {
		floor: "floor"
	};
	fljs.addMethods(fljs.swf.act.Math, {
		floor: function (a) {
			return {
				Type: 1,
				Value: Math.floor(a.Value)
			}
		}
	});
	fljs.swf.act.Math._self = {};
	fljs.swf.act.Math._props = {};
	fljs.swf.act.Math._funcs = {
		floor: "floor",
		random: "random"
	};
	fljs.addStaticMethods(fljs.swf.act.Math, {
		set: function (a, b) {
			delete this._funcs[a];
			delete this._props[a];
			this._self[a] = b
		},
		get: function (a) {
			var b = this._funcs[a];
			if (b) return {
				Type: 10,
				Value: this[b]
			};
			if (b = this._props[a]) return this[b];
			else {
				a = this._self[a];
				return a == null ? {
					Type: 2,
					Value: null
				} : a
			}
		},
		floor: function (a) {
			return {
				Type: 1,
				Value: Math.floor(a.Value)
			}
		},
		random: function () {
			return {
				Type: 1,
				Value: Math.random()
			}
		}
	});
	fljs.swf.act.System = function () {
		this.funcs = {};
		this.props = fljs.swf.act.System.props;
		this.security = new fljs.swf.act.SystemSecurity
	};
	fljs.inherits(fljs.swf.act.System, fljs.swf.act.Object);
	fljs.swf.act.System.props = {
		security: "security"
	};
	fljs.swf.act.SystemSecurity = function () {
		this.funcs = fljs.swf.act.SystemSecurity.funcs;
		this.props = {}
	};
	fljs.inherits(fljs.swf.act.SystemSecurity, fljs.swf.act.Object);
	fljs.swf.act.SystemSecurity.funcs = {
		allowDomain: "allowDomain"
	};
	fljs.addMethods(fljs.swf.act.SystemSecurity, {
		allowDomain: function () {},
		get_security: function () {
			return {
				Type: 11,
				Value: this.security
			}
		}
	});
	fljs.swf.act.String = function (a) {
		this.str = a;
		this.funcs = fljs.swf.act.String.funcs;
		this.props = {}
	};
	fljs.inherits(fljs.swf.act.String, fljs.swf.act.Object);
	fljs.swf.act.String.funcs = {
		substr: "substr"
	};
	fljs.addMethods(fljs.swf.act.String, {
		substr: function (a, b) {
			return {
				Type: 0,
				Value: this.str.substr(a.Value, b.Value)
			}
		}
	});
	fljs.swf.act.Globals = function () {
		fljs.swf.act.Object.call(this);
		this.funcs = fljs.swf.act.Globals.funcs;
		this.props = fljs.swf.act.Globals.props;
		this.Mouse = {
			Type: 11,
			Value: fljs.swf.act.Mouse
		};
		this.Sound = {
			Type: 11,
			Value: fljs.swf.act.Sound
		};
		this.System = {
			Type: 11,
			Value: fljs.swf.act.System
		};
		this.Math = {
			Type: 11,
			Value: fljs.swf.act.Math
		}
	};
	fljs.inherits(fljs.swf.act.Globals, fljs.swf.act.Object);
	fljs.swf.act.Globals.props = {
		Mouse: "Mouse",
		Sound: "Sound",
		System: "System",
		Math: "Math",
		setInterval: "setInterval",
		clearInterval: "clearInterval"
	};
	fljs.swf.act.Globals.funcs = {};
	fljs.addMethods(fljs.swf.act.Globals, {
		get_Mouse: function () {
			return this.Mouse
		},
		get_Sound: function () {
			return this.Sound
		},
		get_System: function () {
			return this.System
		},
		get_Math: function () {
			return this.Math
		},
		get_setInterval: function () {
			return {
				Type: 10,
				Value: fljs.bind(this.setInterval, this)
			}
		},
		get_clearInterval: function () {
			return {
				Type: 10,
				Value: fljs.bind(this.clearInterval, this)
			}
		},
		setInterval: function () {
			var a = fljs.Player.getInstance().interpreter,
				b;
			b = [];
			switch (arguments[0].Type) {
			case 10:
				b = [arguments[0].Value, null];
				for (var c = 2; c < arguments.length; c++) b.push(arguments[c]);
				a = fljs.bind.apply(null, b);
				b = arguments[1].Value;
				b = [a, b];
				break;
			case 11:
				b = [];
				for (c = 3; c < arguments.length; c++) b.push(arguments[c]);
				a = fljs.bind(a.callMethod, a, null, arguments[0], arguments[1], b);
				b = arguments[2].Value;
				b = [a, b];
				break;
			case 12:
				b = [];
				for (c = 2; c < arguments.length; c++) b.push(arguments[c]);
				a = fljs.bind(a.callFunction, a, null, arguments[0], null, b);
				b = arguments[1].Value;
				b = [a, b];
				break
			}
			return {
				Type: 1,
				Value: setInterval.apply(null, b)
			}
		},
		clearInterval: function (a) {
			clearInterval(a.Value)
		}
	});
	flash.display.Document = function () {
		flash.display.MovieClip.call(this)
	};
	fljs.inherits(flash.display.Document, flash.display.MovieClip);
	fljs.player.AbsTimeSync = function (a) {
		this.frameRate = a
	};
	fljs.addMethods(fljs.player.AbsTimeSync, {
		start: function () {
			this.frameCount = 1;
			this.frameStart = 0;
			this.startAt = +new Date
		},
		delay: function () {
			this.frameCount++;
			return 1E3 * (this.frameCount - this.frameStart) / this.frameRate - (+new Date - this.startAt)
		}
	});
	fljs.player.AudioSync = function (a) {
		this.frameRate = a;
		this.oneFrame = 1E3 / this.frameRate;
		this.audio = null;
		this.frames = {};
		this.timeSync = new fljs.player.AbsTimeSync(a)
	};
	fljs.addMethods(fljs.player.AudioSync, {
		setAudio: function (a) {
			this.audio = a;
			this.audio.setSync(this)
		},
		setFrameTime: function (a, b) {
			this.frames[a] = b
		},
		start: function (a) {
			if (this.audio.frameShouldPlay(a) && typeof this.frames[a] != "undefined") this.audioSync = true;
			else {
				this.timeSync.start();
				this.audioSync = false
			}
			this.lastFrame = a
		},
		stop: function () {},
		delay: function (a) {
			if (a != this.lastFrame + 1) {
				this.start(a);
				return this.oneFrame
			}
			this.lastFrame = a;
			if (this.audioSync) if (this.audio.frameShouldPlay(a) && typeof this.frames[a] != "undefined") {
				expTime = this.audio.currentTime();
				time = this.frames[a];
				return time - expTime
			} else {
				this.timeSync.start();
				this.audioSync = false;
				return this.oneFrame
			} else if (this.audio.frameShouldPlay(a) && typeof this.frames[a] != "undefined") {
				this.audioSync = true;
				return this.oneFrame
			} else return this.timeSync.delay(a)
		}
	});
	fljs.enterFrameDispatcher = function () {
		this.enterFrameListeners = []
	};
	fljs.addMethods(fljs.enterFrameDispatcher, {
		addEventListener: function (a, b) {
			this.enterFrameListeners.push(b)
		},
		removeEventListener: function (a, b) {
			for (var c in this.enterFrameListeners) this.enterFrameListeners[c] == b && this.enterFrameListeners.splice(c, 1)
		},
		dispatchEvent: function (a) {
			for (var b in this.enterFrameListeners) this.enterFrameListeners[b](a)
		}
	});
	fljs.Player = function () {
		this.muted = this.debug = this.predefine = false;
		this.playing = true;
		this.audioId = 1;
		this.audios = {};
		this._volume = 1;
		this.params = {};
		this.renderTextAsGlyphs = false;
		this.loadExtResources = fljs.agent.browser == "Safari" || fljs.agent.browser == "Firefox" || fljs.agent.browser == "Opera"
	};
	fljs.Player.getInstance = function () {
		return fljs.Player._instance || (fljs.Player._instance = new fljs.Player)
	};
	fljs.addMethods(fljs.Player, {
		initialize: function (a) {
			fljs.debug = this.debug;
			this.containerElement = a;
			this.dictionary = {};
			this.displayList = [];
			this.frameNum = -1;
			this.fontsWithoutInfo = {};
			this.fonts = {};
			this.fonts2 = {};
			this.fonts2ByName = {};
			this.fonts2ByStyle = {};
			this.sounds = {};
			this.tagMap = fljs.swf.tag.tagMap;
			this.logger = fljs.console("player");
			this.dispatcher = new fljs.enterFrameDispatcher;
			this.buildSvg();
			this.assets = {};
			this.actionQueue = [];
			this.initActionQueue = [];
			this.delayFrame = 0;
			this.startTime = fljs.now();
			this.initTimeoutHandler()
		},
		initTimeoutHandler: function () {
			this.timeouts = [];
			this.timeoutMessageName = "fljs-timeout-message";
			window.addEventListener("message", fljs.bind(this.timeoutHandler, this), true)
		},
		timeoutHandler: function (a) {
			if (a.source == window && a.data == this.timeoutMessageName) {
				a.stopPropagation();
				this.timeouts.length > 0 && this.timeouts.shift()()
			}
		},
		setTimeout: function (a) {
			this.timeouts.push(a);
			window.postMessage(this.timeoutMessageName, "*")
		},
		buildSvg: function () {
			for (var a = this.containerElement.firstChild, b; a;) {
				if (a.nodeName == "SVG") {
					b =
					new fljs.dom.Element(a);
					break
				}
				a = a.nextSibling
			}
			if (!a) {
				for (var a = this.containerElement.firstChild, b; a;) {
					b = a.nextSibling;
					this.containerElement.removeChild(a);
					a = b
				};
				b = new fljs.dom.Element;
				b.create(fljs.dom.Namespace.Svg, "svg")
			}
			b.set(null, "overflow", "hidden");
			b.sets([
				[null, "width", this.containerElement.offsetWidth],
				[null, "height", this.containerElement.offsetHeight],
				[null, "stroke-linecap", "round"],
				[null, "stroke-linejoin", "round"],
				[null, "fill-rule", "evenodd"],
				[null, "clip-rule", "evenodd"]
			]);
			if (fljs.agent.OS == "iPhone" || fljs.agent.OS == "iPad") b.sets([
				[null, "color-rendering", "optimizeSpeed"],
				[null, "image-rendering", "optimizeSpeed"]
			]);
			b.update();
			this.svg = this.element = this.element_ = b;
			a || this.containerElement.appendChild(b.element);
			b = this.defs = new fljs.dom.Element;
			b.create(fljs.dom.Namespace.Svg, "defs");
			this.svg.append(b)
		},
		createStage: function () {
			new flash.display.DisplayObject;
			this.stage = new flash.display.Stage;
			this.stage.setParent(this);
			this.svg.append(this.stage._clipElement);
			this.stage.initialize();
			this.stage.setFrameRate(this.header.FrameRate)
		},
		addDefinition: function (a, b) {
			this.dictionary[b] = a
		},
		defineFont: function (a, b, c) {
			this.fonts[a] = {
				glyphCount: b,
				element: c
			};
			this.defs.element.appendChild(c)
		},
		defineFont2: function (a, b, c, d, e, f, g, j) {
			this.fonts2[a] = {
				glyphCount: b,
				element: c,
				name: d,
				bold: e,
				italic: f,
				codeTable: g,
				tag: j
			};
			this.fonts2ByName[d] = a;
			this.fonts2ByStyle[[d, e, f].toString()] = a;
			for (var h in c) this.defs.append(c[h])
		},
		lookupFontByName: function (a) {
			return "font-" + String(this.fonts2ByName[a])
		},
		lookupFontByStyle: function (a, b, c) {
			a = [a, b, c].toString();
			return "font-" + String(this.fonts2ByStyle[a])
		},
		addToDisplayList: function (a, b) {
			this.displayList[b] = a
		},
		loadSwf: function (a, b, c, d, e, f) {
			b.style.width = c + "px";
			b.style.height = d + "px";
			this.name = e;
			for (var g in f) this.params[g] = f[g];
			this.initialize(b);
			(new fljs.swf.SwfLoader).load(a, fljs.bind(this.readSwf, this))
		},
		readSwf: function (a) {
			this.parser = new fljs.swf.DefinitionParser(a.stream.buffer);
			this.readHeader();
			this.createStage();
			this.buildMainTimeline();
			this.interpreter = new fljs.swf.act.ActionInterpreter(this);
			this.sync = new fljs.player.AbsTimeSync(this.header.FrameRate);
			this.sync.start();
			this.enterFrame()
		},
		showFrame: function () {
			delay = this.sync.delay(this.mainTimeline.currentFrameIndex_, this.delayFrame);
			delay = Math.max(0, delay);
			this.lastFrameAt = fljs.now();
			this.waitingOnFrame = true;
			if (fljs.agent.browser == "Opera") {
				this.element.getElement().setAttributeNS(null, "fill-color", "red");
				this.element.getElement().setAttributeNS(null, "fill-color", "none")
			}
			var a = fljs.bind(this.enterFrame, this, this.frameNum);
			delay >= 10 ? setTimeout(a, delay) : this.setTimeout(a)
		},
		enterFrame: function (a) {
			if (!this.delayFrame) {
				this.logger.info("player frame#" + a);
				this.waitingOnFrame = false;
				if (!this.playing) return;
				this.frameNum += 1;
				var b;
				if (this.element.getElement().suspendRedraw) b = this.element.getElement().suspendRedraw(100);
				this.dispatcher.dispatchEvent(new flash.events.Event(flash.events.Event.ENTER_FRAME));
				this.parser.readSomeTags(this);
				this.doActionQueue();
				this.element.getElement().unsuspendRedraw && this.element.getElement().unsuspendRedraw(b)
			}
			this.showFrame()
		},
		doActions: function (a, b) {
			this.actionQueue.push({
				target: this.containingDispObj(a).getAs2Object(),
				actions: b
			})
		},
		doInitAction: function (a) {
			this.initActionQueue.push({
				target: null,
				actions: a.Actions
			})
		},
		containingDispObj: function (a) {
			for (; !(a instanceof flash.display.MovieClip && !a.getEnabled());) a = a.getParent();
			return a
		},
		doActionQueue: function () {
			for (var a in this.initActionQueue) {
				var b = this.initActionQueue[a];
				this.interpreter.eval(null, b.actions)
			}
			this.initActionQueue = [];
			for (a in this.actionQueue) {
				b = this.actionQueue[a];
				this.interpreter.eval(b.target, b.actions)
			}
			this.actionQueue = []
		},
		readHeader: function () {
			var a =
			this.parser.readHeader();
			this.header = a;
			this.swfVersion = a.Version;
			var b = a.FrameSize.Xmin,
				c = a.FrameSize.Ymin;
			this.svg.sets([
				[null, "viewBox", [b, c, a.FrameSize.Xmax - b, a.FrameSize.Ymax - c].join(" ")],
				[null, "preserveAspectRatio", "none"]
			]);
			this.svg.update()
		},
		buildMainTimeline: function () {
			var a = new flash.display.Document;
			a.setName("_root");
			a.__frameNum = 0;
			var b = new flash.display.Scene;
			b.labels = [];
			b.name = "Scene 1";
			b.numFrames = this.header.FrameCount;
			a.frameData_ = [];
			for (var c = 0; c < this.header.FrameCount; c++) a.frameData_.push({
				scripts: [],
				parts: [],
				tags: [],
				label: ""
			});
			a.labels_ = {};
			a.sceneIndices_ = {};
			a.currentSceneIndex_ = 0;
			a.scenes_ = [b];
			a.currentFrameIndex_ = 0;
			a.currentLabel_ = null;
			a._enabled = false;
			a.framesLoaded_ = 0;
			a.totalFrames_ = this.header.FrameCount;
			a.next_ = null;
			a.playing_ = true;
			a.__bytesLoaded = this.parser.reader.stream.stream.byteIndex;
			a.__bytesTotal = this.header.FileLength;
			this.mainTimeline = a;
			b = a.getAs2Object();
			for (c in this.params) b.set(c, {
				Type: 0,
				Value: this.params[c]
			});
			this.stage.addChild(a);
			a.onCreate()
		},
		play: function () {
			if (!this.playing) {
				for (var a in this.audios) {
					var b =
					this.audios[a];
					b.fljsPlaying && b.play()
				}
				this.playing = true;
				this.setPlayingControl();
				this.waitingOnFrame || this.enterFrame()
			}
		},
		pause: function () {
			if (this.playing) {
				this.playing = false;
				this.setPlayingControl();
				for (var a in this.audios) this.audios[a].pause()
			}
		},
		mute: function () {
			this.prevVolume = this.getVolume();
			this.setVolume(0);
			this.setVolumeControl();
			for (var a in this.audios) this.audioSetVolume(this.audios[a])
		},
		unmute: function () {
			this.setVolume(this.prevVolume);
			this.setVolumeControl();
			for (var a in this.audios) this.audioSetVolume(this.audios[a])
		},
		allocAudio: function () {
			var a = new Audio,
				b = this;
			a.addEventListener("loadedmetadata", function () {
				b.audioSetVolume(a)
			}, false);
			a.fljsPlay = a.play;
			a.play = function () {
				a.fljsPlaying = true;
				b.playing && a.fljsPlay()
			};
			a.fljsId = this.audioId++;
			return this.audios[a.fljsId] = a
		},
		releaseAudio: function (a) {
			delete this.audios[a.fljsId]
		},
		audioSetVolume: function (a) {
			if (!a.fljsWaiting) {
				a.volume = Math.max(0, Math.min(this._volume + 0.0010, 1));
				a.volume = Math.max(0, Math.min(this._volume, 1))
			}
		},
		buildControls: function (a) {
			if (fljs.agent.browser != "Explorer") {
				var b = a.ownerDocument,
					c = b.createElement("input");
				c.setAttribute("type", "button");
				var d = this;
				c.addEventListener("click", function () {
					d.playing ? d.pause() : d.play()
				}, true);
				a.appendChild(c);
				b = b.createElement("input");
				b.setAttribute("type", "button");
				b.addEventListener("click", function () {
					d.getVolume() > 0 ? d.mute() : d.unmute()
				}, true);
				a.appendChild(b);
				this.controls = {
					playing: c,
					volume: b
				};
				this.setPlayingControl();
				this.setVolumeControl()
			}
		},
		setPlayingControl: function () {
			if (this.controls) this.controls.playing.value = this.playing ? "pause" : "play"
		},
		setVolumeControl: function () {
			if (this.controls) this.controls.volume.value = this.muted ? "unmute" : "mute"
		},
		getVolume: function () {
			return this._volume == 0.999 ? 1 : this._volume
		},
		setSolume: function (a) {
			this.prevVolume = this._volume;
			this._volume = a;
			this.muted = this._volume == 0;
			if (this._volume == 1) this._volume = 0.999;
			this.setVolumeControl()
		}
	});
	fljs.base64 = {};
	fljs.base64.chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	fljs.base64.atob = function (a) {
		for (var b = a.length, c = [], d = 0, e, f, g, j, h, m = fljs.base64.chars; d < b;) {
			e = m.indexOf(a.charAt(d++));
			f = m.indexOf(a.charAt(d++));
			g = m.indexOf(a.charAt(d++));
			j = m.indexOf(a.charAt(d++));
			e = e << 2 | f >> 4;
			f = (f & 15) << 4 | g >> 2;
			h = (g & 3) << 6 | j;
			c.push(String.fromCharCode(4096 | e));
			g != 64 && c.push(String.fromCharCode(4096 | f));
			j != 64 && c.push(String.fromCharCode(4096 | h))
		}
		String(c.join(""))
	};
	fljs.swf.SwfLoader = function () {
		var a;
		this.complete = false;
		try {
			a = new XMLHttpRequest
		} catch (b) {
			a = false
		}
		if (!a) return null;
		this.xmlhttp = a
	};
	fljs.addMethods(fljs.swf.SwfLoader, {
		load: function (a, b) {
			if (fljs.agent.browser == "Explorer" || fljs.agent.browser == "Opera") a += ".b64";
			this.logger = fljs.console("demo");
			this.complete = false;
			try {
				this.xmlhttp.overrideMimeType && this.xmlhttp.overrideMimeType("text/plain; charset=x-user-defined");
				this.xmlhttp.open("GET", a, true);
				this.xmlhttp.onreadystatechange = fljs.bind(this.onLoad, this, b);
				this.xmlhttp.send(null)
			} catch (c) {
				return false
			}
			return true
		},
		onLoad: function (a) {
			if (!(this.xmlhttp.readyState != 4 || this.complete)) {
				this.complete =
				true;
				var b;
				b = fljs.agent.browser == "Explorer" ? fljs.base64.atob(this.xmlhttp.responseText) : fljs.agent.browser == "Opera" ? window.atob(this.xmlhttp.responseText) : this.xmlhttp.responseText;
				b = new fljs.swf.StringStream(b);
				b = new fljs.swf.SwfStream(b);
				a(b)
			}
		}
	});
	var player = fljs.Player.getInstance();
	player.loadSwf(url, element, width, height, name, params);
	return player
}
