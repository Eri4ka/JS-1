<h1 align="center">Билеты на события</h1>
<h3 style="font-weight: bold">Часть 2</h3>

Таблица в виде JSON массива с вложенными объектами, где каждый объект - это заказ.
Массив tickets содержит билеты по заказу с уникальным идентификатором и штрихкодом.
```JavaScript
[
  {
    "equal_price": 2900,
    "ticket_kid_price": 450,
    "ticket_kid_quantity": 2,
    "ticket_adult_price": 700,
    "ticket_adult_quantity": 2,
    "ticket_group_price": 900,
    "ticket_group_quantity": 0,
    "ticket_benefit_price": 300,
    "ticket_benefit_quantity": 2,
    "id": 1,
    "event_date": "2021-08-21 13:00:00",
    "event_id": "001",
    "created": "22-10-2022 14:26:23",
    "barcode": 2524788,
    "user_id": 363,
    "tickets": [
      {
        "id": 1,
        "barcode": 2352830
      },
      {
        "id": 2,
        "barcode": 2463854
      },
      {
        "id": 3,
        "barcode": 2274128
      },
      {
        "id": 4,
        "barcode": 2692666
      },
      {
        "id": 5,
        "barcode": 2172304
      },
      {
        "id": 6,
        "barcode": 2098783
      }
    ]
  },
  {
    "equal_price": 1600,
    "ticket_kid_price": 800,
    "ticket_kid_quantity": 2,
    "ticket_adult_price": 1000,
    "ticket_adult_quantity": 0,
    "id": 2,
    "event_date": "2021-07-29 18:00:00",
    "event_id": "002",
    "created": "22-10-2022 14:26:50",
    "barcode": 2940894,
    "user_id": 363,
    "tickets": [
      {
        "id": 7,
        "barcode": 2843165
      },
      {
        "id": 8,
        "barcode": 2477581
      },
      {
        "id": 9,
        "barcode": 2216561
      },
      {
        "id": 10,
        "barcode": 2909676
      },
      {
        "id": 11,
        "barcode": 2979291
      },
      {
        "id": 12,
        "barcode": 2980229
      }
    ]
  }
]
````

Билеты по заказу реализовал с помощью дополнительного поля в виде массива, чтобы можно было в разрезе заказа смотреть информацию по входящим в нее билетам. Получилось что-то на уровне NoSQL.

Создание билетов происходит с помощью формы. Данные о события хранятся в файле db.json



