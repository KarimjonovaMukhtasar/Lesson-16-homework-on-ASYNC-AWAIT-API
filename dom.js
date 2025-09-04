const form = document.querySelector("#form");
const formm = document.querySelector("#formm"); 

//FAKE USERS ARRAY
// const users = [
//     {
//         firstName: "Ahmad",
//         lastName: "Aliyev",
//         email: "ahmad@email.com",
//         password: "123456"
//     },
//     {
//         firstName: "Madina",
//         lastName: "Karimova",
//         email: "madina@email.com",
//         password: "password"
//     },
//     {
//         firstName: "Bobur",
//         lastName: "Rahimov",
//         email: "bobur@email.com",
//         password: "qwerty"
//     }
// ];
//EMAIL VALIDATION
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
//NAME VALIDATION
function validateName(name) {
    return name.length >= 2 && /^[a-zA-Z\s]+$/.test(name);
}
// PASSWORD VALIDATION
function validatePassword(password) {
    return password.length >= 6;
}
// BUTTON FUNCTIONS:
function showLoading(button) {
    button.innerHTML = 'Loading...';  
    button.disabled = true; 
}         
function hideLoading(button, originalText) {
    button.innerHTML = originalText;
    button.disabled = false;        }
//SUCCESS/ALERT FUNCTIONS:
function showSuccessMessage(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert success';
    alertDiv.textContent = message;
    const container = document.getElementById("success");
    container.innerHTML = "";
    container.appendChild(alertDiv);
}
function showErrorMessage(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert error';
    alertDiv.textContent = message;
    const container = document.getElementById("error");
    container.innerHTML = "";
    container.appendChild(alertDiv);
}
//SIGNUP FUNCTION ASYNC 
async function signupAPI({firstName, lastName, email,password}){
    const button = document.querySelector("#signupbtn");
    const originalText = button.innerHTML;
    try{
        showLoading(button)
        const response = await fetch('https://682f107d746f8ca4a47fa71c.mockapi.io/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({firstName,lastName,email,password})
        });
        const data = await response.json();
        console.log(data)
        console.log("Status:", response.status); 
        console.log("OK:", response.ok);       
        console.log("Response data:", data);    
        if(response.ok){
            // showSuccessMessage("Muvaffaqiyatli ro'yxatdan o'tdingiz!");
            alert("Muvaffaqiyatli ro'yxatdan o'tdingiz!")
            return true
        } else {
            alert("Xatolik yuz berdi")
            showErrorMessage(data.message || 'Xatolik yuz berdi');
            return false
        }
    }catch (error){
        alert("Server bilan bog'lanishda xatolik")
        showErrorMessage("Server bilan bog'lanishda xatolik");
        return false;
    } finally {
         hideLoading(button, originalText);
    }
}
//SIGNUP USER 
async function signupUser({firstName, lastName, email, password}) {
    try {
        const response = await fetch('https://682f107d746f8ca4a47fa71c.mockapi.io/products');
        const users = await response.json();
        console.log(users)
        // let data = users.forEach(user => {firstName = user.firstname, lastName = user.lastname, email = user.email, password = user.password} )
        // console.log(data[0])
        // Check if email already exists
        let exists = users.find(u => u.email === email);
        if(exists !== undefined){
            showErrorMessage("Bu email bilan foydalanuvchi mavjud. Iltimos, SIGN IN qiling!");
            return;
        }
        // Register new user
       const success = await signupAPI({ firstName, lastName, email, password });
       if (success) {
        alert("Tabriklaymiz, muvaffaqiyatli ro'yxatdan o'tdingiz!");
        if (confirm("Tizimga kirishni xohlaysizmi?")) {
              window.location.href = "./signin.html";
    }
}
    } catch (err) {
        showErrorMessage("Server bilan bog'lanishda xatolik");
    }
}

//LOGIN USER
async function LoginUser({email,password}) {
    try {
        // Fetch all users
        const response = await fetch('https://682f107d746f8ca4a47fa71c.mockapi.io/products');
        const users = await response.json();
        let check = false
        for(let key in users){
            if(key.email === email && key.password === password){
                check = true
            }
        }
        if(check){
            alert("Tabriklaymiz, muvaffaqiyatli tizimga kirdingiz!")
            showSuccessMessage("Tabriklaymiz, muvaffaqiyatli tizimga kirdingiz!");
            return;
        }
        else{
            alert("Email yoki parol noto'g'ri")
            showErrorMessage("Email yoki parol noto'g'ri");
            if (confirm("Yangi ro'yxatdan o'tishni xohlaysizmi?")) {
            window.location.href = "./signup.html";
        }
    }
    } catch (err) {
        alert("Server bilan bog'lanishda xatolik")
        showErrorMessage("Server bilan bog'lanishda xatolik");
    }  
}
 // 1. Validationlarni tekshirish
