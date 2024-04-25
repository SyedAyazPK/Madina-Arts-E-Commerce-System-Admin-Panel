import { ThemeProvider } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Hidden from '@mui/material/Hidden';
import Toolbar from '@mui/material/Toolbar';
import clsx from 'clsx';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import {
  selectFuseCurrentLayoutConfig,
  selectToolbarTheme,
} from 'app/store/fuse/settingsSlice';
import AdjustFontSize from '../../shared-components/AdjustFontSize';
import FullScreenToggle from '../../shared-components/FullScreenToggle';
import LanguageSwitcher from '../../shared-components/LanguageSwitcher';
import NotificationPanelToggleButton from '../../shared-components/notificationPanel/NotificationPanelToggleButton';
import NavigationSearch from '../../shared-components/NavigationSearch';
import UserMenu from '../../shared-components/UserMenu';
import Logo from '../../shared-components/Logo';
import NavbarToggleButton from '../../shared-components/NavbarToggleButton';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Button, Typography } from '@mui/material';
import { selectCart } from 'app/store/shopSlice';
import History from '@history';

function ToolbarLayout3(props) {
  const config = useSelector(selectFuseCurrentLayoutConfig);
  const toolbarTheme = useSelector(selectToolbarTheme);
  const cart = useSelector(selectCart);

  const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px',
      margin: '16px',
    },
  }));

  return (
    <ThemeProvider theme={toolbarTheme}>
      <AppBar
        id='fuse-toolbar'
        className={clsx('flex relative z-20 shadow-md', props.className)}
        color='default'
        style={{ backgroundColor: '#DFF8E2' }}
      >
        <Toolbar className='container p-0 lg:px-24 min-h-48 md:min-h-64'>
          {config.navbar.display && (
            <Hidden lgUp>
              <NavbarToggleButton className='w-40 h-40 p-0 mx-0 sm:mx-8' />
            </Hidden>
          )}

          <Hidden lgDown>
            <div className={clsx('flex shrink-0 items-center')}>
              <Logo />
            </div>
          </Hidden>

          <div className='flex  flex-1'>
            <Hidden smDown>
              <NavigationSearch className='mx-16 lg:mx-16' variant='basic' />
            </Hidden>
          </div>

          <div className='flex items-center px-8 md:px-0 h-full '>
            <Hidden smUp>
              <NavigationSearch />
            </Hidden>
            <Button variant='contained' color='secondary' className='mx-8'>
              Help
            </Button>
            <UserMenu />
            <div
              className='flex items-center mr-8 mx-8 cursor-pointer'
              onClick={() => History.push('/cart')}
            >
              <Badge badgeContent={cart.length} color='secondary'>
                <ShoppingCartIcon color='action' />
              </Badge>
              <Hidden mdDown className='pl-8'>
                Shopping
              </Hidden>
            </div>
          </div>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  );
}

export default memo(ToolbarLayout3);
