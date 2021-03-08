let requestsList = []

$(document).ready(() => {
    // Gestion des panels
    $('#admin_menu button').on('click', (e) => {
        // Récupération du bouton sur le quel on a cliqué
        let current = $(e.currentTarget)

        // Désactivé tout les panel
        $('#admin_menu button').removeClass('select')
        $('#admin_panel > div').prop('hidden', true)

        // Activé le panel demandé
        current.addClass('select')
        $(`${current.val()}`).prop('hidden', false)

        $('#admin_title > span').text(current.text())
    })

    // Lors de l'activation du panel de Demandes de privilège
    $('button[value="#admin_panel_getPrivileges"]').on('click', () => {
        // Récupéré la liste des demandes
        getPrivilegeRequestsList().then(() => {
            updatePrivilegeRequestsList()
        })
    })

    // Lors d'un changement dans les filtres de demande de privilège
    $('#admin_panel_getPrivileges_filtres input[type=checkbox]').on('change', () => {
        updatePrivilegeRequestsList()
    })
    $('#admin_panel_getPrivileges_filtres_search input').on('focusout', () => {
        updatePrivilegeRequestsList()
    })
})

// Récupération de la liste des demandes de privilège au près du serveur
async function getPrivilegeRequestsList() {
    try {
        await $.get('/admin/privilegeRequestsList', (data) => {
            if(data) requestsList = data.requestsList
            else requestsList = []
        })
    } catch (e) {
        requestsList = []
    }
}

// Update de la liste des demandes de privilège
function updatePrivilegeRequestsList() {
    let container = $('#admin_panel_getPrivileges_list')
    let resultContainer = $('#admin_panel_getPrivileges_result')
    let template = $('#admin_panel_getPrivileges_list_request_template').html()

    let listFiltred = requestsList.filter(request => {
        let valide = true
        if(!$('#admin_panel_getPrivileges_filtres_contributor input').prop('checked') && (request.type === "contributor")) valide = false
        else if(!$('#admin_panel_getPrivileges_filtres_developer input').prop('checked') && (request.type === "developer")) valide = false
        else if(!$('#admin_panel_getPrivileges_filtres_request_send input').prop('checked') && (request.status === 0)) valide = false
        else if(!$('#admin_panel_getPrivileges_filtres_request_in_progress input').prop('checked') && (request.status === 1)) valide = false
        else {
            let searchFilter = $('#admin_panel_getPrivileges_filtres_search input').val()
            if(searchFilter.length > 0) {
                searchFilter = searchFilter.split(" ")
                searchFilter.forEach(f => {
                    f = f.toLowerCase()
                    if(!(request.pseudo.toLowerCase().includes(f) || request.register_date.toLowerCase().includes(f))) valide = false
                })
            }
        }
        return valide
    })

    resultContainer.html($('#admin_panel_getPrivileges_message_no_select_template').html())

    if(listFiltred.length < 1) return container.html($('#admin_panel_getPrivileges_message_no_requests_template').html())
    else container.html('')

    listFiltred.forEach(request => {
        let div = $(template)

        div.find('.admin_panel_getPrivileges_list_request_nickname').html(request.pseudo)
        div.find('.admin_panel_getPrivileges_list_request_date').html(request.register_date)

        if(request.type === "developer") {
            div.find('.admin_panel_getPrivileges_list_request_type_contributor').remove()
            div.addClass('developer')
        }
        else if(request.type === "contributor") {
            div.find('.admin_panel_getPrivileges_list_request_type_developer').remove()
            div.addClass('contributor')
        }
        else {
            div.find('.admin_panel_getPrivileges_list_request_type_contributor').remove()
            div.find('.admin_panel_getPrivileges_list_request_type_developer').remove()
        }

        if(request.status === 1) div.find('.admin_panel_getPrivileges_list_request_status_0').remove()
        else if(request.status === 0) div.find('.admin_panel_getPrivileges_list_request_status_1').remove()
        else {
            div.find('.admin_panel_getPrivileges_list_request_status_0').remove()
            div.find('.admin_panel_getPrivileges_list_request_status_1').remove()
        }

        div.prop('value', request.id)

        container.append(div)
    })

    // Lors de la selection d'une demande de privilège
    $('.admin_panel_getPrivileges_list_request_div').on('click', (e) => {
        // Récupération du div sur le quel on a cliqué
        let current = $(e.currentTarget)
        let resultContainer = $('#admin_panel_getPrivileges_result')

        // Réactualisé la demande sélectionné
        $('.admin_panel_getPrivileges_list_request_div').removeClass('select')
        current.addClass('select')

        // Récupération de l'ID de la demande
        let id = current.prop('value')

        // Update card statut
        current.find('.admin_panel_getPrivileges_list_request_status_0').html(
            $($('#admin_panel_getPrivileges_list_request_template').html()).find('.admin_panel_getPrivileges_list_request_status_1').html()
        )

        if(id && current.hasClass('contributor')) {
            try {
                $.get(`/admin/getPrivilegeRequest/contributor/${id}`, (data) => {
                    setPrivilegeRequestResult('contributor', data.request)

                    // Update request list
                    requestsList.find(request => ((request.id === id) && (request.type === "contributor"))).status = 1
                }).catch(() => resultContainer.html($('#admin_panel_getPrivileges_message_error_template').html()))
            } catch (e) {
                resultContainer.html($('#admin_panel_getPrivileges_message_error_template').html())
            }
        }
        else if(id && current.hasClass('developer')) {
            try {
                $.get(`/admin/getPrivilegeRequest/developer/${id}`, (data) => {
                    setPrivilegeRequestResult('developer', data.request)

                    // Update request list
                    requestsList.find(request => ((request.id === id) && (request.type === "developer"))).status = 1
                }).catch(() => resultContainer.html($('#admin_panel_getPrivileges_message_error_template').html()))
            } catch (e) {
                resultContainer.html($('#admin_panel_getPrivileges_message_error_template').html())
            }
        }
        else {
            resultContainer.html($('#admin_panel_getPrivileges_message_error_template').html())
        }
    })
}

