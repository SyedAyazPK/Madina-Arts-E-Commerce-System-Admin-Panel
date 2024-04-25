import { Typography } from '@mui/material';
import { getBrands } from 'app/store/brandSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AddBrand from './AddBrand';
import BrandTable from './BrandTable';

function Brands(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBrands());
  }, []);
  return (
    <div className='my-24 p-32'>
      <Typography className='text-center title text-center'>Brands</Typography>
      <Typography className='text-center'>
        Product Brands for your store can be managed here. To change the order
        of Brands on the front-end you can drag and drop to sort them. To see
        more Brands listed click the "screen options" link at the top-right of
        this page.
      </Typography>
      <div className='my-24'></div>
      <AddBrand />
      <BrandTable />
    </div>
  );
}

export default Brands;
