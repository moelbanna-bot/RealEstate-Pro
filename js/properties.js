const properties = [
    {
        id: 1,
        title: 'Modern Downtown Apartment',
        price: 350000,
        type: 'apartment',
        beds: 2,
        baths: 2,
        sqft: 1200,
        image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267',
        description: 'Luxurious downtown apartment with stunning city views.'
    },
    {
        id: 2,
        title: 'Suburban Family Home',
        price: 550000,
        type: 'house',
        beds: 4,
        baths: 3,
        sqft: 2500,
        image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994',
        description: 'Spacious family home in a quiet suburban neighborhood.'
    },
    {
        id: 3,
        title: 'Luxury Waterfront Condo',
        price: 750000,
        type: 'condo',
        beds: 3,
        baths: 2,
        sqft: 1800,
        image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
        description: 'Premium condo with breathtaking waterfront views.'
    }
];

function displayProperties() {
    const propertiesGrid = document.getElementById('propertiesGrid');
    propertiesGrid.innerHTML = '';

    properties.forEach(property => {
        const propertyCard = `
            <div class="col-md-6 col-lg-4">
                <div class="card property-card h-100">
                    <img src="${property.image}" class="card-img-top" alt="${property.title}">
                    <div class="card-body">
                        <h5 class="card-title">${property.title}</h5>
                        <p class="price mb-2">$${property.price.toLocaleString()}</p>
                        <p class="features mb-2">
                            <i class="fas fa-bed"></i> ${property.beds} beds | 
                            <i class="fas fa-bath"></i> ${property.baths} baths | 
                            <i class="fas fa-ruler-combined"></i> ${property.sqft} sqft
                        </p>
                        <p class="card-text">${property.description}</p>
                        <button class="btn btn-primary">View Details</button>
                    </div>
                </div>
            </div>
        `;
        propertiesGrid.innerHTML += propertyCard;
    });
}

document.addEventListener('DOMContentLoaded', () => {
    displayProperties();
});