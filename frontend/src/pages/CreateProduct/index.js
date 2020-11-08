import React from 'react';
import { useHistory } from 'react-router-dom';
import EditProductContainer from '../../components/EditProductContainer';
import EditProductHeader from '../../components/EditProductHeader';
import ProductForm, { productDataIntialState } from '../../components/ProductForm';
import useForm from '../../components/useForm';
import { useNotification } from '../../components/useNotification';
import api from '../../utils/api';
import ProductService from '../../services/ProductService';

const productService = new ProductService(api);

function CreateProduct() {
  const {data, handleChange} = useForm(productDataIntialState);
  const {createNotification} = useNotification();
  const history = useHistory();

  async function handleSubmit() {
    try {
      await productService.createProduct(data);
      createNotification('Produto criado com sucesso', 'success');
      
      history.goBack();
    } catch(err) {
      createNotification('Não foi possível criar o produto', 'error');
    }
  }

  return(
    <EditProductContainer>
      <EditProductHeader title='Criar produto' returnAction={() => history.goBack()}/>
      <ProductForm
        productData={data}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />
    </EditProductContainer>
  )
}

export default CreateProduct;