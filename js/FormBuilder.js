class FormBuilder {
    constructor(container) {
        this.FormFields = [];
        this.FormParentContainer = container;
    }

    buildForm = (FormProps) => {
        const formBtn = document.createElement("div");
        const formBtnSpan = document.createElement("span");
        const formContainer = document.createElement("div");

        formBtnSpan.innerHTML = "Submit";

        formBtn.appendChild(formBtnSpan);

        formBtn.setAttribute("class", "app-btn");

        formContainer.setAttribute("class", "form-container")

        FormProps.forEach((prop) => {
            let formInputField;

            const formLabel = document.createElement("label");
            const formInputFieldset = document.createElement("fieldset");

            if (prop.type == "select") {
                let option = document.createElement("option");

                const optGroup = document.createElement("optgroup");

                formInputField = document.createElement("select");

                option.setAttribute("value", "");
                option.setAttribute("textcontent", "Select " + prop.SelectName);
                formInputField.appendChild(optGroup);

                optGroup.appendChild()

                prop.options.forEach((item) => {
                    option = document.createElement("option");
                    option.setAttribute("value", item);
                    optGroup.appendChild()
                });
            } else {
                formInputField = document.createElement("input");
                formInputField.setAttribute("type", prop.type);
            }

            formInputField.setAttribute("id", prop.id);
            formInputField.setAttribute("name", prop.name);

            if (prop.placeholder)
                formInputField.setAttribute("placeholder", prop.placeholder);

            formLabel.innerHTML = this.createSpaceBetweenLetters(prop.name);

            if (prop.type == "checkbox")
                formLabel.setAttribute("class", "form-check-label");

            if (prop.type !== "checkbox")
                formInputField.setAttribute("class", "form-control");
            else
                formInputField.setAttribute("class", "form-check-input");

            if (prop.type !== "checkbox")
                formInputFieldset.setAttribute("class", "form-group");
            else
                formInputFieldset.setAttribute("class", "form-check");

            formInputFieldset.appendChild(formLabel);
            formInputFieldset.appendChild(formInputField);
            formContainer.appendChild(formInputFieldset);
            formContainer.appendChild(formBtn);

            this.FormFields.push(formInputField);

            document.querySelector("." + this.FormParentContainer).appendChild(formContainer);
            formBtn.addEventListener("click", this.submitFormData, false);

            if (prop.type !== "checkbox")
                formInputField.addEventListener("keyup", this.handleFieldChange, false);
            else
                formInputField.addEventListener("click", this.handleFieldChange, false);

        });
    }

    buildFormData = () => {
        const formData = {};
        this.FormFields.forEach((field) => {
            formData[field.name] = field.value;
        });

        return formData;
    }

    handleFieldChange = (event) => {
        const fieldType = (event.target).getAttribute("type");
        const fieldName = (event.target).getAttribute("name");
        const fieldValue = fieldType !== "checkbox" ? (event.target).value : (event.target).checked;

        this.FormFields.forEach((field) => {
            if (field.name == fieldName)
                field.value = fieldValue;

        });
    }

    validateForm = () => {
        const isEmptyValues = this.FormFields.find((item) => { return (item.type == "text" && item.value == ""); });

        if (isEmptyValues)
            return { status: false, message: "Please fill in all required fields" };
        else
            return { status: true, message: "" };

    }

    validateUsername = () => {
        const validRegex = /\s/g;
        const isUsernameInValid = this.FormFields.find((item) => { return (validRegex.test(item.value) && item.name.toLowerCase() == "username"); });

        if (isUsernameInValid)
            return { status: false, message: "Your username should not contain any spaces" };
        else
            return { status: true, message: "" };
    }

    validatePassword = () => {
        const isPasswordInValid = this.FormFields.find((item) => { return (item.value.length < 6 && item.type == "password"); });

        if (isPasswordInValid)
            return { status: false, message: "Your password should not be less than 6 characters." };
        else
            return { status: true, message: "" };
    }

    validateEmail = () => {
        const emailField = this.FormFields.find((field) => { return (field.type == "email") })
        const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; // read on regex expressions

        if (emailField.value.match(validRegex)) {
            return { status: true, message: "" };
        } else {
            return { status: false, message: "Please provide a valid email" };
        }
    }

    createSpaceBetweenLetters(name) {
        return name.replace(/([A-Z])/g, ' $1').trim();
    }
}