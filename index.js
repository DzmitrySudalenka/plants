console.log(
  'При нажатии на кнопки:Gargens,Lawn,Planting  \n' +
  'происходит смена фокуса на услугах в разделе service'.padEnd(55, ' ') + '+50\n\n' +
  'Accordion в секции prices реализация   \n' +
  '3-х выпадающих списков об услугах и ценах'.padEnd(55, ' ') + '+50\n\n' +
  'В разделе contacts реализован select с выбором городов'.padEnd(55, ' ') + '+25'
);

import { Contact } from './js/Contact.js'

const data = [
  {
    id: 1,
    city: 'Canandaigua, NY',
    phone: '+1 585 393 0001',
    officeAddress: '151 Charlotte Street'
  },
  {
    id: 2,
    city: 'New York City',
    phone: '+1 718-997-5000',
    officeAddress: '65-30 Kissena Blvd'
  },
  {
    id: 3,
    city: 'Yonkers, NY',
    phone: '+1 914-969-0909',
    officeAddress: '270 Nepperhan Ave'
  },
  {
    id: 4,
    city: 'Sherrill, NY',
    phone: '+1 315-363-0600',
    officeAddress: '1479 Genesee St'
  }
];

window.onload = function() {
  // Navigation
  addNavigationClickHandler();
  // Service
  addServiceClickHandler();
  // Prices
  addPricesClickHandler();
  // Contacts
  if (data) {
    renderContactsToDom();
  }
  addContactsClickHandler();
  addCloseSelectHandler();
  addContactsCardClickHandler();
}

// Navigation

const addNavigationClickHandler = () => {
  const navWrap = document.querySelector('.nav-wrap');
  navWrap.addEventListener('click', (e) => {
    const clickedElClassList = e.target.classList;
    if (clickedElClassList.contains('nav__btn')       || 
        clickedElClassList.contains('nav__btn-item')  || 
        clickedElClassList.contains('nav__link')      || 
        clickedElClassList.contains('nav-bg')
    ) {
      navWrap.classList.toggle('nav_active');
    }
  })
}

// Service

let selectedCategories = [];

const addServiceClickHandler = () => {
  document.querySelector('.service__btns').addEventListener('click', (e) => {
    if (e.target.classList.contains('service__btn')) {
      const clickedBtn = e.target;
      const curCat = clickedBtn.getAttribute('data-category');
      changeSelectedCategories(curCat);
      removeServicesActivity();
      activateSelectedCategories();
    }
  })
}

const changeSelectedCategories = (curCat) => {
  if (selectedCategories.includes(curCat)) {
    selectedCategories = selectedCategories.filter(cat => cat != curCat);
  } else {
    if (selectedCategories.length >= 2) {
      selectedCategories = [];
    }
    selectedCategories.push(curCat);
  }
}

const removeServicesActivity = () => {
  const serviceBtns = document.querySelectorAll('.service__btn');
  const serviceItems = document.querySelectorAll('.service__item');
  serviceBtns.forEach(serviceBtn => serviceBtn.classList.remove('service__btn_active'));
  serviceItems.forEach(serviceItem => serviceItem.classList.remove('service__item_active'));
}

const activateSelectedCategories = () => {
  if (selectedCategories.length) {
    for (const service of selectedCategories) {
      const activeBtns = document.querySelectorAll('.service__btn[data-category=' + service + ']');
      const activeItems = document.querySelectorAll('.service__item[data-category=' + service + ']');
      activeBtns.forEach(serviceBtn => serviceBtn.classList.add('service__btn_active'));
      activeItems.forEach(serviceBtn => serviceBtn.classList.add('service__item_active'));
    }
  } else {
    const serviceItems = document.querySelectorAll('.service__item');
    serviceItems.forEach(serviceItem => serviceItem.classList.add('service__item_active'));
  }
}

// Prices

