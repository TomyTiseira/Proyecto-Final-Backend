import supertest from "supertest";
import chai from "chai";
import { port } from "../../config/enviroment.js";
import { dbDAO } from "../../config/connectToDb.js";

const request = supertest(`http://localhost:${port}/api/productos`);
const expect = chai.expect;

describe("Products api test", () => {
  describe("GET api/productos", () => {
    beforeEach(async () => {
      await dbDAO.clearProducts();
    });

    it("Debería retornar status 200 y un array vacío si no tiene productos", async () => {
      const response = await request.get("/");

      expect(response.status).to.be.eq(200);
      expect(response.body).to.be.an("array");
      expect(response.body.length).to.be.eq(0);
    });
  });

  describe("POST /api/productos", () => {
    beforeEach(async () => {
      await dbDAO.clearProducts();
    });

    it("Debería retornar status 200 y agregar un producto valido", async () => {
      const product = {
        name: "testName",
        timestamp: "testTimestamp",
        description: "testDescription",
        code: "testCode",
        photo: "testPhoto",
        price: 100,
        stock: 100,
      };

      const response = await request.post("/").send(product);

      expect(response.status).to.be.eq(200);
    });
  });

  describe("PUT /api/productos", () => {
    beforeEach(async () => {
      await dbDAO.clearProducts();
    });

    it("Debería retornar status 200 si se actualiza correctamente el producto", async () => {
      const product = {
        name: "testName",
        timestamp: "testTimestamp",
        description: "testDescription",
        code: "testCode",
        photo: "testPhoto",
        price: 100,
        stock: 100,
      };

      await request.post("/").send(product);

      const productToUpdate = {
        name: "updateName",
        timestamp: "updateTimestamp",
        description: "updateDescription",
        code: "updateCode",
        photo: "updatePhoto",
        price: 100,
        stock: 100,
      };

      const response = await request.put("/0").send(productToUpdate);

      expect(response).to.be.an("object");
      expect(response.status).to.be.eq(200);
    });

    it("Debería retornar status 404 si no existe el producto a actualizar", async () => {
      const productToUpdate = {
        name: "updateName",
        timestamp: "updateTimestamp",
        description: "updateDescription",
        code: "updateCode",
        photo: "updatePhoto",
        price: 100,
        stock: 100,
      };

      const response = await request.put("/123").send(productToUpdate);

      expect(response).to.be.an("object");
      expect(response.status).to.be.eq(404);
    });
  });

  describe("DELETE /api/productos", () => {
    beforeEach(async () => {
      await dbDAO.clearProducts();
    });

    it("Debería retornar status 404 sino existe el producto a eliminar", async () => {
      const response = await request.delete("/123");

      expect(response.status).to.be.eq(404);
    });

    it("Debería retornar status 200 si se elimino correctamente el producto", async () => {
      const product = {
        name: "testName",
        timestamp: "testTimestamp",
        description: "testDescription",
        code: "testCode",
        photo: "testPhoto",
        price: 100,
        stock: 100,
      };

      await request.post("/").send(product);

      const response = await request.delete("/0");

      expect(response.status).to.be.eq(200);
    });
  });
});
