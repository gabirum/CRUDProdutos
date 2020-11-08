import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import EditProductContainer from '../../components/EditProductContainer';
import EditProductHeader from '../../components/EditProductHeader';
import ProductForm, { productDataIntialState } from '../../components/ProductForm';
import useForm from '../../components/useForm';
import { useNotification } from '../../components/useNotification';
import api from '../../utils/api';
import ProductService from '../../services/ProductService';

const productService = new ProductService(api);

function UpdateProduct() {
  const {data, handleChange, setData} = useForm(productDataIntialState);
  const {createNotification} = useNotification();
  const history = useHistory();
  const {productId} = useParams();

  useEffect(() => {
    productService.getProduct(productId).then(response => {
      setData({...response});
    }).catch(reject => {
      createNotification('Ocorreu um erro ao tentar editar esse produto', 'error');
      history.push('/');
    });
  }, []);

  async function handleSubmit() {
    try {
      await productService.updateProduct(data);
      createNotification('Produto atualizado com sucesso', 'success');
      history.goBack();
    } catch(err) {
      createNotification('Não foi possível atualizar o produto', 'error');
    }
  }

  return(
    <EditProductContainer>
      <EditProductHeader title='Atualizar produto' returnAction={() => history.goBack()}/>
      <ProductForm
        productData={data}
        onSubmit={handleSubmit}
        onChange={handleChange}
      />
    </EditProductContainer>
  )
}

export default UpdateProduct;