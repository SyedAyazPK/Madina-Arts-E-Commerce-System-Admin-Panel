import { Typography } from '@mui/material';
import { getCategories } from 'app/store/categorySlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import AddCategory from './AddCategory';
import CategoryTable from './CategoryTable';

function Categories(props) {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, []);
  return (
    <div className='my-24 p-32'>
      <Typography className='text-center title text-center'>
        Categories
      </Typography>
      <Typography className='text-center'>
        Product categories for your store can be managed here.
      </Typography>
      <div className='my-24'></div>
      <AddCategory />
      <CategoryTable />
    </div>
  );
}

export default Categories;
