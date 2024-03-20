import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: "PS5",
        price: 1,
      });

    expect(response.status).toBe(200);
    expect(response.body.name).toBe("PS5");
    expect(response.body.price).toBe(1);
  });

  it("should not create a product", async () => {
    const response = await request(app).post("/product").send({
      name: "PS5",
    });
    expect(response.status).toBe(500);
  });

  it("should list all products", async () => {
    const response = await request(app)
      .post("/product")
      .send({
        type: "a",
        name: "PS5",
        price: 1,
      });
    expect(response.status).toBe(200);
    expect(response.body.name).toEqual("PS5");
    const response2 = await request(app)
      .post("/product")
      .send({
        type: "b",
        name: "XBox7",
        price: 2,
      });
    expect(response2.status).toBe(200);
    expect(response2.body.name).toEqual("XBox7");

    const listResponse = await request(app).get("/product").send();

    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);
    const product = listResponse.body.products[0];
    expect(product.name).toBe("PS5");
    expect(product.price).toBe(1);
    const product2 = listResponse.body.products[1];
    expect(product2.name).toBe("XBox7");
    expect(product2.price).toBe(4);

    const listResponseXML = await request(app)
    .get("/product")
    .set("Accept", "application/xml")
    .send();

    expect(listResponseXML.status).toBe(200);
    expect(listResponseXML.text).toContain(`<?xml version="1.0" encoding="UTF-8"?>`);
    expect(listResponseXML.text).toContain(`<products>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>PS5</name>`);
    expect(listResponseXML.text).toContain(`<price>1</price>`);
    expect(listResponseXML.text).toContain(`</product>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>XBox7</name>`);
    expect(listResponseXML.text).toContain(`<price>4</price>`);
    expect(listResponseXML.text).toContain(`</product>`);
    expect(listResponseXML.text).toContain(`</products>`);
  });
});