const addPricesClickHandler = () => {
  document.querySelector('.prices__items').addEventListener('click', (e) => {
    if (e.target.classList.contains('prices__item-btn')) {
      location.href = '#contacts';
    } else {
      const clickedItem = e.target.closest('.prices__item');
      changePricesActivity(clickedItem);
    }
  })
}

const changePricesActivity = (clickedItem) => {
  if (clickedItem) {
    const pricesItems = document.querySelectorAll('.prices__item');
    pricesItems.forEach(pricesItem => {
      pricesItem === clickedItem ?
        pricesItem.classList.toggle('prices__item_active') :
        pricesItem.classList.remove('prices__item_active')
    })
  }
}

// Contacts

const renderContactsToDom = () => {
  const contactsWrap = getContactsWrapper();
  generateContacts(data).forEach(contact => {
    contactsWrap.append(contact.generateContact());
  });
}

const getContactsWrapper = () => {
  let contactsWrap = document.querySelector('.contacts__card-wrap');
  contactsWrap.innerHTML = '';
  return contactsWrap;
}

const generateContacts = (data) => {
  let contacts = [];
  data.forEach(contact => {
    contacts.push(new Contact(contact));
  });
  return contacts;
}

const addContactsClickHandler = () => {
  replaceSelectByCustom();
  const customSelect = document.querySelector('.contacts__custom-select');
  customSelect.addEventListener('click', (e) => {
    if (e.target.classList.contains('custom-select__option')) {
      customSelect.classList.toggle('contacts__custom-select_active');
      const clickedOption = e.target;
      const clickedOptionIndex = +clickedOption.getAttribute('data-index');
      changeActiveOption(clickedOption);
      changeOriginalSelectOption(clickedOptionIndex);
      clickedOption.classList.add('custom-select__option_active');
      if (clickedOptionIndex) {
        activateContactsCard(clickedOptionIndex);
      }
    }
  })
}

const changeActiveOption = (clickedOption) => {
  const options = document.querySelectorAll('.custom-select__option');
  options.forEach(option => option.classList.remove('custom-select__option_active'));
  clickedOption.classList.add('custom-select__option_active');
}

const changeOriginalSelectOption = (index) => {
  const originalSelect = document.querySelector('.contacts__select');
  originalSelect.selectedIndex = index;
}

const activateContactsCard = (id) => {
  const cards = document.querySelectorAll('.contacts__card');
  cards.forEach(card => card.classList.remove('contacts__card_active'));
  const activationCard = document.querySelector('.contacts__card[data-id="' + id + '"]');
  activationCard.classList.add('contacts__card_active');
}

const addCloseSelectHandler = () => {
  document.addEventListener("click", (e) => {
    if (!e.target.closest('.contacts__custom-select')) {
      document.querySelector('.contacts__custom-select').classList.remove('contacts__custom-select_active');
    }
  })
}

const replaceSelectByCustom = () => {
  const originalSelect = document.querySelector('.contacts__select');
  const options = originalSelect.options;
  const customSelectWrap = document.createElement('div');
  customSelectWrap.className = 'contacts__custom-select-wrap';
  const customSelect = document.createElement('div');
  customSelect.className = 'contacts__custom-select';
  let isFirstOption = true;
  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    const isOptionDisabled = option.disabled;
    customSelect.innerHTML += 
      '<div class="custom-select__option' +
        (isFirstOption ? ' custom-select__option_active' : '') + '" ' +
        'data-index="' + i + '" ' +
        'data-disabled="' + (isOptionDisabled ? 'true' : 'false') + '">' +
          option.innerText + 
      '</div>';
    if (isFirstOption) {
      isFirstOption = false;
    }
  }
  customSelectWrap.append(customSelect);
  originalSelect.after(customSelectWrap);
}

const addContactsCardClickHandler = () => {
  document.querySelector('.contacts__card-wrap').addEventListener('click', (e) => {
    if (e.target.classList.contains('contacts__card-btn')) {
      console.log('contacts__card-btn');
    }
  })
}
