const forms = document.querySelectorAll(".needs-validation");

/**
 * Scroll the window to top
 */
function toTop() {
    window.scrollTo({ top: 0 });
}

function announce() {
    const field = document.getElementById("numbers");

    if (!field.value) {
        return;
    }

    let nums = field.value.trim().split(",");
    // checks if the user entered alteast 10 values
    let valid = nums.length >= 10;

    if (valid) {
        // converting each value to a float for mathematical operations
        nums = nums.map((num) => parseFloat(num));
        // checking if all the numbers are in range of [1,100]
        valid = nums.every((num) => num >= 1 && num <= 100);
    }

    // setting invalid/valid classes so user can identify
    field.classList.toggle("is-invalid", !valid);
    field.classList.toggle("is-valid", valid);

    if (valid) {
        const chance = Math.random();
        if (chance > 0.5) {
            alert("You won a free movie ticket :)");
        } else {
            alert("You unfortunately did not win a free movie ticket :(");
        }
    }
}

/**
 * Checks if the form is valid on submission
 */
Array.from(forms).forEach((form) => {
    form.addEventListener(
        "reset",
        (event) => {
            form.classList.remove("was-validated");
            form.reset();
        },
        false
    );
    form.addEventListener(
        "submit",
        (event) => {
            const submitConfirmation = new bootstrap.Modal(
                "#submitConfirmation",
                {
                    backdrop: "static",
                    keyboard: false,
                }
            );
            if (!form.checkValidity()) {
                // Preventing the default behaviour and stopping the event propagation to the parent elements
                event.preventDefault();
                event.stopPropagation();
                form.classList.add("was-validated");
            } else {
                // showing confirmation dialog after form submission without any errors
                event.preventDefault();
                submitConfirmation.show();
                form.classList.remove("was-validated");
                form.reset();
            }
        },
        false
    );
});
