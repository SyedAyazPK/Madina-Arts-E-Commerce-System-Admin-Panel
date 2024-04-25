import {
  FacebookOutlined,
  LinkedIn,
  Pinterest,
  Twitter,
} from '@mui/icons-material';
import { Box, Typography } from '@mui/material';
import React from 'react';

const Footer = () => {
  const footerUperLayout = [
    {
      logo: 'Madina Arts',
      content: ['Karachi Pakistan'],
      socialLinks: [
        <FacebookOutlined />,
        <Twitter />,
        <LinkedIn />,
        <Pinterest />,
      ],
    },
    {
      content: ['Shop', 'Men', 'Women', 'Kids', 'Bedding', 'Home Decor'],
    },
    {
      content: ['About', 'Madina Arts', 'Parkins'],
    },
    {
      content: ['Help', 'Help Center', 'Return Policy', 'Refund'],
    },
  ];
  const lowerLayout = [
    {
      name: 'Developed by NaxTech',
    },
    {
      name: ['Pricacy Policy', 'Terms & Conditions', 'Cookies'],
    },
    {
      name: 'Scroll To Top',
    },
  ];

  return (
    <>
      <Box
        paddingY='5rem'
        className='grid grid-cols-2 md:grid-cols-4 gap-12 sm:px-16 '
      >
        {footerUperLayout.map((item, index) => {
          var parentIndex = index;
          return (
            <Box
              className={` w-full `}
              key={index}
              display='flex'
              flexDirection='column'
            >
              <Typography
                variant='h4'
                component='h6'
                // sx={!item?.logo && { display: 'none' }}
              >
                <img src={'assets/images/logo/logo.png'} />
              </Typography>
              {item?.content?.map((item, index) => {
                const itemWidth = item.length;
                return (
                  <Box key={index} sx={index === 0 && { marginBottom: 1 }}>
                    <Typography
                      variant='subtitle1'
                      fontWeight={500}
                      fontSize={14}
                      className={`!w-[${itemWidth}ch] `}
                      sx={
                        parentIndex === 0
                          ? {
                              py: 6,
                            }
                          : {
                              justifyContent: 'center',
                              cursor: 'pointer',
                              my: 0.3,
                              '&:hover': {
                                transition: 'all 0.5s ease-in-out',
                                pb: 0.3,
                                color: '#009052',
                              },
                            }
                      }
                    >
                      {item}{' '}
                    </Typography>
                  </Box>
                );
              })}
              <Box
                width='100%'
                paddingY='1rem'
                display='flex'
                alignItems='center'
                // justifyContent="space-between"
              >
                {item?.socialLinks?.map((link, index) => {
                  const colorGeneratorByIndex = () => {
                    let color;
                    if (index === 0) {
                      color = '#199de0';
                    } else if (index === 1) {
                      color = '#0bbe70';
                    } else if (index === 2) {
                      color = '#0bbe70';
                    } else {
                      color = '#199de0';
                    }
                    return color;
                  };
                  return (
                    <Box
                      borderRadius='100%'
                      sx={{
                        backgroundColor: colorGeneratorByIndex(),
                      }}
                      justifyContent='center'
                      color='white'
                      display='flex'
                      alignItems='center'
                      padding='10px 10px'
                      key={index}
                      className='mr-2'
                    >
                      {link}
                    </Box>
                  );
                })}
              </Box>
            </Box>
          );
        })}
      </Box>
      <Box className='flex items-center justify-center sm:flex-row flex-col sm:space-y-0 space-y-3 sm:justify-around'>
        {lowerLayout.map(({ name }, index) => {
          return (
            <Box key={index}>
              {Array.isArray(name) ? (
                <div className='flex items-center space-x-4'>
                  {name?.map((item, index) => {
                    return (
                      <Typography
                        key={index}
                        variant='subtitle1'
                        fontSize={14}
                        fontWeight={500}
                        className='transition-colors cursor-pointer hover:text-[#199de0] '
                      >
                        {item}{' '}
                      </Typography>
                    );
                  })}
                </div>
              ) : (
                <Typography variant='subtitle1' fontSize={14} fontWeight={500}>
                  {name}{' '}
                </Typography>
              )}
            </Box>
          );
        })}
      </Box>
    </>
  );
};

export default Footer;
