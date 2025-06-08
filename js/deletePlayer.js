document.addEventListener('DOMContentLoaded', () => {
    const list = document.getElementById('playerList');

    list.addEventListener('click', async (e) => {
        if (e.target.classList.contains('delete-btn')) {
            const card = e.target.closest('.player-card');
            const playerId = card.dataset.playerId;

            if (!confirm('Are you sure you want to delete this player?')) return;

            try {
                const response = await fetch(`/api/players/${playerId}/delete/`, {
                    method: 'DELETE',
                    headers: {
                        'X-CSRFToken': getCSRFToken(),
                    }
                });

                if (response.ok) {
                    card.remove(); // Remove from DOM
                } else {
                    console.error('Failed to delete player');
                }
            } catch (error) {
                console.error('Error:', error);
            }
        }
    });

    function getCSRFToken() {
        const name = 'csrftoken';
        return document.cookie.split(';')
            .map(c => c.trim())
            .find(c => c.startsWith(name + '='))
            ?.split('=')[1];
    }
});
