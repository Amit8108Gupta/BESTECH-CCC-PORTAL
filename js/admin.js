// ======================================
// BESTECH Admin Panel
// ======================================

const API_URL =
"https://script.google.com/macros/s/AKfycbw_ZA-csIdjGBLjHteeNNiNdIbgjN-Kzitl81quPJlo0PweFkZ_ROQmR9nspMDVTC14/exec";

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", adminLogin);

async function adminLogin(){

    const username =
    document.getElementById("adminUser").value.trim();

    const password =
    document.getElementById("adminPass").value.trim();

    if(username===""){

        alert("Enter Username");

        return;

    }

    if(password===""){

        alert("Enter Password");

        return;

    }

    loginBtn.disabled = true;

    loginBtn.innerText = "Please Wait...";

    try{

        const response = await fetch(API_URL,{

            method:"POST",

            body:JSON.stringify({

                action:"adminLogin",

                username:username,

                password:password

            })

        });

        const result = await response.json();

        loginBtn.disabled = false;

        loginBtn.innerText = "LOGIN";

        if(result.success){

            localStorage.setItem("adminLogin","YES");

            window.location.href="dashboard.html";

        }else{

            alert(result.message);

        }

    }catch(err){

        loginBtn.disabled = false;

        loginBtn.innerText = "LOGIN";

        alert("Unable to connect server.");

        console.log(err);

    }

}