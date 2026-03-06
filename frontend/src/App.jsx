import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./common/Layout";
import ArtWorkPage from "./pages/ArtWorkPage";
import CheckoutPage from "./pages/CheckoutPage";
import CollectionPage from "./pages/CollectionPage";
import ContactPage from "./pages/ContactPage";
import Homepage from "./pages/HomePage";
import OrderPage from "./pages/OrderPage";

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
