
//메인 modal창 상단 닫기
function getScrollPosition() {
  const modalCont = document.querySelector(".modal_cont");
  const posY = modalCont.scrollTop;
  const modalClose = document.querySelector(".modal_close");
  if (posY > 300) {
    modalClose.classList.add('on')
  } else {
    modalClose.classList.remove('on')
  }
}

window.addEventListener("scroll", (event) => {
  let scrollY = this.scrollY;
  const modalClose = document.querySelector(".modal_close");
  if (scrollY > 300) {
    modalClose.classList.add('on')
  } else {
    modalClose.classList.remove('on')
  }
});