const form = document.getElementById('player-form');
const msg = document.getElementById('message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();              // зупиняємо стандартну відправку форми
    msg.textContent = 'Saving...';

    // Готуємо дані з форми
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
        const resp = await fetch('/api/players/', {   // Django REST endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': getCookie('csrftoken')
            },
            body: JSON.stringify(payload),
        });
        if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
        const data = await resp.json();
        msg.textContent = `Player ${data.player_name} added successfully!`;
        form.reset();
    } catch (err) {
        msg.textContent = `Error: ${err.message}`;
    }
});

// Функція для читання cookie (CSRF)
function getCookie(name) {
    const matches = document.cookie.match(new RegExp(
        `(?:^|; )${name.replace(/([$?*|{}()[\]\\/+^])/g, '\\$1')}=([^;]*)`
    ));
    return matches ? decodeURIComponent(matches[1]) : '';
}
