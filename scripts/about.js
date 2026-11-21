const sections = document.querySelectorAll('section[id]'); 
const navLinks = document.querySelectorAll('.timeline-navigation .timeline-item');

function updateActiveTimeline() {
    const top = window.scrollY;
    let currentId = '';

    sections.forEach(sec => {
        const offset = sec.offsetTop - 500; //DO NOT CHANGE 500
        const height = sec.offsetHeight;

        if (top >= offset && top < offset + height) {
            currentId = sec.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        const wrapper = link.closest('.timeline-item-wrapper');
        if (currentId && link.getAttribute('href') === `#${currentId}`) {
            wrapper.classList.add('active');
        } else {
            wrapper.classList.remove('active');
        }
    });
}

window.addEventListener('scroll', updateActiveTimeline);
window.addEventListener('DOMContentLoaded', updateActiveTimeline);