document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('ajaxPlayerForm');
    const msg  = document.getElementById('msg');

    form.addEventListener('submit', async e => {
        e.preventDefault();
        msg.textContent = 'Saving…';
        const data = Object.fromEntries(new FormData(form).entries());

        try {
            const resp = await fetch('/api/all-players/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCSRFToken(),
                },
                body: JSON.stringify(data),
            });
            if (!resp.ok) throw resp;
            const json = await resp.json();
            msg.textContent = `Player added!`;
            form.reset();
        } catch (err) {
            msg.style.color = 'red';
            msg.textContent = 'Error saving player';
            console.error(err);
        }
    });

    function getCSRFToken() {
        const name='csrftoken';
        return document.cookie.split(';')
            .map(c=>c.trim())
            .find(c=>c.startsWith(name+'='))
            ?.split('=')[1];
    }
});
