## installation of react and node

##  install mongo 3.4 version 

##  Install node 8.9 or heigher

##  Install Angular Cli 6 or heigher

## npm install
this will install all the required packages based on package.json

## for deployment on localhost (for development)
## go to frontend folder and run this command
 npm run dev
## for server side open another terminal, go to server folder and run this command

node server.js
## opne another terminal
npm run build-server

##for deployment on production 
## go to frontend folder and run this command 
 npm run prod
## after that command you can see "dist" folder in frontend side upload that folder on server
## for bacjend its create node folder upload that folder in server side


## check database run command
mongo
show databases;
use employeemirror;
## if you want to see collections run this command:-
show collections;



## Please make sure that the admin record is preinserted in the database.


db.admin_users.insert( 
{
	
	"_id" : ObjectId("5d2d51e9d42ec82703b8b518"),
	"firstName" : "admin",
	"lastName" : "admin",
	"email" : "admin@gmail.com",
	"password" : "admin",
	"roles" : "admin",
	"status" : "verified",
	"createdOn" : ISODate("2019-07-16T04:26:17.074Z"),
	"paidOn" : false,
	"__v" : 0,
	"token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE1NjMyNTIzMzgsImV4cCI6MTU2MzI3MDMzOH0.kio6bPD7lswmzFgUg_iyrrdjVZK26X9oMAs7mqLeRoY",
	"lastLogin" : ISODate("2019-07-16T04:45:38.890Z")


	
})
 db.employees.find().pretty()
{
	"_id" : ObjectId("5d2d51e9d42ec82703b8b519"),
	"userId" : ObjectId("5d2d51e9d42ec82703b8b518"),
	"createdDate" : ISODate("2019-07-16T04:26:17.352Z"),
	"social_media" : [ ],
	"skills" : [ ],
	"education" : [ ],
	"professionalSummary" : [ ],
	"__v" : 0
}

