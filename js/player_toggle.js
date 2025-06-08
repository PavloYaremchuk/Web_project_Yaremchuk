$(document).ready(function() {
    $('.player-name').on('click', function(e) {
        e.preventDefault();
        const playerId = $(this).data('player-id');
        const detailsDiv = $('#details-' + playerId);

        if (detailsDiv.is(':visible')) {
            detailsDiv.slideUp();
        } else {
            if (detailsDiv.is(':empty')) {
                $.ajax({
                    url: '/players/' + playerId + '/details/',
                    method: 'GET',
                    success: function(data) {
                        detailsDiv.html(
                            `<p>Position: ${data.position}</p>
                             <p>Number: ${data.number}</p>
                             <p>Team: ${data.team}</p>`
                        );
                        detailsDiv.slideDown();
                    },
                    error: function() {
                        detailsDiv.html('<p style="color:red;">Error loading details.</p>');
                        detailsDiv.slideDown();
                    }
                });
            } else {
                detailsDiv.slideDown();
            }
        }
    });
});
