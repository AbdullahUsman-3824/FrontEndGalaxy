class passwordGenerator {
    constructor() {
        this.weakChars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;
        this.strongChars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+`;
        this.superstrongChars = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?`;
    }
    generatePassword(length, charsSet) {
        let password = "";
        let charSetLength = charsSet.length;
        for (let i = 0; i < length; i++) {
            let randomIndex = Math.floor(Math.random() * charSetLength);
            password += charsSet.charAt(randomIndex);
        }
        return password;
    }
    weakPassword(length) {
        return this.generatePassword(length, this.weakChars);
    }
    strongPassword(length) {
        return this.generatePassword(length, this.strongChars);
    }
    superstrongPassword(length) {
        return this.generatePassword(length, this.superstrongChars);
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const Password = new passwordGenerator();
    const Selector = document.getElementById("passwordSelector");
    const Generate = document.getElementById("generateBtn");
    const Result = document.getElementById("result");
    const Error = document.getElementById("error");

    Generate.addEventListener("click", () => {
        const passwordType = Selector.value;
        let FinalPassword = "";

        if (passwordType === "weak") {
            FinalPassword = Password.weakPassword(8);
        } else if (passwordType === "strong") {
            FinalPassword = Password.strongPassword(12);
        } else if (passwordType === "superstrong") {
            FinalPassword = Password.superstrongPassword(16);
        } else {
            Error.innerHTML = "Enter a valid Strength";
            setTimeout(() => {
                Error.innerHTML = "";
            }, 2000);
        }

        Result.textContent = `${FinalPassword}`;
    });
});
