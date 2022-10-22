import { events, orders } from './db.js';
import { getBarcode } from './helpers.js';

const form = document.querySelector('.form');
const eventSelect = document.querySelector('#event');
const formTicket = document.querySelector('.form-ticket');
const user_id = Math.floor(Math.random() * 1000);
const formButton = document.querySelector('.form__button');

let ordersTotal = 1;
let ticketId = 1;
let tickets = {};
let order = {
    equal_price: [],
};

// Загружает ивенты на страницу
const getEventsToForm = () => {
    events.forEach(item => {
        const option = document.createElement('option');
        option.setAttribute('value', item.id);
        option.textContent = item.name;
        eventSelect.append(option);
    });
    formButton.disabled = true;

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
                        addTicketsToForm(item, i);
                        order[`ticket_${item.type}_quantity`] = 0;
                    });
                }
            });
        } else {
            formButton.disabled = true;
        }
    });
};

// Загружает билеты на страницу
const addTicketsToForm = (item, i) => {
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

    pushTickets(item, i);
};

// Добавляет выбранные билеты в заказ
const pushTickets = (ticket, currentTicket) => {
    order[`ticket_${ticket.type}_price`] = ticket.price;
    const adultCount = document.querySelector(`#count-${ticket.type}`);
    if (adultCount) {
        adultCount.addEventListener('change', () => {
            order[`ticket_${ticket.type}_quantity`] = +adultCount.value;
            order.equal_price[currentTicket] = adultCount.value * ticket.price;

            // Добавляет общее выбранное количество по каждому типу билетов
            const addTicketsCount = () => tickets[`ticket_${ticket.type}_quantity`] = +adultCount.value;

            if (Object.keys(tickets).length === 0) {
                addTicketsCount();
            }
            if (Object.keys(tickets)[currentTicket] === `ticket_${ticket.type}_quantity`) {
                addTicketsCount();
            } else {
                addTicketsCount();
            }
        });
    }
};

getEventsToForm();

// Создает билеты к заказу
const createTickets = () => {
    const ticketsCount = Object.values(tickets).reduce((acc, i) => acc + i, 0);
    const arrayOfTickets = [];
    for (let i = 0; i < ticketsCount; i++) {
        arrayOfTickets.push({id: ticketId, barcode: getBarcode()});
        ticketId++;
    }
    
    return arrayOfTickets;
};

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
            barcode: getBarcode(),
            user_id,
            equal_price,
            tickets: createTickets(),
        };
        ordersTotal++;
        orders.push(currentOrder);
        console.log(JSON.stringify(orders));
    }
});