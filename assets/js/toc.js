const toc = document.querySelector('.toc');
const tocItems = document.querySelectorAll('.toc-title');
const options = {threshold: [0, 0.25, 0.5, 0.75, 1]}
let selectedIndex = 0
let tags = document.querySelectorAll('.blog-post h2, .blog-post h3');
tocItems.forEach((item, index) => item.dataset.index = index);
tags.forEach((tag, index) => tag.dataset.index = index);


toc.addEventListener('click', e => {
    if (e.target.matches('.toc-title')) {
        tocItems.forEach(target => target.classList.remove('toc-active'));
        tocItems[e.target.dataset.index].classList.add('toc-active');
        tags[e.target.dataset.index].scrollIntoView({ behavior: "smooth", block: "center"});
    }
});

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            tocItems[selectedIndex].classList.remove('toc-active');
            selectedIndex = entry.target.dataset.index;
            tocItems[selectedIndex].classList.add('toc-active');
            
            if(entry.target.dataset.index > 0 && entry.intersectionRatio < 0.3) {
                tocItems[selectedIndex].classList.remove('toc-active');
                selectedIndex = Number(entry.target.dataset.index) - 1;
                tocItems[selectedIndex].classList.add('toc-active');
            }
        } 
    })
}, options);

tags.forEach(tag => observer.observe(tag));