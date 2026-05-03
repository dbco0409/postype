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
	
	const darkModeToggle = document.getElementById('darkmod');

    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    darkModeToggle.checked = isDarkMode;
    document.body.classList.toggle('darked', isDarkMode);

    darkModeToggle.addEventListener('change', () => {
        const isChecked = darkModeToggle.checked;
        document.body.classList.toggle('darked', isChecked);
        
        localStorage.setItem('darkMode', isChecked);
    });

	const paybox = document.querySelector('.paybox');

    paybox.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', null); 
        e.target.classList.add('dragging');
    });

    paybox.addEventListener('dragend', (e) => {
        e.target.classList.remove('dragging');
    });

    document.getElementById('editor').addEventListener('dragover', (e) => {
        e.preventDefault(); 
    });

    document.getElementById('editor').addEventListener('drop', (e) => {
        e.preventDefault();
        const draggingElement = document.querySelector('.dragging');
        const dropzone = document.getElementById('editor');
        dropzone.insertBefore(draggingElement, e.target.nextSibling);
    });
	
	const editor = document.getElementById('editor');
	const quickBtn = document.querySelector('.quick-btn');
	const quickMenu = document.getElementById('quickMenu');
	
	document.getElementById('toggleQuickMenu').addEventListener('click', function () {
		const moreBtn = this;

		if (quickMenu.style.display === 'none' || quickMenu.style.display === '') {
			quickMenu.style.display = 'flex'; 
			moreBtn.classList.add('rotated');
		} else {
			quickMenu.style.display = 'none'; 
			moreBtn.classList.remove('rotated'); 
		}
	});
	
	function showQuickBtn(e) {
		if (quickMenu.style.display === 'none' || quickMenu.style.display === '') {
			const selection = window.getSelection();
			if (!selection.rangeCount) return;

			const range = selection.getRangeAt(0);
			let rect = range.getClientRects()[0];

			if (!rect) {
				rect = range.startContainer.getBoundingClientRect();
			}

			quickBtn.style.top = `${rect.top + window.scrollY - 282}px`;

			quickBtn.style.display = 'flex';
		}
	}

	function hideQuickBtn() {
		quickBtn.style.display = 'none';
	}
	
	quickMenu.addEventListener('click', function (e) {
        if (e.target.closest('.rBtn')) {
            hideQuickBtn();
        }
    });
	
	editor.addEventListener('click', function (e) {
		if (!e.target.closest('.quick-btn')) {
			showQuickBtn(e);
		}
	});

	editor.addEventListener('focus', function (e) {
		showQuickBtn(e);
	});

	editor.addEventListener('keydown', function () {
		hideQuickBtn();
	});
	
	const navbarEdit = document.querySelector('.navbar-edit');
	const subnavbar = document.querySelector('.subnavbar');

	navbarEdit.addEventListener('scroll', () => {
		const scrollLeft = navbarEdit.scrollLeft;
		subnavbar.style.transform = `translateX(-50%) translateX(-${scrollLeft}px)`;
	});

	// 초기 위치 조정
	subnavbar.style.transform = `translateX(-50%)`;

});

