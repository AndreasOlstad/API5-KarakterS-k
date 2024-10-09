// index.js

const apiUrl = 'https://dattebayo-api.onrender.com/characters';

async function searchCharacter() {
    const characterName = document.getElementById('characterName').value.trim();

    if (characterName === '') {
        alert('Please enter a character name.');
        return;
    }

    try {
        const response = await fetch(`${apiUrl}?name=${characterName}`);
        const data = await response.json();

        console.log(data); // Legg til dette for å se hva API-en returnerer

        if (data.characters.length > 0) {
            const character = data.characters[0]; // Assuming API returns an array of characters, take the first one

            // Creating HTML for character information
            const images = character.images.map(img => `<img src="${img}" alt="${character.name}">`).join('');
            const characterInfo = `
                <div class="character">
                    <div class="images">${images}</div>
                    <div class="info">
                        <p><strong>Name:</strong> ${character.name}</p>
                        <p><strong>Debut:</strong> ${character.debut.anime}</p>
                        <p><strong>Unique Traits:</strong> ${character.jutsu.join(', ')}</p>
                    </div>
                </div>
            `;

            document.getElementById('characterInfo').innerHTML = characterInfo;
        } else {
            document.getElementById('characterInfo').innerHTML = '<p>No character found.</p>';
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('characterInfo').innerHTML = '<p>Error fetching data. Please try again later.</p>';
    }
}

// Event listener for the search button
// document.getElementById('searchButton').addEventListener('click', searchCharacter);

// Event listener for the ENTER key
document.getElementById('characterName').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        console.log('Enter key pressed'); // Legg til dette for å se om hendelsen trigges
        searchCharacter();
    }
});
