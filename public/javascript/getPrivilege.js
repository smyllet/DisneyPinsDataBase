$(document).ready(() => {
    $('#getPrivilegeContributorButton').on('click', () => {
        $('#getPrivilegeSelect').hide()
        $('#getPrivilegeContributor').show()
    })

    $('#getPrivilegeDeveloperButton').on('click', () => {
        $('#getPrivilegeSelect').hide()
        $('#getPrivilegeDeveloper').show()
    })

    $('.getPrivilegeSelectButton').on('click', () => {
        $('#getPrivilegeDeveloper').hide()
        $('#getPrivilegeContributor').hide()
        $('#getPrivilegeSelect').show()
    })

    // Récupération des données de l'auto complete
    $.get('/getPrivilege/autocomplete', (data) => {
        data.park.forEach(park => {
            $('select[name="getPrivilegeContributor[park_id]"]').append(`<option value="${park.id}">${park.name}</option>`)
        })
    })
})