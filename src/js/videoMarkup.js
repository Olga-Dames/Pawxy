import moment from 'moment';

const insertVideoMarkup = (videos, container) => {
  const sortedVideos = videos.sort(compare);

  function compare(firstVideo, secondVideo) {
    if (
      parseInt(firstVideo.pagemap.videoobject[0].interactioncount) <
      parseInt(secondVideo.pagemap.videoobject[0].interactioncount)
    ) {
      return 1;
    } else if (
      parseInt(firstVideo.pagemap.videoobject[0].interactioncount) >
      parseInt(secondVideo.pagemap.videoobject[0].interactioncount)
    ) {
      return -1;
    } else {
      return 0;
    }
  }

  const videoMarkup = sortedVideos
    .map(({ displayLink, pagemap }) => {
      const videoObj = pagemap.videoobject[0];
      const id = Object.values(videoObj)[0];
      const source = Object.values(pagemap.person[0])[0];
      const visitLink = Object.values(pagemap.person[0])[1];
      const previewPic = Object.values(pagemap.cse_image[0])[0];
      const timeStr = Object.values(videoObj.duration).join('');
      const duration = moment.duration(timeStr);
      const formattedTime = moment
        .utc(duration.asMilliseconds())
        .format('m:ss');
      const slicedLink = displayLink.slice(4).replace('y', 'Y');
      const views = calcViews(
        Object.values(videoObj.interactioncount).join('')
      );

      return `
      <li class="video_card">
      <div class="video__box">
      <img src="${previewPic}" alt="preview" data-id="${id}"/>
        <p class="time">${formattedTime}</p>
      </div>
      <div class="content">
        <p class="video__name">${Object.values(videoObj)[9]}</p>
        <p class="source__name" data-link=${visitLink}>${source}</p>
        <div class=flex>
        <div class="youtube__wrapper">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M0.701393 3.10661C0.741559 2.48824 1.23872 2.00363 1.85763 1.97297C2.75386 1.92857 4.03482 1.87502 4.99999 1.87502C5.96515 1.87502 7.24611 1.92857 8.14234 1.97297C8.76125 2.00363 9.25841 2.48824 9.29858 3.10661C9.33706 3.69905 9.37499 4.42803 9.37499 5.00002C9.37499 5.572 9.33706 6.30098 9.29858 6.89342C9.25841 7.51179 8.76125 7.9964 8.14234 8.02706C7.24611 8.07146 5.96515 8.12502 4.99999 8.12502C4.03482 8.12502 2.75386 8.07146 1.85763 8.02706C1.23872 7.9964 0.741559 7.51179 0.701393 6.89342C0.662911 6.30098 0.624985 5.572 0.624985 5.00002C0.624985 4.42803 0.662911 3.69905 0.701393 3.10661Z"
              fill="#FC0D1B"
            />
            <path
              d="M4.06252 3.74998V6.24999L6.56252 4.99998L4.06252 3.74998Z"
              fill="white"
            />
          </svg>
          <p class="web___name">${slicedLink}</p>
        </div>
        <div class=views>${views} views</div>
        </div>
      </div>
    </li>`;
    })
    .join('');

  container.innerHTML = videoMarkup;
};

function calcViews(number) {
  const roundedM = Math.round(parseInt(number) / 1000000);
  const roundedK = Math.round(parseInt(number) / 1000);
  return number >= 1000000 ? roundedM + 'm' : roundedK + 'k';
}

export default insertVideoMarkup;