$(document).ready(function() {
	
	$("#btn-bold").click(function(){
		setStyle('bold');
	});
	$("#btn-italic").click(function(){
		setStyle('italic');
	});
	$("#btn-underline").click(function(){
		setStyle('underline');
	});
	$("#btn-strike").click(function(){
		setStyle('strikeThrough');
	});
	$("#btn-ordered-list").click(function(){
		setStyle('insertOrderedList');
	});
	$("#btn-unordered-list").click(function(){
		setStyle('insertUnorderedList');
	});
	$("#ffsBtn").click(function(){
		$("#options03-1").show();
	});
	$("#options03-1 button").click(function(){
		$("#options03-1").hide();
		$("#ffsBtn span").text($(this).text());
	});
	$("#inButton").click(function(){
		$("#options03-2").show();
	});
	$("#blankButton").click(function(){
		$("#options03-3").show();
	});

	const editor = $("#editor")[0];

	function updateButtons() {
		$("#btn-back").prop("disabled", !document.queryCommandEnabled('undo'));
		$("#btn-forward").prop("disabled", !document.queryCommandEnabled('redo'));
	}

	function focusEditor() {
		editor.focus();
	}

	$("#btn-back").click(function() {
		document.execCommand('undo');
		focusEditor();
		updateButtons();
	});

	$("#btn-forward").click(function() {
		document.execCommand('redo');
		focusEditor();
		updateButtons();
	});
	
	$(editor).on('input', function() {
		updateButtons();
	});

	$('#insertFile').click(function() { 
        const fileInput = $('#uploadFile')[0];
        const file = fileInput.files[0];

        if (file) {
            const fileName = file.name;
            const fileSize = (file.size / 1024).toFixed(2) + 'KB'; // 파일 크기를 KB 단위로 변환

            const fileHtml = `
                <div class="file_upload">
                    <div class="inner">
                        <div class="file-icon"><i class="fas fa-download"></i></div>
                        <div class="file-info">
                            <div class="file-name">${fileName}</div>
                            <div class="file-size">용량 ${fileSize}</div>
                        </div>
                    </div>
                </div>
           `;
			
			const editor = document.getElementById('editor');
            let range;
			focusEditor();

            if (window.getSelection().rangeCount > 0) {
                range = window.getSelection().getRangeAt(0);
                range.deleteContents(); // 선택된 내용을 삭제
                range.insertNode($(fileHtml)[0]); // HTML 삽입

                // 새로운 p 태그 추가 및 포커스
                const newParagraph = document.createElement('p');
                range.insertNode(newParagraph); // 새로운 p 태그 삽입
                range.setStartAfter(newParagraph); // 포커스를 p 태그 뒤로 이동
                range.collapse(true);
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
            } else {
                // 커서가 없는 경우, editor의 가장 위에 삽입
                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = fileHtml;
                editor.insertBefore(tempDiv.firstChild, editor.firstChild);

                // 새로운 p 태그 추가 및 포커스
                const newParagraph = document.createElement('p');
                editor.insertBefore(newParagraph, editor.firstChild); // 새로운 p 태그 삽입
                newParagraph.focus();
            }

            $('#fileUploadModal').modal('hide');
        } else {
            alert('파일을 선택해주세요.');
        }
    });

	let imageCount = 0; // 현재 업로드된 이미지 수
    const maxImages = 5; // 최대 이미지 수

    // 이미지 업로드 버튼 클릭 이벤트
    $('#imgUploadBtn, #UploadBtn').click(function () {
        // 파일 선택 창 열기
        const fileInput = $('<input type="file" accept="image/*" multiple>');
        fileInput.trigger('click');

        fileInput.on('change', function () {
            const files = this.files;

            if (files.length + imageCount > maxImages) {
                alert(`최대 ${maxImages}개의 이미지를 업로드할 수 있습니다.`);
                return;
            }

            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();

                reader.onload = function (e) {
                    // 이미지가 업로드되면 보여주기
                    const imgHtml = `
                        <div class="col-img">
                            <label for="imgCheck-${imageCount}" class="custom-label">
                                <img src="${e.target.result}" />
                                <button type="button" class="closeBtnImg">
                                    <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" width="24" height="24" fill="none" xmlns="http://www.w3.org/2000/svg" class="MuiSvgIcon-root MuiSvgIcon-sizeMd joy-7cffc5">
                                        <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM9.707 8.293a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" fill="currentColor"></path>
                                    </svg>
                                </button>
                                <div class="img-check">
                                    <label for="imgCheck-${imageCount}" class="custom-checkbox">
                                        <input type="checkbox" id="imgCheck-${imageCount}" value="${imageCount}" />
                                        <span class="checkmark">${imageCount+1}</span>
                                    </label>
                                </div>
                                <p class="fileName">${file.name}</p>
                            </label>
                        </div>`;
                    $('.b-body .scroll').append(imgHtml);
                    imageCount++;
                };

                reader.readAsDataURL(file);
            }

            $('.modal-none').hide();
            $('.modal-imgs').css("display","flex");
        });
    });

	$('#imgSubmitBtn').click(function() {
		const selectedImages = [];
		$('.b-body .scroll input[type="checkbox"]:checked').each(function() {
			const imgIndex = $(this).val();
			const imgElement = $(`.col-img img:eq(${imgIndex})`);
			const imgSrc = imgElement.attr('src');
			const fileName = imgElement.siblings('.fileName').text();

			selectedImages.push({ src: imgSrc, name: fileName });
		});

		if (selectedImages.length > 0) {
			const imgHtml = `<div class="thumb">${selectedImages.map(image => `<img src="${image.src}" alt="${image.name}" style="max-width: 100%; height: auto;">`).join('')}</div>`;
			
			 const editor = document.getElementById('editor');
			let range;
			focusEditor();

			if (window.getSelection().rangeCount > 0) {
				range = window.getSelection().getRangeAt(0);
				range.deleteContents(); // 선택된 내용을 삭제
				range.insertNode($(imgHtml)[0]); // HTML 삽입
			} else {
				// 커서가 없는 경우, editor의 가장 위에 이미지 삽입
				const tempDiv = document.createElement('div');
				tempDiv.innerHTML = imgHtml;
				editor.insertBefore(tempDiv.firstChild, editor.firstChild);
			}
			
			$('#imgUploadModal').modal('hide');
		} else {
			alert('선택된 이미지가 없습니다.');
		}
	});

    // 이미지 삭제 버튼 클릭 이벤트
    $(document).on('click', '.closeBtnImg', function () {
        const confirmation = confirm("해당 이미지를 삭제하시겠습니까?");
        if (confirmation) {
            $(this).closest('.col-img').remove();
            imageCount--;
            // 이미지가 없으면 다시 modal-none 보이기
            if (imageCount === 0) {
                $('.modal-none').css("display","flex");
                $('.modal-imgs').hide();
            }
        }
    });

    // 전체 선택 체크박스 클릭 이벤트
    $('#AllCheck').change(function () {
        const isChecked = $(this).is(':checked');
        $('.img-check input[type="checkbox"]').prop('checked', isChecked);
    });

    // 삭제 버튼 클릭 이벤트
    $('#deleteBtn').click(function () {
        const checkedImages = $('.img-check input[type="checkbox"]:checked');
        if (checkedImages.length === 0) {
            alert("삭제할 이미지를 선택해주세요.");
            return;
        }

        const confirmation = confirm("선택한 이미지를 삭제하시겠습니까?");
        if (confirmation) {
            checkedImages.each(function () {
                $(this).closest('.col-img').remove();
                imageCount--;
            });
            // 이미지가 없으면 다시 modal-none 보이기
            if (imageCount === 0) {
                $('.modal-none').css("display","flex");
                $('.modal-imgs').hide();
            }
        }
    });
	
});


