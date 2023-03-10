'use strict';
document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('a[href^="#"').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            let href = this.getAttribute('href').substring(1);
            const scrollTarget = document.getElementById(href);
            const topOffset = document.querySelector('.scrollto').offsetHeight;
            const elementPosition = scrollTarget.getBoundingClientRect().top;
            const offsetPosition = elementPosition - topOffset;
            window.scrollBy({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });
    const btnUp = {
        el: document.querySelector('.btn-up'),
        show() {
          this.el.classList.remove('btn-up_hide');
        },
        hide() {
          this.el.classList.add('btn-up_hide');
        },
        addEventListener() {
          window.addEventListener('scroll', () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            scrollY > 400 ? this.show() : this.hide();
          });
          document.querySelector('.btn-up').onclick = () => {
            window.scrollTo({
              top: 0,
              left: 0,
              behavior: 'smooth'
            });
          }
        }
      }
    btnUp.addEventListener();
    const getResource = async (url) => {
        const result = await fetch(url);
        if (!result.ok) {
            throw new Error(`could not fetch ${url}, status: ${result.status}`);
        }
        return await result.json();
    };

    let vacancyArr = [];

    class EmployerCard {
        constructor(id, category, jobTitle, employer, salary, tags, link, feed) {
            this.id = id;
            this.category = category;
            this.jobTitle = jobTitle;
            this.employer = employer;
            this.salary = salary;
            this.tags = [...tags];
            this.link = link;
            this.feed = feed;
        }

        renderCards() {
            const element = document.createElement('div')
            element.classList.add('card', `card${this.id}`)
            element.style.background = `white`
            element.innerHTML = `
                <div class="card__title">${this.employer}</div>
                <div class="card__employer">${this.jobTitle}</div>
                <div class="card__salary">${this.salary}</div>
                <div class="card__tags">${this.tags.join('<br>')}</div>
                <div class="card__buttons">
                    <button class="moreInfoBtn">??????????????????</button>
                    <button class="feed" data-id=${this.id}>??????????????????</button>
                </div>
            `
            document.querySelector(`#${this.category}Cards`).append(element)
        }

        openModal(id) {
            let vacancyInfo = vacancyArr.filter(item => item.id == id)[0]
            const element = document.createElement('div');
            element.classList.add('form', 'animate__animated', 'animate__fadeIn');
            element.innerHTML = `
                <i class="fa-solid fa-square-xmark" id="modal__close"></i>

                <div class="form__img">
                    <img src="./img/formImgGroup.svg" alt="">
                </div>
                <form class="form__items" enctype="multipart/form-data" method="post" id="form">
                    <div class="titles">
                        <h2>???????????????????????? ???? ????????????????</h2>
                        <h3>${vacancyInfo.employer.replace(/['"????]/g, ' ')}, ${vacancyInfo.jobTitle}</h3>
                    </div>
                    <input class="hiddenInputs" name="jobTitle" type="text" value='${vacancyInfo.jobTitle}' required>
                    <input class="hiddenInputs" name="employer" type="text" value='${vacancyInfo.employer.replace(/['"????]/g, ' ')}' required>
                    <input class="FIOInput" name="surnameName" type="text" placeholder="?????????????? ???????? ??????" required>
                    <div class="addFile__wrapper">
                        <label for="resumeFile"><i class="fa-solid fa-arrow-up-from-bracket"></i></label>
                        <div class="addFile__text">???????????????????? ???????? ?? ?????????? ???????????? <span style="font-weight: bold">?? ?????????????? .PDF</span>
                            <div class="uploadFileName">???????????????? ????????</div>
                            <div class="invalidFileSize">???????????? ???????????????????????????? ?????????? ???? ???????????? ???????? ???????????? 15mb</div>
                            <div class="invalidFileType">???????????????????? ???????? ???? ?? ?????????????? PDF</div>
                        </div>
                        <input class="resume" name="resumeFile[]" type="file" id="resumeFile" required accept="application/pdf"/>
                    </div>
                    <button type="submit" id="sendForm">??????????????????</button>
                    <div class="noResume">
                        ?????? ???? ???????????????? ????????????? 
                        <a class="moreInfoBtn" href='https://vk.com/market-216548247_7541645' target="_blank"><span style="font-weight: bold">?????????????????????? ?? ?????? ???? ????????????????????????</span></a>
                        <br>
                        ?? ???? ?????????????? ???????? ?????????? ???????????????????????? ????????!
                    </div>
                    <div id="loader-identity" class='animate__animated animate__fadeIn'><div id="spinner"><img src="img/loading.png" alt="????????????????..."></div></div>
                </form>
            `
            document.querySelector('.main-overlay').append(element);
            document.querySelector('.form').style.left = '50%'

            const resume = document.querySelector('#resumeFile'),
                  uploadFileName = document.querySelector('.uploadFileName'),
                  invalidFileSizeMessage = document.querySelector('.invalidFileSize'),
                  invalidFileTypeMessage = document.querySelector('.invalidFileType');

            function validateSize(input) {
                const fileSize = input.files[0].size / 1024 / 1024,
                    fileType = input.files[0].type.split('/')[1].toLowerCase();

                if (fileSize > 15 && fileType !== 'pdf') {
                    document.querySelector('#sendForm').disabled = true;
                    invalidFileTypeMessage.style.display = 'block'
                    invalidFileSizeMessage.style.display = 'block'
                } else if (fileSize > 15 && fileType === 'pdf') {
                    document.querySelector('#sendForm').disabled = true;
                    invalidFileTypeMessage.style.display = 'none'
                    invalidFileSizeMessage.style.display = 'block'
                } else if (fileSize <= 15 && fileType !== 'pdf') {
                    document.querySelector('#sendForm').disabled = true;
                    invalidFileSizeMessage.style.display = 'none'
                    invalidFileTypeMessage.style.display = 'block'
                } else {
                    document.querySelector('#sendForm').disabled = false;
                    invalidFileSizeMessage.style.display = 'none'
                    invalidFileTypeMessage.style.display = 'none'
                }
            }

            resume.addEventListener('change', () => {
                uploadFileName.textContent = resume.files[0].name
                console.log(resume.files[0])
                validateSize(resume)
            })

            function showLoaderIdentity() 
            {
                $("#loader-identity").show() 
            }
            
            function hideLoaderIdentity() 
            {
            $("#loader-identity").hide();  
            }

            $('.form__items').on('submit', function(e){
                showLoaderIdentity()
                e.preventDefault()
                var form = $(this);
                var data = new FormData();

                form.find(':input[name]').not('[type="file"]').each(function() { 
                    var field = $(this);
                    data.append(field.attr('name'), field.val());
                })

                var filesField = form.find('input[type="file"]');
                var fileName = filesField.attr('name');
                var file = filesField.prop('files')[0];
                data.append(fileName, file) ;

                var url = 'send.php';

                $.ajax({
                    url: url,
                    type: 'POST',
                    data: data,
                    contentType: false,
                    cache: false, 
                    processData:false
                }).done(function() {
                    const overlay = document.querySelector('.main-overlay')
                    alert('???????????? ?????????????? ????????????????????, ?? ???????? ??????????????????')
                    overlay.classList.replace('visible', 'hidden')
                    document.body.style.overflow = '';
                    document.querySelector('.form').remove()
                    hideLoaderIdentity()
                }).fail(function() {
                    hideLoaderIdentity()
                    alert('???????????????? ???? ??????????????, ???????????????????? ?????? ??????')
                })
            })          
        }

        setListeners() {
            const card = document.querySelector(`.card${this.id}`),
                  overlay = document.querySelector('.main-overlay');
            overlay.addEventListener('click', (e) => {
                if (e.target.id === 'modal__close') {
                    overlay.classList.replace('visible', 'hidden')
                    document.body.style.overflow = '';
                    e.target.parentNode.remove()
                }
            });
            card.addEventListener('click', (e) => {
                if (e.target.classList.contains('feed')) {
                    this.openModal(e.target.dataset.id)
                    overlay.classList.replace('hidden', 'visible')
                    document.body.style.overflow = 'hidden'
                }

                if (e.target.classList.contains('moreInfoBtn')) {
                    window.open(this.link, '_blank').focus();
                }
            });
        }

        init() {
            this.renderCards();
            this.setListeners();
        }
    }

    getResource('../vacancy.json')
        .then(res => {
            res.vacancy.map(({id, category, employer, jobTitle, salary, tags, link, feed}) => {
            new EmployerCard(id, category, employer, jobTitle, salary, tags, link, feed).init()})
            vacancyArr = [...res.vacancy]
        })
        .then(() => {
            document.querySelectorAll('.vacancy__cards').forEach(item => {
                if (item.children.length === 0) {
                    const noCards = document.createElement('div');
                    noCards.classList.add('noCards');
                    noCards.innerHTML = `<div class='noCards'>?? ?????????????????? ?????????? ???????????????? ?? ???????????? ?????????????????? ????????????????????</div>`
                    item.append(noCards)
                }
            })
        });

});