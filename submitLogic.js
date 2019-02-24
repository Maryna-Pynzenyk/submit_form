$(document).ready(function () {
    var forbiddenSymbols = /[`"']/;

    function show_error(element) {
        var error_element = $('span', element.parent());
        error_element.removeClass('error').addClass('error_show');
    }

    function hide_error(element) {
        var error_element = $('span', element.parent());
        error_element.removeClass('error_show').addClass('error');
    }

    function set_validation_status_style(input, is_valid) {
        if (is_valid) {
            input.removeClass('invalid');
            hide_error(input);
        }
        else {
            input.addClass('invalid');
            show_error(input);
        }
    }

    function validate_field(input) {
        var is_name = input.val() != '';
        var is_valid = is_name && !forbiddenSymbols.test(is_name);
        set_validation_status_style(input, is_valid);
        return is_valid;
    }

    function validate_gender(is_gender_selected) {
        var element = $('#contact_gender');
        if (is_gender_selected) { hide_error(element); }
        else { show_error(element); }
    }

    function validate_country_selector(is_country_selected) {
        var country_selector = $('#contact_country');

        show_error(country_selector);

        set_validation_status_style(country_selector, is_country_selected);
    }

    function validate_notes(notes_element) {
        var is_valid = !forbiddenSymbols.test(notes_element.val());
        set_validation_status_style(notes_element, is_valid);
        return is_valid;
    }

    $('#contact_first_name').on('input', function () { validate_field($(this)); });

    $('#contact_last_name').on('input', function () { validate_field($(this)); });

    $('#contact_birthday').on('input', function () { validate_field($(this)); });

    $('#contact_country').on('select', function () { validate_field($(this)); })

    $('#contact_email').on('input', function () {
        var input = $(this);
        var re = /^[A-Za-z0-9.!#$%&*+/=?^_{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        var is_email = re.test(input.val());
        set_validation_status_style(input, is_email);
    });

    $('#contact_password').on('input', function () { validate_field($(this)); });

    $('#contact_address').on('input', function () { validate_field($(this)); })

    $('#contact_notes').on('input', function () { validate_notes($(this)); });

    $('#contact_submit button').click(function (event) {
        var form_data = $('#contact').serializeArray();
        var error_free = true;
        var is_country_selected = false;
        var is_gender_selected = false;

        for (var input in form_data) {
            if (form_data[input]['name'] == 'country') {
                is_country_selected = true;
                continue;
            }

            var element = $('#contact_' + form_data[input]['name']);

            if (form_data[input]['name'] == 'notes') {
                if (!validate_notes(element)) error_free = false;
                continue;
            }

            if (form_data[input]['name'] == 'gender') {
                is_gender_selected = true;
                continue;
            }

            error_free = validate_field(element);
        }

        validate_country_selector(is_country_selected)

        if (!is_country_selected) { error_free = false; }

        if (!is_gender_selected) { error_free = false; }

        validate_gender(is_gender_selected);

        if (!error_free) {
            event.preventDefault();
        }
        else {
            alert('Validation passed');
        }
    });
})