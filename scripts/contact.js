document.querySelectorAll('.faq-content-item').forEach(item => {
    // this way you won't have to specifically click the button
    item.addEventListener('click', () => {
        const container = item.parentElement;
        const answer = container.querySelector('.faq-answer');

        const isActive = container.classList.toggle('active');

        if (isActive) {
            answer.style.maxHeight = answer.scrollHeight + 'px';
        } else {
            answer.style.maxHeight = null;
        }
    });
});

