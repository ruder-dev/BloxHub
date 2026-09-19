//Imported Functions
//Variables
//Config
const required_keys = ["Username","Account-Creation","Account-Type","Logged-In","Clients","Display-Name"]
const login_path = `${default_site_root}/index.html`
const dashboard_path = `${default_site_root}/pages/dashboard/dashboard.html`
//Functions

function checkRequiredKeysExist() {
    
    for (const key of required_keys) {
        const data = localStorage.getItem(key)

        if(!data || data === "undefined") {
            console.log(`the value of ${key} is null or undefined. (value): ${data}`)
            return false
        }
    }

    return true
}

function removeExtraKeys() {

    let data_keys = Object.keys(localStorage)
    let extra_keys = data_keys.filter(key => !required_keys.includes(key))

    console.log("All extra keys: " , extra_keys)
    extra_keys.forEach(key => {
        localStorage.removeItem(key)
        console.log("deleted old key (key): ", key)
    })

}

function RedirectUser() {

    let logged_in = localStorage.getItem("Logged-In")
    const currentpath = window.location.pathname
    

    const is_vaild_session = (logged_in === "true") && checkRequiredKeysExist();
    const on_login_page = currentpath.endsWith("index.html") || currentpath.endsWith("/");

    
    if(!is_vaild_session) {
        if(!on_login_page) {
            localStorage.clear()
            console.log(`Moving user to login page is_valid_session ${is_vaild_session} , on_login_page ${on_login_page}`)
            window.location.replace(login_path)
            
        }
        return
    }
    removeExtraKeys()
    const on_dashboard_page = currentpath.includes("dashboard.html");
    if(!on_dashboard_page) {
        console.log("Vaild session! Moving user to dashboard page")
        window.location.replace(dashboard_path)
    }

}
//Exported Functions
//Event Listeners
//Called Functions

