/* =============================================================
   SO GOOD TOUR — main.js
   헤더 스크롤 / 모바일 메뉴 / 지역 탭 / 스크롤 리빌 / 문의 폼
   ============================================================= */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1. 헤더 스크롤 효과 ---------- */
  var header = document.getElementById('siteHeader');
  function onScroll() {
    if (window.scrollY > 60) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- 2. 모바일 햄버거 메뉴 ---------- */
  var menuToggle = document.getElementById('menuToggle');
  var gnb = document.getElementById('gnb');
  menuToggle.addEventListener('click', function () {
    var open = gnb.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  gnb.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      gnb.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- 3. 지역별 인기 여행 탭 ---------- */
  var tabs = document.querySelectorAll('.region-tab');
  var panels = document.querySelectorAll('.region-panel');
  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var region = tab.getAttribute('data-region');
      tabs.forEach(function (t) { t.classList.remove('is-active'); });
      tab.classList.add('is-active');
      panels.forEach(function (p) {
        p.classList.toggle('is-active', p.getAttribute('data-region') === region);
      });
    });
  });

  /* ---------- 4. 통합 검색바 (자리표시) ----------
     TODO: 추후 실제 상품 검색 시스템 연동. */
  var searchBtn = document.querySelector('.search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', function () {
      alert('여행 검색 기능은 상품 데이터베이스 연동 후 제공될 예정입니다.\n지금은 맞춤 문의로 상담을 받으실 수 있습니다.');
    });
  }

  /* ---------- 5. 스크롤 리빌 ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------- 6. 문의 폼 (자리표시) ----------
     TODO: 추후 예약/결제 API 또는 이메일 전송 연동. */
  var form = document.getElementById('inquiryForm');
  if (form) {
    form.addEventListener('submit', function () {
      var name = document.getElementById('inqName').value.trim();
      if (!name) { alert('성함을 입력해 주세요.'); return false; }
      alert(name + '님, 문의가 접수되었습니다.\n전문 플래너가 빠르게 연락드리겠습니다.\n(실제 전송 기능은 추후 연동 예정입니다.)');
      form.reset();
      return false;
    });
  }
});
