function navToggle() {
    const icon = document.querySelector('.btn-dropdown .ico-dropdown');
    const toggleDown = document.querySelector('.toggle-down');
    const toggleUp = document.querySelector('.toggle-up');

    if (toggleDown.style.display === 'none') {
        toggleDown.style.display = 'block';
        toggleUp.style.display = 'none';
		icon.style.transform = 'translateY(-50%) rotate(0deg)';
    } else {
        toggleDown.style.display = 'none';
        toggleUp.style.display = 'block';
		icon.style.transform = 'translateY(-50%) rotate(180deg)';
    }
}

function menuToggle() {
    const menu = document.querySelector('.user-menu-toggle');
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
        document.addEventListener('click', outsideClickListener);
    } else {
        menu.style.display = 'none';
        document.removeEventListener('click', outsideClickListener);
    }
}

function outsideClickListener(event) {
    const menu = document.querySelector('.user-menu-toggle');
    const button = document.querySelector('.user-menu');

    if (!menu.contains(event.target) && !button.contains(event.target)) {
        menu.style.display = 'none';
        document.removeEventListener('click', outsideClickListener);
    }
}

document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.btn-toggle');
  const allLists = document.querySelectorAll('.more-toggle');

  buttons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();

      const targetId = button.getAttribute('data-target');
      const targetList = document.getElementById(targetId);

      if (targetList) {
        const isActive = targetList.classList.contains('active');

        allLists.forEach(list => list.classList.remove('active'));

        if (!isActive) {
          targetList.classList.add('active');
        }
      }
    });
  });

  document.addEventListener('click', () => {
    allLists.forEach(list => list.classList.remove('active'));
  });
});
