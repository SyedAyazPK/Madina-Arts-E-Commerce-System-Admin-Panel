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
import { useEffect, useState } from 'react';
import jwtService from '../../auth/services/jwtService';
import ReactCodeInput from 'react-verification-code-input';

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

function VerifyOTP() {
  const { control, formState, handleSubmit, setError, setValue } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });

  const { isValid, dirtyFields, errors } = formState;

  const [otpCount, setCount] = useState(0);

  function onSubmit() {
    jwtService
      .signInWithEmailAndPassword('admin@fusetheme.com', 'admin')
      .then((user) => {
        // No need to do anything, user data will be set at app/auth/AuthContext
      })
      .catch((_errors) => {
        _errors.forEach((error) => {
          setError(error.type, {
            type: 'manual',
            message: error.message,
          });
        });
      });
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
      <div className=' flex flex-col sm:flex-row   md:items-start sm:justify-center md:justify-center    flex-1 min-w-0 p-32'>
        <div className=' sm:h-auto md:flex   md:justify-center w-full sm:w-auto md:h-full md:w-full py-8 px-16 sm:p-32 md:p-32'>
          <div className='w-full sm:w-320 mx-auto sm:mx-0'>
            <Typography className=' text-3xl text-center font-bold tracking-tight leading-tight'>
              Verification Code
            </Typography>
            <div className='flex items-baseline mt-2 font-medium justify-center'>
              <Typography>Please enter the verification code</Typography>
            </div>

            <div className='flex  justify-center w-full mt-80'>
              <ReactCodeInput
                fields={4}
                type='number'
                onChange={(e) => {
                  setCount(e.length);
                }}
                className='flex justify-center'
              />
            </div>

            <div>
              <Button
                variant='contained'
                color='secondary'
                className=' w-full mt-56'
                disabled={otpCount < 4}
                size='large'
                style={{ borderRadius: '8px' }}
                onClick={() => onSubmit()}
              >
                Continue
              </Button>
              <div className='flex items-center mt-16'>
                <div className='flex-auto mt-px border-t' />
                <Typography className='mx-8' color='text.secondary'>
                  Resend OTP in 01:00
                </Typography>
                <div className='flex-auto mt-px border-t' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default VerifyOTP;
