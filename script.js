/* SECURITY PASSWORD HASH */

function hashPassword(password){

return btoa(password)

}


/* ROOMS DATABASE */

let rooms={

"Ooty":[
{name:"Hill View Resort",price:2500,img:"https://images.unsplash.com/photo-1566073771259-6a8506099945"},
{name:"Tea Garden Stay",price:2000,img:"https://images.unsplash.com/photo-1582719508461-905c673771fd"},
{name:"Luxury Mountain Hotel",price:4000,img:"https://images.unsplash.com/photo-1551882547-ff40c63fe5fa"}
],

"Goa":[
{name:"Beach Resort",price:3500,img:"https://images.unsplash.com/photo-1501117716987-c8e1ecb210f9"},
{name:"Sea Breeze Hotel",price:3000,img:"https://images.unsplash.com/photo-1520250497591-112f2f40a3f4"}
],

"Kerala":[
{name:"Backwater Houseboat",price:4500,img:"https://images.unsplash.com/photo-1582719478250-c89cae4dc85b"},
{name:"Coconut Grove Resort",price:3200,img:"https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"}
],

"Manali":[
{name:"Snow Peak Hotel",price:3000,img:"https://images.unsplash.com/photo-1505691938895-1758d7feb511"},
{name:"Himalayan Resort",price:4200,img:"https://images.unsplash.com/photo-1522708323590-d24dbb6b0267"}
]

}


/* REGISTER */

function register(){

let name=document.getElementById("regName").value
let contact=document.getElementById("regContact").value
let password=document.getElementById("regPassword").value

if(name==""){

alert("Enter your name")
return

}

if(contact.includes("@")){

if(!contact.includes(".")){

alert("Enter valid Gmail")
return

}

}

else{

if(contact.length!=10 || isNaN(contact)){

alert("Mobile must be 10 digits")
return

}

}

if(password.length<8){

alert("Password must be minimum 8 characters")
return

}

let securePassword=hashPassword(password)

localStorage.setItem("user",JSON.stringify({name,contact,password:securePassword}))

alert("Registered Successfully")

}


/* LOGIN */

function login(){

let contact=document.getElementById("loginContact").value
let password=document.getElementById("loginPassword").value

let user=JSON.parse(localStorage.getItem("user"))

let hashed=hashPassword(password)

if(user && contact==user.contact && hashed==user.password){

document.getElementById("authBox").style.display="none"
document.getElementById("mainArea").style.display="block"

document.getElementById("userArea").innerHTML="Welcome "+user.name

}

else{

alert("Invalid Login")

}

}


/* SEARCH */

function searchPlaces(){

let input=document.getElementById("search").value.toLowerCase()

document.querySelectorAll(".place").forEach(function(p){

let name=p.querySelector("h3").innerText.toLowerCase()

p.style.display=name.includes(input)?"block":"none"

})

}


/* AI ROOM SUGGESTION */

function aiSuggest(place){

let list=rooms[place]

let best=list.sort((a,b)=>a.price-b.price)[0]

alert("AI Suggestion: Best room is "+best.name)

}


/* SELECT PLACE */

function book(place){

aiSuggest(place)

document.getElementById("mainArea").style.display="none"

showRooms(place)

}


/* SHOW ROOMS */

function showRooms(place){

document.getElementById("roomsBox").style.display="block"

document.getElementById("roomTitle").innerText="Stays in "+place

let list=""

rooms[place].forEach(function(r){

list+=`

<div class="roomCard">

<img src="${r.img}">

<h3>${r.name}</h3>

<p>₹${r.price}</p>

<button onclick="selectRoom('${r.name}',${r.price})">Select</button>

</div>

`

})

document.getElementById("roomsList").innerHTML=list

}


/* SELECT ROOM */

function selectRoom(name,price){

localStorage.setItem("room",name)
localStorage.setItem("price",price)

document.getElementById("roomsBox").style.display="none"
document.getElementById("bookingBox").style.display="block"

document.getElementById("placeName").innerText=name
document.getElementById("placePrice").innerText="Price ₹"+price

}


/* PAYMENT */

function showPayment(){

document.getElementById("bookingBox").style.display="none"
document.getElementById("paymentBox").style.display="block"

}


/* AI PRICE CALCULATION */

function aiPrice(persons,price){

let total=persons*price

if(persons>=4){

total=total*0.9

}

return total

}


/* PAYMENT PROCESS */

function pay(method){

let persons=document.getElementById("persons").value

let price=localStorage.getItem("price")

let total=aiPrice(persons,price)

let bookingId="TRV"+Math.floor(Math.random()*100000)

let user=JSON.parse(localStorage.getItem("user"))

document.getElementById("paymentBox").style.display="none"
document.getElementById("ticketBox").style.display="block"

document.getElementById("ticketUser").innerText="Name: "+user.name
document.getElementById("ticketPlace").innerText="Room: "+localStorage.getItem("room")
document.getElementById("ticketPersons").innerText="Persons: "+persons
document.getElementById("ticketAmount").innerText="Amount: ₹"+total
document.getElementById("ticketPayment").innerText="Payment: "+method
document.getElementById("ticketId").innerText="Booking ID: "+bookingId

}