$("#login_form_picture").ready(() => {
    autoSizeOfLoginFormPicture()
})

$(window).resize(() => {
    autoSizeOfLoginFormPicture()
})

function autoSizeOfLoginFormPicture()
{
    let height_form = $("#login_form").height()
    let width_form = $('#login_form').width()

    if($("#login_form_picture").position().top < $("#login_form").position().top) $("#login_form_picture").height(width_form).width(width_form)
    else $("#login_form_picture").height(height_form).width(height_form)
}