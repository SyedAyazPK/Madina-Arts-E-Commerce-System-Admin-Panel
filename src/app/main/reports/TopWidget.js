import Paper from "@mui/material/Paper";
import { lighten, useTheme } from "@mui/material/styles";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Typography from "@mui/material/Typography";
import { memo, useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import Box from "@mui/material/Box";
import { useSelector } from "react-redux";
import UsersWidget from "./UsersWidget";
import SubscriptionWidget from "./SubscriptionWidget";
import { selectCustomers } from "app/store/customerSlice";
import { selectOrdersYearly, selectSalesYearly } from "app/store/reportSlice";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";

function TopWidget() {
  const theme = useTheme();
  const [awaitRender, setAwaitRender] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const [alignment, setAlignment] = useState("yearly");
  const ordersYearly = useSelector(selectOrdersYearly);
  const salesYearly = useSelector(selectSalesYearly);

  // const currentRange = Object.keys(ranges)[tabValue];
  const ranges = [{ key: "year", label: "This Year" }];

  useEffect(() => {
    setAwaitRender(false);
  }, []);

  if (awaitRender) {
    return null;
  }

  const handleChange = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  return (
    <Paper className="flex flex-col flex-auto p-24 shadow rounded-2xl overflow-hidden">
      <div className="flex flex-col sm:flex-row items-start justify-between">
        <Typography className="text-3xl font-medium tracking-tight leading-6 truncate">
          Reports
        </Typography>
        <div className="mt-12 sm:mt-0 sm:ml-8">
          <ToggleButtonGroup
            color="primary"
            value={alignment}
            exclusive
            onChange={handleChange}
            aria-label="Platform"
          >
            <ToggleButton value="yearly" size="small">
              Yearly
            </ToggleButton>
            <ToggleButton value="lastTwoMonth" size="small">
              Last 2 Months
            </ToggleButton>
            <ToggleButton value="monthly" size="small">
              This Month
            </ToggleButton>
            <ToggleButton value="weekly" size="small">
              Last 7 days
            </ToggleButton>
          </ToggleButtonGroup>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-1 grid-flow-row gap-24 w-full mt-32 sm:mt-16">
        {/* <div className="md:flex flex-auto">
          <div className="mr-8">
            <UsersWidget />
          </div>

          <SubscriptionWidget />
        </div> */}
        <div className="flex flex-col">
          <Typography className="text-2xl font-medium" color="text.secondary">
            Overview
          </Typography>
          <div className="flex-auto grid grid-cols-4 gap-16 mt-24">
            <div className="col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl bg-indigo-50 text-indigo-800">
              <Typography className="text-5xl sm:text-7xl font-semibold leading-none tracking-tight">
                {
                  ordersYearly.order?.[0]?.totalEarnings
                  // ?.map((sale) => sale.totalEarnings)
                  // .reduce((a, b) => a + b, 0)
                }
              </Typography>
              <Typography className="mt-4 text-sm sm:text-lg font-medium">
                Total Sales
              </Typography>
            </div>
            <div className="col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl bg-green-50 text-green-800">
              <Typography className="text-5xl sm:text-7xl font-semibold leading-none tracking-tight">
                {
                  ordersYearly.order?.[0]?.totalOrderCount
                  // ?.map((sale) => sale.totalEarnings)
                  // .reduce((a, b) => a + b, 0)
                }
              </Typography>
              <Typography className="mt-4 text-sm sm:text-lg font-medium">
                Total Orders
              </Typography>
            </div>
            <Box
              sx={{
                backgroundColor: "lightgreen",
              }}
              className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
            >
              <Typography className="text-5xl font-semibold leading-none tracking-tight">
                $2,387
              </Typography>
              <Typography className="mt-4 text-sm font-medium text-center">
                Net Sales
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: "lightblue",
              }}
              className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
            >
              <Typography className="text-5xl font-semibold leading-none tracking-tight">
                350
              </Typography>
              <Typography className="mt-4 text-sm font-medium text-center">
                Average Daily net Sales
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: "lightpink",
              }}
              className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
            >
              <Typography className="text-5xl font-semibold leading-none tracking-tight">
                7 Days
              </Typography>
              <Typography className="mt-4 text-sm font-medium text-center">
                Order Placed
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: "whitesmoke",
              }}
              className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
            >
              <Typography className="text-5xl font-semibold leading-none tracking-tight">
                850
              </Typography>
              <Typography className="mt-4 text-sm font-medium text-center">
                Items Purchased
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: "#CC5500",
              }}
              className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
            >
              <Typography className="text-5xl font-semibold leading-none tracking-tight">
                Rs 0.00
              </Typography>
              <Typography className="mt-4 text-sm font-medium text-center">
                Refunded 0 orders (0 items)
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: "#ffffe0",
              }}
              className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
            >
              <Typography className="text-5xl font-semibold leading-none tracking-tight">
                Rs 24510.00
              </Typography>
              <Typography className="mt-4 text-sm font-medium text-center">
                Charged for shipping
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: "#D8BFD8",
              }}
              className="col-span-2 sm:col-span-1 flex flex-col items-center justify-center py-32 px-4 rounded-2xl"
            >
              <Typography className="text-5xl font-semibold leading-none tracking-tight">
                Rs 0.00
              </Typography>
              <Typography className="mt-4 text-sm font-medium text-center">
                Worth of coupons used
              </Typography>
            </Box>
          </div>
        </div>
      </div>
    </Paper>
  );
}

export default memo(TopWidget);
