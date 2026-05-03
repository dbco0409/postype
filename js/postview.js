document.addEventListener('DOMContentLoaded', () => {
    const darkModeToggle = document.getElementById('darkmod');

    // 로컬 스토리지에서 다크모드 설정을 불러오기
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    darkModeToggle.checked = isDarkMode;
    document.body.classList.toggle('darked', isDarkMode);

    // 다크모드 스위치 클릭 이벤트
    darkModeToggle.addEventListener('change', () => {
        const isChecked = darkModeToggle.checked;
        document.body.classList.toggle('darked', isChecked);
        
        // 다크모드 설정을 로컬 스토리지에 저장
        localStorage.setItem('darkMode', isChecked);
    });
});

document.addEventListener('DOMContentLoaded', () => {
	function toggleHeart(button) {
		const icon = button.querySelector('i');
		button.classList.toggle('active');
		if (button.classList.contains('active')) {
			icon.classList.remove('far');
			icon.classList.add('fas');
		} else {
			icon.classList.remove('fas');
			icon.classList.add('far');
		}
	}

	function showBookmarkMsg(button) {
		const msg = document.getElementById('bookmarkMsg');
		const icon = button.querySelector('i');

		msg.style.display = 'block';
		setTimeout(() => {
			msg.style.opacity = '1';
		}, 0);

		setTimeout(() => {
			msg.style.opacity = '0';
			setTimeout(() => {
				msg.style.display = 'none';
			}, 500);
		}, 1000);

		button.classList.toggle('active');
		if (icon.classList.contains('far')) {
			icon.classList.remove('far');
			icon.classList.add('fas');
		} else {
			icon.classList.remove('fas');
			icon.classList.add('far');
		}
	}

	const cfrm = document.querySelector('.cfrm');
	const commentInput = document.getElementById('commentInput');
	const fileInput = document.getElementById('fileInput');
	const imageContainer = document.getElementById('imageContainer');
	const addImageButton = document.getElementById('addImageButton');
	const numSpan = document.querySelector('.num');

	commentInput.addEventListener('focus', () => {
		cfrm.classList.add('active');
	});

	addImageButton.addEventListener('click', () => {
		fileInput.click();
	});

	fileInput.addEventListener('change', (event) => {
		const files = event.target.files;

		if (files.length > 0) {
			const file = files[0]; 
			const reader = new FileReader();

			reader.onload = (e) => {
				const thumbnail = document.createElement('div');
				thumbnail.classList.add('thumbnail');
				thumbnail.innerHTML = `
					<img src="${e.target.result}" alt="Thumbnail">
					<button type="button" class="remove-button"><i class="fas fa-times"></i></button>
				`;
				imageContainer.innerHTML = ''; 
				imageContainer.appendChild(thumbnail);
				cfrm.classList.add('thumb');

				thumbnail.querySelector('.remove-button').addEventListener('click', () => {
					imageContainer.innerHTML = '';
					cfrm.classList.remove('thumb');
					fileInput.value = '';
					updateNum();
				});

				updateNum();
			};

			reader.readAsDataURL(file);
		}
	});

	function updateNum() {
		const currentFiles = fileInput.files.length;
		numSpan.textContent = `${currentFiles}/1`;
	}
});

document.addEventListener('DOMContentLoaded', () => {
    const content = document.querySelector('.content');
    let currentFontSize = 14; 

    document.querySelector('.btnplus').addEventListener('click', () => {
        if (currentFontSize < 20) { 
            currentFontSize += 2;
            content.style.fontSize = currentFontSize + 'px';
        }
    });

    document.querySelector('.btnminus').addEventListener('click', () => {
        if (currentFontSize > 14) { 
            currentFontSize -= 2;
            content.style.fontSize = currentFontSize + 'px';
        }
    });
});

const header = document.getElementById('header');

window.addEventListener('scroll', () => {
	if (window.scrollY > 500) {
		header.classList.remove('nofixed');
	} else {
		header.classList.add('nofixed');
	}
});