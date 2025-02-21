const properties = [
    {
        id: 1,
        title: 'Modern Downtown Apartment',
        price: 350000,
        type: 'apartment',
        beds: 2,
        baths: 2,
        sqft: 1200,
        image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop',
        location: {
            address: '123 Downtown St',
            city: 'Example City',
            lat: 40.7128,
            lng: -74.0060
        }
    },
];

let map;
let markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 40.7128, lng: -74.0060 },
        zoom: 12,
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            }
        ]
    });

    displayProperties(properties);
}

function displayProperties(properties) {
    markers.forEach(marker => marker.setMap(null));
    markers = [];

    const propertyList = $('#propertyList');
    propertyList.empty();

    properties.forEach(property => {
        const marker = new google.maps.Marker({
            position: { lat: property.location.lat, lng: property.location.lng },
            map: map,
            title: property.title
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div class="p-2">
                    <h6>${property.title}</h6>
                    <p class="mb-0">$${property.price.toLocaleString()}</p>
                </div>
            `
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });

        markers.push(marker);

        propertyList.append(`
            <div class="property-card card">
                <img src="${property.image}" class="card-img-top" alt="${property.title}">
                <div class="card-body">
                    <h5 class="card-title">${property.title}</h5>
                    <p class="price mb-2">$${property.price.toLocaleString()}</p>
                    <p class="features mb-0">
                        <i class="fas fa-bed"></i> ${property.beds} beds | 
                        <i class="fas fa-bath"></i> ${property.baths} baths | 
                        <i class="fas fa-ruler-combined"></i> ${property.sqft} sqft
                    </p>
                    <p class="mb-0 mt-2">
                        <i class="fas fa-map-marker-alt"></i> ${property.location.address}, ${property.location.city}
                    </p>
                </div>
            </div>
        `);
    });

    if (markers.length > 0) {
        const bounds = new google.maps.LatLngBounds();
        markers.forEach(marker => bounds.extend(marker.getPosition()));
        map.fitBounds(bounds);
    }
}

function filterProperties() {
    const location = $('input[placeholder="Location"]').val().toLowerCase();
    const type = $('#propertyType').val();
    const priceRange = $('#priceRange').val();
    const beds = $('#beds').val();
    const baths = $('#baths').val();

    const filtered = properties.filter(property => {
        if (location && !property.location.city.toLowerCase().includes(location) && 
            !property.location.address.toLowerCase().includes(location)) {
            return false;
        }

        if (type && property.type !== type) {
            return false;
        }

        if (priceRange) {
            const [min, max] = priceRange.split('-').map(Number);
            if (max && (property.price < min || property.price > max)) return false;
            if (!max && property.price < min) return false;
        }

        if (beds && property.beds < parseInt(beds)) return false;

        if (baths && property.baths < parseInt(baths)) return false;

        return true;
    });

    displayProperties(filtered);
}

$(document).ready(() => {
    initMap();

    $('#searchBtn').click(filterProperties);

    $('input[placeholder="Location"]').on('input', filterProperties);
    $('#propertyType, #priceRange, #beds, #baths').change(filterProperties);
});