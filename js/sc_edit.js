document.addEventListener("DOMContentLoaded", function () {
    const editButton = document.querySelector('.btn-edit');
    const editSections = document.querySelectorAll('.edit');
    const hideBtns = document.querySelectorAll('.hideBtn');

    // 편집 버튼 클릭 시
    editButton.addEventListener('click', function () {
        editSections.forEach(edit => {
            edit.style.display = 'flex'; // edit 버튼 보이기
        });
        hideBtns.forEach(hideBtn => {
            hideBtn.style.display = 'none'; // hideBtn 숨기기
        });
    });

    // 위로 이동 버튼 클릭 시
    document.querySelectorAll('.btnUp').forEach(button => {
        button.addEventListener('click', function () {
            const colB = button.closest('.col-b');
            const previousColB = colB.previousElementSibling;

            // 전체 게시판을 체크
            if (previousColB && previousColB.classList.contains('col-b') && !previousColB.classList.contains('col-all') ) {
                colB.parentNode.insertBefore(colB, previousColB);
            }
        });
    });

    // 아래로 이동 버튼 클릭 시
    document.querySelectorAll('.btnDown').forEach(button => {
        button.addEventListener('click', function () {
            const colB = button.closest('.col-b');
            const nextColB = colB.nextElementSibling;

            if (nextColB && nextColB.classList.contains('col-b')) {
                colB.parentNode.insertBefore(nextColB, colB);
            }
        });
    });
});