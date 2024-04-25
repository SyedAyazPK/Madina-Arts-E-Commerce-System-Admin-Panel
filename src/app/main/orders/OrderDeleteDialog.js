import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch, useSelector } from "react-redux";
import {
  closeDeleteDialog,
  deleteOrder,
  getOrders,
  openDeleteDialog,
  selectDeleteDialogData,
  selectDeleteDialogState,
} from "app/store/orderSlice";

export default function OrderDeleteDialog() {
  const dispatch = useDispatch();
  const open = useSelector(selectDeleteDialogState);
  const data = useSelector(selectDeleteDialogData);

  //   const [open, setOpen] = React.useState(deleteDialogState);

  const handleClickOpen = () => {
    dispatch(openDeleteDialog());
    // setOpen(true);
  };

  const handleClose = () => {
    dispatch(closeDeleteDialog());
    // setOpen(false);
  };

  return (
    <div>
      {/* <Button variant='outlined' onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Move Order to Trash"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you wish to move this order to trash? You can restore
            it within 30 days. After 30 days it will be deleted permanently
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() =>
              dispatch(deleteOrder(data._id))
                .then(() => dispatch(getOrders()))
                .then(() => handleClose())
            }
            autoFocus
            variant="contained"
            color="error"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
