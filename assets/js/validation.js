$(document).ready(function () {
    /**
     * Form Validation For Add Threats Form
     */
    $('#addThreatsForm').validate({
        rules: {
            searchIPBox: {
                required: true
            },
            searchMacBox: {
                required: true
            },
            datePicker1: {
                required: true
            },
            timepicker1: {
                required: true
            },
            searchRiskStorebox: {
                required: true,
                maxlength: 2
            }
        },
        messages: {
            searchIPBox: {
                required: "IP is required."
            },
            searchMacBox: {
                required: "MAC address is required."
            },
            datePicker1: {
                required: "Date is required"
            },
            timepicker1: {
                required: "Time is required."
            },
            searchRiskStorebox: {
                required: "Risk number is required.",
                maxlength: "Not more than 2 characters."
            }
        },
        submitHandler: function (form) {
            $('#addThreatsModal').modal("hide");
        }
    });
    
    /**
     * Form Validation For Add Threats Form
     */
    $('#addVulnerabilitiesForm').validate({
        rules: {
            name: {
                required: true
            },
            description: {
                required: true
            }
        },
        messages: {
            name: {
                required: "Name is required."
            },
            description: {
                required: "Description is required."
            }
        },
        submitHandler: function (form) {
            $('#addVulnerabilitiesModal').modal("hide");
        }
    });
});
