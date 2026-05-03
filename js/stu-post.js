document.addEventListener('DOMContentLoaded', () => {
    const btnSelects = document.querySelectorAll('.btn-select');
    const secOptions = document.querySelectorAll('.sec-option');
    const optionNav = document.querySelector('.option-nav');

    btnSelects.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const secOption = secOptions[index];

            // 다른 sec-option 닫기
            secOptions.forEach((option, i) => {
                if (option !== secOption) {
                    option.classList.remove('active');
                    btnSelects[i].querySelector('i').classList.remove('rotate');
                }
            });

            // 현재 sec-option 토글
            secOption.classList.toggle('active');
            btn.querySelector('i').classList.toggle('rotate');
        });
    });

    // 페이지의 다른 곳 클릭 시 닫기
    document.addEventListener('click', () => {
        secOptions.forEach(option => {
            option.classList.remove('active');
            option.previousElementSibling.querySelector('i').classList.remove('rotate');
        });
    });

    optionNav.addEventListener('scroll', () => {
        secOptions.forEach((option, index) => {
            if (option.classList.contains('active')) {
                const button = btnSelects[index];
                const buttonRect = button.getBoundingClientRect();
                const navRect = optionNav.getBoundingClientRect();
                const offset = buttonRect.left - navRect.left; 
                option.style.left = `${1 + offset}px`;
            }
        });
    });
});