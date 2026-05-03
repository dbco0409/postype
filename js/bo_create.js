document.addEventListener("DOMContentLoaded", function () {
	const selectButtons = document.querySelectorAll('.btn-selected');
	const optionMenus = document.querySelectorAll('.opt');

	selectButtons.forEach((button, index) => {
		button.addEventListener('click', (event) => {
			event.stopPropagation(); 
			optionMenus.forEach((opt, optIndex) => {
				if (optIndex === index) {
					opt.classList.toggle('open'); 
				} else {
					opt.classList.remove('open'); 
				}
			});
		});
	});

	document.addEventListener('click', () => {
		optionMenus.forEach(opt => {
			opt.classList.remove('open');
		});
	});

	optionMenus.forEach(opt => {
		opt.addEventListener('click', (event) => {
			event.stopPropagation(); 
		});
	});
});

function validateForm() {
  const title = document.getElementById('title').value.trim();

  let message = '';

  if (!title) {
    message = '제목을 입력해주세요.';
  } 

  if (message) {
    document.getElementById('modal-alert-message').textContent = message;
    $('#registerModal').modal('show');
  } else {
    document.getElementById('registration-form').submit();
  }
}