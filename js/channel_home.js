document.addEventListener('DOMContentLoaded', () => {
	const postContents = document.querySelectorAll('.post-contents');
	const postMenu = document.querySelectorAll('.more-toggle');

    postContents.forEach(content => {
        content.addEventListener('mouseleave', () => {
           postMenu.forEach(list => list.classList.remove('active'));
        });
    });

	document.querySelector('.c-desc').addEventListener('click', function() {
		document.getElementById('channelInfo').style.display = 'block';
	});

	// 닫기 버튼 클릭 시 팝업을 닫음
	document.querySelector('.btn-close').addEventListener('click', function() {
		document.getElementById('channelInfo').style.display = 'none';
	});

	// 팝업 배경 클릭 시 팝업을 닫음
	document.querySelector('.popbg').addEventListener('click', function() {
		document.getElementById('channelInfo').style.display = 'none';
	});
});

document.addEventListener("DOMContentLoaded", function() {
    const galleries = document.querySelectorAll('.post-gallery');

    galleries.forEach(gallery => {
        const slides = gallery.querySelectorAll('.swiper-slide');
        const nextButton = document.querySelector('.swiper-button-next'); // gallery 외부에서 버튼 선택

        const initializeSwiper = () => {
            if (slides.length > 3) {
                const swiper = new Swiper(gallery, {
                    slidesPerView: 3,
                    spaceBetween: 10,
                    navigation: {
                        nextEl: '.swiper-button-next', // 클래스 선택자를 통해 외부 버튼 참조
                    },
                    on: {
                        init: function () {
                            nextButton.style.display = 'block'; 
                        },
                    },
                });
            } 
        };

        const handleResize = () => {
            if (window.innerWidth >= 768) {
                initializeSwiper();
            } else {
                nextButton.style.display = 'none';
                if (gallery.swiper) {
                    gallery.swiper.destroy(true, true);
                }
            }
        };

        // 초기 로드 시 확인
        handleResize();

        // 리사이즈 이벤트 리스너 추가
        window.addEventListener('resize', handleResize);
    });
});

 window.onload = function() {
	const currentUrl = window.location.href;
	document.querySelector('.copy').value = currentUrl;
};
	
document.addEventListener("DOMContentLoaded", function() {
	function copyToClipboard() {
        const input = document.querySelector('.copy');
        input.select();
        document.execCommand('copy');
        alert('URL이 복사되었습니다!');
    }

    // 버튼 클릭 시 URL 복사
    document.querySelector('.copyBtn').addEventListener('click', copyToClipboard);

    // 입력 필드 클릭 시 URL 복사
    document.querySelector('.copy').addEventListener('click', copyToClipboard);
});
