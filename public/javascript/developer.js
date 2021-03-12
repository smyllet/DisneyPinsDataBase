let applicationList = []

$(document).ready(() => {
    getAccountApplicationList().then(() => {
        updateApplicationList()
    })

    $('#developer_panel_application_add_button').on('click', () => {
        let name = $('#developer_panel_application_add_name').val()
        let description = $('#developer_panel_application_add_description').val()

        $.post('/developer/application/new/', {name: name, description: description}).then(() => {
            getAccountApplicationList().then(() => {
                updateApplicationList()

                // Reset Input
                let nameInput = $('#developer_panel_application_add_name')
                nameInput.parent().find('.error_message').remove()
                nameInput.parent().removeClass('error')
                nameInput.val('')
                $('#developer_panel_application_add_button').prop('disabled', true)
                $('#developer_panel_application_add_description').val('')
            })
        })
    })

    $('#developer_panel_application_add_name').on('focusout', (e) => {
        let current = $(e.currentTarget)

        current.parent().find('.error_message').remove()

        if(current.val().length < 1) {
            current.parent().append($('#developer_panel_message_no_name_template').html())
            current.parent().addClass('error')
            $('#developer_panel_application_add_button').prop('disabled', true)
        }
        else if(applicationList.find(app => app.name.toLowerCase() === current.val().toLowerCase())) {
            current.parent().append($('#developer_panel_message_already_use_template').html())
            current.parent().addClass('error')
            $('#developer_panel_application_add_button').prop('disabled', true)
        }
        else {
            current.parent().removeClass('error')
            $('#developer_panel_application_add_button').prop('disabled', false)
        }
    })
})

// Récupération de la liste des demandes de privilège au près du serveur
async function getAccountApplicationList() {
    try {
        await $.get('/developer/getAccountApplicationList', (data) => {
            if(data) applicationList = data.applicationList
            else applicationList = []
        })
    } catch (e) {
        requestsList = []
    }
}

// Update de la liste des applications
function updateApplicationList() {
    let container = $('#developer_panel_application_list')
    let resultContainer = $('#developer_panel_application_result')
    let template = $('#developer_panel_application_list_template').html()

    resultContainer.html($('#developer_panel_message_no_select_template').html())
    container.html('')

    applicationList.forEach(request => {
        let div = $(template)

        div.find('.developer_panel_application_list_name').html(request.name)
        div.find('.developer_panel_application_list_description').html(getShortDescription(request.description))

        div.prop('value', request.id)

        container.append(div)
    })

    // Lors de la selection d'une demande de privilège
    $('.developer_panel_application_list_div').on('click', (e) => {
        // Récupération du div sur le quel on a cliqué
        let current = $(e.currentTarget)

        // Template
        let resultTemplate = $($('#developer_panel_application_result_template').html())

        // Réactualisé la demande sélectionné
        $('.developer_panel_application_list_div').removeClass('select')
        current.addClass('select')

        // Récupération de l'ID de la demande
        let demande = applicationList.find(r => r.id === current.prop('value'))

        // Résultat
        resultTemplate.find('.developer_panel_application_result_name').html(demande.name)
        resultTemplate.find('.developer_panel_application_result_description').html(demande.description)

        resultContainer.html(resultTemplate)

        // Suppression d'un application
        $('.developer_panel_application_result_remove').on('click', () => {
            $.post(`/developer/application/remove/${current.prop('value')}`, () => {
                getAccountApplicationList().then(() => {
                    updateApplicationList()
                })
            })
        })

        $('.developer_panel_application_result_token_div button').on('click', (e) => {
            let current = $(e.currentTarget)

            if(current.parent().hasClass('show')) {
                current.parent().find('.developer_panel_application_result_token').html('')
                current.parent().removeClass('show')
                current.html($('#developer_panel_text_show_template').html())
            }
            else {
                $.get(`/developer/application/token/${demande.id}`, (data) => {
                    if(data) {
                        current.parent().find('.developer_panel_application_result_token').html(data.token)
                        current.parent().addClass('show')
                        current.html($('#developer_panel_text_hide_template').html())
                        console.log('show')
                    }
                })
            }
        })
    })

}

function getShortDescription(description) {
    if(description.length > 100) {
        return description.substr(0, 90) + '...'
    }
    else return description
}