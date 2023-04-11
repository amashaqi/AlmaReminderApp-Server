# Alma Reminder App Back end services


## Back-end services built using NodeJs and Express with In-memory data


These are back-end services to be integrated with the Alma Reminder Mobile Application containing
REST APIs, their validation, and construction.

Services Supported:


Authentication REST API

1. Getting Authentication Token [POST] => /v1/patient/auth


Users REST API

1. Adding a new user[POST] => /v1/patient/user

Medicines REST APIs

1. Creation For Medicine [POST] => /v1/patient/medicine
2. Get All Medicines [GET] => /v1/patient/medicines
3. Delete a Medicine [DELETE] => /v1/patient/medicine/:id
4. Edit a medicine [PUT] => /v1/patient/medicine/:id


## Postman collection for all the services

https://drive.google.com/file/d/1ke-3IIpAD8226WGmMcjPD85WbNJ9umKr/view?usp=share_link

## Install and running Instructions

Installation:

* change directory to AlmaReminder-Server then type npm install

running:

* For starting the server change directory to AlmaReminder-Server then type npm run devStart
* For running tests type change directory to AlmaReminder-Server then npm run test