function inBtn(state) {
	const buttonLabel = state === 1 ? '사용함' : '사용안함';
	$("#options03-2").hide();
	$("#inButton span").text(buttonLabel);
	if(state==1)
		document.execCommand('indent');
}
function blankBtn(state){
	const buttonLabel = state === 1 ? '사용함' : '사용안함';
	$("#options03-3").hide();
	$("#blankButton span").text(buttonLabel);
	if(state==1)
		$("#editor p").addClass("blank");
	else
		$("#editor p").removeClass("blank");
}

function setStyle(style) {
	document.execCommand(style);
	focusEditor();
}

function setfontfamilyChange(fontName){
	$("#fontfamilyButton span.tit").text(fontName);
	document.execCommand('styleWithCSS', false, true);
	switch(fontName){
		case 'Kopub바탕':
			document.execCommand('FontName', false, 'KoPub Batang');
			break;
		case '나눔명조':
			document.execCommand('FontName', false, 'Nanum Myeongjo');
			break;
		default:
			document.execCommand('FontName', false, fontName);
			break;
	}
	focusEditor();
}

function setAlign(align){
	$("#alignButton").html(`<i class="fas fa-align-${align}"></i>`);
	switch(align){
		case 'left':
			document.execCommand('justifyleft');
			break;
		case 'right':
			document.execCommand('justifyright');
			break;
		case 'center':
			document.execCommand('justifycenter');
			break;
		case 'justify':
			document.execCommand('justifyFull');
			break;
	}
	focusEditor();
}

