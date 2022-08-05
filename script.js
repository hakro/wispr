const btnRandom = document.querySelector("#btn-random")
const btnGenerateLink = document.querySelector("#btn-generate-link")
const inputPassphrase = document.querySelector("#input-passphrase")
const passphraseHelp = document.querySelector("#passphrase-help")
const selectBurnafter = document.querySelector("#select-burnafter")
const textSecret = document.querySelector("#text-secret")
const secretHelp = document.querySelector("#secret-help")
const notification = document.querySelector(".notification#flash")
const btnsDeleteNotification = document.querySelectorAll(
    ".notification .delete"
)

btnGenerateLink.addEventListener("click", (e) => {
    e.preventDefault()
    if (!inputIsValid()) {
        return
    }
    fetch("/api/secret")
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log("unable to reach the server: " + error)
            notify(
                "is-danger",
                "There has been an issue connecting to the server"
            )
        })
})

btnRandom.addEventListener("click", () => {
    inputPassphrase.value = (Math.random() + 1).toString(36).substring(2)
})

btnsDeleteNotification.forEach((btn) => {
    btn.addEventListener("click", () => {
        notification.classList.add("is-hidden")
    })
})

function getInput() {
    return {
        passphrase: inputPassphrase.value,
        burnafter: selectBurnafter.value,
        secret: textSecret.value,
    }
}

function inputIsValid() {
    if (inputPassphrase.value == "") {
        passphraseHelp.classList.remove("is-hidden")
        inputPassphrase.classList.add("is-danger")
        return false
    } else {
        passphraseHelp.classList.add("is-hidden")
        inputPassphrase.classList.remove("is-danger")
    }
    if (textSecret.value == "") {
        secretHelp.classList.remove("is-hidden")
        textSecret.classList.add("is-danger")
        return false
    } else {
        secretHelp.classList.add("is-hidden")
        textSecret.classList.remove("is-danger")
    }

    inputPassphrase.classList.remove("is-danger")
    textSecret.classList.remove("is-danger")
    passphraseHelp.classList.add("is-hidden")
    secretHelp.classList.add("is-hidden")

    return true
}

function notify(notifClass, message) {
    // notifClass corresponds to usual Bulma color classes : is-danger, is-primary...
    notification.classList.add(notifClass)
    notification.classList.remove("is-hidden")
    notification.querySelector("p").innerHTML = message
    // Hide after a couple of seconds
    window.setTimeout(() => {
        notification.classList.add("is-hidden")
    }, 5000)
}
