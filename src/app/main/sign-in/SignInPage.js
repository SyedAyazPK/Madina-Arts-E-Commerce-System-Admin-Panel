import { yupResolver } from '@hookform/resolvers/yup';
import { Controller, useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import * as yup from 'yup';
import _ from '@lodash';
import FuseSvgIcon from '@fuse/core/FuseSvgIcon';
import AvatarGroup from '@mui/material/AvatarGroup';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { useEffect } from 'react';
import jwtService from '../../auth/services/jwtService';
import History from '@history';

/**
 * Form Validation Schema
 */
const schema = yup.object().shape({
  phone: yup.string().required('You must enter a mobile number'),
});

const defaultValues = {
  phone: '',
  remember: true,
};

function SignInPage() {
  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  function onSubmit({ phone }) {
    History.push('/sign-in/verify');
  }

  return (
    <div className='h-full'>
      <div>
        <img
          className='w-1/2 md:w-1/5 p-8'
          src='assets/images/logo/logo.png'
          alt='logo'
        />
      </div>
      <div className=' flex flex-col sm:flex-row items-center md:items-start sm:justify-center md:justify-center    flex-1 min-w-0 p-32'>
        <Paper className=' sm:h-auto md:flex md:items-center md:justify-center w-full sm:w-auto md:h-full md:w-1/2 py-8 px-16 sm:p-32 md:p-32 sm:rounded-2xl md:rounded-2xl sm:shadow md:shadow ltr:border-r-1 rtl:border-l-1'>
          <div className='w-full sm:w-320 mx-auto sm:mx-0'>
            <div className='flex justify-center mb-24'>
              <FuseSvgIcon
                className=' text-center p-8 rounded'
                size={40}
                color='secondary'
                style={{ border: '1px solid #eaecf0' }}
              >
                feather:arrow-right-circle
              </FuseSvgIcon>
            </div>

            <Typography
              className=' text-xl text-center font-bold tracking-tight leading-tight'
              color='secondary'
            >
              Log in to your account
            </Typography>
            <div className='flex items-baseline mt-2 font-medium justify-center'>
              <Typography color='secondary'>
                Welcome back! Please enter your details
              </Typography>
            </div>

            <form
              name='loginForm'
              noValidate
              className='flex flex-col justify-center w-full mt-80'
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                name='phone'
                control={control}
                render={({ field }) => (
                  <TextField
                    {...field}
                    className='mb-8'
                    label='Phone Number'
                    autoFocus
                    type='text'
                    error={!!errors.phone}
                    helperText={errors?.phone?.message}
                    variant='outlined'
                    required
                    fullWidth
                    placeholder='Enter your active mobile number'
                  />
                )}
              />

              <div className='flex flex-col sm:flex-row items-center justify-center sm:justify-between'>
                <Controller
                  name='remember'
                  control={control}
                  render={({ field }) => (
                    <FormControl>
                      <FormControlLabel
                        label='Remember for 30 days'
                        control={<Checkbox size='small' {...field} />}
                      />
                    </FormControl>
                  )}
                />

                {/* <Link
                  className='text-md font-medium'
                  to='/pages/auth/forgot-password'
                >
                  Resend OTP
                </Link> */}
              </div>

              <Button
                variant='contained'
                color='secondary'
                className=' w-full my-56'
                aria-label='Sign in'
                disabled={_.isEmpty(dirtyFields) || !isValid}
                type='submit'
                size='large'
                style={{ borderRadius: '8px' }}
              >
                Login
              </Button>

               

               
            </form>
          </div>
        </Paper>
      </div>
    </div>
  );
}

export default SignInPage;
