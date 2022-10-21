export const events = [
    {
        id: '001', 
        name: 'Концерт 1', 
        ticketTypes: [
            {
                type: 'kid',
                name: 'Детский билет',
                price: 450,
            },
            {
                type: 'adult',
                name: 'Взрослый билет',
                price: 700,
            },
            {
                type: 'group',
                name: 'Групповой билет',
                price: 900,
            },
            {
                type: 'benefit',
                name: 'Льготный билет',
                price: 300,
            },
        ],
        eventDate: '2021-08-21 13:00:00',
    },
    {
        id: '002', 
        name: 'Концерт 2', 
        ticketTypes: [
            {
                type: 'kid',
                name: 'Детский б0илет',
                price: 800,
            },
            {
                type: 'adult',
                name: 'Взрослый билет',
                price: 1000,
            },
        ],
        eventDate: '2021-07-29 18:00:00',
    },
];

export const orders = [];