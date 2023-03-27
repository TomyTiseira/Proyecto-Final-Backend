import admin from "firebase-admin";
import { collectionCarts, collectionProducts } from "../config/enviroment.js";

class ContainerFirebase {
  saveProduct = async (productToAdd) => {
    const db = admin.firestore();
    const query = db.collection(collectionProducts);

    await query.doc(productToAdd.id.toString()).set(productToAdd);
  };

  getProducts = async () => {
    const db = admin.firestore();
    const query = db.collection(collectionProducts);

    const querySnapshot = await query.get();

    if (querySnapshot.empty) return;

    const products = [];

    querySnapshot.forEach((doc) => {
      products.push({
        id: doc.data().id,
        name: doc.data().name,
        code: doc.data().code,
        description: doc.data().description,
        photo: doc.data().photo,
        stock: doc.data().stock,
        timestamp: doc.data().timestamp,
      });
    });

    return products;
  };

  updateProduct = async (id, productToUpdate) => {
    const db = admin.firestore();
    const query = db.collection(collectionProducts);

    await query.doc(id).set({ ...productToUpdate }, { merge: true });
  };

  deleteProduct = async (id) => {
    const db = admin.firestore();
    const query = db.collection(collectionProducts);

    await query.doc(id).delete();
  };

  saveCart = async (cartToAdd) => {
    const db = admin.firestore();

    const query = db.collection(collectionCarts);

    await query.doc(cartToAdd.id.toString()).set(cartToAdd);
  };

  getCarts = async () => {
    const db = admin.firestore();
    const query = db.collection(collectionCarts);

    const querySnapshot = await query.get();

    if (querySnapshot.empty) return;

    const carts = [];

    querySnapshot.forEach((doc) => {
      carts.push({
        id: doc.data().id,
        timestamp: doc.data().timestamp,
        products: doc.data().products,
      });
    });

    return carts;
  };

  getCartById = async (id) => {
    const carts = await this.getCarts();

    const cart = carts.find((cart) => cart.id === id);
    return cart;
  };

  deleteCart = async (id) => {
    const db = admin.firestore();
    const query = db.collection(collectionCarts);

    await query.doc(id).delete();
  };

  addProductInCart = async (id, id_prod) => {
    const cart = await this.getCartById(id);

    const db = admin.firestore();
    const query = db.collection(collectionCarts);

    const isInCart = () =>
      cart.products.find((product) => product.id === id_prod) ? true : false;

    if (!isInCart()) {
      await query.doc(id).set({
        ...cart,
        products: [...cart.products, { id: id_prod, quantity: 1 }],
      });
      return;
    }

    const indexProductUpdate = cart.products.findIndex(
      (product) => product.id === id_prod
    );

    cart.products[indexProductUpdate].quantity++;

    await query.doc(id).set({ ...cart, products: [...cart.products] });
  };

  deleteProductInCart = async (id, id_prod) => {
    const cart = await this.getCartById(id);

    const db = admin.firestore();
    const query = db.collection(collectionCarts);

    const productsUpdate = cart.products.filter(
      (product) => product.id !== id_prod
    );

    await query.doc(id).set({ ...cart, products: productsUpdate });
  };
}

const containerFirebase = new ContainerFirebase();

export default containerFirebase;
