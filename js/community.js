document.addEventListener('DOMContentLoaded', () => {
	const messagePop = document.querySelector('#writeSend');
	const closeButton = document.querySelectorAll('.btn-close');
	const closeBg = document.querySelector('.popbg');

	// 버튼 클릭 시 팝업 표시 함수
	function showMessagePopup() {
		messagePop.style.display = 'block';
	}

	// 모든 버튼에 클릭 이벤트 추가
	const sendButtons = document.querySelectorAll('.btn-write');
	sendButtons.forEach(button => {
		button.addEventListener('click', showMessagePopup);
	});

	closeButton.forEach(button => {
		button.addEventListener('click', () => {
			messagePop.style.display = 'none';
		});
	});

	closeBg.addEventListener('click', () => {
		messagePop.style.display = 'none';
	});

	const toggleButton = document.getElementById('selectButton');
	const options = document.getElementById('options');

	toggleButton.addEventListener('click', function(event) {
		event.stopPropagation(); // 이벤트 전파 방지
		options.style.display = options.style.display === 'none' ? 'block' : 'none';
	});

	document.addEventListener('click', function() {
		options.style.display = 'none';
	});

	options.addEventListener('click', function(event) {
		event.stopPropagation();
		if (event.target.tagName === 'A') {
			toggleButton.textContent = event.target.textContent; 
			options.style.display = 'none'; 
		}
	});
});

document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const addImageButton = document.getElementById('addImageButton');
    const imageContainer = document.getElementById('imageContainer');
    const imageCountDisplay = document.getElementById('imageCount');

    addImageButton.addEventListener('click', function() {
        if (imageContainer.children.length >= 5) {
            alert('최대 5개의 이미지를 선택할 수 있습니다.');
			fileInput.value = '';
            return;
        }
        fileInput.click();
    });

    fileInput.addEventListener('change', function(event) {
        const files = Array.from(event.target.files);
		const currentCount = imageContainer.children.length;
        const totalCount = currentCount + files.length;

        files.forEach((file) => {
            if (totalCount < 5 ) { 
                const reader = new FileReader();

                reader.onload = function(e) {
                    const wrapper = document.createElement('div');
                    wrapper.classList.add('image-wrapper');

                    const img = document.createElement('img');
                    img.src = e.target.result;

                    const removeButton = document.createElement('button');
                    removeButton.classList.add('remove-button');
                    removeButton.innerHTML = '×'; // 삭제 버튼 표시

                    removeButton.addEventListener('click', function() {
                        imageContainer.removeChild(wrapper);
                        updateImageCount();
                    });

                    wrapper.appendChild(img);
                    wrapper.appendChild(removeButton);
                    imageContainer.appendChild(wrapper);

                    updateImageCount(); // 이미지 개수 업데이트
                };

                reader.readAsDataURL(file);
            }else{
				alert('이미지는 5개까지 선택 가능합니다.');
            }
        });

        // + 버튼 갱신
        if (totalCount < 5) {
            addImageButton.style.display = 'block';
        } else {
            addImageButton.style.display = 'none';
        }
    });

    function updateImageCount() {
        const count = imageContainer.children.length;
        imageCountDisplay.textContent = `${count}/5`;
		if(count == 5)
			addImageButton.style.display = 'none';
    }
});


