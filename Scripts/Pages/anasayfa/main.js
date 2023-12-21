let nextPageToken = "";

    function getVideos() {
      fetch("https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelId=UCB0mJ4uPQzKbnHC2FSoq3DA&maxResults=4&order=date&key=AIzaSyBoJobt4NSuPqRdzMrbYJg4pDFsne1S4T4" + nextPageToken)
        .then(response => response.json())
        .then(data => {
          let videos = data.items;
          let videoContainer = document.querySelector(".video-container");
          for (const video of videos) {
            let videoElement = document.createElement("div");
            videoElement.classList.add("youtube-video");

            let videoContainerElement = document.createElement("div");
            videoContainerElement.classList.add("video-info");

            let linkElement = document.createElement("a");
            linkElement.href = `https://www.youtube.com/watch?v=${video.id.videoId}`;
            linkElement.target = "_blank";

            let thumbnailElement = document.createElement("img");
            thumbnailElement.src = video.snippet.thumbnails.high.url;
            thumbnailElement.alt = video.snippet.title;

            let titleElement = document.createElement("p");
            titleElement.textContent = video.snippet.title;

            let viewCountElement = document.createElement("p");
            viewCountElement.classList.add("view-count");

            let likeCountElement = document.createElement("p");
            likeCountElement.classList.add("like-count");

            // Fetch view count from video statistics
            fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=statistics&id=${video.id.videoId}&key=AIzaSyBoJobt4NSuPqRdzMrbYJg4pDFsne1S4T4`)
              .then(response => response.json())
              .then(videoData => {
                let viewCount = videoData.items[0].statistics.viewCount;
                let likeCount = videoData.items[0].statistics.likeCount;
                viewCountElement.textContent = `${viewCount} views`;
                likeCountElement.textContent = `${likeCount} likes`;
              })
              .catch(error => {
                console.error('Fetch error:', error);
              });

            linkElement.appendChild(thumbnailElement);
            videoContainerElement.appendChild(linkElement);
            videoContainerElement.appendChild(titleElement);
            videoContainerElement.appendChild(viewCountElement);
            videoContainerElement.appendChild(likeCountElement);
            videoElement.appendChild(videoContainerElement);
            videoContainer.appendChild(videoElement);
          }
        })
        .catch(error => {
          console.error('Fetch error:', error);
        });
    }

    getVideos();

//-----------------
$('.toggle i').click(function(){
    $('ul').toggleClass('show');
  })




//scroolll too toopp
// Add an event listener to the scroll-to-top button
const scrollToTopBtn = document.getElementById("scrollToTopBtn");

scrollToTopBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Show or hide the scroll-to-top button based on scroll position
window.addEventListener("scroll", () => {
  if (window.scrollY > 200) {
    scrollToTopBtn.style.display = "block";
  } else {
    scrollToTopBtn.style.display = "none";
  }
});
