form.addEventListener("submit",()=>{
    const login = {
        email: email.value,
        password: password.value,
        username: username.value
    }
    console.log(login.email);
    console.log(login.password);
    console.log(login.username);
    fetch("api/login", {
        method: "POST",
        body: JSON.stringify(login),
        headers: {
            "content-type": "application/json"
        }
    }).then(res => res.json())
        .then(data => {
            if(data.status == "error") {
                success.style.display = "none"
                error.style.display = "block"
                error.innerText = data.error
            } else {
                success.style.display = "none"
                success.style.display = "block"
                error.innerText = data.error
            }
        })
});