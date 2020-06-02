$(document).ready(function(){  

	// ==== Mobile menu handler ====
	$('.burger').click(function() {
		$('.burger span:nth-child(1)').toggleClass('first');
		$('.burger span:nth-child(2)').toggleClass('second');
		$('.burger span:nth-child(3)').toggleClass('third');
		$('.burger span:nth-child(4)').toggleClass('fourth');
		$('.header_menu_burg-btn').toggleClass('active');
		$('.header-mobile_menu').toggleClass('active');
	});

	let arrowlink = document.querySelectorAll('.header-mobile_menu_link');

	for(let i = 0; i < arrowlink.length; i++) {

		let list = arrowlink[i].parentElement;
		let arrow = arrowlink[i].firstElementChild;

		arrowlink[i].addEventListener('click', function(){
			list.classList.toggle('open');
			arrow.classList.toggle('active');
		});

	}
	// ==== AND Mobile menu handler ====

	// ==== Slider ====
	$('.partners_slider').slick({
	infinite: true,
	slidesToShow: 4,
	slidesToScroll: 1,
	arrows: false,
	dots: true,
	responsive: [
	  {
	    breakpoint: 959,
	    settings: {
	      slidesToShow: 3,
	    }
	  },
	  {
	    breakpoint: 768,
	    settings: {
	      slidesToShow: 1,
	    }
	  },
	]
	});
	// ==== AND Slider ====




});

// ==== Popup form handler====

const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll('.lock-padding');

let unlock = true;

const timeout = 800;

if(popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener('click', function(e) {
			const popupName = popupLink.getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}


const popupCloseIcon = document.querySelectorAll('.close-popup');
if(popupCloseIcon.length > 0) {
	for(let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function(e) {
			popupClose(el.closest('.popup'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if(curentPopup && unlock) {
		const popupActive = document.querySelector('.popup.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener('click', function(e) {
			if(!e.target.closest('.popup_content')) {
				popupClose(e.target.closest('.popup'));
			}
		});

	}
}

function popupClose(popupActive, doUnlock = true) {
	if(unlock) {
		popupActive.classList.remove('open');
		if(doUnlock) {
			bodyUnlock();
		}
	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if(lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}

	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function() {
		unlock = true;
	}, timeout);
}

function bodyUnlock() {
	setTimeout(function() {
		for( let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = '0px';
		}

		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	}, timeout);

	unlock = false;
	setTimeout(function() { 
		unlock = true;
	}, timeout);
}

// document.addEventListener('keydown', function(e) {
// 	if(e.which === 27) {
// 		const popupActive = document.querySelector('.popup.open');
// 		popupClose(popupActive);
// 	}
// });

// === Polyfill ===
	(function() {
		if(!Element.prototype.closest) {
			Element.prototype.closest = function(css) {
				var node = this;
				while(node) {
					if(node.matches(css)) return node;
					else node == node.parentElement;
				}
				return null;
			};
		}
	})();

	(function() {
		if(!Element.prototype.matches) {
			Element.prototype.matches = Element.prototype.matchesSelector ||
				Element.prototype.webkitMatchesSelector ||
				Element.prototype.mozMatchesSelector ||
				Element.prototype.mozMatchesSelector;
		}
	})();
// === AND Polyfill ===

// ==== AND Popup form handler ====


// ==== Popup Form Validation ====
	const popupForm = document.querySelector('.popup_form');
	const popupFormInputList = document.querySelectorAll('.popup_form_list-box_item_input');
	const errorBox = document.querySelector('.popup_form_list-box_error');

	const popupFormUserInfoInput = document.querySelectorAll('.popup_form_user-info_input');


	popupForm.addEventListener('submit', function(e) {
		
		for(let i = 0; i < popupFormInputList.length; i ++) {

			if(!popupFormInputList[i].value.trim()) {
				e.preventDefault();
				popupFormInputList[i].style.borderColor = 'red';
				errorBox.style.fontSize = '7px';
				popupFormInputList[i].addEventListener('focus', function() {
					popupFormInputList[i].style.borderColor = '#000';
					errorBox.style.fontSize = '0px';
				})
			}
		}

		for(let i = 0; i < popupFormUserInfoInput.length; i++) {
			let labelStar = popupFormUserInfoInput[i].previousElementSibling.lastChild;

			if(!popupFormUserInfoInput[i].value.trim()) {
				e.preventDefault();
				popupFormUserInfoInput[i].style.borderColor = 'red';
				labelStar.style.color = 'red';

				popupFormUserInfoInput[i].addEventListener('focus', function() {
					popupFormUserInfoInput[i].style.borderColor = '#000';
					labelStar.style.color = '#000';
				})
			}
		}


	})
// ==== AND Popup Form Validation ====


// === Header Form Validation ====
	let headerForm = document.querySelector('.form');
	let headerFormInputs = document.querySelectorAll('.form_input');

	if(headerForm) {
		headerForm.addEventListener('submit', function(e) {
			for(let i = 0; i < headerFormInputs.length; i++) {
				if(!headerFormInputs[i].value.trim()) {
					e.preventDefault();
					
					headerFormInputs[i].style.borderColor = 'red';
					headerFormInputs[i].addEventListener('focus', function() {
						headerFormInputs[i].style.borderColor = '#fff';
					})
				}
			}
		});
	}
// === AND Header Form Validation ====


