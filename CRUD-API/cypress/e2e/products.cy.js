describe("Create Product API Test", () => {
  const product = {
    id: 999,
    title: "Test Product",
    description: "This is a test product",
    price: 19.99,
  };

  it("should create a new product successfully", () => {
    // Send POST request
    cy.request({
      method: "POST",
      url: "http://localhost:3001/products",
      body: product,
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      // Assert the response
      expect(response.status).to.eq(201);
      expect(response.body).to.have.property("id", product.id);
      expect(response.body).to.have.property("title", product.title);
      expect(response.body).to.have.property(
        "description",
        product.description
      );
      expect(response.body).to.have.property("price", product.price);
    });
  });

  it("should verify the created product exists in the database", () => {
    cy.request("GET", `http://localhost:3001/products/${product.id}`).then(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.deep.include(product);
      }
    );
  });
});
