// Call Components Functions
window.onload = function() {
    // Load all Components when page load
    loadComponents();
    // loader
    if (document.body.classList.contains('dash')) {
    setTimeout(function() {
        document.querySelector('.dash .loader').classList.add('ready');
        setTimeout(function() {
            document.querySelector('.loader.ready').remove();
        }, 400);
        
    }, 500);
    } else {
        document.body.classList.add('ready');
    }
}
// ******* Global Functions
/* Global Functions used in all pages */
const globalFun = (function() {
    let mainContent = document.querySelector('section.main-content'),
        header      = document.querySelector('section.header.stages');

    // Select Page Stage
    /* 
        Loop through all stages and add class Done for previous page, active class
        for Current page.
        stop the loop when stage Attribute (data-satge) Match section Attribute (data-section)  
    */
    function selectStage(section) {
        let dataSection = section.getAttribute('data-section'),
            stages      = header.querySelectorAll('.stage');

        // Check if this is the first form page 'ridetype' or not
        if (dataSection !== 'ridetype') {
            stages.forEach(function(item) {
                let dataStage = item.getAttribute('data-stage');
                // check if the stages attribute 'data-stage' match the section attribute 'data-section'
                if (dataStage === dataSection) {
                    // add class 'active' to the current stage
                    item.classList.add('active');
                    // add class 'done' to the previous stage
                    item.previousElementSibling.classList.add('done');
                }
            });
            // Loop through all Stages
            for (let i = 0; i < stages.length; i++) {
                // check if the stage contain class 'done'
                if (!stages[i].classList.contains('done')) {
                    // if not add class 'done'
                    stages[i].classList.add('done');
                } else {
                    // if the stage contain class 'done' stop
                    break;
                }
            }
        } else {
            // if this is the first form page 'ridetype' add class 'active'
            let firstStage = document.querySelector('section.header.stages .stage');
            firstStage.classList.add('active');
        }
    }

    // Call functions
    // if header 'stages' section exist .. call the function
    if (header) {
        selectStage(mainContent);
    }

}());

// ******* Components Functions

// *** Navbar Component
const navbarComponent = (function() {
    let nav           = document.querySelector('nav'),
        navList       = nav.querySelector('.lang-list'),
        navArrow      = nav.querySelector('.main-lang .arrow-icon'),
        mobBtn        = nav.querySelector('.navbar-toggler'),
        msgList       = nav.querySelector('.messages'),
        memberContainer    = nav.querySelector('.member');
    
    if (document.querySelector('section.header.stages')) {
        nav.classList.add('nav-booking');
    }

    if (memberContainer) {
        // notification button
        memberContainer.addEventListener('click', notiSlide);
        msgList .addEventListener('click', notiSlide);
        // mobile menu button
        mobBtn.addEventListener('click', mobSlide);
    } else {
        let langBtn       = nav.querySelector('.languages');
        // language button
        langBtn.addEventListener('click', callNavSlide);
        selectLang();
    }
    // navbar language slide function
    function callNavSlide(e) {
        // language button
        let listBtn       = e.target.closest('.main-lang'),
            container     = e.target.closest('.languages'),
            langItem      = navList.querySelector('.lang'),
            lang          = nav.querySelectorAll('.lang');
        // call animation function
        animationSlide(navList, lang, langItem, navArrow, listBtn, container, 'block', 5);
    }

    // notification slide function
    function notiSlide(e) {
        if ((e.target.closest('.messages') && !e.target.closest('li').classList.contains('active')) && !e.target.closest('.messages').classList.contains('dirty')) {
            e.target.closest('.messages').classList.add('dirty');
            setTimeout(function() {
                e.target.closest('li').classList.add('active');
            }, 1500);
        }
        // check if the drop list doesn't contain 'active' class and target element not exist in the drop list and target element not window
        // to get the notification button
        if (((e.target.closest('li') && !e.target.closest('li').querySelector('.dropdown-list.active')) && !e.target.closest('.dropdown-list')) && this !== window) {
            let dropDown = e.target.closest('li').querySelector('.dropdown-list'),
                activeDropDown = nav.querySelector('.dropdown-list.active');
                if (activeDropDown) {
                    activeDropDown.classList.remove('active');
                    setTimeout(function() {
                        activeDropDown.style.display = 'none';
                    }, 300);
                }
            // show the slide but the slide is invisible
            function showSlide(callback) {
                dropDown.style.display = 'block';
                callback();
            }
            // add class 'active' to the drop list the make it visible and set the animation
            function delayShowSlide() {
                setTimeout(function() {
                    dropDown.classList.add('active');
                }, 1);
            }
            showSlide(delayShowSlide);
        // if droplist contain class 'active' and the target not droplist
        } else if (nav.querySelector('.dropdown-list.active') && !e.target.closest('.dropdown-list')) {
            let dropDown = nav.querySelector('.dropdown-list.active');
            // if true remove class 'active' that hide the droplist by smooth animation
            dropDown.classList.remove('active');
            // set delay to hide the slide after droplist fade out
            setTimeout(function() {
                dropDown.style.display = 'none';
            }, 300);
        }
    }

    // Select language Function
    function selectLang() {
        let lang          = nav.querySelectorAll('.lang');
        // get all languages container
        lang.forEach(function(item) {
            // call 'changeLang()' function on click on the language container to select/change language
            item.addEventListener('click', changeLang);
            // change language function
            function changeLang() {
                let langName = item.querySelector('.lang-name'),
                    langFlag = item.querySelector('.lang-flag img'),
                    mainLang = item.closest('.languages').querySelector('.main-lang'),
                    mainName = mainLang.querySelector('.lang-name'),
                    mainFlag = mainLang.querySelector('.lang-flag img'),
                    arrLang      = [];
                // save current  language name
                arrLang.push(mainName.textContent);
                // save current flag
                arrLang.push(mainFlag.getAttribute('src'));
                // set current language name to selected language name
                mainName.textContent = langName.textContent;
                // set current flag to selected language flag
                mainFlag.setAttribute('src', langFlag.getAttribute('src'));
                // set the selected name language to the old language name
                langName.textContent = arrLang[0];
                // set the selected flag to the old flag
                langFlag.setAttribute('src', arrLang[1]);
            }
        })
    }

    // Mobile Slide menu toggler button
    function mobSlide() {
        let links = document.querySelector('nav .navbar-collapse'),
            num   = 0,
            linksHeight, animation;
        // check if the button contains class 'active'
        if (!this.classList.contains('active')) {
            // add class 'active'
            this.classList.add('active');
            // remove bottom space
            nav.classList.remove('space-bottom');
            // show links container and set height to 100%
            links.style.display = 'block';
            links.style.height = '100%';
            // get links container height
            linksHeight = links.clientHeight;
            // set links container height to 10px
            links.style.height = '10px';
            // add bottom space 'small space'
            nav.classList.add('space-bottom2');
            links.style.opacity = 1;
            // set animation function
            animation = setInterval(frame, 5);
            function frame() {
                // check if num value
                if (num <= linksHeight) {
                    links.style.height = num + 'px';
                    num += 4;
                } else {
                    links.style.height = linksHeight + 'px';
                    // stop the animation if num equal links container height
                    clearInterval(animation);
                }
            }
        } else {
            // remove class 'active' and bottom space
            this.classList.remove('active');
            nav.classList.remove('space-bottom2');
            // set num to links container height
            num = links.clientHeight;
            // set the animation function
            animation = setInterval(frame, 5);
            function frame() {
                // check num value
                if (num >= 0) {
                    links.style.height = num + 'px';
                    num -= 4;
                    if (!nav.classList.contains('space-bottom')) {
                        nav.classList.add('space-bottom');
                    }
                } else {
                    // if num equal 0 hide the links container and stop the animation
                    links.style.height = '0px';
                    links.style.opacity = 0;
                    links.style.display = 'none';
                    clearInterval(animation);
                }
            }
        }
    }
    
    // fix Navbar layout in Small Screen
    /*
        move the notification and language container outside the the parent 'navbar-collapse'
        that collapse in small screen.
        this function called on page load and when window resize.
    */
    function navFixResponsive() {
        // get window width
        let winWidth = window.innerWidth,
            navSettings = document.querySelector('nav .navbar-nav.settings'),
            navCollapse = document.querySelector('nav .navbar-collapse');
        
        if (winWidth <= 991) {
            // move notification and language outside the parent
            if (!navSettings.classList.contains('fix-responsize')) {
                // add class 'fix-responsive'
                navSettings.classList.add('fix-responsize');
                navSettings.closest('.container-fluid').insertBefore(navSettings, navSettings.parentElement);
            }
        } else {
            // check if class 'fix-responsive' exist.. if true .. inject the notification and language button to the 'navbar-collapse' in big screen
            if (navSettings.classList.contains('fix-responsize')) {
                navSettings.classList.remove('fix-responsize');
                navCollapse.insertAdjacentElement('beforeend', navSettings);
                navCollapse.style.opacity = 1;
                navCollapse.style.height = 'inherit';
            }
        }
    }

    // Call body functions
    // set click event to the body to close the notification slide and language slide when click any where on the window except the droplist and button
    document.body.addEventListener('click', function(e) {
        if (e.target.closest('.member') === null && e.target.closest('.languages') === null) {
            // language button
            if (nav.querySelector('.lang')) {
                callNavSlide(e);
            }
        }
        if (e.target.closest('.member') === null && e.target.closest('.languages') === null) {  
            // notification slide
            if (document.querySelector('.notifications-list')) {
                notiSlide(e);
            }
        }
    });
        
    // Events
    // on resize window
    window.addEventListener('resize', navFixResponsive);

    // Call Functions
    navFixResponsive();

}());

// *** SideMenu Component
const sideMenuComponent = function(section) {
    let nav       = document.querySelector('nav'),
        header    = document.querySelector('section.header'),
        sideMenu  = section.querySelector('.right-content'),
        navHeight, winHeight, contentHeight, num;
        
    // center the side menu based on window height
    function centerMenu() {
        navHeight = nav.offsetHeight;
        winHeight = window.innerHeight;
        contentHeight = winHeight - (navHeight + header.offsetHeight);
        // check window width
        if (window.innerWidth > 1205) {
            // check window height
            // change the layout .. decrease the space bettween elements.. padding and margin
            if (winHeight > 710) {
                num = (contentHeight * 0.5) - (sideMenu.offsetHeight * 0.3);
                sideMenu.querySelector('.data-container').style.marginBottom = '30px';
                sideMenu.querySelector('.title').style.marginBottom = '15px';
                sideMenu.querySelector('.title').style.paddingTop = '20px';
                sideMenu.querySelector('.title').style.paddingBottom = '20px';
            } else if (winHeight <= 710 && winHeight > 600) {
                num = (contentHeight * 0.5) - (sideMenu.offsetHeight * 0.2); 
            } else if (winHeight <= 600 && winHeight >= 566) {
                sideMenu.querySelector('.data-container').style.marginBottom = '13px';
                sideMenu.querySelector('.title').style.marginBottom = '5px';
                sideMenu.querySelector('.title').style.paddingTop = '5px';
                sideMenu.querySelector('.title').style.paddingBottom = '5px';
                num = (contentHeight * 0.5) - (sideMenu.offsetHeight * 0.15);
            }  else {
                num = 0;
                sideMenu.style.position = 'static';
                sideMenu.querySelector('.data-container').style.marginBottom = '20px';
                sideMenu.querySelector('.title').style.marginBottom = '15px';
                sideMenu.querySelector('.title').style.paddingTop = '15px';
                sideMenu.querySelector('.title').style.paddingBottom = '15px';
            }
            if (num < 161) {
                num = 161.4;
            }
            sideMenu.style.top = num + 'px';
        } else {
            // set side menu to static position
            sideMenu.style.position = 'static';
            sideMenu.style.zIndex = 0;
        }
    }

    // Events
    // call the function on window resize
    window.addEventListener('resize', centerMenu);

    // Call functions
    centerMenu();
}


