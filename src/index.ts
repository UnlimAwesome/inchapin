const Scrollbar = require('smooth-scrollbar');
Scrollbar.init(document.querySelector('#scrollbar'));

// animated paragraphs
const animatedP = document.getElementsByClassName('animated-p');
for (let i = 0; i < animatedP.length; i++) {
	let p = animatedP.item(i);
	let text = p.textContent;
	p.innerHTML = `<span>${text}</span><span>${text}</span>`;
}

//dialog

const dialog = document.getElementById('dialog');
const dialogOpenBtn = document.getElementById('order-btn');
const dialogCloseBtn = document.getElementById('dialog-close');

dialogOpenBtn.addEventListener('click', () => {
	(dialog as HTMLDialogElement).showModal();
});
dialogCloseBtn.addEventListener('click', () => {
	(dialog as HTMLDialogElement).close();
});

// form

const form = document.getElementById('form');
const submitBtn = document.getElementById('submit-btn');

(form as HTMLFormElement).addEventListener('submit', (e: SubmitEvent) => {
	let inputs = form.getElementsByTagName('input');
	let data = {} as any;
	for (let i = 0; i < inputs.length; i++) {
		if (inputs[i].value === '') {
			e.preventDefault();
			inputs[i].focus();
			return;
		}
		let name = inputs.item(i).name;
		data[name] = inputs[i].value;
	}

	console.log(data);
});

// video
const videoContainer = document.getElementById('video-container');
const video = document.getElementById('preview-video');
const videoCloseBtn = document.getElementById('video-close');
const videoPlayBtn = document.getElementById('preview-img-wrapper');

videoPlayBtn.addEventListener('click', () => {
	videoContainer.classList.remove('hidden');
	(video as HTMLVideoElement).play();
	video.focus();
});

videoCloseBtn.addEventListener('click', () => {
	(video as HTMLVideoElement).pause();
	videoContainer.classList.add('hidden');
});

videoContainer.addEventListener('keydown', (e: KeyboardEvent) => {
	if (e.key === 'Escape') {
		(video as HTMLVideoElement).pause();
		videoContainer.classList.add('hidden');
	}
});

// phone
var input = document.querySelector('.tel');

input.addEventListener('input', mask);
input.addEventListener('focus', mask);
input.addEventListener('blur', mask);

function mask(event: any) {
	var blank = '+7 (___) ___-__-__';
	var i = 0;
	var def = blank.replace(/\D/g, '');
	var val = this.value.replace(/\D/g, '');

	if (def.length >= val.length) {
		val = def;
	}

	this.value = blank.replace(/./g, function (a) {
		return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : a;
	});

	if (event.type === 'focus') {
		setCursorPosition(this, this.value.indexOf('_'));
	} else if (event.type === 'blur') {
		if (this.value.replace(/\D/g, '').length <= 3) this.value = '';
	} else {
		var pos = this.selectionStart;
		if (event.inputType === 'deleteContentBackward' && pos > 0) {
			while (pos > 0 && !/\d/.test(this.value.charAt(pos - 1))) {
				pos--;
			}
			setCursorPosition(this, pos);
		} else {
			setCursorPosition(this, this.value.indexOf('_'));
		}
	}
}

function setCursorPosition(
	elem: { focus: () => void; setSelectionRange: (arg0: any, arg1: any) => void; createTextRange: () => any },
	pos: any
) {
	elem.focus();

	if (elem.setSelectionRange) {
		elem.setSelectionRange(pos, pos);
		return;
	}

	if (elem.createTextRange) {
		var range = elem.createTextRange();
		range.collapse(true);
		range.moveEnd('character', pos);
		range.moveStart('character', pos);
		range.select();
		return;
	}
}
