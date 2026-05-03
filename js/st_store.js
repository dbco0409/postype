document.addEventListener("DOMContentLoaded", function () {
    const questions = document.querySelectorAll('.col-q .q');

    questions.forEach(question => {
        question.addEventListener('click', function () {
            const answer = this.nextElementSibling; // 답변 div
            const icon = this.querySelector('i'); // 아이콘

           const maxHeight = answer.scrollHeight + "px";

            // 답변 표시/숨기기
            if (answer.classList.contains('open')) {
                answer.style.maxHeight = "0"; // 애니메이션 클래스 제거
                icon.classList.remove('rotate'); // 아이콘 회전 해제
                answer.classList.remove('open');
            } else {
                answer.style.maxHeight = maxHeight; // 애니메이션 클래스 추가
                icon.classList.add('rotate'); // 아이콘 회전
                answer.classList.add('open');
            }
        });
    });
});