import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
function ProductDetailDialog({ product, isOpen, onClose }) {
  return (

    
      <Dialog open={isOpen} onClose={onClose}>
       <IconButton
        edge="end"
        color="inherit"
        onClick={onClose}
        aria-label="close"
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
        }}
      >
        <CloseIcon />
      </IconButton>
      <DialogContent>
        {product && (
          <div>
            <h5>Name : {product.name}</h5>
            <h5>Barkod : {product.barcode}</h5>
            <h5>Model Kodu : {product.modelCode}</h5>
            <h5>Marka : {product.brand}</h5>
            <h5>Satıcı Renk : {product.merchantColorCode}</h5>
            <h5>Beden : {product.size}</h5>
            <h5>Komisyon : {product.commission}</h5>
            <h5>Piyasa Satış Fiyatı : {product.marketSalesPrice}</h5>
            <h5>Beymen Satış Fiyatı : {product.beymenSalesPrice}</h5>
            <h5>Stok : {product.stock}</h5>
          </div>
        )}
      </DialogContent>
    </Dialog>
    
    
  );
}

export default ProductDetailDialog;