if(form){
    document.getElementById('form').addEventListener('submit', function(e) {
    e.preventDefault();
     document.querySelectorAll(".error-message").forEach(el => {
        el.style.display = "none";
        el.textContent = "";
    });
    const firstName = document.getElementById('firstname').value;
    const lastName = document.getElementById('lastname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm').value;

    let name = false
    const errorfname = document.getElementById('failfirstname');
    if (!validateName(firstName)) {
        this.classList.add('error');
        errorfname.textContent = "Ism kamida 2 ta harf bo'lishi kerak";
        errorfname.style.color = "red"
        errorfname.style.display = 'block';
    } else {
        name  = true
        this.classList.remove('error');
        errorfname.style.display = 'none';
    }
    let lname = false
    const errorlname = document.getElementById('faillastname');
    if (!validateName(lastName)) {
        this.classList.add('error');
        errorlname.textContent = "Familiya kamida 2 ta harf bo'lishi kerak";
        errorlname.style.color = "red"
        errorlname.style.display = 'block';
    } else {
        lname = true
        this.classList.remove('error');
        errorlname.style.display = 'none';
    }

        let emailcheck = false
        const erroremail = document.getElementById('failemail');
        if (!validateEmail(email)) {
            this.classList.add('error');
            erroremail.textContent = "Emailda @ belgisi bo'lishi kerak";
            erroremail.style.color = "red"
            erroremail.style.display = 'block';
        } else {
            emailcheck = true
            this.classList.remove('error');
            erroremail.style.display = 'none';
    }
    let passwordcheck = false
        const errorpassword = document.getElementById('failpassword');
        if (!validatePassword(password)) {
            this.classList.add('error');
            errorpassword.textContent = "Passwordda kamida 6 ta belgi bo'lishi kerak";
            errorpassword.style.color = "red"
            errorpassword.style.display = 'block';
        } else {
            passwordcheck = true
            this.classList.remove('error');
            errorpassword.style.display = 'none';
    }
        let confirmcheck = false
        const errorconfirm = document.getElementById('failconfirm');
        if (password !== confirmPassword) {
            this.classList.add('error');
            errorconfirm.textContent = "Confirm Password Password bilan bir xil bo'lishi kerak";
            errorconfirm.style.color = "red"
            errorconfirm.style.display = 'block';
        } else {
            confirmcheck = true
            this.classList.remove('error');
            errorconfirm.style.display = 'none';
    }  
    // 2. Email mavjudligini tekshirish
    // 3. Users arrayga qo'shish
    // let search = users.find(user => user.email === email)
    const successDiv = document.getElementById('success')
    successDiv.style.display = "none";
    successDiv.textContent = "";
    const errorregister = document.getElementById('failregister');
    if(name && lname && emailcheck && passwordcheck && confirmcheck){
         this.classList.add('success');
         signupUser(firstName, lastName, email, password)
            // users.push({firstName, lastName, email, password})
            
            // alert("Tabriklaymiz, Muvaffaqiyatli ro'yxatdan o'tdingiz!")
    //         successDiv.textContent = "Tabriklaymiz, Muvaffaqiyatli ro'yxatdan o'tdingiz!";
    //         successDiv.style.display = 'block';
    //         if(confirm("TIZIMGA KIRISHNI XOHLAYSIZMI?")){
    //             window.location.href = "./signin.html"
    //         }
    //         else{
    //         console.log(users)
    //         successDiv.textContent = "Tabriklaymiz, Muvaffaqiyatli ro'yxatdan o'tdingiz!";
    //         successDiv.style.display = 'block';
    //         }
    //     } else if(search !== undefined){
    //         this.classList.add('error');
    //         errorregister.textContent = "Bu Emaildagi foydalanuvchi mavjud! SIGN IN orqali kiring!";
    //         errorregister.style.color = "red"
    //         errorregister.style.display = 'block';
    //         if(confirm("TIZIMGA KIRISHNI XOHLAYSIZMI?")){
    //             window.location.href = "./signin.html"
    //         }
    // } 
    // else{
    //     this.classList.add('error');
    //     errorregister.textContent = "Iltimos kiritilgan ro'yxatdagi xatolarni to'g'rilang!";
    //     errorregister.style.display = 'block';   
    // }
}})}
if(formm){
    document.getElementById('formm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.querySelectorAll(".error-message").forEach(el => {
        el.style.display = "none";
        el.textContent = "";
    });
    const email = document.getElementById('emaill').value;
    const password = document.getElementById('passwordd').value;
    const successLogin = document.getElementById('success')
    successLogin.style.display = "none";
    successLogin.textContent = "";
    LoginUser(email,password)
    // const errorLogin = document.getElementById('failregister');  
    // 1. Users arraydan foydalanuvchini topish       
    // 2. Parolni tekshirish
    // let search =  users.find(user => user.email === email && user.password === password)
    // 3. Success/Error xabarini ko'rsatish
    // if(search !== undefined){
    //      this.classList.add('success');
    //         successLogin.textContent = "Tabriklaymiz, Tizimga Muvaffaqiyatli kirdingiz!"
    //         console.log(users)
    //         successLogin.style.display = 'block';
            
    //     } else {
    //         this.classList.add('error');
    //         errorLogin.textContent = "Hali ro'yxatdan o'tmagansiz! SIGN UP orqali register qiling!";
    //         window.location.href = "./signup.html"
    //         errorLogin.style.display = 'block';
    //         console.log(users)
    // } 
});
}