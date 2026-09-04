const loginBut = document.getElementById("loginBut");
const loginUser = document.getElementById("loginUsername");
const loginPass = document.getElementById("loginPassword");
const errorField = document.getElementById("errorField");

loginBut.addEventListener("click", (event)=>{
    if(loginUser.trim()==""||loginPass.trim()==""){
        event.preventDefault();
        consol.log("Username and Password cannot contain purely whitespace");
        errorField.textContent = "Username and Password cannot contain purely whitespace";
        return false;
    }else{
        errorField.textContent = "";
    }
})