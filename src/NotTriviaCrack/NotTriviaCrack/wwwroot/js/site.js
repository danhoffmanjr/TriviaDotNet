"Use Strict";
// jQuery to toggle details view on Admin list page (Admin/index.cshtml)
$(function () {
    function toggleDetails(id) {
        // get effect type from
        var selectedEffect = $("#effectTypes").val();

        // Most effect types need no options passed by default
        var options = {};
        // some effects have required parameters
        if (selectedEffect === "scale") {
            options = { percent: 50 };
        } else if (selectedEffect === "size") {
            options = { to: { width: 200, height: 60 } };
        }
        // Run the effect
        $("#details-" + id).toggle(selectedEffect, options, 500);
    };

    $(".toggle-details").on("click", function () {
        var txt = $(this).text() == 'Show Details' ? 'Hide Details' : 'Show Details';
        $(this).text(txt);
        $(this).parent().parent().toggleClass("admin-question-active");
        toggleDetails($(this).data('id'));
    });
});

// [Admin] filter by category
(function () {
    var httpRequest,
        baseURL = "http://localhost:51912/Admin",
        category = document.getElementById("admin-category-select"),
        getByCategoryURI = "?category=",
        method = {
            post: 'POST',
            get: 'GET'
        };

    category.addEventListener('change', function () {
        var category = this.value;
        if (category == "All") {
            window.location.href = baseURL;
            return;
        }
        window.location.href = baseURL + getByCategoryURI + category;
    });
})();