// *** Pickup Component
const pickupComponent = function(section) {
    let pickupTime     = section.querySelector('.pickup-time-group'),
        pickupDate     = section.querySelector('.pickup-date-group'),
        otherPickup    = section.querySelector('.left-content .category.other-pickup'),
        trainCategory  = section.querySelector('.train-category'),
        category       = section.querySelectorAll('.left-content .category'),
        addressBook    = section.querySelectorAll('.address-book'),
        clearBtnAddres = section.querySelectorAll('.close-icon'),
        flightNum      = section.querySelectorAll('.row-group.flight-num input'),
        airport        = section.querySelectorAll('.airport'),
        jets           = section.querySelectorAll('.jets'),
        boat           = section.querySelectorAll('.boat'),
        tailNum        = section.querySelectorAll('.row-group.tail-num input'),
        boatName       = section.querySelectorAll('.row-group.boat-name input'),
        cancelAdBo, adBoText, selectAdBo;

    // Select other location (address location)
    /*
        A shared function used in this component at different input fields
        ariport (Flight number input)
        jet (Tail number input)
        passenger terminal (Boat name input)
        train station (Station name input, Train Number input)
        other (address input)
    */
    function selectOtherPickup(input, name, categoryClassName, self) {
        let bodyContent = self.closest('.form-content').querySelector('.body-content');

        if (!bodyContent.classList.contains(name)) {
            input.forEach(function(item) {
                item.value = '';
            })
            bodyContent.classList.add(name);
            formValidationOnInput(section);
        } else {
            input.forEach(function(item) {
                formValidation(section, item, false);
            })
            formValidationOnInput(section);
        }
    }

    // Create Input Icons
    function createInputIcon() {
        let img = document.createElement('img');
        img.className = 'addicon img-fluid';
        if (!pickupDate.querySelector('.addicon')) {
            img.setAttribute('src', pickupDate.querySelector('.icon img').getAttribute('src'))
            let copy = img.cloneNode(true);
            pickupDate.insertAdjacentElement('beforeend', copy);
        }
        if (!pickupTime.querySelector('.addicon')) {
            img.setAttribute('src', pickupTime.querySelector('.icon img').getAttribute('src'))
            pickupTime.appendChild(img);
        }
        category.forEach(function(item) {
            item.addEventListener('click', function() {
                if (!section.classList.contains('destination')) {
                    selectCategory(section, item, category, true);
                }
            });
        });
    }

    // Pickup Time Input Format
    function pickUpTimeFun() {
        let reg = new RegExp('^\\d+$'),
            reg2 = new RegExp('^([0-9]){2}\:\\d+$'),
            inputValue = this.value;
        if (reg.test(inputValue)) {
            if (this.value.length === 2) {
                this.value = this.value + ':';
            }
        } else {
            if (reg2.test(inputValue)) {
                if (this.value.length === 5) {
                    this.setAttribute('maxlength', '5');
                }
            } else {
                this.value = '';
            }
        }
    }

    // Date picker Style Function
    function DatePickerFun() {
        // Date picker options
        $("#pickup-date").datepicker({
            numberOfMonths: [ 1, 2],
            firstDay: 1,
            stepMonths: 2
        });

        let UIdatePicker    = document.getElementById('ui-datepicker-div'),
            pickupDateInput = document.getElementById('pickup-date');
        let observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutationRecord) {
                if (pickupDateInput.value !== '') {
                    formValidation(section, pickupDateInput, false);
                    pickupDateInput.classList.add('complete-input');
                    formValidationOnInput(section);
                }
            })
        })
        observer.observe(UIdatePicker, {attributes: true, attributeFilter: ['style']});
    }

    // Events
    if (otherPickup) {
        otherPickup.addEventListener('click', function() {
            let address = section.querySelectorAll('.address-group input');
            selectOtherPickup(address, 'other', 'other-pickup', this);
        });
    }

    if (trainCategory) {
        trainCategory.addEventListener('click', function() {
            let trainInput = section.querySelectorAll('.tarin-vehicle input');
            selectOtherPickup(trainInput, 'train', 'train-category', this);
            formValidationOnInput(section);
        })
    }
    airport.forEach(function(item) {
        item.addEventListener('click', function() {
            selectOtherPickup(flightNum, 'flightnum', 'airport', this);
        })
    })
    jets.forEach(function(item) {
        item.addEventListener('click', function() {
            selectOtherPickup(tailNum, 'tailnum', 'jets', this);
        });
    })
    boat.forEach(function(item) {
        item.addEventListener('click', function() {
            selectOtherPickup(boatName, 'boatname', 'boat', this);
        });
    })
    
    addressBook.forEach(function(item) {
        cancelAdBo  = item.querySelector('.address-cancel');
        adBoText    = item.querySelectorAll('.address-content');
        selectAdBo  = item.querySelector('.address-select');
        item.addEventListener('click', selectAddressBook);
        cancelAdBo.addEventListener('click', addressBookCancelBtn);
        adBoText.forEach(function(item2) {
            item2.addEventListener('click', addressBooktextCheck);
        });
        selectAdBo.addEventListener('click', function() {
            addressBookSelectBtn(section, this);
        });
    })

    if (pickupTime) {
        pickupTime.querySelector('input').addEventListener('input', pickUpTimeFun);
    }
    
    clearBtnAddres.forEach(function(item) {
        item.addEventListener('click', function() {
            clearBtnFun(section, this)
        });
    })

    // Call Functions
    if (pickupDate) {
        createInputIcon();
        DatePickerFun();
    }
    formValidationOnInput(section);
}


// *** destination Component
const destinationComponent = function(section) {
    let category       = section.querySelectorAll('.left-content .category'),
        cancelAdBo     = section.querySelector('.address-book .address-cancel'),
        adBoText       = section.querySelectorAll('.address-book .address-content'),
        changeDrop     = section.querySelector('.addbook-title-option'),
        addBDropOfBack = section.querySelectorAll('.addbook-title-back'),
        otherBtn       = section.querySelector('.other-btn button'),
        otherBtn2      = section.querySelector('.other-btn2 button'),
        selectAdBo     = section.querySelector('.address-select'),
        clearBtnAddres = section.querySelector('.close-icon'),
        durationBox    = section.querySelector('.duration-group .inner-group'),
        durationData   = section.querySelectorAll('.duration-group .data-droplist');

    // Change DropOff address function
    function changeDropOffFun() {
        let form        = this.closest('.form-content'),
            bodyContent = form.querySelector('.body-content'),
            container   = this.parentElement, 
            category, bookBtn, activeCate;

        if (this.closest('.heading-content')) {
            category = this.closest('.heading-content');
            activeCate = category.querySelector('.category.active');
        } else {
            if (this.closest('.address2')) {
                category = form.querySelector('.other-btn2').closest('.heading-content');
            } else {
                category = form.querySelector('.heading-content');
            }
        }

        if (container.classList.contains('other-btn2')) {
            bookBtn = bodyContent.querySelector('.address2 .address-book');
        } else {
            bookBtn = bodyContent.querySelector('.address-book');
        }

        if (this.classList.contains('addbook-title-option') || container.classList.contains('other-btn') || container.classList.contains('other-btn2')) {
            if (activeCate) {
                activeCate.classList.remove('active')
            }
            category.style.display = 'none';
            if (container.classList.contains('other-btn2')) {
                bodyContent.classList.add('other2');
            } else {
                bodyContent.classList.add('other');
            }
            bookBtn.querySelector('.addbook-title').style.display = 'block';
            bookBtn.querySelector('.addbook-title-back').style.display = 'block';
            bookBtn.querySelector('.addbook-title-option').style.display = 'none';
            if (section.classList.contains('pickup-departure')) {
                category.querySelector('.category').setAttribute('data-page', 'dropoff-departureother');
            }
        } else if (this.classList.contains('addbook-title-back')) {
            if (this.closest('.address2')) {
                bodyContent.classList.remove('other2');
                bodyContent.querySelector('.address2 input').classList.remove('complete-input');
                bodyContent.querySelector('.address2 input').value = '';
            } else {
                bodyContent.classList.remove('other');
                bodyContent.querySelector('.address-group input').classList.remove('complete-input');
                bodyContent.querySelector('.address-group input').value = '';
            }
            category.style.display = 'block';
            container.querySelector('.addbook-title').style.display = 'none';
            container.querySelector('.addbook-title-option').style.display = 'block';
            this.style.display = 'none';
            if (section.classList.contains('pickup-departure')) {
                category.querySelector('.category').setAttribute('data-page', 'dropoff-departure');
            }
        }
        formValidationOnInput(section);
    }

    category.forEach(function(item) {
        item.addEventListener('click', function() {
            categoryFun(section, item);
            formValidationOnInput(section);
        });
    });

    if (durationBox) {
        durationBox.addEventListener('click', function(e) {
            if (e.target.classList.contains('duration-input') || e.target.classList.contains('inner-group')) {
                callSelectBoxSlide(this);
            }
        });
        durationBox.querySelectorAll('.data-droplist').forEach(function(item) {
            item.addEventListener('click', function() {
                selectDataSelectBox(section, this);
            })
        })
    }


    // Events
    changeDrop.addEventListener('click', changeDropOffFun);
    otherBtn.addEventListener('click', changeDropOffFun);
    cancelAdBo.addEventListener('click', addressBookCancelBtn);
    selectAdBo.addEventListener('click', function() {
        addressBookSelectBtn(section, this);
    });

    if (section.classList.contains('pick-drop-tour')) {
        otherBtn2.addEventListener('click', changeDropOffFun);
    }

    addBDropOfBack.forEach(function(item) {
        item.addEventListener('click', changeDropOffFun);
    })

    clearBtnAddres.addEventListener('click', function() {
        clearBtnFun(section, this)
    });
    adBoText.forEach(function(item) {
        item.addEventListener('click', addressBooktextCheck);
    })
    section.querySelector('.address-book').addEventListener('click', selectAddressBook);
    selectAdBo.addEventListener('click', function() {
        this.closest('.address-book').classList.remove('active');
        formValidationOnInput(section);
    });
    selectDataSelectBox(section, null);
}


// *** Customer Component
const customerComponent = function(section) {
    let bodyContent    = section.querySelector('.body-content'),
        addPassenger   = section.querySelector('.add-customer'),
        addPhoneNumber = section.querySelector('.add-phone');

    // Add passenger row function
    function copyCustomerInputs(e) {
        let copy      = this.parentElement.cloneNode(true, true),
            container = this.parentElement.parentElement;
        copy.classList.add('copy-row');
        copy.querySelector('.form-option').classList.remove('add-customer');
        copy.querySelector('.form-option').classList.remove('add-phone');
        copy.querySelector('.form-option').classList.add('remove-passenger');
        copy.querySelector('.form-option').innerHTML = "<div class='close-icon'><i class='fas fa-times'></i></div>";
        copy.querySelectorAll('input').forEach(function(item) {
            if (item.hasAttribute('readonly')) {
                item.classList.remove('complete-input');
                if (!item.closest('.inner-group').querySelector('.select-box-title')) {
                    item.value = item.closest('.inner-group').querySelector('.text').textContent;
                } else {
                    item.value = item.closest('.inner-group').querySelector('.select-box-title').textContent;
                }
                let ficon = item.closest('.inner-group').querySelector('.ficon');
                if (ficon) {
                    ficon.setAttribute('src', item.closest('.inner-group').querySelector('.icon img').getAttribute('src'));
                }
            } else {
                item.value = '';
                formValidation(section, item, false);
                item.classList.remove('complete-input');
            }
        })
        container.insertBefore(copy, this.parentElement.nextElementSibling);
        formValidationOnInput(section);
    }

    // Remove Customer Inputs
    function removeCustomerInputs(item) {
        item.closest('.row-group').remove();
        formValidationOnInput(section);
    }

    // Select language Flag and add it to the input title (Selectbox Languages)
    function countryCode() {
        let phoneGroup = section.querySelectorAll('.customer-phone-group .inner-group'),
            img = document.createElement('img');
        img.className = 'img-fluid ficon';
        phoneGroup.forEach(function(item) {
            img.setAttribute('src', item.querySelector('.icon img').getAttribute('src'));
            if (!item.querySelector('.ficon')) {
                item.insertBefore(img, item.querySelector('.drop-list'));
            }
        });
    }

    // add Event to new Customer Inputs
    function addEventToNewCusInputs(e) {
        if (e.target.classList.contains('cust-gender') || e.target.closest('.cust-gender') || e.target.classList.contains('cust-phone-code') || e.target.closest('.cust-phone-code') || e.target.classList.contains('cust-lang') || e.target.closest('.cust-lang') || e.target.classList.contains('ficon')) {
            callSelectBoxSlide(e.target.closest('.inner-group'));
        }
        if (e.target.classList.contains('text') || e.target.closest('.data-droplist') || e.target.classList.contains('customer-flag')) {
            if (!e.target.classList.contains('data-droplist')) {
                selectDataSelectBox(section, e.target.closest('.data-droplist'));
            }
        }
        if (e.target.classList.contains('close-icon') || e.target.closest('.close-icon')) {
            removeCustomerInputs(e.target);
        }
        formValidationOnInput(section);
    }

    // Events
    addPassenger.addEventListener('click', copyCustomerInputs);
    addPhoneNumber.addEventListener('click', copyCustomerInputs);
    bodyContent.addEventListener('click', addEventToNewCusInputs);

    // Call Functions
    countryCode();
    selectDataSelectBox(null, null);
}

