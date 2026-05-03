$(document).ready(function() {
    $('.tag-group a, .search-result .btn').on('click', function() {
        var tagName;
        
        if ($(this).hasClass('btn')) {
            tagName = $(this).find('.keyword').text(); 
        } else {
            tagName = $(this).text();
        }
        var tagSelectHtml = `
            <div class="tag-select">
                <span>${tagName}</span>
                <a class="tagclose"><i class="fas fa-times"></i></a>
            </div>
        `;
        
		$('.searchBox').removeClass('hide');
        $('.searchBox .group').find('.input-search').before(tagSelectHtml);
        $('.search-result').removeClass('hide');
        $('.head_title, .tag-group').addClass('hide');
        
        $('.tagclose').off('click').on('click', function() {
            $(this).closest('.tag-select').remove();
            if ($('.searchBox .tag-select').length === 0) {
                $('.head_title, .tag-group').removeClass('hide');
            }
        });
    });
});
document.addEventListener("DOMContentLoaded", function () {
	document.getElementById('insertFile').addEventListener('click', function() {
	  const fileInput = document.getElementById('uploadFile');
	  const thumbnail = document.getElementById('thumbnail');
	  const nothumb = document.getElementById('nothumb');

	  if (fileInput.files && fileInput.files[0]) {
		const reader = new FileReader();
		
		reader.onload = function(e) {
		  thumbnail.src = e.target.result;
		  thumbnail.style.display = 'block'; // 이미지 보여주기
		  nothumb.style.display = 'none'; // nothumb 숨기기
		};

		reader.readAsDataURL(fileInput.files[0]);
		$('#imgUploadModal').modal('hide');
	  }
	});
})
function showimgModal(){
	$('#imgUploadModal').modal('show');
}
function showTagModal(){
	$('#tagModal').modal('show');
}
function showSearch(){
	$("#tagModal .head_title").addClass("hide");
	$("#tagModal .searchBox").removeClass("hide");
	$("#tagModal .searchBtn").addClass("hide");
}

function validateForm() {
  const title = document.getElementById('title').value.trim();
  const desc = document.getElementById('desc').value.trim();
  const postDateChecked = document.querySelector('input[name="post-date"]:checked');

  let message = '';

  if (!title) {
    message = '제목을 입력해주세요.';
  } else if (!desc) {
    message = '설명을 입력해주세요.';
  } 

  if (message) {
    document.getElementById('modal-alert-message').textContent = message;
    $('#registerModal').modal('show');
  } else {
    document.getElementById('registration-form').submit();
  }
}