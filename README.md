# Alma Reminder App BackEnd Services


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

* Change directory to AlmaReminder-Server then type npm install
* As the services support caching redis need to be installed locally on
* For Mac use: brew install redis, others you can find them on redis website
https://redis.io/docs/getting-started/installation/install-redis-on-windows/https://redis.io/docs/getting-started/installation/install-redis-on-windows/

running:
* First of all you need to run redis localy, for Mac you can use redis-server command
* For starting the server locally change directory to AlmaReminder-Server then type npm run devStart
* For running tests type change directory to AlmaReminder-Server then npm run test
* For flushing the cach you can open redis cli using redis-cli and typing FLUSHALL


