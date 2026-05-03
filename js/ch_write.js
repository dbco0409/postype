document.addEventListener('DOMContentLoaded', () => {
	document.getElementById('profileImg').addEventListener('change', function(event) {
		const file = event.target.files[0];
		const thumbnail = document.getElementById('thumbnail');
		const nothumb = document.getElementById('nothumb');

		if (file) {
			const fileType = file.type.split('/')[0];
			if (fileType === 'image') {
				const reader = new FileReader();
				reader.onload = function(e) {
					thumbnail.src = e.target.result;
					thumbnail.style.display='block';
					nothumb.style.display='none';
				}
				reader.readAsDataURL(file);
			} else {
				alert('이미지 파일만 업로드할 수 있습니다.');
				nothumb.style.display='flex';
				thumbnail.style.display='none';
			}
		}
	});
});

function validateForm() {
  const title = document.getElementById('title').value.trim();
  const url = document.getElementById('url').value.trim();
  const postDateChecked = document.querySelector('input[name="post-date"]:checked');

  let message = '';

  if (!title) {
    message = '제목을 입력해주세요.';
  } else if (!url) {
    message = '채널 URL를 입력해주세요.';
  } else if (url.length < 7) {
    message = '채널 URL은 최소 6자로 입력해주세요.';
  } else if (!/^[a-z0-9-]+$/.test(url)) {
    message = '채널 URL은 영문 소문자, 숫자, 대시(-)만 입력할 수 있습니다.';
  } else if (!postDateChecked) {
    message = '포스트 소장본 제공 기간을 선택해주세요.';
  }

  if (message) {
    document.getElementById('modal-alert-message').textContent = message;
    $('#registerModal').modal('show');
  } else {
    document.getElementById('registration-form').submit();
  }
}