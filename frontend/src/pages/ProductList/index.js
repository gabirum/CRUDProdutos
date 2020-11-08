import { Container, IconButton, makeStyles, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@material-ui/core';
import { Create, Delete } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button } from '../../components/Buttons';
import DeleteDialog from '../../components/DeleteDialog';
import { useNotification } from '../../components/useNotification';
import ProductService from '../../services/ProductService';
import api from '../../utils/api';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  }
});

const perPage = [10, 15, 25];

const productService = new ProductService(api);

function ProductList() {
  const [products, setProducts] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [productIdForDelete, setProductIdForDelete] = useState(0);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(perPage[0]);
  const [total, setTotal] = useState(0);
  const history = useHistory();
  const classes = useStyles();
  const {createNotification} = useNotification();

  useEffect(() => {
    getProducts();
  }, [page, rowsPerPage]);

  async function getProducts() {
    try {
      const response = await productService.getAllProducts(page, rowsPerPage);
      
      setTotal(response.pagination.total);
      setProducts([...response.data]);
    } catch(err) {
      createNotification('Não foi possível buscar os produtos', 'error');
    }
  }

  function handleDialogClose() {
    setOpenDialog(false);
  }

  function handleEditAction(id) {
    history.push(`/edit/${id}`);
  }

  function handleDeleteAction(id) {
    setProductIdForDelete(id);
    setOpenDialog(true);
  }

  async function handleConfirmDelete() {
    try {
      await productService.deleteProduct(productIdForDelete);
      setOpenDialog(false);
      
      getProducts();
      createNotification('Produto deletado com sucesso.', 'success');
    } catch(err) {
      createNotification('Não foi possível deletar esse produto.', 'error');
    }
  }

  function handleChangePage(event, newPage) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event) {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  }

  return(
    <>
      <Container>
        <Container className={classes.header}>
          <h1>Produtos</h1>
          <Link to='/create'>
            <Button>Adicionar Produto</Button>
          </Link>
        </Container>
        <TableContainer>
          <Table size='small' stickyHeader border={1}>
            <TableHead>
              <TableCell>Nome</TableCell>
              <TableCell>Categoria</TableCell>
              <TableCell align='right'>Preço</TableCell>
              <TableCell align='right'>Data de Criação</TableCell>
              <TableCell align='right'>Ações</TableCell>
            </TableHead>
            <TableBody>
              {
                products.map(product => (
                  <TableRow key={product.id}>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell align='right'>R$ {product.price}</TableCell>
                    <TableCell align='right'>{new Date(product.created_at).toLocaleDateString()}</TableCell>
                    <TableCell align='right'>
                      <IconButton onClick={() => handleDeleteAction(product.id)}>
                        <Delete />
                      </IconButton>
                      <IconButton onClick={() => handleEditAction(product.id)}>
                        <Create />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
          <TablePagination
            component='div'
            rowsPerPage={rowsPerPage}
            rowsPerPageOptions={perPage}
            page={page}
            count={total}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            labelRowsPerPage='Items por página:'
          />
        </TableContainer>
      </Container>
      <DeleteDialog open={openDialog} onClose={handleDialogClose} onConfirm={handleConfirmDelete}/>
    </>
  )
}

export default ProductList;