// *** Luggage Component
const luggageComponent = function(section) {
    let specialLuggage = section.querySelector('.luggage-special label'),
        addMinusCont   = section.querySelectorAll('.add-minus-input');

    // Special Luggage Switch function
    function specialLuggageFun() {
        let checkInput = this.querySelector('input'),
            commentSection = this.closest('.body-content').querySelector('.comment-row');
        if (checkInput.checked === true) {
            commentSection.classList.add('active');
            formValidationOnInput(section);
        } else {
            commentSection.classList.remove('active');
            commentSection.querySelector('textarea').classList.remove('complete-input');
            commentSection.querySelector('textarea').value = '';
            formValidation(section, commentSection.querySelector('textarea'), false);
            formValidationOnInput(section);
        }
    }

    // Set luggage amount value to 0
    function setLuggageValue() {
        let inputContainer = section.querySelectorAll('.add-minus-input');
        inputContainer.forEach(function(item) {
            item.querySelector('input').value = 0;
        })
    }

    // Luggage amount function
    function luggageNumFun(e) {
        let inputNum = this.querySelector('input');
    
        if (e.target.classList.contains('minus') || e.target.closest('.minus')) {
            if (Number(inputNum.value) !== 0) {
                inputNum.value = Number(inputNum.value) - 1;
                formValidationOnInput(section);
            }
        } else if (e.target.classList.contains('plus') || e.target.closest('.plus')) {
            inputNum.value = Number(inputNum.value) + 1;
            formValidationOnInput(section);
        }
    }

    // Events
    specialLuggage.addEventListener('click', specialLuggageFun);
    addMinusCont.forEach(function(item) {
        item.addEventListener('click', luggageNumFun);
    });

    // Call functions
    setLuggageValue();
    formValidationOnInput(section);
}

// *** Tour Component
const tourComponent = function(section) {
    let tourPeriod = section.querySelector('.tour-period .inner-group'),
        tourContainer = section.querySelector('.info-container'),
        firstTourContent = section.querySelector('.tour-content'),
        tourContent = section.querySelectorAll('.tour-content'),
        leftArrow = section.querySelector('.arrow-control .left-arrow'),
        rightArrow = section.querySelector('.arrow-control .right-arrow');

    function setTourContent() {
        firstTourContent.classList.add('active');
        tourContent.forEach(function(item) {
            let tourTitle = item.querySelector('.info-title').clientHeight,
                tourDes = item.querySelector('.info-description').clientHeight,
                tourPic = item.querySelector('.info-pic').clientHeight;
            
            item.style.height = tourTitle + tourDes + tourPic + 'px';
            if (!item.classList.contains('active')) {
                item.style.display = 'none';
                item.style.right = '-' + tourContainer.clientWidth + 'px';
            }
        })
        tourContainer.style.height = firstTourContent.clientHeight + 'px';
    }

    function tourAnimation() {
        if (this.classList.contains('right-arrow')) {
            let activeTour = section.querySelector('.tour-content.active'),
                 nextEle = activeTour.nextElementSibling;
            if (nextEle) {
                let animation = setInterval(frame, 5),
                    num = tourContainer.clientWidth,
                    leftCounter = 1,
                    rightCounter = -num + 1;
                nextEle.classList.add('active');
                function frame() {
                    if (rightCounter <= 0) {
                        activeTour.style.right = leftCounter + 'px';
                        leftCounter += 15;
                        nextEle.style.right = rightCounter + 'px';
                        rightCounter += 15;
                    } else {
                        activeTour.style.right = num + 'px';
                        nextEle.style.right = '0px';
                        activeTour.classList.remove('active');
                        clearInterval(animation);
                    }
                }
            }
        } else if (this.classList.contains('left-arrow')) {
            let activeTour = section.querySelector('.tour-content.active'),
                prevEle = activeTour.previousElementSibling;
            if (prevEle.classList.contains('tour-content')) {
                let animation = setInterval(frame, 5),
                    num = tourContainer.clientWidth,
                    leftCounter = num - 1,
                    rightCounter = -1;
                prevEle.classList.add('active');
                function frame() {
                    if (leftCounter >= 0) {
                        activeTour.style.right = rightCounter + 'px';
                        rightCounter -= 15;
                        prevEle.style.right = leftCounter + 'px';
                        leftCounter -= 15;
                    } else {
                        activeTour.style.right = '-' + num + 'px';
                        prevEle.style.right = '0px';
                        activeTour.classList.remove('active');
                        clearInterval(animation);
                    }
                }
            }
        }
    }

    // Events
    tourPeriod.addEventListener('click', function(e) {
        if (e.target.classList.contains('input-tour-period') || e.target.classList.contains('inner-group')) {
            callSelectBoxSlide(this)
        }
    })
    tourPeriod.querySelectorAll('.data-droplist').forEach(function(item) {
        item.addEventListener('click', function() {
            selectDataSelectBox(section, this);
        })
    })

    leftArrow.addEventListener('click', tourAnimation);
    rightArrow.addEventListener('click', tourAnimation);

    // Call Functions
    setTourContent();
    selectDataSelectBox(section, null);
    formValidationOnInput(section);
}

// *** Dashboard Component
const dashboardComponent = function(section, section2) {
    let bookingStatus = section.querySelector('.booking-status .inner-group'),
        clearFilter   = section.querySelector('.clear-filter button'),
        filterBtn     = section.querySelector('.filter button'),
        filterNum     = section.querySelector('.filter-num'),
        searchInput   = section.querySelector('#search'),
        closeIcon     = section.querySelector('.close-icon'),
        arrowIcon     = section.querySelector('.icon-arrow'),
        modifyModel = document.querySelector('.modify-model'),
        modifyModelCloseBtn = section2.querySelector('.modify-model .close-btn'),
        datePickerInputs;
    if (section) {
        datePickerInputs = section.querySelectorAll('.datepicker-input');

        // datepicker style
        function datePickerActive(self) {
            let UIdatePicker    = document.getElementById('ui-datepicker-div'),
                observer = new MutationObserver(function(mutations) {
                mutations.forEach(function(mutationRecord) {
                    if (mutationRecord.target.style.display === 'block') {
                        checkStatus(true)
                    } else {
                        checkStatus(false)
                    }
                })
            })
            datePickerInputs.forEach(function(item) {
                if (item !== self) {
                    item.classList.remove('active');
                }
            });
            observer.observe(UIdatePicker, {attributes: true, attributeFilter: ['style']});
            function checkStatus(status) {
                let icon = self.querySelector('.icon img'),
                    getIconSrc, iconOrange;
                if (status) {
                    if (self.classList.contains('clicked')) {
                        if (icon.getAttribute('src').slice(-11) !== "-orange.png") {
                            getIconSrc = icon.getAttribute('src').replace('.png', '');
                            iconOrange = getIconSrc + '-orange.png';
                            self.classList.remove('clicked');
                            self.classList.add('active');
                            icon.setAttribute('src', iconOrange);
                        }
                    }
                } else {
                    filterNum.style.display = 'block';
                    self.classList.remove('active')
                    if (icon.getAttribute('src').slice(-11) === "-orange.png") {
                        getIconSrc = icon.getAttribute('src').replace('-orange.png', '');
                        iconOrange = getIconSrc + '.png';
                        icon.setAttribute('src', iconOrange);
                    }
                }
            }
        }

        // set datepacker function on click
        datePickerInputs.forEach(function(item) {
            item.addEventListener('click', function() {
                this.classList.add('clicked');
                datePickerActive(this);
            })
        })

        // Filter button slide animation
        filterBtn.addEventListener('click', function() {
            let menu = this.closest('.left-content').querySelector('.filter-menu'),
                menuContent = menu.querySelector('.menu-content'),
                arrow = menu.querySelector('.icon-arrow');
            animationSlide(menu, null, menuContent, arrow, this, menu, 'block', 5); 
        })

        arrowIcon.addEventListener('click', function() {
            let menu = this.closest('.left-content').querySelector('.filter-menu'),
                menuContent = menu.querySelector('.menu-content'),
                arrow = menu.querySelector('.icon-arrow');
            animationSlide(menu, null, menuContent, arrow, this, menu, 'block', 5); 
        })

        // Search input clear value
        searchInput.addEventListener('input', function() {
            if (this.value !== '') {
                this.classList.add('complete-input');
            } else {
                this.classList.remove('complete-input');
            }
        })
        closeIcon.addEventListener('click', function() {
            clearBtnFun(section, this);
        });

        // Events
        bookingStatus.addEventListener('click', function(e) {
            if (e.target.classList.contains('input-booking-status') || e.target.classList.contains('inner-group')) {
                callSelectBoxSlide(this)
            }
        })
        bookingStatus.querySelectorAll('.data-droplist').forEach(function(item) {
            item.addEventListener('click', function() {
                filterNum.style.display = 'block';
                selectDataSelectBox(section, this);
            })
        })
        clearFilter.addEventListener('click', function() {
            filterNum.style.display = 'none';
            selectDataSelectBox(section, null);
        });
        // datepicker options
        $('.datepicker').datepicker({
            showOtherMonths: true,
            numberOfMonths: [ 1, 2],
            firstDay: 1,
            stepMonths: 2
        });
        // Call Functions
        selectDataSelectBox(section, null);
    }
    if (section2) {
        let dataRow = section2.querySelectorAll('.data-row'),
            dataHeading = section2.querySelectorAll('.data-heading .heading'),
            numContainer = section2.querySelectorAll('.num-container .num'),
            pageSelect = section2.querySelector('.page-select .inner-group'),
            loader = section2.querySelector('.loader');

        // Data row slide animation
        dataRow.forEach(function(item) {
            let title = item.querySelector('.data-title'),
                menu = item.querySelector('.description-menu'),
                innerMenu = menu.querySelector('.data-description'),
                arrow = item.querySelector('.arrow-icon');
            title.addEventListener('click', function() {
                animationSlide(menu, null, innerMenu, arrow, this, menu, 'block', 5);
                if (menu.classList.contains('active')) {
                    this.closest('.data-row').classList.add('active');
                } else {
                    this.closest('.data-row').classList.remove('active');
                }
            })
        })

        // Dashbody in small screen
        function dashBodymobScreen() {
            if (window.innerWidth <= 1000) {
                if (!section2.classList.contains('mobScreen')) {
                    let headingContainer = section2.querySelector('.data-heading');
                    section2.classList.add('mobScreen');
                    for (let i = 0; i < dataRow.length; i++) {
                        let dataDes = dataRow[i].querySelectorAll('.data-title-content .data');
                        for (let a = 0; a < dataDes.length; a++) {
                            let copyItem = dataHeading[a].cloneNode(true);
                            dataDes[a].querySelector('.inner-data').insertAdjacentElement('beforebegin', copyItem);
                        }
                    }
                    headingContainer.classList.remove('d-flex');
                    headingContainer.style.display = 'none';
                }
            }
        }

        // Events
        numContainer.forEach(function(item) {
            item.addEventListener('click', function() {
                if (!this.classList.contains('num-dots')) {
                    numContainer.forEach(function(item2) {
                        item2.classList.remove('active');
                    })
                    this.classList.add('active');
                }
            })
        });

        pageSelect.addEventListener('click', function(e) {
            if (e.target.classList.contains('input-page-num') || e.target.classList.contains('inner-group')) {
                callSelectBoxSlide(this)
            }
        })
        pageSelect.querySelectorAll('.data-droplist').forEach(function(item) {
            item.addEventListener('click', function() {
                selectDataSelectBox(section2, this);
            })
        })

        window.addEventListener('resize', dashBodymobScreen);

        // Call Functions
        dashBodymobScreen();

        section2.addEventListener('click', function(e) {
            if (e.target.closest('.data-btn')) {
                let btn = e.target.closest('.data-btn');
                if (!modifyModel.classList.contains('active')) {
                    modifyModel.classList.add('active');
                }

            }
        });
        modifyModelCloseBtn.addEventListener('click', function() {
            modifyModel.classList.add('fadeout-fast');
            setTimeout(function() {
                modifyModel.classList.remove('fadeout-fast');
                modifyModel.classList.remove('active');
            }, 300);
        })
    }
}

