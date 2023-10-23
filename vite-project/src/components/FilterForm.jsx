import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function FilterComponent({ onFilterChange }) {
  const [filters, setFilters] = useState({
    name: '',
    barcode: '',
    modelCode: '',
    brand: '',
    stock: '',
    status: []
  });
  const [isFiltered, setIsFiltered] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: value
    }));
  };

  const handleButtonClick = () => {
    onFilterChange(filters);
    setIsFiltered(true);
    
  };

  const handleStatusChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions, option => parseInt(option.value, 10));
    setFilters(prevFilters => ({
      ...prevFilters,
      status: selectedOptions
    }));
  };

  const handleClearFilter = () => {
    setFilters({
      name: '',
      barcode: '',
      modelCode: '',
      brand: '',
      stock: '',
      status: []
    });
    setButtonText('Filtreyi Temizle');
  };

  return (
    <div className='filter-label'>
      <div>
        <label>Ürün Adı</label>
        <input
          type="text"
          name="name"
          value={filters.name}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Barkod</label>
        <input
          type="text"
          name="barcode"
          value={filters.barcode}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Model Kodu</label>
        <input
          type="text"
          name="modelCode"
          value={filters.modelCode}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Marka</label>
        <input
          type="text"
          name="brand"
          value={filters.brand}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <label>Stok Kodu</label>
        <input
          type="text"
          name="stock"
          value={filters.stock}
          onChange={handleInputChange}
        />
      </div>
      <div>

        
      </div>
      
      {isFiltered ? <Button variant="outlined" onClick={handleButtonClick}>Filtreyi Temizle</Button> : <Button variant="outlined" onClick={handleButtonClick}>Filtrele</Button>}
      
    </div>
  );
}

export default FilterComponent;