function setBlockquote(type){
	switch(type){
		case 'quote-left':
			document.execCommand('insertHTML', false, `<blockquote class="quo-left"><i class="fas fa-quote-left"></i><div class="quo-box"><span>&nbsp;</span></div></blockquote>`); 
			break;
		case 'quote-left-s':
			document.execCommand('insertHTML', false, `<blockquote class="quo-left-s"><i class="fas fa-quote-left"></i><div class="quo-box"><span>&nbsp;</span></div></blockquote>`); 
			break;
		case 'grayline':
			document.execCommand('insertHTML', false, `<blockquote class="grayline"><span>&nbsp;</span></blockquote>`); 
			break;
		case 'graybox':
			document.execCommand('insertHTML', false, `<blockquote class="graybox"><span>&nbsp;</span></blockquote>`); 
			break;
		case 'grayball':
			document.execCommand('insertHTML', false, `<blockquote class="ball grayball"><span>&nbsp;</span></blockquote>`); 
			break;
		case 'blueball':
			document.execCommand('insertHTML', false, `<blockquote class="ball blueball"><span>&nbsp;</span></blockquote>`); 
			break;
		case 'removeblock':
            removeBlockquote(); // blockquote 제거 함수 호출
            break;
	}

	function removeBlockquote() {
		const selection = window.getSelection();
		if (selection.rangeCount > 0) {
			const range = selection.getRangeAt(0);
			let blockquote = range.startContainer;

			// startContainer가 텍스트 노드인 경우 parentNode로 blockquote 찾기
			if (blockquote.nodeType === Node.TEXT_NODE) {
				blockquote = blockquote.parentNode;
			}

			// blockquote가 아닌 경우 parentNode를 찾아서 다시 확인
			while (blockquote && blockquote.nodeName !== 'BLOCKQUOTE') {
				blockquote = blockquote.parentNode;
			}

			if (blockquote) {
				const parent = blockquote.parentNode;
				parent.removeChild(blockquote); // blockquote 제거
				const newP = document.createElement('p');
				parent.insertBefore(newP, blockquote); // p 태그 추가
				const newRange = document.createRange();
				newRange.setStart(newP, 0);
				newRange.collapse(true);
				selection.removeAllRanges();
				selection.addRange(newRange); // 새로 생성된 p 태그에 포커스
			}
		}
	}

    editor.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && event.shiftKey) {
            event.preventDefault();
            // 새로운 p 태그를 blockquote 안에 추가
            const blockquote = editor.querySelector('blockquote:last-child');
            const newP = document.createElement('br');
            blockquote.appendChild(newP);

            const range = document.createRange();
            const selection = window.getSelection();
            range.setStartAfter(newP);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
        }else if (event.key === 'Enter') {
            event.preventDefault();
            const newP = document.createElement('p');
            newP.innerHTML = '&nbsp;';
            editor.appendChild(newP);
            const range = document.createRange();
            const selection = window.getSelection();
            range.setStartAfter(newP);
            range.collapse(true);
            selection.removeAllRanges();
            selection.addRange(range);
		}
    });

	focusEditor();
}

function setFontColor(color) {
  document.execCommand('styleWithCSS', false, true);
  document.execCommand('foreColor', false, color);
  focusEditor();
}

