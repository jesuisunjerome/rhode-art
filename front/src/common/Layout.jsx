import { Outlet } from "react-router";
import Footer from "./Footer";
import Navbar from "./Navbar";
import VerticalLines from "./VerticalLines";

export default function Layout() {
  return (
    <>
      <VerticalLines />
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}
