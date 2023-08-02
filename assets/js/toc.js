const toc = document.querySelector('.toc');
const tocItems = document.querySelectorAll('.toc-title');
const options = {threshold: [0, 0.25, 0.5, 0.75, 1]}
let selectedIndex = 0
let tags = document.querySelectorAll('.blog-post h2, .blog-post h3');
tocItems.forEach((item, index) => item.dataset.index = index);
tags.forEach((tag, index) => tag.dataset.index = index);

toc?.addEventListener('click', e => {
    if (e.target.matches('.toc-title')) {
        tocItems.forEach(target => target.classList.remove('toc-active'));
        tocItems[e.target.dataset.index].classList.add('toc-active');
        tags[e.target.dataset.index].scrollIntoView({ behavior: "smooth", block: "start"});
    }
});

$(window).scroll(function() {
    let headers = document.querySelectorAll('.blog-post h2, .blog-post h3');
    let scrollPosition = $(this).scrollTop();
    let selectedIndex = 0;
    headers.forEach((header, index) => {
        let offsetTop = header.offsetTop + 300; // 60은 헤더 높이 등 추가적으로 고려해야 할 값
        if (scrollPosition >= offsetTop) {
            // 해당 섹션이 보이는 경우 목차에서 해당 링크 강조
            tocItems[selectedIndex].classList.remove('toc-active');
            selectedIndex = header.dataset.index;
            tocItems[selectedIndex].classList.add('toc-active');
            // $(`.toc-title[data-index=${index}]`).addClass('toc-active');
        } else {
            // 해당 섹션이 보이지 않는 경우 목차에서 해당 링크 강조 제거
            $(`.toc-title[data-index=${index}]`).removeClass('toc-active'); 
        }
    });
  });
  

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            let top = entry.intersectionRect.top;
            if(top < 300) {
                tocItems[selectedIndex].classList.remove('toc-active');
                selectedIndex = entry.target.dataset.index;
                tocItems[selectedIndex].classList.add('toc-active');
            } else {
                tocItems[selectedIndex].classList.remove('toc-active');
                // selectedIndex = entry.target.dataset.index - 1;
                // tocItems[selectedIndex].classList.add('toc-active');
            }
        } else {
            tocItems[selectedIndex].classList.remove('toc-active');
        }
    })
}, options);

//tags.forEach(tag => observer.observe(tag));