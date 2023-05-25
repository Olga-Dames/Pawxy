import { api } from './service';

const modalItem = document.querySelector('.movies__container');
const modalTrailer = document.querySelector('.video__overlay');

modalItem.addEventListener('click', e => {
  if (e.target === e.currentTarget) {
    return;
  }
  if (e.target.nodeName === 'IMG') {
    const content = e.currentTarget.querySelector('.content');
    fullScreenVideos(
      e.target.dataset.id,
      content.childNodes[1].textContent,
      content.childNodes[3].textContent,
      content.childNodes[5].childNodes[1].outerText,
      content.childNodes[5].childNodes[3].innerHTML
    );

    document.querySelector('.close__btn').addEventListener('click', e => {
      function handleClick(e) {
        modalTrailer.classList.remove('active');
        modalTrailer.innerHTML = '';
      }
      handleClick(e);
    });

    document.querySelector('.visit__btn').addEventListener('click', e => {
      function handleVisit(link) {
        window.location.href = link;
        modalTrailer.classList.remove('active');
        modalTrailer.innerHTML = '';
      }
      handleVisit(content.childNodes[3].dataset.link);
    });
  }
});

function fullScreenVideos(id, name, source, views) {
  modalTrailer.innerHTML = `
  <div class=modal>
    <div class=video__iframe>
        <iframe
      class="iframe"
      width="100%"
      height="203"
      src="https://www.youtube.com/embed/${id}?rel=0&showinfo=0&ecver=1&amp;iv_load_policy=3&amp;rel=0&amp;showinfo=0&amp;yt:stretch=16:9&amp;autohide=1&amp;color=red&amp;width=560&amp;width=560" width="560" height="315" allowtransparency="true" frameborder="0""
      title="YouTube video player"
      frameborder="0"
       autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    ></iframe>
    </div>
    <div class=video__descr>
    <p class="modal__name">${name}</p>
        <div class=modal__flex>
        <div class="modal__wrapper">
          <svg width="12" height="9" viewBox="0 0 10 10" fill="none">
            <path
              d="M0.701393 3.10661C0.741559 2.48824 1.23872 2.00363 1.85763 1.97297C2.75386 1.92857 4.03482 1.87502 4.99999 1.87502C5.96515 1.87502 7.24611 1.92857 8.14234 1.97297C8.76125 2.00363 9.25841 2.48824 9.29858 3.10661C9.33706 3.69905 9.37499 4.42803 9.37499 5.00002C9.37499 5.572 9.33706 6.30098 9.29858 6.89342C9.25841 7.51179 8.76125 7.9964 8.14234 8.02706C7.24611 8.07146 5.96515 8.12502 4.99999 8.12502C4.03482 8.12502 2.75386 8.07146 1.85763 8.02706C1.23872 7.9964 0.741559 7.51179 0.701393 6.89342C0.662911 6.30098 0.624985 5.572 0.624985 5.00002C0.624985 4.42803 0.662911 3.69905 0.701393 3.10661Z"
              fill="#FC0D1B"
            />
            <path
              d="M4.06252 3.74998V6.24999L6.56252 4.99998L4.06252 3.74998Z"
              fill="white"
            />
          </svg>
          <p class="modal__webname">${source}</p>
        </div>
        <div class=modal__views>${views}</div>
        </div>
      </div>
    </div>
    <div class=buttons>
      <button type="button" class=" btn visit__btn">Visit</button>
      <button type="button" class="btn close__btn">Close</button>
    </div>
    </div>`;
  modalTrailer.classList.add('active');
}
