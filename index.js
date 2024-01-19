document.addEventListener('DOMContentLoaded', () => {
    const countryInfo = document.getElementById('countryInfo');
    const searchForm = document.getElementById('search');
    const funFacts = document.getElementById('funFacts')

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault(); // Prevents the default form submission behavior

        const countryName = document.getElementById('fname').value.trim();

        if (countryName !== '') {
            getCountry(countryName);
        }
        searchForm.reset()
    });

    function getCountry(countryName) {
        const apiUrl = `https://restcountries.com/v3.1/name/${countryName}`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const countryDetails = data[0]; // Assuming the first result contains the necessary information
                const currenciesInfo = Object.values(countryDetails.currencies).map(currency => `${currency.name} (${currency.symbol})`).join(', ');

                // Display the country details on your webpage
                countryInfo.innerHTML = `
                    <h2>${countryDetails.name.official}</h2>
                    <img src="${countryDetails.flags.png}" alt="Flag of ${countryDetails.name.common}">
                    <p>Capital City: ${countryDetails.capital}</p>
                    <p>Population: ${countryDetails.population}</p>
                    <p>Currency: ${currenciesInfo}</p>
                    <p>Independent: ${countryDetails.independent ? 'Yes' : 'No'}</p>
                    <p>UN member: ${countryDetails.unMember ? 'Yes' : 'No'}</p>
                    <p>Region: ${countryDetails.region}</p>
                    <p>Sub-region: ${countryDetails.subregion}</p>
                    <p>Languages: ${Object.values(countryDetails.languages).join(', ')}</p>
                    <p>Landlocked: ${countryDetails.landlocked ? 'Yes' : 'No'}</p>
                    <p>Borders: ${countryDetails.borders.join(', ')}</p>
                    <p>Time Zone: ${countryDetails.timezones.join(', ')}</p>
                    <p>Drive on the: ${countryDetails.car.side}</p>
                    <p>Google Maps: <a href="${countryDetails.maps.googleMaps}" target="Google Maps">${countryDetails.name.common}</a></p>
                    <p>Open Street Maps: <a href="${countryDetails.maps.openStreetMaps}" target="_blank">Link</a></p>
                    <p>Continent: ${countryDetails.continents}</p>
                    <p>Name of National Team: ${countryDetails.fifa}</p>
                `;
            })
            .catch(error => {
                console.error('Error fetching country data:', error);
                countryInfo.innerText = 'Error fetching country data. Please try again.';
            });
    }

    funFacts.addEventListener('click', () => {
        getFacts();
    });

    function getFacts() {
        fetch("db.json")
            .then(response => response.json())
            .then(data => {
                const funFactsList = data.facts;

                if (funFactsList.length > 0) {
                    const randomIndex = Math.floor(Math.random() * funFactsList.length);
                    const randomFact = funFactsList[randomIndex];

                    const factElement = document.createElement('p');
                    factElement.innerHTML =`
                    <h1>CLICK FOR MORE FUN FACTS</h1>
                    ${randomFact}

                    `;

                    funFacts.innerHTML = ''; // Clear previous fact
                    funFacts.appendChild(factElement);
                } else {
                    funFacts.innerHTML = '<p>No facts available. Check back later!</p>';
                }
            })
            .catch(error => {
                console.error('Error fetching facts:', error);
                funFacts.innerText = 'Error fetching facts. Please try again.';
            });
    }

    // Display an initial fact when the page loads
    getFacts();
});