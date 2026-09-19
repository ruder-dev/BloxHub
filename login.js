//Variables
const guest_login_button = document.getElementById("guest-login-button")
const discord_login_button = document.getElementById("discord-login-button")
//Config
const max_number = 100000;
const min_number = 2
//Main code
//Functions

function GenerateRandomNumber() {
    let random_number = Math.floor(Math.random() * (max_number - min_number) + min_number)
    console.log("Random number generatead (random_number): " + random_number)
    return random_number
}


function CreateAccount(key,account_type) {
    localStorage.setItem("Username",key)
    localStorage.setItem("Account-Creation",Date.now())
    localStorage.setItem("Account-Type",account_type)
    localStorage.setItem("Logged-In",true)
    localStorage.setItem("Clients",JSON.stringify({}))
    localStorage.setItem("Display-Name",key || "unknown")

    console.log("localStorage: " , localStorage)
    console.log(`Created: ${key} at: ${GetPropertyFromAccount("Account-Creation")}`)
}


function CheckIfUserHasAccount() {
    if (!localStorage.getItem("Logged_In")) {
        return false
    }
    return true
}

function GetPropertyFromAccount(property_needed) {

    let info = localStorage.getItem(property_needed)
    if(!info) {
        console.warn(`Couldn't get ${property_needed} in localStorage!`);
        return null
    }

    return info
    
}


function ChangeUserWindow(event) {

    let username = GetPropertyFromAccount("Username")
    console.log(` Moving ${username} from the login page to the dashboard!`)

    window.location.replace("pages/dashboard/dashboard.html")

    if (!event) {
        console.warn("Event was not provided!")
        return
    }
    event.preventDefault()

}

//Event listeners

guest_login_button.addEventListener('click',function() {

    if (CheckIfUserHasAccount() === true) {
        console.warn("User already has an account!")
        return
    }
    console.log("User created a guest account")
    

    let guest_account_key = "Guest_" + GenerateRandomNumber()
    CreateAccount(guest_account_key,"Guest")
    
    ChangeUserWindow(event)
})

discord_login_button.addEventListener('click',function() {


    if (CheckIfUserHasAccount() === true) {
        console.warn( GetPropertyFromAccount("Username") + " already has an account!")
        return
    }

    let standard_account_key = "Standard_" + GenerateRandomNumber()
    CreateStandardAccount(standard_account_key,"Standard")
    

    
    ChangeUserWindow(event)
})

