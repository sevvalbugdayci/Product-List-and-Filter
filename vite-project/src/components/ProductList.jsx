import React, { useState, useEffect } from "react";
import ProductsApi from "../api/productsApi";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Switch from '@mui/material/Switch';
import Tooltip from '@mui/material/Tooltip';
import SettingsApplicationsIcon from '@mui/icons-material/SettingsApplications';
import ConfirmationDialog from "./ConfirmationDialog";
import Typography from '@mui/material/Typography';
import FilterComponent from "./FilterForm";
import ProductDetailDialog from "./ProductDetailsDialog";
import ProductForm from "./ProductForm";

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import EditableCell from "./EditableCell";
import { updateProduct } from "../api/productsApi";
const statusDescriptions = {
  0: 'Satışta',
  1: 'Satışta Değil',
  2: 'Stoğu Tükendi',
  3: 'Beymen Onayı Bekliyor',
  4: 'Revize Bekliyor',
  5: 'Beymene Seçilmedi'
};



function ProductList() {
    const [products, setProducts] = useState([]);
    const [confirmationOpen, setConfirmationOpen] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState(null);
    const [switchValue, setSwitchValue] = useState({});
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [filters, setFilters] = useState({
      name: '',
      barcode: '',
      modelCode: '',
      brand: '',
      stock: '',
      status: []
    });
    const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [isProductFormOpen, setIsProductFormOpen] = useState(false);
    


    const handleSwitchChange = (productId) => {
        setSelectedProductId(productId);
        setConfirmationOpen(true);
    };

   

    const handleConfirmation = () => {
        setSwitchValue(prevState => ({
            ...prevState,
            [selectedProductId]: !prevState[selectedProductId]
        }));
        setConfirmationOpen(false);
        setSelectedProductId(null);
    };

    const handleCancel = () => {
        setConfirmationOpen(false);
        setSelectedProductId(null);
    };

    const getStatusDescription = (status) => {
      return statusDescriptions[status] || 'Bilinmeyen Durum';
    };

   

    
    

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const fetchedProducts = await ProductsApi.getAllProducts();
                const switchValues = {};
                fetchedProducts.forEach(product => {
                    switchValues[product.id] = product.status;
                });
                setSwitchValue(switchValues);
                setProducts(fetchedProducts);
                setFilteredProducts(fetchedProducts);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const applyFilters = (filters) => {
      let filteredProducts = products;
  
      if (filters.name) {
        filteredProducts = filteredProducts.filter(product =>
          product.name.toLowerCase().includes(filters.name.toLowerCase())
        );
      }
  
      if (filters.barcode) {
        filteredProducts = filteredProducts.filter(product =>
          product.barcode.includes(filters.barcode)
        );
      }
  
      if (filters.modelCode) {
        filteredProducts = filteredProducts.filter(product =>
          product.modelCode.includes(filters.modelCode)
        );
      }
  
      if (filters.brand) {
        filteredProducts = filteredProducts.filter(product =>
          product.brand.toLowerCase().includes(filters.brand.toLowerCase())
        );
      }
  
      if (filters.stock) {
        filteredProducts = filteredProducts.filter(product =>
          product.stock && product.stock.toString().toLowerCase().includes(filters.stock.toLowerCase())
          );
      }
      setFilteredProducts(filteredProducts);
    };


    const handleEditPrice = async (productId, field, newValue) => {
      try {
        const productToUpdate = products.find(product => product.id === productId);
    
        if (!productToUpdate) {
          console.error("Product not found");
          return;
        }
    
        let updatedProduct = {
          ...productToUpdate,
          [field]: newValue
        };
    
        if (!updatedProduct.hasOwnProperty("marketSalesPrice")) {
          updatedProduct.marketSalesPrice = productToUpdate.marketSalesPrice;
        }
    
        if (!updatedProduct.hasOwnProperty("beymenSalesPrice")) {
          updatedProduct.beymenSalesPrice = productToUpdate.beymenSalesPrice;
        }
    
        if (field === "marketSalesPrice" && newValue < productToUpdate.beymenSalesPrice) {
          alert("PİYASA SATIŞ FİYATI, BEYMEN SATIŞ FİYATI'ndan küçük olamaz!");
          return;
        }
    
        if (field === "beymenSalesPrice" && newValue > productToUpdate.marketSalesPrice) {
          alert("BEYMEN SATIŞ FİYATI, PİYASA SATIŞ FİYATI'ndan büyük olamaz!");
          return;
        }
    
        const updatedProducts = products.map(product =>
          product.id === productId ? { ...product, [field]: newValue } : product
        );
    
        await updateProduct(productId, { [field]: newValue });
      } catch (error) {
        console.error("Error updating product:", error);
      }
    };
    
    
    const handleIconClick = (product) => {
      setSelectedProduct(product);
      setIsDetailsDialogOpen(true);
    };
  
    const handleCloseDialog = () => {
      setIsDetailsDialogOpen(false);
      setSelectedProduct(null);
    };

    const handleAddProduct = (newProduct) => {
      setProducts((prevProducts) => [...prevProducts, newProduct]);
    };

    

    return (
        <main>
            <div>
            <FilterComponent onFilterChange={applyFilters} />
            </div>
            <div className="product-add-button">
                <Button variant="outlined" onClick={() => setIsProductFormOpen(true)}>
                   Yeni Ürün Ekle
                </Button>

                <Modal open={isProductFormOpen} onClose={() => setIsProductFormOpen(false)}>
                  <div className="product-form-modal">
                    <ProductForm onClose={() => setIsProductFormOpen(false)} onAddProduct={handleAddProduct}/>
                  </div>
                </Modal>
            </div>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                        <TableRow>
                        <TableCell align="center">ÜRÜN ADI</TableCell>
                        <TableCell align="center">BARKOD</TableCell>
                        <TableCell align="center">MODEL KODU</TableCell>
                        <TableCell align="center">MARKA</TableCell>
                        <TableCell align="center">SATICI RENK</TableCell>
                        <TableCell align="center">BEDEN</TableCell>
                        <TableCell align="center"><Tooltip disableFocusListener disableTouchListener title={<Typography>Ürün için tanımlanmış komisyon(KDV Dahil)</Typography>}>KOMİSYON</Tooltip></TableCell>
                        <TableCell align="center"><Tooltip title={<Typography>Ürünün indirim uygulanmadan önceki fiyatıdır.</Typography>}>PİYASA SATIŞ FİYATI</Tooltip></TableCell>
                        <TableCell align="center"><Tooltip title={<Typography>Ürünün Beymen.com üzerindeki fiyatıdır.</Typography>}>BEYMEN SATIŞ FİYATI</Tooltip></TableCell>
                        <TableCell align="center">STOK</TableCell>
                        <TableCell align="center">DURUM</TableCell>
                        <TableCell align="center">ÜRÜNÜ SATIŞA AÇ/KAPA</TableCell>
                        <TableCell align="center"><Tooltip title={<Typography>İcona tıklayarak detayı görebilirsiniz.</Typography>}>DETAY</Tooltip></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredProducts && filteredProducts.map((product) => (
                            <TableRow key={product.id}>
                                <TableCell align="center">{product.name}</TableCell>
                                <TableCell align="center">{product.barcode}</TableCell>
                                <TableCell align="center">{product.modelCode}</TableCell>
                                <TableCell align="center">{product.brand}</TableCell>
                                <TableCell align="center">{product.merchantColorCode}</TableCell>
                                <TableCell align="center">{product.size}</TableCell>
                                <TableCell align="center">{product.commission}</TableCell>                               
                                  <EditableCell
                                    value={product.marketSalesPrice}
                                    onChange={(newValue) => handleEditPrice(product.id, "marketSalesPrice", newValue)}
                                    isNumeric
                                  />
                                  <EditableCell
                                    value={product.beymenSalesPrice}
                                    onChange={(newValue) => handleEditPrice(product.id, "beymenSalesPrice", newValue)}
                                    isNumeric
                                  />                               
                                <TableCell align="center">{product.stock}</TableCell>
                                <TableCell align="center">{getStatusDescription(product.status)}</TableCell>
                                <TableCell align="center">
                                    <Switch
                                        checked={switchValue[product.id]}
                                        onChange={() => handleSwitchChange(product.id)}
                                    />
                                    <ConfirmationDialog
                                        open={confirmationOpen}
                                        onClose={handleCancel}
                                        onConfirm={handleConfirmation}
                                    />
                                </TableCell>
                                <TableCell align="center"><SettingsApplicationsIcon
                                  onClick={() => handleIconClick(product)}
                                  style={{ cursor: 'pointer' }}
                                />

                                  <ProductDetailDialog
                                          isOpen={isDetailsDialogOpen}
                                          onClose={handleCloseDialog}
                                          product={selectedProduct}
                                          className='open-dialog'
                                        />
                                
                                
                                
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </main>
    );
}

export default ProductList;
