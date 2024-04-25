import { LinearProgress, Typography } from "@mui/material";

export const DropshipperCard = ({ total }) => {
  return (
    <div className="customer-card p-16">
      <div className="w-full flex justify-between">
        <Typography className="customer-card-title">
          Total Dropshippers
        </Typography>
        <Typography className="customer-card-quantity">{total} </Typography>
      </div>
      {/* <Typography className='customer-card-title mt-16 mb-8'>
        3% from tomorrow{' '}
      </Typography>
      <LinearProgress color='success' variant='determinate' value={50} /> */}
    </div>
  );
};
