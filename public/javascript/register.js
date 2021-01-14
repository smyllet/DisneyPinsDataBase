function valideSubmit() {
    if(equalsPassword()) return true
    else {
        $('#register_form_error_password_message').removeAttr("hidden")
        $('#register_form_password').addClass("error_input")
        $('#register_form_rewrite_password').addClass("error_input")
        return false
    }
}

function equalsPassword() {
    return ($('#register_form_password').val() === $('#register_form_rewrite_password').val())
}