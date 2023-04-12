export class Contact {
  constructor({id, city, phone, officeAddress}) {
    this.id = id;
    this.city = city;
    this.phone = phone;
    this.officeAddress = officeAddress;
  }
  
  // Contact generator
  generateContact() {
    let template = '';
    const contact = document.createElement('div');
    contact.className = 'contacts__card';
    contact.setAttribute('data-id', this.id);
    if (this.city) {
      template += '<div class="contacts__card-line">' +
        '<div class="contacts__card-lbl">City:</div>' +
        `<div class="contacts__card-val">${this.city}</div>` +
      '</div>';
    }
    if (this.phone) {
      template += '<div class="contacts__card-line">' +
        '<div class="contacts__card-lbl">Phone:</div>' +
        `<div class="contacts__card-val">${this.phone}</div>` +
      '</div>';
    }
    if (this.officeAddress) {
      template += '<div class="contacts__card-line">' +
        '<div class="contacts__card-lbl">Office adress:</div>' +
        `<div class="contacts__card-val">${this.officeAddress}</div>` +
      '</div>';
    }
	  if (this.phone) {
      const cleanedPhoneNumber = this.phone.replace(/[^\d]/g, "");
      template += `<a href="tel:${cleanedPhoneNumber}" class="contacts__card-btn">Call us</a>`;
    }
    contact.innerHTML = template;
    return contact;
  }
}