// *** Quotation Module
const quotationModule = function(section) {
    let nav        = document.querySelector('nav'),
        navigation = section.querySelector('.quotation-wrapper .content'),
        winHeight  = window.innerHeight - nav.offsetHeight,
        quotationBox = section.querySelector('.quotation-box'),
        sideBar = section.querySelector('.sidebar'),
        stepsContainer = section.querySelector('.quotation-steps'),
        steps = stepsContainer.querySelectorAll('.step'),
        stepsContainerWidth = stepsContainer.offsetWidth,
        fStep      = section.querySelector('.quotation-steps .step'),
        getStepsPos = quotationBox.getBoundingClientRect(),
        stepsContent = stepsContainer.querySelector('.inner-content'),
        quotationControl = section.querySelector('.quotation-control'),
        quotationContainer = section.querySelector('.quotation-container'),
        quotationContent = section.querySelectorAll('.quotation-container > div'),
        fSlide = quotationContainer.querySelector('.quotation-ride'),
        nextBtn = section.querySelector('.next-btn button'),
        prevBtn = section.querySelector('.prev-btn button'),
        category = section.querySelectorAll('.category'),
        mapInputs = section.querySelectorAll('.map-input input'),
        services = section.querySelectorAll('.quotation-passengers .services'),
        addMinusCont = section.querySelectorAll('.add-minus-input'),
        generateBtn = section.querySelector('.generate-btn button'), 
        activeSlide;

    section.style.paddingTop = nav.offsetHeight + 'px';
    navigation.style.minHeight = winHeight + 'px';
    fStep.classList.add('active');
    // Set steps position in different screens
    getStepsPos = (stepsContainerWidth - getStepsPos.left) - (fStep.querySelector('.num').offsetWidth * 0.5);
    stepsContent.style.right = getStepsPos + 'px';

    if (quotationContainer.querySelector('.quotation-ride') && !quotationContainer.querySelector('.quotation-ride.active')) {
        prevBtn.parentElement.classList.add('hide');
        fSlide.classList.add('active');
        if (window.innerWidth > 991) {
            quotationContent.forEach(function(item) {
                if (!item.classList.contains('active')) {
                    item.style.top = '-' + item.offsetHeight + 'px';
                }
            })
        } else {
            if (window.innerWidth <= 767) {
                quotationBox.style.height = fSlide.offsetHeight + 'px';
                quotationContainer.style.height = fSlide.offsetHeight + 'px';
            }
            quotationContent.forEach(function(item) {
                if (!item.classList.contains('active')) {
                    setTimeout(function() {
                        item.style.height = item.offsetHeight + 'px';
                        item.style.top = '-' + item.offsetHeight + 'px';
                    })
                }
            })
        }
    }
    activeSlide = section.querySelector('.quotation-container > div.active');
    category.forEach(function(item) {
        item.addEventListener('click', function() {
            activeSlide = section.querySelector('.quotation-container > div.active');
            selectCategory(activeSlide, this, category, true);
            if (activeSlide.classList.contains('quotation-destinations')) {
                let startPoint = mapInputs[0],
                    endPoint = mapInputs[1];
                if (item.classList.contains('active')) {
                    startPoint.parentElement.classList.add('hideplaceholder');
                    startPoint.value = item.querySelector('.category-text').textContent;
                    startPoint.classList.add('complete-input');
                    endPoint.focus();
                    endPoint.click();
                } else {
                    startPoint.value = '';
                    startPoint.parentElement.classList.remove('hideplaceholder');
                }
            }
            formValidationOnInput(activeSlide);
        });
    });

    if (services[0]) {
        let servicesSection = section.querySelector('.quotation-passengers');
        services.forEach(function(item) {
            item.addEventListener('click', function() {
                selectCategory(servicesSection, this, services, false);
            });
        })
    }

    // Set luggage amount value to 0
    function setLuggageValue() {
        let inputContainer = section.querySelectorAll('.add-minus-input');
        inputContainer.forEach(function(item) {
            item.querySelector('input').value = 0;
        })
    }

    // Luggage amount function
    function luggageNumFun(e) {
        let inputNum = this.querySelector('input');
    
        if (e.target.classList.contains('minus') || e.target.closest('.minus')) {
            if (Number(inputNum.value) !== 0) {
                inputNum.value = Number(inputNum.value) - 1;
            }
        } else if (e.target.classList.contains('plus') || e.target.closest('.plus')) {
            inputNum.value = Number(inputNum.value) + 1;
        }
    }

    // Events
    addMinusCont.forEach(function(item) {
        item.addEventListener('click', luggageNumFun);
    });

    // Call functions
    setLuggageValue();

    if (window.innerWidth <= 991) {
        sideBar.appendChild(stepsContainer);
        sideBar.style.minHeight = winHeight + 'px';
    }
    // Hide placeholder on type
    mapInputs.forEach(function(item) {
        item.addEventListener('input', function() {
            if (item.value !== '') {
                item.parentElement.classList.add('hideplaceholder');
            } else if (item.value === '' && item.parentElement.classList.contains('hideplaceholder')) {
                item.parentElement.classList.remove('hideplaceholder');
            }
        })
    });
    formValidationOnInput(activeSlide);
    nextBtn.addEventListener('click', function() {
        if (activeSlide.classList.contains('quotation-destinations') && !activeSlide.querySelector('.description-content.show-trip')) {
            this.classList.add('hold');
            this.classList.remove('active');
            this.setAttribute('disabled', '');
            getTripInfo(activeSlide);
        }        
        if (!this.classList.contains('hold')) {
            switchSlide(this, null);
        }
    });
    generateBtn.addEventListener('click', function() {
        switchSlide(this, null);
    });
    prevBtn.addEventListener('click', function() {
        if (activeSlide.nextElementSibling.classList.contains('quotation-passengers')) {
            this.parentElement.parentElement.classList.remove('bottomspace');
        }
        switchSlide(this, null);
    });
    steps.forEach(function(item) {
        item.addEventListener('click', function() {
            if (item.classList.contains('done')) {
                let index = Array.prototype.slice.call(steps).indexOf(item);
                if (index === 0 && quotationContent[1].querySelector('.show-trip')) {
                    quotationContent[1].querySelector('.show-trip').classList.remove('show-trip');
                }
                item.classList.add('backstep');
                switchSlide(prevBtn, quotationContent[index]);
            }
        })
    })

    // Show trip info
    function getTripInfo(container) {
        let descriptionContent = container.querySelector('.description-content'),
            categoryContainer = container.querySelector('.category-container'),
            quickOptions = container.querySelector('.quick-options'),
            tripInfo = container.querySelector('.trip-info'),
            loader = document.createElement('div');
        loader.className = 'loader';
        loader.innerHTML = '<div class="spinner"></div>';
        quickOptions.classList.add('hide');
        categoryContainer.classList.add('hide');
        descriptionContent.appendChild(loader);
        setTimeout(function() {
            loader.remove();
            nextBtn.classList.remove('hold');
            nextBtn.classList.add('active');
            descriptionContent.classList.add('show-trip');
            nextBtn.removeAttribute('disabled');
            quickOptions.classList.remove('hide');
            categoryContainer.classList.remove('hide');
        }, 1200);
    }

    // Animation function
    function switchSlide(self, ele) {
        let activeSlide = section.querySelector('.quotation-container > div.active'),
            nxtSlide = activeSlide.nextElementSibling,
            prevSlide = activeSlide.previousElementSibling,
            activeStep = stepsContainer.querySelector('.step.active'),
            nxtSlideHeight, prevSlideHeight;
        if (window.innerWidth <= 991) {
            if ((self.parentElement.classList.contains('next-btn') || self.parentElement.classList.contains('generate-btn')) && !self.classList.contains('done')) {
                quotationContainer.style.height = nxtSlide.offsetHeight + 'px';
                quotationBox.style.height = nxtSlide.offsetHeight + 'px';
                for (let i = 0; i < quotationContent.length; i++) {
                    if (quotationContent[i].classList.contains('active')) {
                        break;
                    } else {
                        quotationContent[i].style.top = nxtSlide.offsetHeight + 'px';
                    }
                }
            } else {
                if (self.classList.contains('done')) {
                    prevSlide = fSlide;
                }
                quotationContainer.style.height = prevSlide.offsetHeight + 'px';
                quotationBox.style.height = prevSlide.offsetHeight + 'px';
                for (let i = 0; i < quotationContent.length; i++) {
                    if (quotationContent[i].classList.contains('active')) {
                        break;
                    } else {
                        quotationContent[i].style.top = prevSlide.offsetHeight + 'px';
                    }
                }
            }
        }
        if ((self.parentElement.classList.contains('next-btn') || self.parentElement.classList.contains('generate-btn')) && !self.classList.contains('done')) { // Next button animation
            nxtSlideHeight = nxtSlide.offsetHeight;
            if (activeSlide.offsetHeight > nxtSlideHeight) {
                nxtSlideHeight = activeSlide.offsetHeight;
            }
            if (activeSlide.nextElementSibling.classList.contains('quotation-passengers')) {
                self.parentElement.parentElement.classList.add('bottomspace');
            } else if (activeSlide.nextElementSibling.classList.contains('quotation-final')) {
                self.textContent = 'Start new quotation';
                self.classList.add('done');
                self.parentElement.parentElement.classList.add('done');
            }
            if (!self.parentElement.classList.contains('generate-btn')) {
                self.classList.remove('active');
                self.setAttribute('disabled', '');
                activeStep.classList.add('done');
                activeStep.classList.remove('active');
                activeStep.nextElementSibling.classList.add('active');
            } else {
                activeStep.classList.add('done');
                activeStep.classList.remove('active');
            }
            if (activeSlide.classList.contains('quotation-ride')) {
                self.parentElement.previousElementSibling.classList.remove('hide');
            }
            let animation = setInterval(frame, 4),
                num = 5, num2 = nxtSlideHeight - 8;
            function frame() {
                if (num < nxtSlideHeight) {
                    activeSlide.style.top = '-' + num + 'px';
                    nxtSlide.style.top = num2 + 'px';
                    if (num < (nxtSlideHeight * 0.1)) {
                        num += 8;
                        num2 -= 8;
                    } else if (num < (nxtSlideHeight * 0.85) && num > (nxtSlideHeight * 0.1)) {
                        num += 13;
                        num2 -= 13;
                    } else {
                        num += 8;
                        num2 -= 8;
                    }
                } else {
                    //activeSlide.style.top = nxtSlideHeight + 'px';
                    activeSlide.style.top = '-' + nxtSlideHeight + 'px';
                    nxtSlide.style.top = '0px';
                    activeSlide.classList.remove('active');
                    if (nxtSlide.classList.contains('quotation-final')) {
                        quotationBox.classList.add('showsupport-btn');
                    }
                    nxtSlide.classList.add('active');
                    formValidationOnInput(nxtSlide);
                    clearInterval(animation);
                }
            }
            
        } else { // Previous button animation
            if (ele !== null) {
                prevSlide = ele;
            }
            prevSlideHeight = prevSlide.offsetHeight;
            if (activeSlide.offsetHeight > prevSlideHeight) {
                prevSlideHeight = activeSlide.offsetHeight;
            }
            if (!self.classList.contains('done')) {
                nextBtn.classList.add('active');
                nextBtn.removeAttribute('disabled');
                if (ele === null) {
                    activeStep.previousElementSibling.classList.remove('done');
                    activeStep.classList.remove('active');
                    activeStep.previousElementSibling.classList.add('active');
                } else {
                    let index = Array.prototype.slice.call(steps).indexOf(stepsContainer.querySelector('.backstep'));
                    if (activeStep) {
                        activeStep.classList.remove('active');
                    }
                    stepsContainer.querySelector('.backstep').classList.remove('backstep');
                    steps[index].classList.add('active');
                    if (self.parentElement.parentElement.classList.contains('bottomspace') && index < 3) {
                        self.parentElement.parentElement.classList.remove('bottomspace');
                    }
                    if (quotationBox.classList.contains('showsupport-btn')) {
                        quotationBox.classList.remove('showsupport-btn');
                    }
                    if (self.parentElement.parentElement.classList.contains('done')) {
                        generateBtn.classList.remove('done');
                        self.parentElement.parentElement.classList.remove('done');
                    }

                    if (index === 0) {
                        prevBtn.parentElement.classList.add('hide');
                    }
                    
                    for (let i = index; i < steps.length; i++) {
                        if (steps[i].classList.contains('done')) {
                            steps[i].classList.remove('done');
                        }
                    }
                }
                

                if (prevSlide.classList.contains('quotation-destinations')) {
                    prevSlide.querySelector('.show-trip').classList.remove('show-trip');
                }
            } else {
                self.classList.remove('done');
                self.parentElement.parentElement.classList.remove('done');
                quotationBox.classList.remove('showsupport-btn');
                quotationControl.classList.remove('bottomspace');
                section.querySelector('.description-content.show-trip').classList.remove('show-trip');
                nextBtn.classList.remove('active');
                nextBtn.setAttribute('disabled', '');
                prevBtn.parentElement.classList.add('hide');
                for (let i = 0; i < steps.length ; i++) {
                    steps[i].classList.remove('done');
                    if (i === 0) {
                        steps[0].classList.add('active');
                    }
                }
                section.querySelectorAll('.map-input input').forEach(function(item) {
                    item.value = '';
                    item.parentElement.classList.remove('hideplaceholder');
                });
                section.querySelectorAll('.luggage-group input').forEach(function(item) {
                    item.value = '0';
                });
                section.querySelectorAll('.services-content .services').forEach(function(item) {
                    if (item.classList.contains('active')) {
                        item.classList.remove('active');
                    }
                });
                prevSlideHeight = fSlide.offsetHeight;
                if (activeSlide.offsetHeight > prevSlideHeight) {
                    prevSlideHeight = activeSlide.offsetHeight;
                }
                prevSlide = fSlide;
            }
            if (activeSlide.previousElementSibling.classList.contains('quotation-ride')) {
                self.parentElement.classList.add('hide');
            }
            let animation = setInterval(frame, 4),
                num = 5, num2 = prevSlideHeight - 8;
            function frame() {
                if (num2 > 0) {
                    prevSlide.style.top = '-' + num2 + 'px';
                    activeSlide.style.top = num + 'px';
                    if (num < (prevSlideHeight * 0.1)) {
                        num += 8;
                        num2 -= 8;
                    } else if (num < (prevSlideHeight * 0.85) && num > (prevSlideHeight * 0.1)) {
                        num += 13;
                        num2 -= 13;
                    } else {
                        num += 8;
                        num2 -= 8;
                    }
                } else {
                    activeSlide.style.top = prevSlideHeight + 'px';
                    prevSlide.style.top = '0px';
                    activeSlide.classList.remove('active');
                    prevSlide.classList.add('active');
                    formValidationOnInput(prevSlide);
                    clearInterval(animation);
                }
            }
        }
    }

}

