import { events, orders } from './db.js';

const form = document.querySelector('.form');
const eventSelect = document.querySelector('#event');
const formTicket = document.querySelector('.form-ticket');
const user_id = Math.floor(Math.random() * 1000);
const formButton = document.querySelector('.form__button');

let ordersTotal = 1;
let order = {
    equal_price: [],
};

const getEvents = () => {
    events.forEach(item => {
        const option = document.createElement('option');
        option.setAttribute('value', item.id);
        option.textContent = item.name;
        eventSelect.append(option);
    });
    formButton.disabled = true;
};

eventSelect.addEventListener('change', () => {
    const value = eventSelect.value;
    formTicket.innerHTML = '';
    if (value) {
        formButton.disabled = false;
        order = {
            equal_price: [],
        };
        events.forEach(item => {
            if (item.id === value) {
                item.ticketTypes.forEach((item, i) => {
                    addTickets(item, i);
                    order[`ticket_${item.type}_quantity`] = 0;
                });
            }
        });
    } else {
        formButton.disabled = true;
    }
});

const addTickets = (item, i) => {
    const ticket = document.createElement('div');
    ticket.classList.add('form-ticket');
    ticket.innerHTML = `
        <div class="form-ticket__item">
            <div class="form-ticket__type">${item.name}</div>
            <p>Стоимость:
                <span class="form-ticket__price">${item.price}</span>
            </p>
            <label for="count">Выберите количество</label>
            <input id="count-${item.type}" type="number" min="0" value="0">
        </div>
    `;
    formTicket.append(ticket);

    const pushTickets = () => {
        order[`ticket_${item.type}_price`] = item.price;
        const adultCount = document.querySelector(`#count-${item.type}`);
        if (adultCount) {
            adultCount.addEventListener('change', () => {
                order[`ticket_${item.type}_quantity`] = +adultCount.value;
                order.equal_price[i] = adultCount.value * item.price;
            });
        }
    };
    pushTickets();
    
};

getEvents();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const equal_price = order.equal_price.reduce((acc, i) => acc + i, 0);
    if (equal_price === 0) {
        alert('Выберите билеты');
    } else {
        const currentOrder = {
            ...order,
            id: ordersTotal,
            event_date: events.filter(item => item.id === eventSelect.value)[0].eventDate,
            event_id: eventSelect.value,
            created: new Date().toLocaleString().replace(/\./gi, '-').replace(/\,/gi, ''),
            barcode: Math.floor(Math.random() * (3000000-2000000) + 2000000),
            user_id,
            equal_price,
        };
        ordersTotal++;
        orders.push(currentOrder);
        console.log(JSON.stringify(orders));
    }
});