$(document).ready(function () {

    /*--  Initialize Tinymce  --*/
    tinymce.init({
        selector: 'textarea',
        height: 300,
        theme: 'modern',
        statusbar: false,
        external_plugins: {
//            'mention': 'https://github.com/StevenDevooght/tinyMCE-mention/blob/master/mention/plugin.js'
            'mention': 'http://stevendevooght.github.io/tinyMCE-mention/javascripts/tinymce/plugins/mention/plugin.js'
//            'mention': 'plugin.js'
        },
        content_css: 'assets/plugins/tinymce/rte-content.css',
        skin_url: 'http://stevendevooght.github.io/tinyMCE-mention/stylesheets/tinymce/skins/light',
        mentions: {
            delimiter: ['@'],
            source: function (query, process, delimiter) {
                // Do your ajax call
                // When using multiple delimiters you can alter the query depending on the delimiter used
                console.log(delimiter,process+"query",query);
                if (delimiter === '@') {
                    console.log(delimiter);
//                    $.ajax({
//                        type: 'GET',
//                        url: 'assets/plugins/tinymce/json/policies.json',
//                        success: function (data) {
//                            console.log(data);
//                            processData = data;
//                            //call process to show the result
//                            process(processData.policy);
//                        }
//                    });
                    $.getJSON('assets/plugins/tinymce/json/policies.json', function (data) {
//                        console.log(data);
                        processData = data;
//                        processData = processData.toLowerCase();
                        //call process to show the result
                        process(processData);
                    });
                }
            },
            render: function (item) {
                console.log(item);
                return '<li>' +
                        '<a href="javascript:;"><span>' + item.name + '</span></a>' +
                        '</li>';
            },
            renderDropdown: function (item) {
                console.log(item);
                //add twitter bootstrap dropdown-menu class
                return '<ul class="rte-autocomplete dropdown-menu"></ul>';
            },
            matcher: function (item) {
                  console.log(item);
                //only match Peter Griffin              
                if (item[this.options.queryBy] === 'Peter Griffin') {
                    return true;
                }
            }
        }
    });

    /*--  On Hidden Add Policies Modal  --*/
    $('#addPoliciesModal').on('hidden.bs.modal', function () {
        selectedPolicyNameData = $("#policyName").val();
        selectedPolicyDescriptionData = $('#policyDescription').val();

        if ($("#policyName").val() !== "" && $("#policyDescription").val() !== "") {
            $(".policies-table table tbody").append('<tr>' +
                    '<td>' +
                    '<a class="selected-data" href="javascript:void(0);">' + selectedPolicyNameData + '</a>' +
                    '</td>' +
                    '<td>' +
                    '<span class="selected-data">' + selectedPolicyDescriptionData + '</span>' +
                    '</td>' +
                    '</tr>');

            /*--  Show Add Database Table  --*/
            $(".policies-table").show();
            $("#policyName").val("");
            $("#policyDescription").val("");
        }
        $(".btn-policies-close").click(function () {
            $("#policyName").val("");
            $("#policyDescription").val("");
        });
    });

    /**
     * Form Validation For Add Policies Form
     */
    $('#addPoliciesForm').validate({
        rules: {
            policyName: {
                required: true
            }
        },
        messages: {
            policyName: {
                required: "Policy Name is required."
            }
        },
        submitHandler: function (form) {
            $('#addPoliciesModal').modal("hide");
        }
    });
});


