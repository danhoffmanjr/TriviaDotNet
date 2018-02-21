$( function() {
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
        toggleDetails($(this).data('id'));
    });
});