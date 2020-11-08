import React from 'react';
import { Dialog as MuiDialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core'
import { Button, OutlinedButton } from './Buttons';

function DeleteDialog({open, onClose, onConfirm}) {
  return(
    <MuiDialog open={open} onClose={onClose}>
      <DialogTitle>
        Excluir Produto
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
        Tem certeza que deseja excluir este produto?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <OutlinedButton onClick={onClose}>
          Cancelar
        </OutlinedButton>
        <Button onClick={onConfirm}>
          Excluir
        </Button>
      </DialogActions>
    </MuiDialog>
  );
}

export default DeleteDialog;