const btnRandom = document.querySelector("#btn-random")
const btnGenerateLink = document.querySelector("#btn-generate-link")
const inputPassphrase = document.querySelector("#input-passphrase")
const passphraseHelp = document.querySelector("#passphrase-help")
const selectBurnafter = document.querySelector("#select-burnafter")
const textSecret = document.querySelector("#text-secret")
const secretHelp = document.querySelector("#secret-help")

btnGenerateLink.addEventListener("click", () => {
    if (!inputIsValid()) {
        return
    }
    fetch("http://localhost:7000/api/secret")
        .then((response) => response.json())
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.log(error)
        })
})

btnRandom.addEventListener("click", () => {
    inputPassphrase.value = (Math.random() + 1).toString(36).substring(2)
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
        passphraseHelp.innerHTML = "Passphrase required"
        inputPassphrase.classList.add("is-danger")
        return false
    }
    if (textSecret.value == "") {
        secretHelp.innerHTML = "You need to enter a secret"
        textSecret.classList.add("is-danger")
        return false
    }

    inputPassphrase.classList.remove("is-danger")
    textSecret.classList.remove("is-danger")

    return true
}
