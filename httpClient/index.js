import axios from "axios";

const url = "http://localhost:8080/api/productos";

const getProducts = async () => {
  const response = await axios.get(`${url}`);
  console.log(response.data);
};

const getProductById = async (id) => {
  const response = await axios.get(`${url}/${id}`);
  console.log(response.data);
};

const updateProduct = async (id, productToUpdate) => {
  await axios.put(`${url}/${id}`, productToUpdate);
};

const saveProduct = async (userToAdd) => {
  await axios.post(`${url}`, userToAdd);
};

const deleteProduct = async (id) => {
  await axios.delete(`${url}/${id}`);
};

getProducts();
saveProduct({
  name: "testName",
  timestamp: "testTimestamp",
  description: "testDescription",
  code: "testCode",
  photo: "testPhoto",
  price: 100,
  stock: 100,
});

getProductById("0");
updateProduct(0, {
  name: "updateName",
  timestamp: "updateTimestamp",
  description: "updateDescription",
  code: "updateCode",
  photo: "updatePhoto",
  price: 101,
  stock: 101,
});

getProducts();

deleteProduct("0");

getProducts();
