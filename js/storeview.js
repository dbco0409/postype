document.addEventListener('DOMContentLoaded', () => {
    const selectButton = document.getElementById('selectButton');
	const options = document.getElementById('options');
	const result = document.querySelector('.result');
	const totalDisplay = document.createElement('div');
	totalDisplay.classList.add('total');

	let totalCount = 0;
	let totalPrice = 0;

	// 옵션 표시/숨기기
	selectButton.addEventListener('click', () => {
		options.classList.toggle('active');
	});

	// 옵션 외부 클릭 시 숨기기
	document.addEventListener('click', (event) => {
		if (!options.contains(event.target) && event.target !== selectButton) {
			options.classList.remove('active');
		}
	});

	// 옵션 선택 시
	options.addEventListener('click', (event) => {
		const optCol = event.target.closest('.opt-col');
		if (optCol) {
			const name = optCol.getAttribute('data-name');
			const price = parseInt(optCol.getAttribute('data-price'));

			// 결과에 추가
			const selectDiv = document.createElement('div');
			selectDiv.classList.add('selects');
			selectDiv.innerHTML = `
				<div class="col-s">
					<div class="c-l">
						<h4>${name}</h4>
						<div>
							<button type="button" class="btn btnminus"><i class="fas fa-minus"></i></button>
							<span class="txt">1</span>
							<button type="button" class="btn btnplus"><i class="fas fa-plus"></i></button>
						</div>
					</div>
					<div class="c-r">
						<button type="button" class="btn-close"><i class="fas fa-times"></i></button>
						<h5 class="price">${price.toLocaleString()}원</h5>
					</div>
				</div>
			`;

			const sel = result.querySelector('.sel-r');
			sel.appendChild(selectDiv);
			options.classList.remove('active');

			totalCount++;
			totalPrice += price;
			updateTotal();
			
			selectDiv.querySelector('.btnplus').addEventListener('click', () => {
				const quantity = selectDiv.querySelector('.txt');
				const pr = selectDiv.querySelector('.price');
				const newQuantity = parseInt(quantity.innerText) + 1;
				quantity.innerText = newQuantity;
				totalPrice += price;
				totalCount++;
				pr.innerText = totalPrice.toLocaleString()+"원";
				updateTotal();
			});

			selectDiv.querySelector('.btnminus').addEventListener('click', () => {
				const quantity = selectDiv.querySelector('.txt');
				const pr = selectDiv.querySelector('.price');
				let newQuantity = parseInt(quantity.innerText) - 1;
				if (newQuantity < 1) newQuantity = 1; // 최소 1개 유지
				quantity.innerText = newQuantity;
				if (totalCount > 1){
				totalPrice -= price;
				totalCount--;
				pr.innerText = totalPrice.toLocaleString()+"원";
				updateTotal();
				}
			});

			selectDiv.querySelector('.btn-close').addEventListener('click', () => {
				totalCount--;
				totalPrice -= price * parseInt(selectDiv.querySelector('.txt').innerText);
				selectDiv.remove();
				totalDisplay.remove();
				updateTotal();
			});
		}
	});

	function updateTotal() {
		totalDisplay.innerHTML = `
			<div class="col-t">총 수량 <span class="blue">${totalCount}</span>개</div>
			<div class="col-p">총 금액 <span class="price">${totalPrice.toLocaleString()}원</span></div>
		`;
		if (!document.querySelector('.total')) {
			result.appendChild(totalDisplay);
		}
	}
});
document.addEventListener("DOMContentLoaded", function() {
    const galleries = document.querySelectorAll('.post-gallery');

    galleries.forEach(gallery => {
        const slides = gallery.querySelectorAll('.swiper-slide');
        const nextButton = document.querySelector('.swiper-button-next'); // gallery 외부에서 버튼 선택

        const initializeSwiper = () => {
            if (slides.length > 4) {
                const swiper = new Swiper(gallery, {
                    slidesPerView: 4,
                    spaceBetween: 0,
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

document.addEventListener('DOMContentLoaded', function() {
    const fixedPop = document.getElementById('fixedPop');
    const fixedPopbody = fixedPop.querySelector('.pop-content');
    const showOrderButton = document.querySelector('.show-order');
    const hidePop = fixedPop.querySelector('.bgpop');

    // 주문하기 버튼 클릭 시 팝업 열기
    showOrderButton.addEventListener('click', function() {
        fixedPop.style.display = 'block';
        setTimeout(() => {
            fixedPopbody.style.bottom = '2%'; 
        }, 10);
    });
    
    // 배경 클릭 시 팝업 닫기
    hidePop.addEventListener('click', function() {
        fixedPopbody.style.bottom = '-80%'; 
        setTimeout(() => {
            fixedPop.style.display = 'none'; 
        }, 500);
    });
	
	window.addEventListener('resize', function(){
		if (window.innerWidth >= 768) {
			fixedPop.style.display = 'block';
		}else{
			fixedPop.style.display = 'none';
		}
	});
});