// *** Settings Component
const settingsComponent = function(section) {
    let navigationContent = section.querySelector('.navigation-content'),
        lastNavigation = section.querySelector('.navigation-content > div:last-child'),
        navigationItems = section.querySelectorAll('.navigation-content .navi-item'),
        naviLine = section.querySelector('.settings-navigation .navi-line'),
        changePicBtn = section.querySelectorAll('.upload-btn'),
        deletePicBtn = section.querySelectorAll('.delete-pic'),
        settingBodyContent = section.querySelectorAll('.settings-body > div'),
        deleteDataBtn = section.querySelectorAll('.delete-data'),
        formBtn = section.querySelector('.location-btn-control .location-control'),
        boxPopup = section.querySelectorAll('.big-box');
        singlePopupBtn = section.querySelectorAll('.single-popup'),
        popupContainerBtn = section.querySelectorAll('.popup-container'),
        addBtn = section.querySelectorAll('.add-btn button'),
        rowDataContainer = section.querySelectorAll('.row-data-container');

    navigationItems[0].classList.add('active');
    settingBodyContent[0].classList.add('active');
    naviLine.style.width = navigationItems[0].children[0].offsetWidth + 'px';
    // Navigation links
    navigationItems.forEach(function(item) {
        if (item !== lastNavigation && window.innerWidth > 750) {
            item.style.width = item.children[0].offsetWidth + 9 + 'px';
        } else if (item === lastNavigation && window.innerWidth > 750) {
            item.style.width = item.children[0].offsetWidth + 'px';
        }
        item.addEventListener('click', function() {
            if (!item.classList.contains('active')) {
                let activeItem = navigationContent.querySelector('.navi-item.active'),
                    naviContentLeft = navigationContent.getBoundingClientRect().left,
                    activeItemLeft = activeItem.children[0].getBoundingClientRect().left - naviContentLeft,
                    newItemLeft = item.children[0].getBoundingClientRect().left - naviContentLeft,
                    indexOld = Array.prototype.slice.call(navigationItems).indexOf(activeItem),
                    indexNew = Array.prototype.slice.call(navigationItems).indexOf(item);
                settingBodyContent[indexOld].classList.add('inactive');
                settingBodyContent[indexOld].classList.remove('active');
                setTimeout(function() {
                    settingBodyContent[indexOld].classList.remove('inactive');
                    settingBodyContent[indexNew].classList.add('active');
                }, 200);
                activeItem.classList.remove('active');
                if (window.innerWidth > 750) {
                    if (activeItem === lastNavigation) {
                        activeItem.style.width = activeItem.children[0].offsetWidth + 'px';
                    }
                    if (item === lastNavigation) {
                        item.style.width = item.children[0].offsetWidth + 9 + 'px';
                    }
                }
                item.classList.add('active');
                if (window.innerWidth > 750) {
                    naviLine.style.left = activeItemLeft + 'px';
                    naviLineAnimation(activeItemLeft, newItemLeft, naviLine.offsetWidth, item.children[0].offsetWidth);
                }
            }
        })
    });

    // Set popup height
    boxPopup.forEach(function(item) {
        let winHeight = window.innerHeight;
        item.style.maxHeight = (winHeight * 0.92) + 'px';
    });
    // Upload input function
    changePicBtn.forEach(function(item) {
        item.addEventListener('click', function() {
            this.parentElement.querySelector('.placeholder-btn').click();
        });
    });
    // Delete Profile pic
    deletePicBtn.forEach(function(item) {
        item.addEventListener('click', function() {
            this.parentElement.parentElement.querySelector('.pic img').remove();
        });
    });

    // location form btn
    formBtn.addEventListener('click', function(e) {
        let dataFormBtn = section.querySelectorAll('.location-data-body'),
            formBtnAttr;
        if (e.target.closest('.btn-box')) {
            formBtnAttr = e.target.closest('.btn-row').getAttribute('form-btn');
            if (!e.target.closest('.btn-box.active')) {
                e.target.closest('.btn-box').classList.add('active');
                for (let i = 0; i < dataFormBtn.length; i++) {
                    if (dataFormBtn[i].getAttribute('form-btn') === formBtnAttr) {
                        dataFormBtn[i].style.display = 'flex';
                    } else {
                        dataFormBtn[i].style.display = 'none';
                    }
                }
            } else {
                this.querySelectorAll('.btn-box').forEach(function(item) {
                    if (item.classList.contains('active')) {
                        item.classList.remove('active');
                    }
                })
                dataFormBtn.forEach(function(item) {
                    item.style.display = 'flex';
                })
            }
        } else if (e.target.closest('.delete-icon')) {
            formBtnAttr = e.target.closest('.btn-row').getAttribute('form-btn');
            for (let i = 0; i < dataFormBtn.length; i++) {
                if (dataFormBtn[i].getAttribute('form-btn') === formBtnAttr) {
                    dataFormBtn[i].remove();
                }
            }
        }
    })

    // collapse dropdown input
    function collapseDropDownInput(container) {
        container.forEach(function(item) {
            if (item.classList.contains('active')) {
                item.classList.add('hideAnimation');
                setTimeout(function() {
                    item.classList.remove('hideAnimation');
                    item.classList.remove('active');
                }, 250);
            }
        });
    }

    // delete data btn
    deleteDataBtn.forEach(function(item) {
        item.addEventListener('click', function() {
            let popItem = item.closest('.popup-container');
            hidePopup(popItem, 'delete-data');
        });
    });

    // line animation function
    function naviLineAnimation(minLeft, maxLeft, minWidth, maxWidth) {
        let sheet = '.settings-section .settings-navigation > .navi-line {left:' + maxLeft + 'px!important; width:' + maxWidth + 'px!important;animation: lineAnimation .5s ease-in-out;} @keyframes lineAnimation {0% {left:' + minLeft + 'px; width:' + minWidth + 'px;} 100% {left:' + maxLeft + 'px; width:' + maxWidth + 'px;}}',
        styleSheet = document.querySelector("#line-animation-stylesheet");
        if (styleSheet) {
            styleSheet.remove();
        }
        let style = document.createElement('style');
        style.id = 'line-animation-stylesheet';
        style.innerHTML = sheet;
        setTimeout(function() {
            document.head.appendChild(style);
        }, 0);
    }

    // hide popup
    function hidePopup(popItem, status) {
        popItem.classList.remove('showPopup');
        popItem.classList.add('hidePopup');
        setTimeout(function() {
            popItem.classList.remove('hidePopup');
            // Delete row data
            if (status === 'delete-data') {
                let rowData = popItem.parentElement.querySelectorAll('.row-data-body'),
                    index = Number(popItem.closest('.main-body').getAttribute('data-index'));
                rowData[index].remove();
                popItem.closest('.main-body').removeAttribute('data-index');
            } 
        }, 250);
    }

    // PopupContainer function (dropDown List/cancel btn/close icon/single popup box)
    popupContainerBtn.forEach(function(item) {
        item.addEventListener('click', function(e) {
            // dropDown List function
            let items = this.querySelectorAll('.dropdown-list-popup > div'),
                dropDownTxt = this.querySelectorAll('.dropdown-txt'),
                maxHeight = 0;
            if (e.target.classList.contains('form-control') && e.target.parentElement.classList.contains('dropdown-txt')) {
                let dropDownBtn = e.target.parentElement;
                if (!dropDownBtn.classList.contains('active')) {
                    if(!dropDownBtn.classList.contains('setHeight')) {
                        dropDownBtn.classList.add('setHeight');
                        for (let i = 0; i < items.length; i++) {
                            maxHeight += items[i].offsetHeight;
                            if ((i + 1) === items.length) {
                                dropDownBtn.classList.remove('setHeight');
                            }
                        }     
                        e.target.nextElementSibling.style.maxHeight = maxHeight + 'px';
                    }
                    dropDownBtn.classList.add('active');
                }
            } else if (e.target.classList.contains('item-popup') || e.target.closest('.item-popup')) {
                let dropdownTxtInput, listItem;
                if (e.target.classList.contains('item-popup')) {
                    dropdownTxtInput = e.target.parentElement.previousElementSibling;
                } else {
                    dropdownTxtInput = e.target.closest('.item-popup').parentElement.previousElementSibling;
                }
                if (e.target.classList.contains('item-popup')) {
                    listItem = e.target;
                } else {
                    listItem = e.target.closest('.item-popup');
                }
                if (!listItem.querySelector('.item-popup-txt')) {
                    dropdownTxtInput.value = e.target.textContent;
                } else {
                    dropdownTxtInput.value = listItem.querySelector('.item-popup-txt').textContent;
                }
                if (listItem.querySelector('img')) {
                    let imgSrc = listItem.querySelector('img').src;
                    listItem.closest('.popup-container').setAttribute('data-icon', imgSrc);
                }
                collapseDropDownInput(dropDownTxt);
            } else if (e.target.classList.contains('cancel-popup') || e.target.closest('.close-icon')) { // Cancel button and Close button
                hidePopup(e.target.closest('.popup-container'), null);
            } else if (e.target.classList.contains('save-popup') && e.target.closest('.single-popup-box')) { // Single popup save button (profile/company)
                let inputs = e.target.closest('.box').querySelectorAll('input'),
                    rowSettings = e.target.closest('.row-settings'),
                    arrData = [];
                for (let i = 0; i < inputs.length; i++) {
                    if (inputs[i].value === '') {
                        break;
                    }
                    arrData.push(inputs[i].value);
                    if ((i + 1) === inputs.length) {
                        let txt = rowSettings.querySelector('.txt');
                        if (arrData.length === 1) {
                            txt.textContent = inputs[i].value;
                            inputs[i].value = '';
                        } else {
                            if (txt.classList.contains('separate-txt')) {
                                txt.textContent = arrData[0] + ' ' + arrData[1];
                            }
                            if (rowSettings.querySelector('.txt2')) {
                                let txt2 = rowSettings.querySelector('.txt2');
                                txt2.textContent = arrData[0];
                                txt.textContent = arrData[1];
                                if (e.target.closest('.popup-container').hasAttribute('data-icon')) {
                                    let icon = rowSettings.querySelector('.phone img'),
                                    src = e.target.closest('.popup-container').getAttribute('data-icon');
                                    icon.src = src;
                                }
                            }
                        }
                        hidePopup(e.target.closest('.popup-container'), null);
                    }
                }
            } else if (e.target.classList.contains('popup-btn') && e.target.closest('.add-popup')) { // popup btn in add btn popup
                let popupContainer = e.target.closest('.row-edit').querySelector('.popup-container');
                // show popup
                popupContainer.classList.add('showPopup');
                btnControl(popupContainer);
                
            } else if ((e.target.classList.contains('save-popup') && !e.target.closest('.single-popup-box')) && (!e.target.classList.contains('main-btn'))) { // save popup button in add btn popup
                let popupContainer = e.target.closest('.popup-container'),
                    inputs = popupContainer.querySelectorAll('input:not(.optional)'),
                    arrData = [];
                    for (let i = 0; i < inputs.length; i++) {
                        if (inputs[i].value === '') {
                            break;
                        }
                        arrData.push(inputs[i].value);
                        if ((i + 1) === inputs.length) {
                            if (popupContainer.closest('.row-edit') && !popupContainer.closest('.add-popup')) {
                                let row = popupContainer.closest('.row-edit'),
                                    txt = row.querySelector('.txt');
                                    
                                if (inputs.length !== 1) {
                                    if (row.querySelector('.txt2')) {
                                        txt.textContent = arrData[1];
                                    } else {
                                        txt.textContent = arrData[0] + ' ' + arrData[1];
                                    }
                                } else {
                                    txt.textContent = arrData[0];
                                }
                                if (row.querySelector('.txt2')) {
                                    let txt2 = row.querySelector('.txt2'),
                                        src = popupContainer.getAttribute('data-icon');
                                    txt2.previousElementSibling.querySelector('img').src = src;
                                    txt2.textContent = arrData[0];
                                }
                            }
                            hidePopup(popupContainer, null);
                        }
                    }
            } else if (e.target.classList.contains('save-add')) { // save add popup
                let settingContent = e.target.closest('.settings-content'),
                    popupContainer = e.target.closest('.popup-container'),
                    inputs = popupContainer.querySelectorAll('input:not(.optional)'),
                    div = document.createElement('div'),
                    visibleData = [];
                if (item.closest('.locations-settings')) { // Location Settings
                    let container = settingContent.querySelector('.row-data-container');
                    for (let i = 0; i < inputs.length; i++) {
                        if (inputs[i].value === '') {
                            break;
                        }
                        if (inputs[i].parentElement.classList.contains('data-txt')) {
                            visibleData.push(inputs[i].value);
                        }
                        if ((i + 1) === inputs.length) {
                            div.className = 'location-data-body row-data-body';
                            div.innerHTML = '<div class="data-location data-txt">' + visibleData[0] + '</div>' + '<div class="data-location data-txt">' + visibleData[1] + '</div>' + '<div class="data-location data-txt">' + visibleData[2] + '</div>' + '<div class="data-location"><div class="icon"><img class="img-fluid" src="../images/check-mark-location.png"></div></div>' + '<div class="data-location"><button type="button" class="btn edit-btn">Edit</button></div>';
                            container.appendChild(div);
                            inputs.forEach(function(inputTxt) {
                                inputTxt.value = '';
                            });
                            hidePopup(popupContainer, null);
                        }
                    }
    
                } else if (item.closest('.routes-settings')) { // Routes Settings
                    let container = settingContent.querySelector('.row-data-container');
                    for (let i = 0; i < inputs.length; i++) {
                        if (inputs[i].value === '') {
                            break;
                        }
                        if (inputs[i].closest('.data-txt')) {
                            visibleData.push(inputs[i].value);
                        }
                        if ((i + 1) === inputs.length) {
                            div.className = 'routes-data-body row-data-body';
                            div.innerHTML = '<div class="data-routes data-txt">' + visibleData[0] + '</div>' + '<div class="data-routes data-txt">' + visibleData[1] + '</div>' + '<div class="data-routes data-txt">' + visibleData[2] + '</div>' + '<div class="data-routes">1 hr</div><div class="data-routes">45 km</div><div class="data-routes"><button type="button" class="btn popup-btn view-btn">View</button></div><div class="data-routes"><button type="button" class="btn popup-btn editBtn">Edit</button></div>';
                            container.appendChild(div);
                            inputs.forEach(function(inputTxt) {
                                inputTxt.value = '';
                            });
                            hidePopup(popupContainer, null);
                        }
                    }

                } else if (item.closest('.passengers-settings')) { // Passengers Settings
                    let container = settingContent.querySelector('.row-data-container');
                    for (let i = 0; i < inputs.length; i++) {
                        if (inputs[i].value === '') {
                            break;
                        }
                        if (inputs[i].closest('.data-txt')) {
                            visibleData.push(inputs[i].value);
                        }
                        if ((i + 1) === inputs.length) {
                            div.className = 'passenger-data-body row-data-body';
                            div.innerHTML = '<div class="data-passenger separate-txt data-txt">' + visibleData[0] + ' ' + visibleData[1] + '</div>' + '<div class="data-passenger d-flex"><div class="data-txt">' + visibleData[2] + '</div><div class="copy-btn"><button type="button" class="btn">Copy</button></div></div>' + '<div class="data-passenger data-txt d-flex"><div class="txt2">' + visibleData[3] + '</div><div class="txt">' + visibleData[4] + '</div></div>' + '<div class="data-passenger"><div class="icon"><img class="img-fluid" src="../images/vip-parking.png"></div></div>' + '<div class="data-passenger"><button type="button" class="btn edit-btn">Edit</button></div>';
                            container.appendChild(div);
                            inputs.forEach(function(inputTxt) {
                                inputTxt.value = '';
                            });
                            hidePopup(popupContainer, null);
                        }
                    }
                }

            } else if (e.target.classList.contains('popup-btn') && !e.target.closest('.add-popup')) {
                let row = e.target.closest('.row-edit'),
                    popupContainer = row.querySelector('.popup-container'),
                    inputs = popupContainer.querySelectorAll('input');
                if (row.querySelector('.txt')) {
                    let txt = row.querySelector('.txt');
                    if (inputs.length !== 1) {
                        if (!row.querySelector('.txt2')) {
                            let reg1 = new RegExp('^\\S+', 'g'),
                                reg2 = new RegExp('\\S+$', 'g'),
                                value1 = reg1.exec(txt.textContent)[0],
                                value2 = reg2.exec(txt.textContent)[0];
                            inputs[0].value = value1;
                            inputs[1].value = value2;
                        } else {
                            let txt2 = row.querySelector('.txt2');
                            inputs[0].value = txt2.textContent;
                            inputs[1].value = txt.textContent;
                        }
                    } else {
                        inputs[0].value = txt.textContent;
                    }
                }
                //show popup
                popupContainer.classList.add('showPopup');
                btnControl(popupContainer);
            } else if (e.target.classList.contains('save-popup') && e.target.classList.contains('main-btn')) {
                let popupContainer = e.target.closest('.popup-container'),
                    popupTxt = popupContainer.querySelectorAll('.data-txt'),
                    mainBody = e.target.closest('.main-body'),
                    row = mainBody.querySelectorAll('.row-data-body')[Number(mainBody.getAttribute('data-index'))],
                    rowTxt = row.querySelectorAll('.data-txt');
                for (let i = 0; i < popupTxt.length; i++) {
                    let txt = popupTxt[i].querySelector('.txt');
                    if (popupTxt[i].querySelector('.txt') && !popupTxt[i].querySelector('.txt2')) {
                        rowTxt[i].textContent = txt.textContent;
                    }
                    if (popupTxt[i].querySelector('.txt2')) {
                        let txt2 = popupTxt[i].querySelector('.txt2');
                        rowTxt[i].querySelector('.txt').textContent = txt.textContent;
                        rowTxt[i].querySelector('.txt2').textContent = txt2.textContent;
                    }
                    if (e.target.closest('.routes-settings')) {
                        rowTxt[0].textContent = popupTxt[0].querySelectorAll('input')[0].value;
                        rowTxt[1].textContent = popupTxt[0].querySelectorAll('input')[1].value;
                        rowTxt[2].textContent = popupTxt[0].querySelectorAll('input')[2].value;
                    }
                }
                hidePopup(popupContainer, null);
            } else {
                collapseDropDownInput(dropDownTxt);
            }
        });
    });

    // Single popup button (Profile / Company)
    singlePopupBtn.forEach(function(item) {
        item.addEventListener('click', function() {
            let row = item.closest('.row-settings'),
                popupContainer = row.querySelector('.popup-container');
            // show popup on click
            popupContainer.classList.add('showPopup');
            btnControl(popupContainer);
            // check if there is text beside the button
            if (row.querySelector('.txt')) {
                let txt = row.querySelector('.txt');
                if (!txt.classList.contains('separate-txt') && !row.querySelector('.txt2')) {
                    popupContainer.querySelector('input').value = txt.textContent;
                } else if (txt.classList.contains('separate-txt') && !row.querySelector('.txt2')) {
                    let reg1 = new RegExp('^\\S+', 'g'),
                        reg2 = new RegExp('\\S+$', 'g'),
                        value1 = reg1.exec(txt.textContent)[0],
                        value2 = reg2.exec(txt.textContent)[0];
                    popupContainer.querySelectorAll('input')[0].value = value1;
                    popupContainer.querySelectorAll('input')[1].value = value2;
                } else {
                    let txt2 = row.querySelector('.txt2');
                    popupContainer.querySelectorAll('input')[0].value = txt2.textContent;
                    popupContainer.querySelectorAll('input')[1].value = txt.textContent;
                }
            }
        });
    });

    // addBtn
    addBtn.forEach(function(item) {
        item.addEventListener('click', function() {
            let popupContainer = item.closest('.settings-content').querySelector('.popup-container');
            // show popup
            popupContainer.classList.add('showPopup');
            btnControl(popupContainer);
        });
    });

    // edit btn / view btn
    rowDataContainer.forEach(function(item) {
        item.addEventListener('click', function(e) {
            if (e.target.classList.contains('edit-btn') && !e.target.closest('.routes-settings')) { // edit btn
                let popupContainer = e.target.closest('.main-body').querySelector('.popup-container'),
                rowData = e.target.closest('.row-data-body'),
                allTxt = rowData.querySelectorAll('.data-txt'),
                txtPopup =  popupContainer.querySelectorAll('.data-txt'),
                index = Array.prototype.slice.call(rowData.parentElement.children).indexOf(rowData);
                e.target.closest('.main-body').setAttribute('data-index', index);
                //show popup
                popupContainer.classList.add('showPopup');
                btnControl(popupContainer);
                for (let i = 0; i < allTxt.length; i++) {
                    if (allTxt[i].querySelector('.txt')) {
                        txtPopup[i].querySelector('.txt').textContent = allTxt[i].querySelector('.txt').textContent;
                    }
                    if (allTxt[i].querySelector('.txt2')) {
                        txtPopup[i].querySelector('.txt2').textContent = allTxt[i].querySelector('.txt2').textContent;
                    }
                    if (!allTxt[i].querySelector('div')) {
                        txtPopup[i].querySelector('.txt').textContent = allTxt[i].textContent;
                    }
                }
            } else if (e.target.classList.contains('view-btn')) { // view btn  'Routes settings'
                let popupContainer = e.target.closest('.main-body').querySelector('.popup-container.view-map'),
                    rowData = e.target.closest('.row-data-body'),
                    allTxt = rowData.querySelectorAll('.data-txt'),
                    txtPopup = popupContainer.querySelectorAll('.data-txt');
                //show popup
                popupContainer.classList.add('showPopup');
                btnControl(popupContainer);
                for (let i = 0; i < allTxt.length; i++) {
                    txtPopup[i].textContent = allTxt[i].textContent;
                }
            } else if (e.target.classList.contains('editBtn')) { // edit btn 'Routes settings'
            let popupContainer = e.target.closest('.main-body').querySelector('.popup-container.edit-map'),
                rowData = e.target.closest('.row-data-body'),
                allTxt = rowData.querySelectorAll('.data-txt'),
                txtPopup = popupContainer.querySelectorAll('.data-txt input'),
                index = Array.prototype.slice.call(rowData.parentElement.children).indexOf(rowData);
                e.target.closest('.main-body').setAttribute('data-index', index);
                //show popup
                popupContainer.classList.add('showPopup');
                btnControl(popupContainer);
                for (let i = 0; i < allTxt.length; i++) {
                    txtPopup[i].value = allTxt[i].textContent;
                }
            } else if (e.target.parentElement.classList.contains('copy-btn')) { // copy btn
                let txt = e.target.parentElement.previousElementSibling.textContent,
                    input = document.createElement('input');
                input.type = 'text';
                input.className = 'hide-input';
                input.value = txt;
                e.target.parentElement.appendChild(input);
                input.select();
                input.setSelectionRange(0, 99999);
                document.execCommand('copy');
                e.target.classList.add('btnToggle');
                setTimeout(function() {
                    e.target.classList.remove('btnToggle');
                    input.remove();
                }, 155);
            }
        });
    });

    function btnControl(container) {
        let box = container.querySelector('.box');
        box.classList.add('rmvHeight');
        let control = box.children,
            winHeight = window.innerHeight,
            boxHeight = box.offsetHeight;
        if (boxHeight > winHeight) {
            for (let i = 0; i < control.length; i++) {
                if (control[i].classList.contains('popup-control')) {
                    control[i].style.maxWidth = box.offsetWidth + 'px';
                    control[i].classList.add('bottomFixed');
                }
            }
        }
        box.classList.remove('rmvHeight');
    }
    
}

