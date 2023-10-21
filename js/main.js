function toggleHamMenu() {        // toogling menu
    var selectNav = document.querySelector('nav');

    if (selectNav.classList.contains('show-ham-menu')) {
        selectNav.classList.remove('show-ham-menu');
        selectNav.classList.add('hide-ham-menu');
    } else {
        selectNav.classList.remove('hide-ham-menu');
        selectNav.classList.add('show-ham-menu');
    }
}

function toggleHamIcon() {        // toogling hamburger
    const hamburger = document.querySelector('.hamburger');
    hamburger.classList.toggle('open');
}

const hamburgerButton = document.querySelector('.hamburger');   // keep ham color 
const overlay = document.getElementById('overlay');             // overlay

hamburgerButton.addEventListener('click', () => {
    overlay.classList.toggle('active');
    hamburgerButton.classList.toggle('active');
    hamburgerButton.classList.toggle('clicked');
});




const text1 = " Cloud Computing";                        // writing letter by letter intro span
const text2 = " Artificial Intelligence";
const text3 = " Machine Learning";

const textContainer = document.getElementById('text-container');
let index = 0;
let removing = false;
let currentTextIndex = 0;

const texts = [text1, text2, text3];

function typeText() {
    const text = texts[currentTextIndex];

    if (!removing) {
        textContainer.textContent += text[index];
        index++;
        if (index < text.length) {
            setTimeout(typeText, 50);
        } else {
            setTimeout(removeText, 1000);
        }
    }
}

function removeText() {
    removing = true;
    const currentText = textContainer.textContent;
    textContainer.textContent = currentText.slice(0, -1);
    if (textContainer.textContent.length > 0) {
        setTimeout(removeText, 50);
    } else {
        removing = false;
        index = 0;
        currentTextIndex = (currentTextIndex + 1) % texts.length;
        setTimeout(typeText, 300);
    }
}

typeText();




function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
    );
}

function toggleProfileOnScroll() {
    const firstImg = document.getElementById('profileDetails');
    const secondImg = document.getElementById('skills');
    const thirdImg = document.getElementById('lan');

    const profile = document.querySelector('.dp');   // keep dp active 
    const skills = document.querySelector('.skill-img');  // keep skill-img active 
    const lan = document.querySelector('.lan-img');        // keep lan-img active


    if (isElementInViewport(firstImg)) {
        firstImg.classList.remove('hide-profile');
        firstImg.classList.add('show-profile');
        profile.classList.add('active-img');
    } else {
        firstImg.classList.remove('show-profile');
        firstImg.classList.add('hide-profile');
        profile.classList.remove('active-img');
    }
    if (isElementInViewport(secondImg)) {
        secondImg.classList.remove('hide-skills');
        secondImg.classList.add('show-skills');
        skills.classList.add('active-img');
    } else {
        secondImg.classList.remove('show-skills');
        secondImg.classList.add('hide-skills');
        skills.classList.remove('active-img');
    }
    if (isElementInViewport(thirdImg)) {
        thirdImg.classList.remove('hide-lan');
        thirdImg.classList.add('show-lan');
        lan.classList.add('active-img');
    } else {
        thirdImg.classList.remove('show-lan');
        thirdImg.classList.add('hide-lan');
        lan.classList.remove('active-img');
    }
}

window.addEventListener('scroll', toggleProfileOnScroll);

//bounce projects when in view
function bounceProjectsOnScroll() {
    const projectContainers = document.querySelectorAll('.project-container');

    projectContainers.forEach((projectContainer) => {
        if (isElementInViewport(projectContainer)) {
            projectContainer.classList.add('bounce');
        } else {
            projectContainer.classList.remove('bounce');
        }
    });
}

window.addEventListener('scroll', bounceProjectsOnScroll);

