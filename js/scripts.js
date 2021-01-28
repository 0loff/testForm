var $clearCheckboxes = $('#clearCheckboxes')
var $clearRadio = $('#clearRadio')
var $showResults = $('#showResults')
var $clearResults = $('#clearResults')
var $refreshResults = $('#refreshResults')
var $resultDisplay = $('#resultDisplay ul')


$clearCheckboxes.on('click', function() {
   var $checkedChekboxes = $('.field_checkbox input:checkbox:checked')
    $checkedChekboxes.prop('checked', false)
    $resultDisplay.html('')
})

$clearRadio.on('click', function() {
    $('#radio1').prop('checked', true)
})

$showResults.on('click', function() {
    var $checkedChekboxes = $('.field_checkbox input:checkbox:checked')
    $checkedChekboxes.each(function() {
        let el = '<li>' + $(this).val() + '</li>'
        $resultDisplay.append(el)
    })
    var $checkedRadio = $('.field_radio input:radio:checked')
    let rEl = '<li>' + $checkedRadio.val() + '</li>'
    $resultDisplay.append(rEl)

})

$clearResults.on('click', function() {
    $resultDisplay.html('')
    var $checkedChekboxes = $('.field_checkbox input:checkbox:checked')
    $checkedChekboxes.prop('checked', false)
    $('#radio1').prop('checked', true)
})

$refreshResults.on('click', function() {
    $resultDisplay.html('')
})