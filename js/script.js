document.addEventListener('DOMContentLoaded', () => {
    const quiz = document.querySelector('#quiz');
    const textBlock = document.querySelector('#text-block');
    const questions = document.querySelectorAll('.question__item');
    const answers = document.querySelectorAll('.js-answer');
    const preloader = document.querySelector('#preloader');
    const results = document.querySelectorAll('.result');
    const chooseBlock = document.querySelector('#choose');
    const modal1 = document.querySelector('#modal1');
    const modal2 = document.querySelector('#modal2');
    const modal3 = document.querySelector('#modal3');
    const iterationSpan = document.querySelector('#iteration');
    const chooseItems = document.querySelectorAll('.choose__item');
    const lender = document.querySelector('main.lender');
    const prefil = document.querySelector('main.prefil');
    const overlay = document.createElement('div');
    document.body.appendChild(overlay);
    overlay.classList.add('overlay-hidden');

    let hasPassedToPrefil =
        localStorage.getItem('hasPassedToPrefil') === 'true';

    // if (hasPassedToPrefil) {
    //     lender.style.display = 'none';
    //     prefil.style.display = 'block';
    // }

    const productTitles = document.querySelectorAll('.product-title');

    productTitles.forEach((productTitle) => {
        productTitle.textContent = productName;
    });

    const brandTitles = document.querySelectorAll('.brand-title');

    brandTitles.forEach((brandTitle) => {
        brandTitle.textContent = brandName;
    });

    const storeNames = document.querySelectorAll('.store-name');
    document.title = store;
    storeNames.forEach((storeName) => {
        storeName.textContent = store;
    });

    const productPrices = document.querySelectorAll('.product-price');

    productPrices.forEach((productPriceElement) => {
        productPriceElement.textContent = productPrice;
    });

    let currentQuestionIndex = 0;
    let attemptsLeft = 3;
    let isBoxOpened = false;

    questions[currentQuestionIndex].classList.add('active');

    const date = new Date();
    const day = date.getDate();
    const month = date.toLocaleString(language, { month: 'long' });

    document.querySelector('.js-info_day').textContent = day;
    document.querySelector('.js-info_month').textContent = month;

    answers.forEach((answer) => {
        answer.addEventListener('click', (event) => {
            event.preventDefault();

            const nextQuestionId = answer.dataset.next;
            const currentQuestion = questions[currentQuestionIndex];

            currentQuestion.classList.remove('active');
            setTimeout(() => {
                currentQuestion.style.display = 'none';

                if (nextQuestionId !== 'end') {
                    const nextQuestion = document.querySelector(
                        `#${nextQuestionId}`
                    );
                    if (nextQuestion) {
                        nextQuestion.style.display = 'block';
                        setTimeout(
                            () => nextQuestion.classList.add('active'),
                            10
                        );
                        currentQuestionIndex++;
                    }
                }

                if (nextQuestionId === 'end') {
                    quiz.style.display = 'none';
                    textBlock.style.display = 'none';
                    preloader.style.display = 'block';

                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });

                    setTimeout(() => {
                        document
                            .querySelector('.circle-loader')
                            .classList.add('load-complete');
                        setTimeout(() => {
                            document.querySelector(
                                '.check-icon'
                            ).style.display = 'block';
                        }, 4000);
                    }, 4000);

                    const delay = 1000;
                    results.forEach((result, index) => {
                        setTimeout(() => {
                            result.style.display = 'block';
                            setTimeout(() => {
                                result.style.opacity = '1';
                            }, 10);
                        }, delay * (index + 1));
                    });

                    setTimeout(() => {
                        preloader.style.display = 'none';
                        chooseBlock.style.display = 'block';
                        setTimeout(() => {
                            chooseBlock.style.opacity = '1';
                        }, 100);
                    }, delay * (results.length + 1));

                    setTimeout(() => {
                        showModalWithAnimation(modal1);
                    }, delay * (results.length + 2));
                }
            }, 500);
        });
    });

    chooseItems.forEach((item) => {
        item.addEventListener('click', (event) => {
            event.preventDefault();

            if (isBoxOpened) return;
            isBoxOpened = true;

            if (attemptsLeft > 0) {
                attemptsLeft--;
                iterationSpan.textContent = attemptsLeft;

                const tapa = item.querySelector('.choose_tapa');
                tapa.classList.add('opened');

                if (attemptsLeft === 1) {
                    const gift = item.querySelector('.choose_gift');
                    setTimeout(() => {
                        gift.classList.add('show-gift');
                        setTimeout(() => {
                            gift.classList.add('lift-up');
                            setTimeout(() => {
                                showModalWithAnimation(modal3);
                            }, 1000);
                        }, 500);
                    }, 500);
                } else {
                    setTimeout(() => {
                        showModalWithAnimation(modal2);
                    }, 1000);
                }
            }
        });
    });

    function showModalWithAnimation(modal) {
        overlay.classList.remove('overlay-hidden');
        modal.style.display = 'block';
        setTimeout(() => {
            modal.classList.add('fade', 'show');
            document.body.classList.add('modal-open');
        }, 10);
    }
    const modalButton1 = document.querySelector('#modal-button1');
    const modalButton2 = document.querySelector('#modal-button2');
    const modalButton3 = document.querySelector('#modal-button3');

    modalButton1.addEventListener('click', () => {
        if (!sessionStorage.getItem('event_1')) {
            fetch(`https://hatetrfc.space/click?event1=1&upd_clickid=${clid}`, {
                mode: 'no-cors',
            })
                .then((response) => {
                    sessionStorage.setItem('event_1', '1', 1);
                })
                .catch((error) => {
                    console.error('Error fetching the tracker:', error);
                });
        }

        modal1.style.display = 'none';
        modal1.classList.remove('fade', 'show');
        document.body.classList.remove('modal-open');
        overlay.classList.add('overlay-hidden');
        isBoxOpened = false;
    });

    modalButton2.addEventListener('click', () => {
        modal2.style.display = 'none';
        modal2.classList.remove('fade', 'show');
        document.body.classList.remove('modal-open');
        overlay.classList.add('overlay-hidden');
        isBoxOpened = false;
    });

    console.log('logged');

    modalButton3.addEventListener('click', () => {
        if (!sessionStorage.getItem('event_2')) {
            fetch(`https://hatetrfc.space/click?event2=1&upd_clickid=${clid}`, {
                mode: 'no-cors',
            })
                .then((response) => {
                    sessionStorage.setItem('event_2', '1', 1);
                })
                .catch((error) => {
                    console.error('Error fetching the tracker:', error);
                });
        }

        modal3.style.display = 'none';
        modal3.classList.remove('fade', 'show');
        document.body.classList.remove('modal-open');
        overlay.classList.add('overlay-hidden');
        isBoxOpened = false;

        if (lender && prefil) {
            // Анімація для lender (зникнення)
            lender.classList.add('fade-out');
            lender.classList.remove('fade');
            setTimeout(() => {
                lender.style.display = 'none';

                // Анімація для prefil (поява)
                hasPassedToPrefil = true;
                localStorage.setItem('hasPassedToPrefil', 'true');
                prefil.classList.add('fade-in');
                prefil.classList.remove('fade');
                prefil.style.display = 'block';
            }, 500);
        }
    });

    const container = document.querySelector('.notifications');
    const items = document.createElement('ul');
    items.classList.add('notifications__items');
    container.appendChild(items);

    function createNotification(item) {
        const li = document.createElement('li');
        li.classList.add('notifications__item', 'showNoty');

        li.innerHTML = `
    <div class="notifications__item__img">
      <img src="${item.img}" alt="">
    </div>
    <div class="notifications__item__content">
      <div class="notifications__item__content__header">
        <span class="notifications__item-name">${item.name}</span> ${from}
        <span class="notifications__item-address">${item.address}</span>
      </div>
      <div class="notifications__item__content__desc">${item.desc}</div>
      <div class="notifications__item__content__bottom">
        <div class="notifications__item__time">${item.time}</div>
        <div class="notifications__item__icons">
          <img src="assets/icons/notification-ok.svg" alt="">
        </div>
      </div>
    </div>
    <div class="notifications__item__btn">
      <img class="notifications__item__btn-close" src="assets/icons/notifications-close.svg" height="15px" width="15px" alt="">
    </div>
  `;

        li.addEventListener('click', function () {
            li.remove();
        });

        return li;
    }

    function sendNotification(item) {
        const notification = createNotification(item);
        items.prepend(notification);
        hideNotification(notification);
    }

    function hideNotification(notification) {
        setTimeout(function () {
            notification.classList.remove('showNoty');
            notification.classList.add('hiddenNoty');
            setTimeout(function () {
                notification.remove();
            }, 1500);
        }, 7500);
    }

    let index = 0;
    function startNotifications() {
        if (data.length === 0) return;

        sendNotification(data[index]);
        index = (index + 1) % data.length;
        setTimeout(startNotifications, 20000);
    }
    setTimeout(startNotifications, 20000);

    document.getElementById('faqBtn').addEventListener('click', function () {
        document.getElementById('faq').classList.add('active');
        this.style.display = 'none';
    });

    document.getElementById('faqClose').addEventListener('click', function () {
        document.getElementById('faq').classList.remove('active');
        document.getElementById('faqBtn').style.display = 'block';
    });

    document.addEventListener('mouseup', function (event) {
        let faq = document.getElementById('faq');
        if (!faq.contains(event.target)) {
            faq.classList.remove('active');
            document.getElementById('faqBtn').style.display = 'block';
        }
    });

    document.querySelectorAll('.js-faq-header').forEach(function (header) {
        header.addEventListener('click', function () {
            document
                .querySelectorAll('.js-faq-header')
                .forEach(function (otherHeader) {
                    if (otherHeader !== header) {
                        otherHeader.classList.remove('active');
                    }
                });
            document.querySelectorAll('.js-faq-body').forEach(function (body) {
                if (body !== header.nextElementSibling) {
                    body.style.display = 'none';
                }
            });
            header.classList.toggle('active');
            let body = header.nextElementSibling;
            if (body.style.display === 'block') {
                body.style.display = 'none';
            } else {
                body.style.display = 'block';
            }
        });
    });

    document.getElementById('faqBtn').addEventListener('click', function () {
        document.getElementById('faq').classList.add('active');
        this.style.display = 'none';
    });

    document.getElementById('faqClose').addEventListener('click', function () {
        document.getElementById('faq').classList.remove('active');
        document.getElementById('faqBtn').style.display = 'block';
    });

    document.addEventListener('mouseup', function (event) {
        let faq = document.getElementById('faq');
        if (!faq.contains(event.target)) {
            faq.classList.remove('active');
            document.getElementById('faqBtn').style.display = 'block';
        }
    });

    document.querySelectorAll('.js-faq-header').forEach(function (header) {
        header.addEventListener('click', function () {
            document
                .querySelectorAll('.js-faq-header')
                .forEach(function (otherHeader) {
                    if (otherHeader !== header) {
                        otherHeader.classList.remove('active');
                    }
                });
            document.querySelectorAll('.js-faq-body').forEach(function (body) {
                if (body !== header.nextElementSibling) {
                    body.style.maxHeight = null;
                    body.style.overflow = 'hidden';
                    body.style.transition = 'max-height 0.3s ease-out';
                }
            });
            header.classList.toggle('active');
            let body = header.nextElementSibling;
            if (body.style.maxHeight) {
                body.style.maxHeight = null;
            } else {
                body.style.maxHeight = body.scrollHeight + 'px';
            }
        });
    });

    let scrollToTopBtn = document.querySelector('.scrollToTopBtn');
    let docElement = document.documentElement;

    scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    document.addEventListener('scroll', function () {
        let scrollHeight = docElement.scrollHeight - docElement.clientHeight;
        let scrolled = docElement.scrollTop;

        if (scrolled / scrollHeight > 0.45) {
            // Коли користувач ближче до низу
            scrollToTopBtn.classList.add('showBtn');
        } else {
            scrollToTopBtn.classList.remove('showBtn');
        }
    });
});
