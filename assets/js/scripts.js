// Number Counter
const counters = document.querySelectorAll('.project__number');

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            const datafrom = counter.getAttribute('data-from');
            const datato = counter.getAttribute('data-to');
            let current = Number(datafrom)
            let step = Number(datato)/10
            
            const updateNumber = setInterval(() => {
                if (current < datato) {
                    current += step;
                    counter.innerText = current;
                } else {
                    clearInterval(updateNumber);
                }
            }, 80);
        }
    });
});

counters.forEach(counter => {
    observer.observe(counter);
});

// Get Width
const getItemWidth = (sliderList) => {
    const item = sliderList.querySelector('li');
    const itemStyle = getComputedStyle(item);
    const itemWidth = item.offsetWidth;
    const marginLeft = parseFloat(itemStyle.marginLeft);
    const marginRight = parseFloat(itemStyle.marginRight);
    return itemWidth + marginLeft + marginRight;
};
// Slider function
function updateSliderFunction(setup) {
    const sliderList = document.querySelector(setup.sliderList);

    const updateSlider = () => {
        setup.isSliding = true;
        setup.translateX = -setup.currentIndex * setup.itemWidth
        sliderList.style.transition = 'transform 0.5s ease';
        sliderList.style.transform = `translate3d(${setup.translateX}px, 0px, 0px)`;
        setTimeout(() => {
            sliderList.style.transition = 'none';
            if (setup.currentIndex >= setup.totalItems - setup.showItems) {
                setup.currentIndex = setup.showItems;
                setup.translateX = -setup.currentIndex * setup.itemWidth;
                sliderList.style.transform = `translate3d(${setup.translateX}px, 0px, 0px)`;
            } else if (setup.currentIndex <= 0) {
                setup.currentIndex = setup.totalItems - setup.showItems*2;
                setup.translateX = -setup.currentIndex * setup.itemWidth;
                sliderList.style.transform = `translate3d(${setup.translateX}px, 0px, 0px)`;
                
            }
            setup.isSliding = false;
        }, 450);
    };

    updateSlider();

    const autoSlide = setInterval(() => {
        if (!setup.isSliding) {
            setup.currentIndex++;
            console.log(`${setup.itemWidth}`)
            updateSlider();
        }
    }, 3000);
    
    document.querySelector(`${setup.sliderofButton}.angle-next`).addEventListener('click', () => {
        if (!setup.isSliding) {
            setup.currentIndex++;
            updateSlider();
        }
    });
    
    document.querySelector(`${setup.sliderofButton}.angle-prev`).addEventListener('click', () => {
        if (!setup.isSliding) {
            setup.currentIndex--;
            updateSlider();
        }
    });

    window.addEventListener('resize', () => {
        setup.itemWidth = getItemWidth(sliderList); 
        updateSlider();
    });
}
// Project Slider Set Up
const setupProject = {
    sliderList: '.project__carousel-list',
    totalItems: 5,
    itemWidth: getItemWidth(document.querySelector('.project__carousel-list')),
    showItems: 1,
    currentIndex: 1,
    translateX: 0,
    isSliding: false,
    sliderofButton: '.project__angle'
}
updateSliderFunction(setupProject)

// Culture event Slider Set Up
const setupCuleve = {
    sliderList: '.culture-event__news-list',
    totalItems: 12,
    itemWidth: getItemWidth(document.querySelector('.culture-event__news-list')),
    showItems: 3,
    currentIndex: 4,
    translateX: 0,
    isSliding: false,
    sliderofButton: '.culture-event__angle'
}
updateSliderFunction(setupCuleve) 

// Dropdown button click
const dropdownButton = document.querySelector('.header__dropdown-button');
const navMenu = document.querySelector('.header__nav--mobile');

