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

function DeliveredStats() {
  const theme = useTheme();
  const [awaitRender, setAwaitRender] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  const ordersYearly = useSelector(selectOrdersYearly);
  const salesYearly = useSelector(selectSalesYearly);

  const widgets = {
    githubIssues: {
      overview: {
        "this-week": {
          "new-issues": 214,
          "closed-issues": 75,
          fixed: 3,
          "wont-fix": 4,
          "re-opened": 8,
          "needs-triage": 6,
        },
        "last-week": {
          "new-issues": 197,
          "closed-issues": 72,
          fixed: 6,
          "wont-fix": 11,
          "re-opened": 6,
          "needs-triage": 5,
        },
      },
      ranges: {
        "this-week": "This Week",
        "last-week": "Last Week",
      },
      labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      series: {
        "this-week": [
          {
            name: "New issues",
            type: "line",
            data: [42, 28, 43, 34, 20, 25, 22],
          },
          {
            name: "Closed issues",
            type: "column",
            data: [11, 10, 8, 11, 8, 10, 17],
          },
        ],
        "last-week": [
          {
            name: "New issues",
            type: "line",
            data: [37, 32, 39, 27, 18, 24, 20],
          },
          {
            name: "Closed issues",
            type: "column",
            data: [9, 8, 10, 12, 7, 11, 15],
          },
        ],
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
    <div className="grid grid-cols-1 lg:grid-cols-1 grid-flow-row gap-24 w-full mt-32 sm:mt-16">
      <div className="flex flex-col">
        <Typography className="text-2xl font-medium" color="text.secondary">
          Delivered
        </Typography>
        <div className="flex-auto grid grid-cols-4 gap-16 mt-24">
          <div className="col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl bg-indigo-50 text-indigo-800">
            <Typography className="text-5xl sm:text-7xl font-semibold leading-none tracking-tight">
              {ordersYearly
                ?.map((sale) => sale.totalEarnings)
                .reduce((a, b) => a + b, 0)}
            </Typography>
            <Typography className="mt-4 text-sm sm:text-lg font-medium">
              Total Sales
            </Typography>
          </div>
          <div className="col-span-2 flex flex-col items-center justify-center py-32 px-4 rounded-2xl bg-green-50 text-green-800">
            <Typography className="text-5xl sm:text-7xl font-semibold leading-none tracking-tight">
              {ordersYearly
                ?.map((order) => order.totalOrderCount)
                .reduce((a, b) => a + b, 0)}
            </Typography>
            <Typography className="mt-4 text-sm sm:text-lg font-medium">
              Total Orders
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(DeliveredStats);
