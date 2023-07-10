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

$('#sidebar-nav').scroll(function() {
    var container = $(this);
    var containerHeight = container.height();

    $('.nav-scroll').each(function() {
        var element = $(this);
        var elementOffset = element.offset().top - container.offset().top;
        var elementHeight = element.outerHeight();
        
        // 요소의 중심 위치 계산
        var elementCenter = elementOffset + elementHeight / 2;

        // 스크롤 위치에 따른 투명도 조절
        var distanceFromCenter = Math.abs(containerHeight / 2 - elementCenter);
        var maxDistance = containerHeight / 2;

        // 투명도
        var opacity = 1 - (distanceFromCenter / maxDistance);

        // 폰트사이즈
        var fontSizeRatio = 1.4 - (distanceFromCenter / maxDistance) * 0.5; // 최대 크기 차이 0.5
        var fontSize = fontSizeRatio + 'rem';

        if(element.data('tag') === currentTag) element.addClass('selected');
        else element.removeClass('selected');
        //element.css('opacity', opacity);
        //element.css('font-size', fontSize);
    });
});
  
// 페이지 로드 시 초기 스크롤 위치에 따른 투명도, 폰트 사이즈 설정
$('#sidebar-nav').trigger('scroll');
  

// 스크롤 위치 저장
$(window).on('beforeunload', function() {
    localStorage.setItem('scrollPosition', $('#sidebar-nav').scrollTop());
});
  
$(window).on('load', function() {
    var scrollPosition = localStorage.getItem('scrollPosition');
    if (scrollPosition) {
        $('#sidebar-nav').scrollTop(scrollPosition);
        localStorage.removeItem('scrollPosition');
    }
});
  
  
  
  