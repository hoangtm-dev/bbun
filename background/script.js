const messages = ["Hi cậu", "Xin chào", "How are you?", "Hello!"];
let messageIndex = 1;

function updateMessage() {
  const whiteBox = document.getElementById("white-box");

  if (messageIndex < messages.length) {
    whiteBox.classList.add("fade-out");
    setTimeout(() => {
      whiteBox.innerHTML = messages[messageIndex];
      whiteBox.classList.remove("fade-out");
      whiteBox.classList.add("fade-in");

      setTimeout(() => {
        whiteBox.classList.remove("fade-in");
        messageIndex++;
      }, 1000); // Điều chỉnh thời gian fade-in

    }, 1000); // Điều chỉnh thời gian fade-out
  }
}

function jumpOutImage() {
  const giftImage = document.getElementById("gift-image");
  const clickText = document.getElementById("click-text");
  const letterBox = document.getElementById("letter-box");
  const whiteBox = document.getElementById("white-box");

  const backgroundMusic = document.getElementById("background-music"); // Lấy phần tử audio
  backgroundMusic.play(); // Phát nhạc khi click vào ảnh

  giftImage.classList.add("jump-out", "fade-out");
  clickText.classList.add("fade-out");

  setTimeout(() => {
    letterBox.classList.remove("hidden");
    letterBox.classList.add("jump-out", "fade-out");
  }, 500);

  setTimeout(() => {
    whiteBox.style.display = "inline-block";
    setTimeout(() => {
      whiteBox.style.opacity = "1";
      updateMessage();
      const intervalId = setInterval(() => {
        if (messageIndex < messages.length) {
          updateMessage();
        } else {
          clearInterval(intervalId);
        }
      }, 3000); 
    }, 10);
  }, 1000);

  giftImage.onclick = null;
}

function showImage() {
  const giftBox = document.getElementById("gift-box");
  const giftImageContainer = document.getElementById("gift-image-container");

  giftImageContainer.classList.add("show");
  giftBox.style.opacity = "0";
  giftBox.onclick = null;
  document.getElementById("gift-image").onclick = jumpOutImage;
}
