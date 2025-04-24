const messages = ["Ummm","...", "Ừ thì","....", "snhat", "thì", "người yêu của em sẽ thêm 1 tuổi mới nữa","...", "nhưng mà","chị vẫn mãi là babi của e", "Em sẽ không chúc chị hạnh phúc","vì như thế có nghĩa là yêu e chị sẽ không được hạnh phúc","(có thể là vậy thật)","...đôi lúc","Thay vào đó,","em mong sau này sẽ có cơ hội","...","nói ra hơi xấu hổ","...","g-gặp nhau và ở bên nhau","lâu dài!","và trọn vẹn nhất","..."];
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
      }, 1000); // Adjust fade-in time

    }, 1000); // Adjust fade-out time
  }
}

function jumpOutImage() {
  const giftImage = document.getElementById("gift-image");
  const clickText = document.getElementById("click-text");
  const letterBox = document.getElementById("letter-box");
  const whiteBox = document.getElementById("white-box"); // Correctly define whiteBox here
  const backgroundMusic = document.getElementById("background-music"); // Get audio element

  backgroundMusic.play(); // Play music when clicking the image

  giftImage.classList.add("jump-out", "fade-out");
  clickText.classList.add("fade-out");

  // Show canvas and start heart animation
  const canvas = document.getElementById("testCanvas");
  canvas.style.display = "block"; 
  init(); 

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

// Initialize canvas with heart animations
function init() {
    const canvas = document.getElementById("testCanvas");
    const stage = new createjs.Stage(canvas);
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const w = canvas.width;
    const h = canvas.height;

    const container = new createjs.Container();
    stage.addChild(container);

    const captureContainers = [];
    let captureIndex = 0;

    for (let i = 0; i < 100; i++) {
        const heart = new createjs.Shape();
        heart.graphics.beginFill(createjs.Graphics.getHSL(Math.random() * 30 - 45, 100, 50 + Math.random() * 30));
        heart.graphics.moveTo(0, -12).curveTo(1, -20, 8, -20).curveTo(16, -20, 16, -10).curveTo(16, 0, 0, 12);
        heart.graphics.curveTo(-16, 0, -16, -10).curveTo(-16, -20, -8, -20).curveTo(-1, -20, 0, -12);
        heart.y = -100;

        container.addChild(heart);
    }

    for (let i = 0; i < 100; i++) {
        const captureContainer = new createjs.Container();
        captureContainer.cache(0, 0, w, h);
        captureContainers.push(captureContainer);
    }

    createjs.Ticker.timingMode = createjs.Ticker.RAF;
    createjs.Ticker.on("tick", tick);

    function tick(event) {
        const l = container.numChildren;

        captureIndex = (captureIndex + 1) % captureContainers.length;
        stage.removeChildAt(0);
        const captureContainer = captureContainers[captureIndex];
        stage.addChildAt(captureContainer, 0);
        captureContainer.addChild(container);

        for (let i = 0; i < l; i++) {
            const heart = container.getChildAt(i);
            if (heart.y < -50) {
                heart._x = Math.random() * w;
                heart.y = h * (1 + Math.random()) + 50;
                heart.perX = (1 + Math.random() * 2) * h;
                heart.offX = Math.random() * h;
                heart.ampX = heart.perX * 0.1 * (0.15 + Math.random());
                heart.velY = -Math.random() * 2 - 1;
                heart._rotation = Math.random() * 40 - 20;
                heart.alpha = Math.random() * 0.75 + 0.05;
                heart.compositeOperation = Math.random() < 0.33 ? "lighter" : "source-over";
            }
            const int = (heart.offX + heart.y) / heart.perX * Math.PI * 2;
            heart.y += heart.velY * heart.scaleX / 2;
            heart.x = heart._x + Math.cos(int) * heart.ampX;
            heart.rotation = heart._rotation + Math.sin(int) * 30;
        }

        captureContainer.updateCache("source-over");
        stage.update(event);
    }
}
function updateMessage() {
  const whiteBox = document.getElementById("white-box");
  if (messageIndex < messages.length) {
    whiteBox.classList.add("fade-out");
    setTimeout(() => {
      const message = messages[messageIndex];
      if (message !== undefined && message !== null) { // Check if message is valid
        whiteBox.innerHTML = message; // Add a dot at the end of each message
      }
      whiteBox.classList.remove("fade-out");
      whiteBox.classList.add("fade-in");

      setTimeout(() => {
        whiteBox.classList.remove("fade-in");
        messageIndex++;
        if (messageIndex === messages.length) {
          // Chuyển sang trang chính còn nền
          window.location.href = "happy/index.html";
        }
      }, 1000); // Adjust fade-in time

    }, 1000); // Adjust fade-out time
  }
}
                document.addEventListener('contextmenu', function(e) {
                    e.preventDefault();
                });
        
                // Ngăn chặn F12
                document.addEventListener('keydown', function(e) {
                    if (e.key === 'F12' || (e.ctrlKey && e.shiftKey && e.key === 'I') || (e.ctrlKey && e.key === 'U')) {
                        e.preventDefault();
                    }
                });
        
                // Kiểm tra nếu Developer Tools đang mở
                setInterval(function() {
                    const devToolsOpen = window.outerWidth - window.innerWidth > 100 || window.outerHeight - window.innerHeight > 100;
                    if (devToolsOpen) {
                        alert('Skid ra chỗ khác bạn ey');
                        // Bạn có thể thực hiện hành động khác ở đây, như chuyển hướng hoặc ẩn nội dung
                    }
                }, 1000);
