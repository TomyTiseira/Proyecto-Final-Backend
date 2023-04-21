import chai from "chai";
import { dbDAO } from "../config/connectToDb.js";

const expect = chai.expect;

describe("Products controller", () => {
  describe("getProducts", () => {
    beforeEach(async () => {
      await dbDAO.clearProducts();
    });

    it("Debería retorna un array de productos luego de agregar productos", async () => {
      await dbDAO.saveProduct({
        name: "testName",
        timestamp: "testTimestamp",
        description: "testDescription",
        code: "testCode",
        photo: "testPhoto",
        price: 100,
        stock: 100,
      });

      const result = await dbDAO.getProducts();
      expect(result).to.be.an("array");
      expect(result.length).to.be.eq(1);
    });

    it("Debería retorna una array vacío si no tiene productos", async () => {
      const result = await dbDAO.getProducts();

      expect(result).to.be.an("array");
      expect(result.length).to.be.eq(0);
    });
  });

  describe("getProductById", () => {
    beforeEach(async () => {
      await dbDAO.clearProducts();
    });

    it("Debería retorna null sino existe ningún producto", async () => {
      const result = await dbDAO.getProductById("123");

      expect(result).to.be.null;
    });

    it("Debería retorna el producto si ya existe", async () => {
      await dbDAO.saveProduct({
        name: "testName",
        timestamp: "testTimestamp",
        description: "testDescription",
        code: "testCode",
        photo: "testPhoto",
        price: 100,
        stock: 100,
      });

      const result = await dbDAO.getProductById("0");

      expect(result).to.be.an("object");
    });
  });

  describe("updateProduct", () => {
    beforeEach(async () => {
      await dbDAO.clearProducts();
    });

    it("Debería actualizar el producto en la base de datos", async () => {
      await dbDAO.saveProduct({
        name: "testName",
        timestamp: "testTimestamp",
        description: "testDescription",
        code: "testCode",
        photo: "testPhoto",
        price: 100,
        stock: 100,
      });

      const userToUpdate = {
        name: "updateName",
        timestamp: "updateTimestamp",
        description: "updateDescription",
        code: "updateCode",
        photo: "updatePhoto",
        price: 101,
        stock: 101,
      };

      await dbDAO.updateProduct("0", userToUpdate);

      const result = await dbDAO.getProductById("0");

      expect(result).to.be.an("object");
      expect(result.name).to.be.eq(userToUpdate.name);
    });
  });

  describe("deleteProduct", () => {
    beforeEach(async () => {
      await dbDAO.clearProducts();
    });

    it("Debería eliminar el producto de la base de datos", async () => {
      await dbDAO.saveProduct({
        name: "testName",
        timestamp: "testTimestamp",
        description: "testDescription",
        code: "testCode",
        photo: "testPhoto",
        price: 100,
        stock: 100,
      });

      await dbDAO.deleteProduct("0");

      const result = await dbDAO.getProductById("0");

      expect(result).to.be.null;
    });
  });
});
