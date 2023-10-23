import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import axios from 'axios';

const brands = ['Aquazzura', 'Barret', 'Appolia', 'Creazion'];
const sizes = ['xs', 's', 'm', 'l', 'xl'];
const statuses = ['Satışta', 'Satışta Değil', 'Stoğu Tükendi', 'Beymen Onayı Bekliyor', 'Revize Bekleniyor', 'Beymene Seçilmedi'];

function ProductForm({ onAddProduct }) {
  const [product, setProduct] = useState({
    name: '',
    barcode: '',
    modelCode: '',
    brand: '',
    merchantColorCode: '',
    size: '',
    commission: '',
    marketSalesPrice: '',
    beymenSalesPrice: '',
    stock: '',
    status: '',
    detail: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value
    }));
  };

  const handleAddProduct = () => {
    const newProduct = {
      ...product,
      commission: parseInt(product.commission, 10),
      marketSalesPrice: parseInt(product.marketSalesPrice, 10),
      beymenSalesPrice: parseInt(product.beymenSalesPrice, 10),
      stock: parseInt(product.stock, 10),
      status: parseInt(product.status, 10),
      iProductOnSale: product.iProductOnSale === 'true' 
    };
    axios.post('http://localhost:3000/items', product)
      .then((response) => {
        console.log('Ürün eklendi:', response.data);
        setProduct([...product, response.data]);
        setFilteredProducts([...filteredProducts, response.data]); 
        setProduct({
          name: '',
          barcode: '',
          modelCode: '',
          brand: '',
          merchantColorCode: '',
          size: '',
          commission: '',
          marketSalesPrice: '',
          beymenSalesPrice: '',
          stock:'',
          status:'',
          iProductOnSale:'',
          detail : ''
        });
        onclose();
        alert('Ürün başarıyla eklendi.');
      })
      .catch((error) => {
        console.error('Ürün eklenirken hata oluştu:', error);
      });
      
  };

  return (
    <div>
      <TextField fullWidth label="Ürün Adı" name="name" value={product.name} onChange={handleInputChange} />
      <TextField fullWidth label="Barkod" name="barcode" value={product.barcode} onChange={handleInputChange} />
      <TextField fullWidth label="Model Kodu" name="modelCode" value={product.modelCode} onChange={handleInputChange} />

      <FormControl fullWidth>
        <InputLabel>Marka</InputLabel>
        <Select name="brand" value={product.brand} onChange={handleInputChange} label="Marka">
          {brands.map((brand) => (
            <MenuItem key={brand} value={brand}>
              {brand}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField fullWidth label="Satıcı Renk" name="merchantColorCode" value={product.merchantColorCode} onChange={handleInputChange} />

      <FormControl fullWidth>
        <InputLabel>Beden</InputLabel>
        <Select name="size" value={product.size} onChange={handleInputChange} label="Beden">
          {sizes.map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField fullWidth label="Komisyon" name="commission" type="number" value={product.commission} onChange={handleInputChange} />
      <TextField fullWidth label="Piyasa Satış Fiyatı" name="marketSalesPrice" type="number" value={product.marketSalesPrice} onChange={handleInputChange} />
      <TextField fullWidth label="Beymen Satış Fiyatı" name="beymenSalesPrice" type="number" value={product.beymenSalesPrice} onChange={handleInputChange} />
      <TextField fullWidth label="Stok" name="stock" type="number" value={product.stock} onChange={handleInputChange} />

      <FormControl fullWidth >
        <InputLabel>Durum</InputLabel>
        <Select name="status" value={product.status} onChange={handleInputChange} label="Durum">
          {statuses.map((status, index) => (
            <MenuItem key={index} value={index}>
              {status}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <TextField fullWidth multiline label="Detay" name="detail" value={product.detail} onChange={handleInputChange} />

      <Button variant="outlined" onClick={handleAddProduct} className="add-from-product">
        Ekle
      </Button>
    </div>
  );
}

export default ProductForm;
