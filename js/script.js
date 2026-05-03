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
<<<<<<< HEAD
    if (menu.style.display === 'none' || menu.style.display === '') {
        menu.style.display = 'block';
        document.addEventListener('click', outsideClickListener);
    } else {
        menu.style.display = 'none';
        document.removeEventListener('click', outsideClickListener);
    }
}

=======
    
    if (menu.classList.contains('active')) {
        menu.classList.remove('active');
        document.removeEventListener('click', outsideClickListener);
    } else {
        menu.classList.add('active');
        document.addEventListener('click', outsideClickListener);
    }
}

function hideUserMenu() {
    const menu = document.querySelector('.user-menu-toggle');
    menu.classList.remove('active');
}

>>>>>>> a13b461 (feat.add)
function outsideClickListener(event) {
    const menu = document.querySelector('.user-menu-toggle');
    const button = document.querySelector('.user-menu');

    if (!menu.contains(event.target) && !button.contains(event.target)) {
<<<<<<< HEAD
        menu.style.display = 'none';
=======
        menu.classList.remove('active');
>>>>>>> a13b461 (feat.add)
        document.removeEventListener('click', outsideClickListener);
    }
}

document.addEventListener('DOMContentLoaded', () => {
<<<<<<< HEAD
=======
    // 로컬 스토리지에서 다크모드 설정을 불러오기
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    document.body.classList.toggle('darked', isDarkMode);
});

document.addEventListener('DOMContentLoaded', () => {
>>>>>>> a13b461 (feat.add)
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

<<<<<<< HEAD
=======
  allLists.forEach(list => {
    list.addEventListener('click', (event) => {
      event.stopPropagation();
    });
  });

>>>>>>> a13b461 (feat.add)
  document.addEventListener('click', () => {
    allLists.forEach(list => list.classList.remove('active'));
  });
});
<<<<<<< HEAD
=======

document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const inputSearch = document.querySelector('.input-search');

    inputSearch.addEventListener('focus', () => {
        header.classList.add('search-active');
    });

    inputSearch.addEventListener('blur', () => {
        header.classList.remove('search-active');
    });
});

function fnMove(seq) {
    var element = document.querySelector(seq);
    if (element) {
        var offset = element.getBoundingClientRect().top + window.scrollY;
        window.scrollTo({
            top: offset,
            behavior: 'smooth'
        });
    }
}


function fnback(n){
	history.back();
}
function loca(n){
	location.href=n;
}
>>>>>>> a13b461 (feat.add)