function setPrivilegeRequestResult(type, request) {
    let template = $($('#admin_panel_getPrivileges_result_request_template').html())
    let container = $('#admin_panel_getPrivileges_result')

    container.removeClass('developer')
    container.removeClass('contributor')

    template.find('.admin_panel_getPrivileges_result_request_nickname').html(request.pseudo)
    template.find('.admin_panel_getPrivileges_result_request_date').html(request.register_date)
    template.find('.admin_panel_getPrivileges_result_request_language_speak').html(request.languages_speak)
    template.find('.admin_panel_getPrivileges_result_request_message').html(request.comment)

    if(type === "developer") {
        template.find('.admin_panel_getPrivileges_result_request_type_contributor').remove()
        container.addClass('developer')

        template.find('.admin_panel_getPrivileges_result_request_country_target').html(request.country_target)
    }
    else if(type === "contributor") {
        template.find('.admin_panel_getPrivileges_result_request_type_developer').remove()
        container.addClass('contributor')

        template.find('.admin_panel_getPrivileges_result_request_park').html(request.park_name)

        if(request.pass_annual === 1) template.find('.admin_panel_getPrivileges_result_request_pass_annual_no').remove()
        else template.find('.admin_panel_getPrivileges_result_request_pass_annual_yes').remove()

        if(request.old_pins === 1) template.find('.admin_panel_getPrivileges_result_request_old_pins_no').remove()
        else template.find('.admin_panel_getPrivileges_result_request_old_pins_yes').remove()
    }
    else {
        template.find('.admin_panel_getPrivileges_result_request_type_contributor').remove()
        template.find('.admin_panel_getPrivileges_result_request_type_developer').remove()

        template.find('.admin_panel_getPrivileges_result_request_contributor').remove()
        template.find('.admin_panel_getPrivileges_result_request_developer').remove()
    }

    container.html(template)

    $('.admin_panel_getPrivileges_result_request_refuse').on('click', () => {
        if(type === "developer") {
            $.post(`/admin/setPrivilegeRequestStatus/refuse/developer/${request.id}`, () => {
                getPrivilegeRequestsList().then(() => {
                    updatePrivilegeRequestsList()
                })
            })
        }
        else if(type === "contributor") {
            $.post(`/admin/setPrivilegeRequestStatus/refuse/contributor/${request.id}`, () => {
                getPrivilegeRequestsList().then(() => {
                    updatePrivilegeRequestsList()
                })
            })
        }
    })

    $('.admin_panel_getPrivileges_result_request_accept').on('click', () => {
        if(type === "developer") {
            $.post(`/admin/setPrivilegeRequestStatus/accept/developer/${request.id}`, () => {
                getPrivilegeRequestsList().then(() => {
                    updatePrivilegeRequestsList()
                })
            })
        }
        else if(type === "contributor") {
            $.post(`/admin/setPrivilegeRequestStatus/accept/contributor/${request.id}`, () => {
                getPrivilegeRequestsList().then(() => {
                    updatePrivilegeRequestsList()
                })
            })
        }
    })
}