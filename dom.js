// SIGN UP NODES:
const btnEl = document.querySelector("button")
const usernameEl = document.querySelector("#username")
const emailEl = document.querySelector("#email")
const pswrdEl = document.querySelector("#password")
const confirmEl = document.querySelector("#confirm")
const emailFailedMsg = document.querySelector("#failemail")
const passwordFailedMsg = document.querySelector("#failpassword")
const confirmFailedMsg = document.querySelector("#failconfirm")
const form = document.querySelector("#form")

const email = document.querySelector("#emaill")
const pswrd = document.querySelector("#passwordd")
const formm = document.querySelector("#formm")

let database = [{ username: "MK", email: "mk@gmail.com", password: "Abc123456" }, 
        {username: "Qwerty", email: "qwerty@gmail.com", password: "Qwerty123"},
        {username: "Somebody", email: "smby@gmail.com", password: "Something12"},
       {username: "User", email: "user@gmail.com", password: "Tester123"},
        {username: "Ultra", email: "ultra@gmail.com", password: "Ultra123"}
]
console.log(database);
if (form) {
    form.addEventListener("submit", (e) => {
        let checkemail = false
        let checkpassword = false
        let checkconfirm = false
        e.preventDefault()
        //EMAIL CHECKMENT 
        if (!emailEl.value.includes("@")) {
            emailFailedMsg.textContent = "Email must contain @ character"
            emailFailedMsg.style.color = "red"
        }
        else if (!emailEl.value.includes(".")) {
            emailFailedMsg.textContent = "Email must contain . character"
            emailFailedMsg.style.color = "red"
        }
        else {
            checkemail = true
            emailFailedMsg.textContent = "";
        }

        //PASSWORD CHECKMENT
        if (!/[A-Z]/g.test(pswrdEl.value)) {
            passwordFailedMsg.textContent = "Password must contain Capital Letter"
            passwordFailedMsg.style.color = "red"
        }
        else if (!/[a-z]/g.test(pswrdEl.value)) {
            passwordFailedMsg.textContent = "Password must contain Small letters"
            passwordFailedMsg.style.color = "red"
        }
        else if (!/[0-9]/g.test(pswrdEl.value)) {
            passwordFailedMsg.textContent = "Password must contain Digits"
            passwordFailedMsg.style.color = "red"
        }
        else if (pswrdEl.value.length < 8) {
            passwordFailedMsg.textContent = "Password must contain at least 8 characters"
            passwordFailedMsg.style.color = "red"
        }
        else {
            checkpassword = true
            passwordFailedMsg.textContent = "";
        }

        //CONFIRMATION CHECKMENT
        if (confirmEl.value !== pswrdEl.value) {
            confirmFailedMsg.textContent = "Confirmation must be the same as Password"
            confirmFailedMsg.style.color = "red"
        }
        else {
            checkconfirm = true
            confirmFailedMsg.textContent = "";
        }
        //EXISTENCE CHECKMENT
        let search = database.find(a => a.email === emailEl.value)
        if (search !== undefined) {
            if (confirm("You have already an account, do you want to sign in now?")) {
                window.location.href = "./signin.html"
                alert("YOU HAVE AN ACCOUNT, PRESS SIGN IN")
            }
        }
        else {
            database.push({ username: usernameEl.value, email: emailEl.value, password: pswrdEl.value })
        }
        if (checkpassword && checkemail && checkconfirm) {
            alert('SIGNED UP SUCCESSFULLY')
            console.log(database)
            window.location.href = "./signin.html"
        }
        else {
            alert('ERROR! CHECK THE ENTERED DETAILS AND BE ATTENTIVE!')
        }
    })
}

if (formm) {
    formm.addEventListener("submit", (e) => {
        e.preventDefault()
        let searched = database.find(a => a.password === pswrd.value && a.email === email.value)
        if (searched !== undefined) {
            alert("CONGRATULATIONS! SIGNED IN SUCCESSFULLY! WELCOME TO YOUR ACCOUNT!")
            console.log(database)
        }
        else {
            alert("ERROR! YOU HAVE NOT SIGNED UP YET, PLEASE CREATE YOUR ACCOUNT FIRST!")
            window.location.href = "./signup.html"
        }
    })
}


