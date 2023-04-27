const { faker } = require('@faker-js/faker');

exports.createRandomProduct = (idx) => {
    return {
        "id": `PC-${idx + 1}`,
        "title": faker.commerce.productName(),
        "description": faker.commerce.productDescription(),
        "price": faker.commerce.price(1000, 1000000),
        "code": faker.random.alphaNumeric(11),
        "stock": faker.random.numeric(3),
        "status": true,
        "category": faker.commerce.department(),
        "thumbnails": [
            faker.image.imageUrl(640, 480, 'product'),
            faker.image.imageUrl(640, 480, 'product'),
            faker.image.imageUrl(640, 480, 'product')
        ]
    }
}