// ******* Shared Functions

// *** Slide Animation Function
function animationSlide(list, items, item, arrow, listBtn, container, dis, speed) {
    let num        = 0, num2 = 0,
        animation, listHeight,staticNum;
    if (!list.classList.contains('active') && listBtn !== null) {
        list.classList.add('active');
        arrow.classList.add('active');
        list.style.display = dis;
        if (items) {
            items.forEach(function(selectBoxData) {
                num2 += selectBoxData.clientHeight;
            })
            listHeight = num2 + 2;
        } else {
            listHeight = item.clientHeight;
        }
        if (listHeight <= 62) {
            staticNum = 2;
        } else if (listHeight <= 142 && listHeight > 62) {
            staticNum = 4;
        } else if (listHeight <= 204 && listHeight > 142) {
            staticNum = 6;
        } else {
            staticNum = 8;
        }
        animation  = setInterval(frame, speed);
        function frame() {
            if (num <= listHeight) {
                list.style.height = num + 'px';
                num += staticNum;
            } else {
                list.style.height = listHeight + 'px';
                clearInterval(animation);
                list.style.overflow = 'visible';
            }
        }
    } else {
        num2 = 0;
        list.style.overflow = 'hidden';
        list.classList.remove('active');
        arrow.classList.remove('active');
        if (items) {
            items.forEach(function(selectBoxData) {
                num2 += selectBoxData.clientHeight;
            })
            listHeight = num2 + 2;
        } else {
            listHeight = item.clientHeight;
        }
        if (listHeight <= 62) {
            staticNum = 2;
        } else if (listHeight <= 142 && listHeight > 62) {
            staticNum = 4;
        } else if (listHeight <= 204 && listHeight > 142) {
            staticNum = 6;
        } else {
            staticNum = 8;
        }
        num = listHeight;
        animation  = setInterval(frame, speed);
        function frame() {
            if (num >= 0) {
                list.style.height = num + 'px';
                num -= staticNum;
            } else {
                list.style.height = '0px';
                list.style.display = 'none';
                clearInterval(animation);
            }
        }
    }
}

