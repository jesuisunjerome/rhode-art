import { Outlet } from "react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";
import VerticalLines from "./VerticalLines";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react"

export default function Layout() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <VerticalLines />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
