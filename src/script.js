document.addEventListener('DOMContentLoaded', function() {
    const buttonAccept = document.querySelector('.accept');
    const buttonNo = document.querySelector('.no');
    const niceImage = document.getElementById('niceImage');
    const sadImage = document.getElementById('sadImage');
    const happyImage = document.getElementById('happyImage');
    const typewriterElement = document.querySelector('.typewriter h1');
    let clickCountAccept = 0;
    let clickCountNo = 0;
    let typingInterval; 
    let deletingInterval; 
    let changingText = false; // Thêm cờ kiểm soát việc thay đổi văn bản

    const initialPositionAccept = {
        top: buttonAccept.offsetTop,
        left: buttonAccept.offsetLeft
    };
    const initialPositionNo = {
        top: buttonNo.offsetTop,
        left: buttonNo.offsetLeft
    };

    function setRandomPosition(element, otherElement) {
        const maxX = window.innerWidth - element.offsetWidth;
        const maxY = window.innerHeight - element.offsetHeight;

        let randomX, randomY;
        let isOverlapping;

        do {
            randomX = Math.random() * maxX;
            randomY = Math.random() * maxY;

            const elementRect = element.getBoundingClientRect();
            const typewriterRect = typewriterElement.getBoundingClientRect();
            const otherElementRect = otherElement.getBoundingClientRect();

            const isOverlappingWithTypewriter = !(
                randomX + elementRect.width < typewriterRect.left ||
                randomX > typewriterRect.right ||
                randomY + elementRect.height < typewriterRect.top ||
                randomY > typewriterRect.bottom
            );

            const isOverlappingWithOther = !(
                randomX + elementRect.width < otherElementRect.left ||
                randomX > otherElementRect.right ||
                randomY + elementRect.height < otherElementRect.top ||
                randomY > otherElementRect.bottom
            );

            const niceImageRect = niceImage.getBoundingClientRect();
            const sadImageRect = sadImage.getBoundingClientRect();
            const happyImageRect = happyImage.getBoundingClientRect();

            const isOverlappingWithNiceImage = !(
                randomX + elementRect.width < niceImageRect.left ||
                randomX > niceImageRect.right ||
                randomY + elementRect.height < niceImageRect.top ||
                randomY > niceImageRect.bottom
            );

            const isOverlappingWithSadImage = !(
                randomX + elementRect.width < sadImageRect.left ||
                randomX > sadImageRect.right ||
                randomY + elementRect.height < sadImageRect.top ||
                randomY > sadImageRect.bottom
            );

            const isOverlappingWithHappyImage = !(
                randomX + elementRect.width < happyImageRect.left ||
                randomX > happyImageRect.right ||
                randomY + elementRect.height < happyImageRect.top ||
                randomY > happyImageRect.bottom
            );

            isOverlapping = isOverlappingWithTypewriter || isOverlappingWithOther || isOverlappingWithNiceImage || isOverlappingWithSadImage || isOverlappingWithHappyImage;

        } while (isOverlapping);

        element.style.position = 'absolute';
        element.style.top = `${randomY}px`;
        element.style.left = `${randomX}px`;
    }

    buttonAccept.addEventListener('click', function() {
        if (changingText) return; // Kiểm soát nếu đang thay đổi văn bản
        clickCountAccept++;
        setRandomPosition(buttonAccept, buttonNo);

        if (niceImage) {
            happyImage.style.display = 'none';
            sadImage.style.display = 'none';
            niceImage.style.display = 'block';
        }

        if (clickCountAccept === 4) {
            changingText = true;
            changeTypewriterText("Chị làm người yêu em nha", "ùm em giỡn th", () => {
                changingText = false;
            });
        }
        if (clickCountAccept === 5) {
            changingText = true;
            changeTypewriterText("ùm em giỡn th", "thui đây nè", () => {
                changingText = false;
                resetPositions();
            });
        }
        if (clickCountAccept === 6) {
            fadeOutElements();
        }
    });

    buttonNo.addEventListener('click', function() {
        clickCountNo++;
        setRandomPosition(buttonNo, buttonAccept);

        if (sadImage) {
            niceImage.style.display = 'none';
            happyImage.style.display = 'none';
            sadImage.style.display = 'block';
        }

        if (clickCountNo === 6) {
            resetAllElements();
        }
    });

    buttonAccept.addEventListener('mouseover', function() {
        if (happyImage) {
            niceImage.style.display = 'none';
            sadImage.style.display = 'none';
            happyImage.style.display = 'block';
        }
    });

    function runScript() {
    }

    function changeTypewriterText(oldText, newText, callback) {
        if (deletingInterval) {
            clearInterval(deletingInterval);
        }

        let index = oldText.length;
        deletingInterval = setInterval(() => {
            if (index > 0) {
                typewriterElement.textContent = oldText.slice(0, index - 1);
                index--;
            } else {
                clearInterval(deletingInterval);
                typeNewText(newText, callback);
            }
        }, 100);
    }

    function typeNewText(text, callback) {
        let index = 0;
        function type() {
            if (index < text.length) {
                typewriterElement.textContent += text.charAt(index);
                index++;
                requestAnimationFrame(type);
            } else {
                if (callback) {
                    callback();
                }
            }
        }
        requestAnimationFrame(type);
    }

    function resetPositions() {
        buttonAccept.style.top = `${initialPositionAccept.top}px`;
        buttonAccept.style.left = `${initialPositionAccept.left}px`;
        buttonNo.style.top = `${initialPositionNo.top}px`;
        buttonNo.style.left = `${initialPositionNo.left}px`;
    }

    function fadeOutElements() {
        const elements = [buttonAccept, buttonNo, niceImage, sadImage, happyImage, typewriterElement];
        
        elements.forEach(element => {
            element.style.transition = 'opacity 1s ease';
            element.style.opacity = '0';
        });
    
        setTimeout(() => {
            elements.forEach(element => {
                if (element) {
                    element.style.display = 'none';
                }
            });
            import('./a.js').then(module => {
                module.runA();
            }).catch(err => {
                console.error("Lỗi khi tải a.js:", err);
            });
        }, 1000);
    }

    function resetAllElements() {
        location.reload(); // Reload lại trang để đặt tất cả về trạng thái ban đầu
    }
});
