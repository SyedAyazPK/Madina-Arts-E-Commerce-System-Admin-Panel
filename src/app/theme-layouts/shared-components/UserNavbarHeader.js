import { styled } from '@mui/material/styles';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { selectUser } from 'app/store/userSlice';

const Root = styled('div')(({ theme }) => ({
  '& .username, & .email': {
    transition: theme.transitions.create('opacity', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
  },

  '& .avatar': {
    background: theme.palette.background.default,
    transition: theme.transitions.create('all', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.easeInOut,
    }),
    bottom: 0,
    '& > img': {
      borderRadius: '50%',
    },
  },
}));

function UserNavbarHeader(props) {
  const user = useSelector(selectUser);

  return (
    <Root className='user mx-16 mt-16 relative flex flex-row items-center   pb-14 shadow-0'>
      <div className='flex items-center  '>
        <Avatar
          sx={{
            backgroundColor: 'background.paper',
            color: 'text.secondary',
          }}
          className='avatar text-32 font-bold w-56 h-56'
          src={user.photoURL}
          alt={user.name}
        ></Avatar>
      </div>
      <div className='ml-8'>
        <Typography className='username text-14 whitespace-nowrap font-medium'>
          {user.name}
        </Typography>
        <Typography
          className='email text-13 whitespace-nowrap font-medium'
          color='text.secondary'
        >
          {user.email}
        </Typography>
      </div>
    </Root>
  );
}

export default UserNavbarHeader;
