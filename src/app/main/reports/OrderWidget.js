import Paper from '@mui/material/Paper';
import { lighten, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { memo, useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useSelector } from 'react-redux';
import {
  selectMonths,
  selectOrdersMonthly,
  selectSalesMonthly,
} from 'app/store/reportSlice';

function OrderWidget() {
  const theme = useTheme();
  const [awaitRender, setAwaitRender] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const ordersMonthly = useSelector(selectOrdersMonthly);
  const monthsArray = useSelector(selectMonths);
  const salesMonthly = useSelector(selectSalesMonthly);

  const state = {
    series: [
      {
        name: 'Orders Placed',
        // data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
        data: ordersMonthly?.map((order) => order.quantity),
      },
      {
        name: 'Sales',
        // data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
        data: salesMonthly?.map((order) => order?.quantity),
      },
    ],
    options: {
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        // categories: [
        //   'Feb',
        //   'Mar',
        //   'Apr',
        //   'May',
        //   'Jun',
        //   'Jul',
        //   'Aug',
        //   'Sep',
        //   'Oct',
        // ],

        categories: monthsArray,
      },

      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return ' ' + val + ' ';
          },
        },
      },
    },
  };

  useEffect(() => {
    setAwaitRender(false);
  }, []);

  if (awaitRender) {
    return null;
  }

  return (
    <Paper className='flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden'>
      <div className='flex flex-col sm:flex-row items-start justify-between'>
        <Typography className='text-lg font-medium tracking-tight leading-6 truncate'>
          Orders and Sales
        </Typography>
      </div>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type='bar'
        height={350}
      />
    </Paper>
  );
}

export default memo(OrderWidget);