function payBox(){
	const payBox=$(".paybox").html();
	$(".paybox").remove();
   document.execCommand('insertHTML', false, `<div class="paybox payment-line" contenteditable="false">${payBox}</div>`); 
	focusEditor();
}

function setHr(tag){
	document.execCommand('insertHTML', false, `<hr class="hr ${tag}"/>`); 
	focusEditor();
}

function btnStyle(tag, text){
	$("#fontstyleButton span.tit").text(text);
	document.execCommand('formatBlock', false, `<${tag}>`); 
	focusEditor();
}

function focusEditor() {
	document.getElementById('editor').focus({preventScroll: true});
}

function showLinkModal() {
    let selection = window.getSelection();
    let selectedText = selection.toString();
	let range = selection.getRangeAt(0);
    let editor = document.getElementById('editor');
    document.getElementById('url').value = '';

    // 선택 영역이 있고, 선택된 노드가 editor 내부인지 확인
    if (selectedText && editor.contains(selection.anchorNode)) {
        $('#LinkModal').modal('show');

        // URL 입력 후 링크 삽입 이벤트
        $("#insertLink").off('click').on('click', function () {
            let url = document.getElementById('url').value;

            if (!url) {
                alert('유효한 URL을 입력하세요.');
                return;
            }
            
            $('#LinkModal').modal('hide'); 

            range.deleteContents();
			let link = document.createElement('a');
            link.href = url;
            link.target = '_blank'; 
            link.style.color = '#2962ff'; 
			link.style.textDecoration = 'underline';
            link.textContent = selectedText;

            range.insertNode(link);
			range.selectNode(link); 
            selection.removeAllRanges(); 
            selection.addRange(range);
        });

    } else {
        alert('링크를 삽입할 텍스트를 선택해주세요.');
    }
}


function showimgModal(){
	$('#imgUploadModal').modal('show');
}

function showFileUploadModal(){
	$('#fileUploadModal').modal('show');
}

function showStyleModal(){
	$('#styleModal').modal('show');
}

function insertStyle(){
	$('#styleModal').modal('hide');
}

async function spellCheck(text) {
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    const apiKey = 'sk-uyngqVoexpnxPFyjqIhQL3RDpLdZ6P0B7JYu9Cb0C0T3BlbkFJe-Vg36Q6aVQ_1kCmf5yBQVbs8kG49XOOe3xCx8C38A'; // OpenAI API 키

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
                {
                    role: 'user',
                    content: `이 텍스트의 맞춤법을 확인해서 올바른 문장으로 변경하고, no-spell 클래스가 들어간 div를 포함한 태그는 그대로 반환해줘:
                    텍스트: "${text}"`
                }
            ]
        }),
    });

    const result = await response.json();
    return result.choices[0].message.content;
}

function checkSpelling() {
	document.getElementById('loadingSpinner').style.display = 'flex';
    const editorContent = document.getElementById('editor').innerHTML; // Get the text from the editor
    spellCheck(editorContent).then(correctedText => {
        document.getElementById('editor').innerHTML = correctedText; // Replace the editor content with corrected text
    }).catch(error => {
        console.error('Error during spell check:', error);
    }).finally(() => {
        document.getElementById('loadingSpinner').style.display = 'none';
    });
}

function updateTextSize() {
    // editor 요소 가져오기
    var editor = document.getElementById("editor");
    
    // editor의 모든 텍스트를 가져오기 (paybox 제외)
    var tempDiv = document.createElement("div");
    tempDiv.innerHTML = editor.innerHTML;

    // paybox 요소 삭제
    var payboxes = tempDiv.getElementsByClassName("paybox");
    while (payboxes.length > 0) {
        payboxes[0].parentNode.removeChild(payboxes[0]);
    }

    // 나머지 텍스트 길이 계산
    var text = tempDiv.innerText || tempDiv.textContent;
    var textLength = text.replace(/\s/g, '').length; // 공백을 제외한 텍스트 길이

    // txtsize 요소에 업데이트
    document.querySelector(".txtsize").textContent = textLength + "자";
}