class Rem {

	constructor() {
		this.render();
	}

	render() {

		var SCREENTYPE = 'orientationchange' in window ? 'orientationchange' : 'resize';

		function setView() {
			var docEl = document.documentElement;
			var clientWidth = docEl.clientWidth;
			if (!clientWidth) return;
			if (clientWidth >= 750) {
				docEl.style.fontSize = '100px';
			} else {
				docEl.style.fontSize = 100 * (clientWidth / 750) + 'px';
			}
		};

		window.addEventListener(SCREENTYPE, setView());
		document.addEventListener('touchstart', function(event) {
			if (event.touches.length > 1) {
				event.preventDefault();
			}
		})

		var lastTouchEnd = 0;

		document.addEventListener('touchend', function(event) {
			var now = (new Date()).getTime();
			if (now - lastTouchEnd <= 300) {
				event.preventDefault();
			}
			lastTouchEnd = now;
		}, false);

	}
}

new Rem();