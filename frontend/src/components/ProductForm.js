import { makeStyles, TextField } from '@material-ui/core';
import React, { useState } from 'react';
import { Button } from './Buttons';

const errorsInitialState = {
  errorName: '',
  errorCategory: '',
  errorPrice: '',
}

export const productDataIntialState = {
  id: 0,
  name: '',
  category: '',
  price: '',
}

const useStyles = makeStyles(theme => ({
  centralizeButton: {
    display: 'flex',
    marginTop: theme.spacing(2),
    marginLeft: 'auto',
    marginRight: 'auto',
  }
}));

function ProductForm({productData, onChange, onSubmit}) {
  const [errors, setErrors] = useState(errorsInitialState);
  const classes = useStyles();
  
  function validate() {
    const temp = {};
    let convertedPrice = Number(productData.price.replace(',', '.'));
    
    if (!productData.name || productData.name.trim().length === 0) {
      temp.errorName = 'Campo obrigatório';
    }
    if (!productData.category || productData.category.trim().length === 0) {
      temp.errorCategory = 'Campo obrigatório';
    }
    if (!productData.price || productData.price.trim().length === 0) {
      temp.errorPrice = 'Campo obrigatório';
    } else if (isNaN(convertedPrice) || convertedPrice <= 0) {
      temp.errorPrice = 'Tem que ser um número e maior que zero';
    }
    
    setErrors({...errors, ...temp});
    
    return Object.values(temp).every(v => v === '');
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    
    if (validate()) {
      onSubmit();
    }
  }
  
  return(
    <form autoComplete='off' onSubmit={handleSubmit}>
      <TextField
        name='name'
        label='Nome' 
        fullWidth 
        margin='normal' 
        variant='outlined' 
        onChange={onChange} 
        value={productData.name} 
        helperText={errors.errorName}
        error={errors.errorName !== ''}
        type='text'
        autoComplete='off'
      />
      <TextField
        name='category'
        label='Categoria' 
        fullWidth 
        margin='normal' 
        variant='outlined' 
        onChange={onChange} 
        value={productData.category}
        helperText={errors.errorCategory}
        error={errors.errorCategory !== ''}
        type='text'
        autoComplete='off'
      />
      <TextField 
        name='price'
        label='Preço' 
        fullWidth 
        margin='normal' 
        variant='outlined' 
        onChange={onChange} 
        value={productData.price}
        helperText={errors.errorPrice}
        error={errors.errorPrice !== ''}
        type='text'
        autoComplete='off'
      />
      <Button type='submit' className={classes.centralizeButton}>
        Salvar
      </Button>
    </form>
    )
  }
  
  export default ProductForm;