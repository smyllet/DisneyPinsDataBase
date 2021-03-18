// - - - Variable - - - //
let autocomplete = {
    series: [],
    attractions: [],
    personnages: []
}

let valideForSend = {
    name: false,
    number: false,
    series: false
}

// Lorsque la page à fini de chargé
$(document).ready(() => {
    // - - - Import Element - - - //
    let seriesInput = $('#add-pins_input_series')
    let seriesIdInput = $('#add-pins_input_series_id')
    let intituleInput = $('#add-pins_input_intitule')
    let numberInput = $('#add-pins_input_edition-number')

    // - - - Personnage - - - //
    // Saisie des personnage
    $("#add-pins_input_personnage").tagsinput({
        freeInput: false,
        cancelConfirmKeysOnEmpty: true,
        itemValue: 'id',
        itemText: 'name',
        typeahead: {
            menu: '<ul class="typeahead dropdown-menu dropdown-menu-scroll" role="listbox"></ul>',
            item: '<li><a class="dropdown-item" href="#" role="option"></a></li>',
            autoSelect: true,
            source: function () {
                return autocomplete.personnages
            },
            afterSelect: function() {
                this.$element[0].value = "";
            }
        }
    })

    // - - - Attraction - - - //
    // Saisie des attractions
    $("#add-pins_input_attraction").tagsinput({
        freeInput: false,
        cancelConfirmKeysOnEmpty: true,
        itemValue: 'id',
        itemText: 'name',
        typeahead: {
            menu: '<ul class="typeahead dropdown-menu dropdown-menu-scroll" role="listbox"></ul>',
            item: '<li><a class="dropdown-item" href="#" role="option"></a></li>',
            autoSelect: true,
            source: function () {
                return autocomplete.attractions
            },
            afterSelect: function() {
                this.$element[0].value = "";
            }
        }
    })

    // - - - Collection - - - //
    // Saisie de la collection
    seriesInput.typeahead({
        menu: '<ul class="typeahead dropdown-menu dropdown-menu-scroll" role="listbox"></ul>',
        item: '<li><a class="dropdown-item" href="#" role="option"></a></li>',
        autoSelect: true,
        source: function (query, callback) { callback(autocomplete.series.map(e => e.name)) },
        afterSelect: function() {
            // Désactivé le focus sur le champs de saisie en cas de sélection via l'autocomplétion
            setTimeout(() => {
                $('#add-pins_input_series').blur()
            },1)
        }
    })

    // Vérification de la collection saisie
    seriesInput.on('focusout', () => {
        setTimeout(() => {
            let value = seriesInput.val()
            seriesIdInput.val(null)

            if(value.length < 1) {
                addError('series', errorList.noCollectionInput[navLang])
            }
            else if(autocomplete.series.find(e => e.name === value)) {
                removeError('series')
                seriesIdInput.val(autocomplete.series.find(e => e.name === value).id)
            }
            else {
                addError('series', errorList.collectionNotRegister[navLang])
            }
        },200)
    })

    // - - - Intitulé - - - //
    intituleInput.on('focusout', () => {
        setTimeout(() => {
            if(intituleInput.val().length < 1) addError('name', errorList.noLibelleInput[navLang])
            else removeError('name')
        }, 200)
    })

    // - - - Date - - - //
    let now = new Date()
    $('#add-pins_input_release-date').val(`${now.getFullYear()}-${((now.getMonth()+1) < 10) ? "0" + (now.getMonth()+1) : now.getMonth()+1}-${(now.getDate() < 10) ? "0" + now.getDate() : now.getDate()}`)

    // - - - Nombre d'exemplaire - - - //
    numberInput.on('focusout', () => {
        setTimeout(() => {
            if(numberInput.val().length < 1) addError('number', errorList.noNumberInput[navLang])
            else removeError('number')
        }, 200)
    })
})

// Récupération des données de l'auto complete
$.get('/contribute/autocomplete', (data) => {
    autocomplete.series = data.series
    autocomplete.attractions = data.attractions
    autocomplete.personnages = data.personnages

    data.type.forEach(type => {
        $('#add-pins_input_type').append(`<option value=${type.id}>${type.name}</option>`)
    })
})



// --- Manager d'erreur --- //
function addError(name, error) {
    let errorBox = $('#add-pins_error-box')

    switch (name) {
        case 'name':
            valideForSend.name = false
            $('#add-pins_input_intitule').parent().addClass('error_input')
            $('#add-pins_error-box_intitule').remove()
            errorBox.append(`<small id="add-pins_error-box_intitule">${error}<br></small>`)
            break
        case 'number':
            valideForSend.number = false
            $('#add-pins_input_edition-number').parent().addClass('error_input')
            $('#add-pins_error-box_number').remove()
            errorBox.append(`<small id="add-pins_error-box_number">${error}<br></small>`)
            break
        case 'series':
            valideForSend.series = false
            $('#add-pins_input_series').parent().addClass('error_input')
            $('#add-pins_error-box_series').remove()
            errorBox.append(`<small id="add-pins_error-box_series">${error}<br></small>`)
            break
    }
    refreshSendButton()
}

function removeError(name) {
    switch (name) {
        case 'name':
            valideForSend.name = true
            $('#add-pins_input_intitule').parent().removeClass('error_input')
            $('#add-pins_error-box_intitule').remove()
            break
        case 'number':
            valideForSend.number = true
            $('#add-pins_input_edition-number').parent().removeClass('error_input')
            $('#add-pins_error-box_number').remove()
            break
        case 'series':
            valideForSend.series = true
            $('#add-pins_input_series').parent().removeClass('error_input')
            $('#add-pins_error-box_series').remove()
            break
    }
    refreshSendButton()
}

function refreshSendButton() {
    if(Object.values(valideForSend).find(e => e === false) === undefined) {
        $('#add-pins_button_send').prop('disabled', false)
    }
    else $('#add-pins_button_send').prop('disabled', true)
}