// *** SelectBox Slide
function callSelectBoxSlide(item) {
    let btnList = item.querySelector('input'),
        list    = item.querySelector('.drop-list'),
        allData = item.querySelectorAll('.data-droplist'),
        data    = item.querySelector('.data-droplist');
    animationSlide(list, allData, data, item, item, item, 'block', 5); 
}

// *** SelectBox Select data
function selectDataSelectBox(section, data) {
    if (data) {
        let ficon = data.closest('.inner-group').querySelector('.ficon');
        data.closest('.inner-group').querySelector('input').value = data.querySelector('.text').textContent;
        if (ficon) {
            ficon.setAttribute('src', data.querySelector('.icon img').getAttribute('src'));
        }
        callSelectBoxSlide(data.closest('.inner-group'));
        if (!section.classList.contains('dash-content') && !section.classList.contains('dash-control')) {
            let selectBoxInput = data.closest('.inner-group').querySelector('input');
            if (!selectBoxInput.classList.contains('optional')) {
                selectBoxInput.classList.add('complete-input');
            }
            formValidationOnInput(section);
        }
    } else {
        let selectBox = document.querySelectorAll('.select-box');
        selectBox.forEach(function(item) {
            if (!item.querySelector('.select-box-title')) {
                let selectData = item.querySelector('.text').textContent;
                item.querySelector('input').value = selectData;
            } else {
                let selectData = item.querySelector('.select-box-title').textContent;
                item.querySelector('input').value = selectData;
            }
        });
    }
}

// *** Next Button Active Function
/*
    For the Back-end developer... remove this function
*/
function nextBtnActive(btn, form, dataPage, section, status) {
    if (btn) {
        let activeCategory = form.querySelector('.category.active');
        if (activeCategory) {
            if (activeCategory.hasAttribute('data-page')) {
                dataPage = activeCategory.getAttribute('data-page');
            }
        } else if (form.querySelector('.category')) {
            if (form.querySelector('.category').hasAttribute('data-page')) {
                dataPage = form.querySelector('.category').getAttribute('data-page');
            }
        }
        if (section.classList.contains('pickup-point') && section.getAttribute('data-section') === 'pickup') {
            dataPage = 'destination-point';
        }
        if (!form.hasAttribute('action') || form.classList.contains('added')) {
            form.classList.add('added');
            if (status === true) {
                btn.removeAttribute('disabled');
                btn.classList.add('active');
                form.setAttribute('action', dataPage + '.html');
                enterPress(btn);
            } else {
                btn.setAttribute('disabled', '');
                btn.classList.remove('active');
                form.removeAttribute('action');
            }
        } else {
            if (status === true) {
                btn.removeAttribute('disabled');
                btn.classList.add('active');
                enterPress(btn);
            } else {
                btn.setAttribute('disabled', '');
                btn.classList.remove('active');
            }
        }
    }
}

// *** Select Category Full Function
function selectCategory(section, item, category, status) {
    let bodyContent = item.closest('.form-content').querySelector('.body-content'),
        address = document.getElementById('address'),
        price   = item.querySelector('.price'),
        balance = section.querySelector('.data-balance .data-value .price');
    if (address) {
        address.classList.remove('complete-input');
        address.parentElement.querySelector('.address-book').classList.remove('active');
    }
    if (!item.classList.contains('active')) {
        item.parentElement.classList.add('category-active');
        if (status === true) {
            if (bodyContent) {
                if (bodyContent.classList.contains('category-value')) {
                    bodyContent.querySelectorAll('.row-group').forEach(function(item2) {
                        let txtBox = item2.querySelector('input');
                        if (txtBox) {
                            txtBox.value = '';
                            txtBox.classList.remove('complete-input');
                        }
                        formValidation(section, item2, false);
                    })
                }
            }
            category.forEach(function(item2) {
                if (price && item2.classList.contains('active')) {
                    let oldPrice = item2.querySelector('.price');
                    if (balance && Number(balance.textContent) !== 0) {
                        balance.textContent = Number(balance.textContent) - Number(oldPrice.textContent);
                    }
                }
                item2.classList.remove('active');
            })
        }

        if (bodyContent && !item.classList.contains('other-pickup')) {
            let input = section.querySelectorAll('.address-group input');
            if (input) {
                input.forEach(function(inputItem) {
                    inputItem.value = '';
                    inputItem.classList.remove('complete-input');
                    formValidation(section, inputItem, false);
                })
            }
            bodyContent.classList.remove('other');
        }
        if (bodyContent && !item.classList.contains('train-category')) {
            let input = section.querySelectorAll('.tarin-vehicle input');
            if (input) {
                input.forEach(function(inputItem) {
                    inputItem.value = '';
                    inputItem.classList.remove('complete-input');
                    formValidation(section, inputItem, false);
                })
            }
            bodyContent.classList.remove('train');
        }
        if (bodyContent && !item.classList.contains('airport')) {
            let input = section.querySelectorAll('.flight-num input');
            if (input) {
                input.forEach(function(inputItem) {
                    inputItem.value = '';
                    inputItem.classList.remove('complete-input');
                    formValidation(section, inputItem, false);
                })
            }
            bodyContent.classList.remove('flightnum');
        }

        if (bodyContent && !item.classList.contains('jets')) {
            let input = section.querySelectorAll('.tail-num input');
            if (input) {
                input.forEach(function(inputItem) {
                    inputItem.value = '';
                    inputItem.classList.remove('complete-input');
                    formValidation(section, inputItem, false);
                })
            }
            bodyContent.classList.remove('tailnum');
        }

        if (bodyContent && !item.classList.contains('boat')) {
            let input = section.querySelectorAll('.boat-name input');
            if (input) {
                input.forEach(function(inputItem) {
                    inputItem.value = '';
                    inputItem.classList.remove('complete-input');
                    formValidation(section, inputItem, false);
                })
            }
            bodyContent.classList.remove('boatname');
        }

        item.classList.add('active');
        if (price && balance) {
            let balanceNum = Number(balance.textContent);
            if (balanceNum === 0) {
                balance.textContent = price.textContent;
            } else {
                balance.textContent = balanceNum + Number(price.textContent);
            }
        }
        formValidationOnInput(section);
    } else {
        if (bodyContent) {
            if (bodyContent.classList.contains('category-value')) {
                bodyContent.querySelectorAll('.row-group').forEach(function(item2) {
                    let txtBox = item2.querySelector('input'),
                        txtArea = item2.querySelector('textarea');
                    if (txtBox) {
                        txtBox.value = '';
                        txtBox.classList.remove('complete-input');
                    }
                    if (txtArea) {
                        txtArea.value = '';
                        txtArea.classList.remove('complete-input');
                    }
                    formValidation(section, txtBox, false);
                })
            }
        }
        item.parentElement.classList.remove('category-active');
        item.classList.remove('active');
        if (price && balance) {
            let balanceNum = Number(balance.textContent);
            if (balanceNum !== 0) {
                balance.textContent = balanceNum - Number(price.textContent);
            }
        }
        formValidationOnInput(section);
    }
}

// *** Select Category Small Function
function categoryFun(section, item) {
    if (!item.classList.contains('active')) {
        item.classList.add('active');
    } else {
        item.classList.remove('active');
    }
    formValidationOnInput(section);
}

// *** Select Address Booking from Popup on click on title
function selectAddressBook(e) {
    if (e.target.classList.contains('addbook-title')) {
        if (!e.target.classList.contains('addbook-body') && e.target.closest('.addbook-body') === null) {
            if (!this.classList.contains('active')) {
                this.classList.add('active');
            } else {
                this.classList.remove('active');
                this.closest('.address-book').querySelectorAll('input').forEach(function(item) {
                    item.checked = false;
                });
            }
        }
    } else if (!e.target.classList.contains('addbook-body') && e.target.closest('.addbook-body') === null) {
        this.classList.remove('active');
        this.closest('.address-book').querySelectorAll('input').forEach(function(item) {
            item.checked = false;
        });
    }
}

// ** Cancel Booking Address Popup
function addressBookCancelBtn() {
    this.closest('.address-book').classList.remove('active');
    this.closest('.address-book').querySelectorAll('input').forEach(function(item) {
        item.checked = false;
    });
}

// *** Address Booking Popup Checkbox
function addressBooktextCheck() {
    if (this.querySelector('input').checked) {
        this.querySelector('input').checked = false;
    } else {
        this.querySelector('input').checked = true;
    }
}

// *** Address Booking Popup Select Button
function addressBookSelectBtn(section, self) {
    let address = self.closest('.input-group').querySelector('input');
    self.closest('.address-book').querySelectorAll('input').forEach(function(item) {
        if (item.checked) {
            let addressTitle  = item.closest('.address-content').querySelector('.address-content-title').textContent.trim(),
                addressDetail = item.closest('.address-content').querySelector('.address-content-detail').textContent.trim();
            if (address.value === '') {
                address.value = addressTitle + ', ' + addressDetail;
            } else {
                address.value += ', ' + addressTitle + ', ' + addressDetail;
            }
            item.closest('.address-book').classList.remove('active');
            formValidation(section, address, false);
            address.classList.add('complete-input');
            formValidationOnInput(section);
        }
    })
}

// *** Clear Inputs Value Function
function clearBtnFun(section, self) {
    self.parentElement.querySelector('input').value = '';
    self.parentElement.querySelector('input').classList.remove('complete-input');
    if (!section.classList.contains('dash-control')) {
        formValidationOnInput(section);
    }
}


// *** Previous page Button function
/*
    For the Back-end developer... remove this function
*/
function prevBtnFun() {
    let doneStage = document.querySelectorAll('section.header.stages .stage.done');
    for (let i = 0; i < doneStage.length; i++) {
        if ((i + 1) === doneStage.length) {
            let prevPage  = doneStage[i].getAttribute('data-stage');
            window.location.href = prevPage + '.html';
        }
    }
}


// *** Enter press Function
function enterPress(btn) {
    document.body.addEventListener('keyup', function(event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            btn.click();
        }
    })
}

// *** Form Inputs Vlidation Function

