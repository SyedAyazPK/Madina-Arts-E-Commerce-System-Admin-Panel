import { Controller, useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import _ from "@lodash";
import clsx from "clsx";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  closeEditDialog,
  getCategories,
  selectCategories,
  selectEditCategoryDialogData,
  selectEditCategoryDialogState,
  updateCategory,
  uploadImage,
} from "app/store/categorySlice";
import {
  Avatar,
  Dialog,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import { useState } from "react";

const defaultValues = {
  title: "",
  description: "",
};

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  title: yup.string().required("You must enter a value"),
});

function EditCategory({ dataObject }) {
  const dispatch = useDispatch();
  const categories = useSelector(selectCategories);

  //   const dataObject = useSelector(selectEditCategoryDialogData);
  const open = useSelector(selectEditCategoryDialogState);
  const { handleSubmit, register, reset, control, watch, formState } = useForm({
    defaultValues: dataObject,
    mode: "all",
    resolver: yupResolver(schema),
  });

  const [categoryImg, setcategoryImg] = useState(
    dataObject?.image ? dataObject?.image : null
  );

  const { isValid, dirtyFields, errors, touchedFields } = formState;

  const data = watch();

  const handleClose = () => {
    dispatch(closeEditDialog());
  };

  return (
    <div className="flex w-full">
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="md"
        fullWidth
      >
        <DialogContent className="w-full">
          <DialogContentText id="alert-dialog-description" color="text.primary">
            <form
              className="w-full"
              onSubmit={handleSubmit((_data) =>
                dispatch(updateCategory({ ..._data, image: categoryImg }))
                  .then(() => dispatch(getCategories()))
                  .then(() => handleClose())
              )}
            >
              <div className="md:flex w-full justify-between mb-16">
                <div className="w-full flex mr-16">
                  <Controller
                    render={({ field }) => (
                      <FormControl required fullWidth>
                        <FormLabel
                          className="font-medium text-14"
                          component="legend"
                        >
                          Category Name
                        </FormLabel>
                        <TextField
                          {...field}
                          // label='Category Name'
                          variant="outlined"
                          error={!!errors.title}
                          helperText={errors?.title?.message}
                          required
                          fullWidth
                          size={"small"}
                        />
                      </FormControl>
                    )}
                    name="title"
                    control={control}
                  />
                </div>
                <div className="flex w-full">
                  <Controller
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <FormLabel
                          className="font-medium text-14"
                          component="legend"
                        >
                          Parent
                        </FormLabel>
                        <Select
                          {...field}
                          variant="outlined"
                          fullWidth
                          size={"small"}
                        >
                          {categories?.result
                            ?.filter((item) => {
                              return item._id !== dataObject._id;
                            })
                            .map((category) => (
                              <MenuItem value={category._id}>
                                {category.title}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>
                    )}
                    name="parentId"
                    control={control}
                  />
                </div>
              </div>
              <div className="  w-full justify-between items-center">
                <div className="w-full flex mr-16">
                  <Controller
                    render={({ field }) => (
                      <FormControl fullWidth>
                        <FormLabel
                          className="font-medium text-14"
                          component="legend"
                        >
                          Description
                        </FormLabel>
                        <TextField
                          {...field}
                          variant="outlined"
                          fullWidth
                          size={"small"}
                        />
                      </FormControl>
                    )}
                    name="description"
                    control={control}
                  />
                </div>
                <div className="flex flex-col w-full  ">
                  <div className="mt-16">
                    <Controller
                      render={({ field }) => (
                        <FormControl fullWidth>
                          <FormLabel
                            className="font-medium text-14"
                            component="legend"
                          >
                            Upload Image
                          </FormLabel>
                          <Avatar src={categoryImg} />

                          <TextField
                            {...field}
                            variant="outlined"
                            fullWidth
                            type={"file"}
                            size={"small"}
                            accept="image/*"
                            onChange={(e) =>
                              dispatch(uploadImage(e.target.files[0])).then(
                                (resp) => setcategoryImg(resp.payload.data)
                              )
                            }
                          />
                        </FormControl>
                      )}
                      name="catImage"
                      control={control}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-center w-full my-16 items-center">
                <Button
                  className="mx-8 my-16"
                  variant="contained"
                  color="secondary"
                  type="submit"
                  disabled={!isValid}
                  size="large"
                  style={{ borderRadius: "5px" }}
                >
                  Save Category
                </Button>
              </div>
            </form>
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditCategory;
