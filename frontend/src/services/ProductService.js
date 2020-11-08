export default class ProductService {
  constructor(api) {
    this.api = api;
  }

  async getAllProducts(page = 0, perPage = 10) {
    const response = await this.api.get('/', {params: {currentPage: page + 1, perPage}});
  
    return response.data;
  }
  
  async getProduct(productId) {
    const response = await this.api.get(`/${productId}`);
  
    return response.data;
  }
  
  async createProduct(product) {
    await this.api.post('/', product);
  }
  
  async updateProduct(product) {
    await this.api.put(`/${product.id}`, product);
  }
  
  async deleteProduct(productId) {
    await this.api.delete(`/${productId}`);
  }
}