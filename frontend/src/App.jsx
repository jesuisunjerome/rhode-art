import { BrowserRouter, Route, Routes } from "react-router";
import { lazy } from "react";

// Layouts
const Layout = lazy(() => import("./common/Layout"));

// Public Pages
const ArtWorkPage = lazy(() => import("./pages/ArtWorkPage"));
const CheckoutPage = lazy(() => import("./pages/CheckoutPage"));
const CollectionPage = lazy(() => import("./pages/CollectionPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const Homepage = lazy(() => import("./pages/HomePage"));
const OrderPage = lazy(() => import("./pages/OrderPage"));

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="collection" element={<CollectionPage />} />
          <Route path="collection/artwork/:id" element={<ArtWorkPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="order/:id" element={<OrderPage />} />

          <Route path="*" element={<div>404 Not Found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
