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
    } else {
        navMenu.classList.add('dropdowning');
    }
});
