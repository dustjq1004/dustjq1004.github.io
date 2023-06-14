// $("[data-tag]").click((e) => {
//     currentTag = e.target.dataset.tag;
//     console.log(currentTag);
//     // filterByTagName(currentTag);
// });

// 현재 URL의 쿼리스트링 가져오기
const queryString = window.location.search;

// 쿼리스트링 파싱하여 객체로 변환하기
const params = new URLSearchParams(queryString);

// 특정 쿼리스트링 값 가져오기
const currentTag = params.get('tag');

function filterByTagName(tagName) {
    $('.hidden').removeClass('hidden');
    $('.post-preview').each((index, elem) => {
        if (!elem.hasAttribute(`data-${tagName}`)) {
            console.log(tagName)
            $(elem).addClass('hidden');
        }
    });
    // $(`.tag`).removeClass('selected');
    // $(`.tag[data-tag=${tagName}]`).addClass('selected');
}
$(document).ready(function() {
    if(currentTag) {
        filterByTagName(currentTag);
    }
});
  