import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function ConfirmationDialog({ open, onClose, onConfirm }) {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Değişiklikleri Onayla</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Değişiklikleri onaylamak istiyor musunuz?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          İptal
        </Button>
        <Button onClick={() => { onConfirm(); onClose(); }} color="primary">
          Onayla
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmationDialog;