dropdownButton.addEventListener('click', () => {
    if (navMenu.classList.contains('dropdowning')) {
        navMenu.classList.remove('dropdowning');
        dropdownButton.querySelector('.fa-bars').classList.add('active');
        dropdownButton.querySelector('.fa-x').classList.remove('active');
    } else {
        navMenu.classList.add('dropdowning');
        dropdownButton.querySelector('.fa-bars').classList.remove('active');
        dropdownButton.querySelector('.fa-x').classList.add('active');
    }
});

// Vn-En translator
const translator = {
    'vi': {
        '.header__nav-item a': [
            'Trang chủ', 'Về chúng tôi', 'Dự Án', 'Cơ hội nghề nghiệp', 'Môi trường làm việc', 'Tin tức',
            'Trang chủ', 'Về chúng tôi', 'Dự Án', 'Cơ hội nghề nghiệp', 'Môi trường làm việc', 'Tin tức'
        ],
        '.business__heading': 'Lĩnh vực kinh doanh',
        '.business__intro-description': `Là một Digital Creative Studio, Sun* luôn đề cao tinh thần làm chủ sản phẩm, 
                    tư duy sáng tạo trong mỗi dự án để mang đến những trải nghiệm "<strong>Awesome</strong>
                    " nhất cho end-user.
                    <br> <p></p>
                    Với hai dòng dịch vụ là "<strong>Creative & Engineering</strong>" và "<strong>Talent Platform</strong>
                    ", Sun* đã và đang từng bước cùng công nghệ tạo ra những giá trị tốt đẹp cho xã hội.`,     
        '.business__service-description': [
            'Đội ngũ nhân lực dồi dào chuyên về công nghệ, thiết kế và kinh doanh.',
            'Các giải pháp nguồn nhân lực hỗ trợ tăng trưởng kinh doanh bền vững.', 
        ],
        '.business__service-btn': 'Tìm hiểu thêm',
        '.project__heading': 'Dự án của chúng tôi',
        '.project__title': ['Đối tác', 'Dịch vụ được hỗ trợ'],
        '.project__btn-link': 'Xem tất cả về dự án',
        '.project__carousel-sub-title': ['Công ty TNHH SSK', 'Công ty TNHH ZENKIGEN', 'Kurashicom Inc', 'Công ty TNHH SSK', 'Công ty TNHH ZENKIGEN'],
        '.project__carousel-title': ['Dự án SSK', 'Dự án HARUTAKA', 'Dự án KURASHICOM', 'Dự án SSK', 'Dự án HARUTAKA'],
        '.project__carousel-description': [
            'Thử thách để tiếp thêm năng lượng cho mọi người và xã hội với sports data.', 
            '“HARUTAKA” cho phép các công ty và người tìm việc có thể phỏng vấn trên web hoặc trong video bất kể thời gian hay địa điểm nào.',
            'Phát triển App giúp hiện thực hóa phong cách sống theo ý muốn',
            'Thử thách để tiếp thêm năng lượng cho mọi người và xã hội với sports data.', 
            '“HARUTAKA” cho phép các công ty và người tìm việc có thể phỏng vấn trên web hoặc trong video bất kể thời gian hay địa điểm nào.',
        ],
        '.project__carousel-btn': 'Xem chi tiết',
        '.career__title': 'Cơ hội nghề nghiệp',
        '.career__description': `Sun* luôn tìm kiếm những con người đam mê thử thách để tạo nên những giá trị "Awesome".
                    <br>  Cùng trở thành một phần của Sun* ngay hôm nay.`,
        '.career__btn-link': 'Gia nhập đội ngũ Sun* ',
        '.work-env__heading': 'Môi trường làm việc',
        '.work-env__content': [
            '#ActiveChallenge: Chủ động tạo ra công việc thử thách liên tục cho bản thân.',
            '#ActiveLearn: Học tập trong một tổ chức có đầy đủ các thành tố: môi trường học tập, cơ hội học tập, năng lực học tập.',
            '#ActiveJoy: Sống trong môi trường văn hóa hướng tới giá trị nhân văn, và hạnh phúc cho mọi người.'
        ],
        '.work-env__btn': 'Xem chi tiết',
        '.culture-event__heading': 'Văn hóa - Sự kiện',
        '.culture-event__details': 'Xem chi tiết',
        '.culture-event__label span': 'Tin nóng',
        '.culture-event__btn .large-btn': 'Xem nhiều tin hơn',
        '.footer__heading': [
            'Chúng tôi là ai?',
            'Chúng tôi làm gì?',
            'Cập nhật tin tức',
            'Cập nhật tin tức',
            'Liên hệ',
            'Văn phòng',
            'Văn phòng',

        ],
        '.footer__item a': [
            'Tầm nhìn, sứ mệnh',
            'Giá trị cốt lõi',
            'Ý nghĩa tên Sun*',
            'Creative & Engineering',
            'Talent Platform',
            'Dự án của chúng tôi',
            'Văn hóa - Sự kiện',
            'Tuyển dụng',
            'Chính sách phúc lợi',
            'Văn hóa - Sự kiện',
            'Tuyển dụng',
            'Chính sách phúc lợi',
            'SĐT: 84-24-3795-5417',
            'Email: hr@sun-asterisk.com',
        ],
        '.footer__item p': [
            'T13, Keangnam Hanoi Landmark Tower, khu E6, khu ĐTM Cầu Giấy, phường Mễ Trì, quận Nam Từ Liêm, Hà Nội',
            'Tầng 4, tòa FHome Building, số 16 Lý Thường Kiệt, quận Hải Châu, Tp. Đà Nẵng',
            `Tầng 9, L'Mak Long Tower, số 101-103 Nguyễn Cửu Vân, Phường 17, Quận Bình Thạnh, Thành phố Hồ Chí Minh.`,
            'Văn phòng Tokyo - Văn phòng Cebu - Văn phòng Phnom Penh',
            'T13, Keangnam Hanoi Landmark Tower, khu E6, khu ĐTM Cầu Giấy, phường Mễ Trì, quận Nam Từ Liêm, Hà Nội',
            'Tầng 4, tòa FHome Building, số 16 Lý Thường Kiệt, quận Hải Châu, Tp. Đà Nẵng',
            `Tầng 9, L'Mak Long Tower, số 101-103 Nguyễn Cửu Vân, Phường 17, Quận Bình Thạnh, Thành phố Hồ Chí Minh.`,
            'Văn phòng Tokyo - Văn phòng Cebu - Văn phòng Phnom Penh',
            '@ 2021 Sun-asterisk. All rights reserved.',
            'Giấy chứng nhận ĐKDN: 0106045931 do Sở KHĐT TP Hà Nội cấp lần đầu ngày 29/10/2012',
            'Giấy phép hoạt động DVVL: 03/2022 do Sở LĐTBXH TP Hà Nội cấp lần đầu ngày 10/01/2022',
            'Người đại diện theo pháp luật: KOBAYASHI TAIHEI - Tổng giám đốc',
        ],
    },
    'en-US': {
        '.header__nav-item a': [
            'Home', 'About Us', 'Projects', 'Career', 'Environment', 'News',
            'Home', 'About Us', 'Projects', 'Career', 'Environment', 'News'
        ],
        '.business__heading': 'Our Business',
        '.business__intro-description': `As a Digital Creative Studio, Sun* always prioritize the spirit of owning the products, 
                    thinking creatively in any project to bring the most "<strong>Awesome</strong>
                    " experience to end-users.
                    <br> <p></p>
                    With two service lines namely "<strong>Creative & Engineering</strong>" and "<strong>Talent Platform</strong>
                    ", Sun* has always been step by step with technology creating great value for society.`,     
        '.business__service-description': [
            'Abundant human resource specializing in technology, design and business.',
            'Human resource solutions to support sustainable business growth.', 
        ],
        '.business__service-btn': 'See more',
        '.project__heading': 'Our Project',
        '.project__title': ['Clients', 'Supported Services'],
        '.project__btn-link': 'See all projects',
        '.project__carousel-sub-title': ['SSK Company Limited', 'ZENKIGEN Company Limited', 'Kurashicom Inc', 'SSK Company Limited', 'ZENKIGEN Company Limited'],
        '.project__carousel-title': ['SSK Project', 'HARUTAKA Project', 'KURASHICOM Project', 'SSK Project', 'HARUTAKA Project'],
        '.project__carousel-description': [
            'Challenge to energize people and society with sports data.', 
            '“HARUTAKA” allows companies and job seekers/ applicants to interview on the web or in video at any time, in any place.',
            'App development helps to realize the lifestyle that you want',
            'Challenge to energize people and society with sports data.', 
            '“HARUTAKA” allows companies and job seekers/ applicants to interview on the web or in video at any time, in any place.'
        ],
        '.project__carousel-btn': 'View Detail',
        '.career__title': 'Career',
        '.career__description': `Sun* has always been looking for challenge-driven people to create "awesome" values.`,
        '.career__btn-link': 'Join Sun*',
        '.work-env__heading': 'Working environment',
        '.work-env__content': [
            '#ActiveChallenge: Actively create continuous challenges.',
            '#ActiveLearn: Learning within an organization encompasses all essential components, including the Learning Environment, Learning Opportunities, and Learning Capacity.',
            '#ActiveJoy: Thriving in a cultural environment focused on human values and universal happiness.'
        ],
        '.work-env__btn': 'View Detail',
        '.culture-event__heading': 'Culture - Event',
        '.culture-event__details': 'See more',
        '.culture-event__label span': 'Hot news',
        '.culture-event__btn .large-btn': 'See more',
        '.footer__heading': [
            'Who are we?',
            'What do we do?',
            'Updated News',
            'Updated News',
            'Contact',
            'Office',
            'Office',

        ],
        '.footer__item a': [
            'Vision, mission',
            'Core values',
            'The meaning of the name Sun*',
            'Creative & Engineering',
            'Talent Platform',
            'Our projects',
            'Culture - Events',
            'Recruitment',
            'Benefits and perks',
            'Culture - Events',
            'Recruitment',
            'Benefits and perks',
            'Phone: 84-24-3795-5417',
            'Email: hr@sun-asterisk.com',
        ],
        '.footer__item p': [
            'T13, Keangnam Hanoi Landmark Tower, Pham Hung, Nam Tu Liem, Hanoi',
            '4F, FHome Building, 16 Ly Thuong Kiet Str., Hai Chau district, Da Nang',
            `9th Floor, L'Mak Long Tower, 101-103 Nguyen Cuu Van, Ward 17, Binh Thanh District, Ho Chi Minh City`,
            'Tokyo Office - Cebu Office - Phnom Penh Office',
            'T13, Keangnam Hanoi Landmark Tower, Pham Hung, Nam Tu Liem, Hanoi',
            '4F, FHome Building, 16 Ly Thuong Kiet Str., Hai Chau district, Da Nang',
            `9th Floor, L'Mak Long Tower, 101-103 Nguyen Cuu Van, Ward 17, Binh Thanh District, Ho Chi Minh City`,
            'Tokyo Office - Cebu Office - Phnom Penh Office',
            '@ 2021 Sun-asterisk. All rights reserved.',
            '',
            '',
            '',
        ],
    }
}
// Change Language Funtion
function changeLanguage(language) {
    const translations = translator[language];

    for (let selector in translations) {
        const elements = document.querySelectorAll(selector);
        const content = translations[selector];

        if (Array.isArray(content)) {
            elements.forEach((element, index) => {
                element.innerHTML = content[index];
            });
        } else {
            elements.forEach(element => {
                element.innerHTML = content;
            });
        }
    }
}

const langButtons = document.querySelectorAll('.header__language-item');
langButtons.forEach(button => {
    button.addEventListener('click', () => {
        
        langButtons.forEach(btn => {
            btn.classList.remove('header__language-item--selected');
        });
        
        button.classList.add('header__language-item--selected');

        const lang = button.querySelector('a').getAttribute('lang');

        changeLanguage(lang);
    });
});
