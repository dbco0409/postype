document.addEventListener('DOMContentLoaded', () => {
	const messagePop = document.querySelector('#messageSend');
	const closeButton01 = document.querySelector('.btn-close01');
	const closeBg = document.querySelector('.popbg');

	closeButton01.addEventListener('click', () => {
		messagePop.style.display = 'none';
	});

	closeBg.addEventListener('click', () => {
		messagePop.style.display = 'none';
	});

	const inputField = document.querySelector('.input-txt');
	const messageButton = document.querySelector('.msgBtn');

	inputField.addEventListener('input', () => {
		if (inputField.value.trim() === '') {
			messageButton.disabled = true; 
		} else {
			messageButton.disabled = false;
		}
	});

	messageButton.disabled = true;

    const searchButton = document.querySelector('.btn-search-m');
    const searchBox = document.querySelector('.m-search-box');
    const closeButton02 = document.querySelector('.close-box');

    searchButton.addEventListener('click', () => {
        searchBox.style.display = 'block';
    });

    closeButton02.addEventListener('click', () => {
        searchBox.style.display = 'none';
    });

});
function msgShow(){
	const messagePop = document.querySelector('#messageSend');
	messagePop.style.display = 'block';
}