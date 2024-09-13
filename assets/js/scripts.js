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

// Slider function
function updateSliderFunction(setup) {
    const sliderList = document.querySelector(setup.sliderList)
    const updateSlider = () => {
        setup.isSliding = true;
        setup.translateX = -setup.currentIndex * setup.itemWidth
        sliderList.style.transition = 'transform 0.5s';
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

    const autoSlide = setInterval(() => {
        if (!setup.isSliding) {
            setup.currentIndex++;
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
}
// Project Slider Set Up
const setupProject = {
    sliderList: '.project__carousel-list',
    itemWidth: 300,
    totalItems: 5,
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
    itemWidth: 388,
    totalItems: 12,
    showItems: 3,
    currentIndex: 4,
    translateX: 0,
    isSliding: false,
    sliderofButton: '.culture-event__angle'
}
updateSliderFunction(setupCuleve)