function formValidationOnInput(section) {
    let header      = document.querySelector('section.header.stages'),
        form        = section.querySelector('.form-content'),
        category    = section.querySelector('.category'),
        nxtBtn      = section.querySelector('.next-btn button'),
        inputs      = [], bodyContent, stages, nextPage;
    
    if (!nxtBtn) {
        if (section.parentElement.parentElement.querySelector('.next-btn button')) {
            nxtBtn = section.parentElement.parentElement.querySelector('.next-btn button');
        }
    }

    // Get nextPage
    if (header) {
        stages = header.querySelectorAll('.stage');
        stages.forEach(function(item) {
            if (item.classList.contains('active')) {
                if (item.nextElementSibling) {
                    nextPage = item.nextElementSibling.getAttribute('data-stage');
                } else {
                    nextPage = 'success'
                }
            }
        })
    }
    // check if form exist
    if (form) {
        let inputs = section.querySelectorAll('input'),
            inputsList = [],
            categories, activeCategory;

        // check if category exist
        if (category) {
            categories = section.querySelectorAll('.category'),
            activeCategory = section.querySelector('.category.active');
            if (inputs.length === 0) {
                // check if active category exist
                if (activeCategory) {
                    nextBtnActive(nxtBtn, form, nextPage, section, true);
                } else {
                    nextBtnActive(nxtBtn, form, nextPage, section, false);
                }
            } else {
                // add mandatory input
                inputs.forEach(function(item) {
                    let rowGroup = window.getComputedStyle(item.closest('.row-group')).getPropertyValue('display'),
                        inputGroupDisplay = window.getComputedStyle(item.closest('.input-group')).getPropertyValue('display'),
                        innerGroup = window.getComputedStyle(item.parentElement).getPropertyValue('display');
                    if (!item.classList.contains('optional')) {
                        if (inputGroupDisplay !== 'none' && innerGroup !== 'none' && rowGroup !== 'none') {
                            if (item.getAttribute('type') === 'text' || item.getAttribute('type') === 'number' || item.hasAttribute('readonly')) {
                                inputsList.push(item);
                            }
                        } else {
                            item.classList.remove('complete-input');
                            if (activeCategory) {
                                nextBtnActive(nxtBtn, form, nextPage, section, true);
                            } else {
                                nextBtnActive(nxtBtn, form, nextPage, section, false);
                            }
                        }
                    }
                });
                inputsList.forEach(function(item) {
                    item.addEventListener('blur', function() {
                        formValidation(section, item, true);
                    })
                    item.addEventListener('input', function() {
                        if (item.value !== '') {
                            formValidation(section, item, false);
                            item.classList.add('complete-input');
                        } else {
                            item.classList.remove('complete-input');
                        }
                        let completeNum = form.querySelectorAll('.complete-input');
                        activeCategory = section.querySelector('.category.active');
                        if (completeNum.length === inputsList.length && activeCategory) {
                            nextBtnActive(nxtBtn, form, nextPage, section, true);
                        } else {
                            let categoryDisplay = window.getComputedStyle(category.parentElement).getPropertyValue('display');
                            if (completeNum.length === inputsList.length && categoryDisplay === 'none') {
                                nextBtnActive(nxtBtn, form, nextPage, section, true);
                            } else {
                                nextBtnActive(nxtBtn, form, nextPage, section, false);
                            }
                        }
                    });
                    let completeNum = form.querySelectorAll('.complete-input');
                        activeCategory = section.querySelector('.category.active');
                    if (completeNum.length === inputsList.length && activeCategory) {
                        nextBtnActive(nxtBtn, form, nextPage, section, true);
                    } else {
                        nextBtnActive(nxtBtn, form, nextPage, section, false);
                    }
                });
                let completeNum = form.querySelectorAll('.complete-input'),
                    categoryDisplay = window.getComputedStyle(category.parentElement).getPropertyValue('display');
                activeCategory = section.querySelector('.category.active');
                if (completeNum.length === inputsList.length && categoryDisplay === 'none') {
                    nextBtnActive(nxtBtn, form, nextPage, section, true);
                } else {
                    if (activeCategory && categoryDisplay !== 'none') {
                        if (completeNum.length === inputsList.length && activeCategory) {
                            nextBtnActive(nxtBtn, form, nextPage, section, true);
                        } else {
                            nextBtnActive(nxtBtn, form, nextPage, section, false);
                        }
                    } else {
                        if (category.parentElement.classList.contains('optional')) {
                            nextBtnActive(nxtBtn, form, nextPage, section, true);
                        } else {
                            nextBtnActive(nxtBtn, form, nextPage, section, false);
                        }
                    }
                }
            }
        } else {
            // add mandatory input
            inputs.forEach(function(item) {
                if (!item.classList.contains('optional')) {
                    if (item.getAttribute('type') === 'text' || item.getAttribute('type') === 'number' || item.hasAttribute('readonly')) {
                        inputsList.push(item);
                    }
                }
            });
            if (inputsList.length !== 0) {
                inputsList.forEach(function(item) {
                    item.addEventListener('blur', function() {
                        formValidation(section, item, true);
                    })
                    item.addEventListener('input', function() {
                        if (item.value !== '') {
                            formValidation(section, item, false);
                            item.classList.add('complete-input');
                        } else {
                            item.classList.remove('complete-input');
                        }
                        let completeNum = form.querySelectorAll('.complete-input');
                        if (completeNum.length === inputsList.length) {
                            nextBtnActive(nxtBtn, form, nextPage, section, true);
                        } else {
                            nextBtnActive(nxtBtn, form, nextPage, section, false);
                        }
                    });
                    let completeNum = form.querySelectorAll('.complete-input');
                    if (completeNum.length === inputsList.length) {
                        nextBtnActive(nxtBtn, form, nextPage, section, true);
                    } else {
                        nextBtnActive(nxtBtn, form, nextPage, section, false);
                    }
                });
            } else {
                nextBtnActive(nxtBtn, form, nextPage, section, true);
            }

        }
    }

}

// *** Form message Validation
function formValidation(section, input, status) {
    let container      = input.parentElement.querySelector('.alert-message'),
        parentInput    = input.parentElement,
        alertContainer = document.createElement('div'),
        inputType      = input.getAttribute('type'),
        message;
    if (input.closest('.input-group')) {
        let inputText      = input.closest('.input-group').querySelector('.text');
        if (inputType === 'text') {
            if (input.closest('.address-group')) {
                if (section.classList.contains('pickup')) {
                    message = msgFun('msg3', '');
                } else {
                    message = msgFun('msg4', '');
                }
            } else {
                if (section.classList.contains('pickup')) {
                    message = msgFun('msg5', ' the ' + inputText.textContent);
                } else {
                    if (inputText) {
                        message = msgFun('msg5', ' the ' + inputText.textContent);
                    } else if (input.getAttribute('data-errormsg')) {
                        message = msgFun('', input.getAttribute('data-errormsg'));
                    }
                }
            }

        } else if (inputType === 'number') {
            message = msgFun('msg5', ' the ' + inputText.textContent);
        } else {
            message = msgFun('msg2', '');
        }
    }
    function msgFun(msg, txt) {
        let msg1 = 'Please Choose',
            msg2 = 'Please Leave a comment',
            msg3 = 'Please enter the pick-up location address',
            msg4 = 'Please enter the drop-off location address',
            msg5 = 'Please enter',
            newMessage;
        if (msg === 'msg1') {
            newMessage = msg1;
        } else if (msg === 'msg2') {
            newMessage = msg2;
        } else if (msg === 'msg3') {
            newMessage = msg3;
        } else if (msg === 'msg4') {
            newMessage = msg4;
        } else if (msg !== '') {
            newMessage = msg5;
        } else {
            newMessage = '';
        }
        newMessage = newMessage + txt;
        return newMessage;
    }
    if (input.value === '' && status === true) {
        input.classList.remove('complete-input');
        alertContainer.className = 'alert-message d-flex align-items-center';
        alertContainer.innerHTML = "<span class='sign'><i class='fas fa-exclamation-circle'></i></span><span class='text'>" + message + "</span>";
        input.classList.add('border-error');
        input.parentElement.classList.add('errormsg');
        input.parentElement.querySelectorAll('img').forEach(function(item) {
            if (item.parentElement.classList.contains('input-group') || item.closest('label')) {
                let src = item.getAttribute('src'),
                    imgType = src.slice(-4),
                    imgName = src.replace(imgType, '');
                if (imgName.slice(-4) !== '-red') {
                    item.setAttribute('src', imgName + '-red' + imgType);
                }
            }
        });
        if (parentInput.querySelector('label')) {
            parentInput.querySelector('label').style.color = '#d30505';
        }
        if (!container) {
            parentInput.insertAdjacentElement('beforeend', alertContainer);
        }
        formValidationOnInput(section);
        return false;
    } else {
        if (input) {
            input.classList.remove('border-error');
            input.parentElement.classList.remove('errormsg');
        }
        if (parentInput.querySelector('label')) {
            parentInput.querySelector('label').classList.remove('lbl-error');
        }
        input.parentElement.querySelectorAll('img').forEach(function(item) {
            if (item.parentElement.classList.contains('input-group') || item.closest('label')) {
                let src = item.getAttribute('src'),
                    imgType = src.slice(-4),
                    imgName = src.replace(imgType, '');
                if (imgName.slice(-4) === '-red') {
                    let newImgName = imgName.replace(imgName.slice(-4), '');
                    item.setAttribute('src', newImgName + imgType);
                }
            }
        });
        if (container) {
            container.remove();
        }
        return true;
    }
}

// *** Navigate to the pages on click on the steps (stages)
/*
    For the Back-end developer... remove this function
*/
function stagePageOnClick() {
    let stages = document.querySelectorAll('.header.stages .stage.done');
    stages.forEach(function(item) {
        item.addEventListener('click', function() {
            window.location.href = item.getAttribute('data-stage') + '.html';
        });
    })
}

// ********** Load all Components
function loadComponents() {
    let signInSection  = document.querySelector('section.sign-content'),
        home           = document.querySelector('body.home'),
        settings       = document.querySelector('body.user-settings'),
        rideType       = document.querySelector('section.main-content.ride-type'),
        pickup         = document.querySelector('section.main-content.pickup'),
        tour           = document.querySelector('section.main-content.tour'),
        destination    = document.querySelector('section.main-content.destination'),
        customer       = document.querySelector('section.main-content.customer'),
        luggage        = document.querySelector('section.main-content.luggage'),
        vehicle        = document.querySelector('section.main-content.vehicle'),
        payment        = document.querySelector('section.main-content.payment'),
        success        = document.querySelector('section.main-content.success'),
        dashControl    = document.querySelector('section.header.dash-control'),
        mainContent    = document.querySelector('section.main-content'),
        dashContent    = document.querySelector('section.dash-content'),
        quotation      = document.querySelector('body.quotation'),
        prevBtn        = document.querySelector('.prev-btn button'),
        desPoint       = document.querySelector('.destination-point'),
        category, services, loader, successContent;

    // Home page
    if (home) {
        let cover = home.querySelector('.home-section .container-fluid'),
            cover2 = home.querySelector('.home-section > div'),
            navHeight = document.querySelector('nav').offsetHeight;
        cover.style.minHeight = (window.innerHeight - navHeight) + 'px';
        cover2.style.minHeight = (window.innerHeight - navHeight) + 'px';
        document.body.style.paddingTop = navHeight + 'px';
    }

    // Quotation page
    if (quotation) {
        quotationModule(quotation);
    }

    // SignIn page
    if (signInSection) {
        document.body.style.padding = '0px';
        // window resize
        window.addEventListener('resize', setWindowHeight);
        function setWindowHeight() {
            if (window.innerWidth > 665) {
                // set sing-content section height to window height
                signInSection.style.height = window.innerHeight + 'px';
            } else {
                signInSection.style.height = 'inherit';
            }
        }
        setWindowHeight();
    }

    if (dashControl || dashContent) {
        dashboardComponent(dashControl, dashContent);
    } else {
        if (document.querySelector('section.header.stages')) {
            sideMenuComponent(mainContent);
            stagePageOnClick();
        }
    }

    if (settings) {
        settingsComponent(settings);
    }

    if (rideType) {
        category = rideType.querySelectorAll('.left-content .category');
        category.forEach(function(item) {
            item.addEventListener('click', function() {
                selectCategory(rideType, item, category, true);
            });
        });
    }
    if (pickup) {
        pickupComponent(pickup);
    }
    if (desPoint) {
        category = desPoint.querySelectorAll('.left-content .category');
        category.forEach(function(item) {
            item.addEventListener('click', function() {
                selectCategory(desPoint, item, category, true);
            });
        });
    }
    if (tour) {
        tourComponent(tour);
    }
    if (destination) {
        destinationComponent(destination);
    }
    if (customer) {
        customerComponent(customer);
    }
    if (luggage) {
        luggageComponent(luggage);
    }
    if (vehicle) {
        category = vehicle.querySelectorAll('.left-content .category');
        services = vehicle.querySelectorAll('.services');
        category.forEach(function(item) {
            item.addEventListener('click', function() {
                selectCategory(vehicle, this, category, true);
            })
        });
        services.forEach(function(item) {
            item.addEventListener('click', function() {
                selectCategory(vehicle, this, services, false);
            });
        })
        formValidationOnInput(vehicle);
    }
    if (payment) {
        category = payment.querySelectorAll('.left-content .category');
        category.forEach(function(item) {
            item.addEventListener('click', function() {
                selectCategory(payment, this, category, true);
            })
        });
        formValidationOnInput(payment);
    }
    if (success) {
        loader         = success.querySelector('.loader');
        successContent = success.querySelector('.success-content');
        setTimeout(function() {
            loader.remove();
            successContent.classList.add('active');
        }, 1500)
    }
    if (prevBtn) {
        prevBtn.addEventListener('click', prevBtnFun);
    }
}