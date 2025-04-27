import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import { CartProvider } from './context/CartContext';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Layout Components
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import AdminLayout from './components/admin/AdminLayout';

// Page Components
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Account from './pages/Account';
import OrderHistory from './pages/OrderHistory';
import OrderDetail from './pages/OrderDetail';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import NotFound from './pages/NotFound';

// Admin Components
import AdminDashboard from './components/admin/Dashboard';
import AdminProductList from './components/admin/ProductList';
import ProductForm from './components/admin/ProductForm';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <CartProvider>
        <Router>
          <Routes>
            {/* Admin Routes - Protected with admin role */}
            <Route element={<ProtectedRoute requiredRole="admin" />}>
              <Route path="/admin" element={<AdminLayout />}>
                <Route index element={<AdminDashboard />} />
                <Route path="products" element={<AdminProductList />} />
                <Route path="products/new" element={<ProductForm />} />
                <Route path="products/edit/:id" element={<ProductForm />} />
                {/* Additional admin routes can be added here */}
              </Route>
            </Route>
            
            {/* Protected User Routes */}
            <Route element={<ProtectedRoute />}>
              <Route path="/account" element={
                <>
                  <Navbar />
                  <main style={{ minHeight: 'calc(100vh - 160px)', padding: '20px 0' }}>
                    <Account />
                  </main>
                  <Footer />
                </>
              } />
              <Route path="/orders" element={
                <>
                  <Navbar />
                  <main style={{ minHeight: 'calc(100vh - 160px)', padding: '20px 0' }}>
                    <OrderHistory />
                  </main>
                  <Footer />
                </>
              } />
              <Route path="/orders/:id" element={
                <>
                  <Navbar />
                  <main style={{ minHeight: 'calc(100vh - 160px)', padding: '20px 0' }}>
                    <OrderDetail />
                  </main>
                  <Footer />
                </>
              } />
              <Route path="/checkout" element={
                <>
                  <Navbar />
                  <main style={{ minHeight: 'calc(100vh - 160px)', padding: '20px 0' }}>
                    <Checkout />
                  </main>
                  <Footer />
                </>
              } />
            </Route>
            
            {/* Public Routes */}
            <Route path="/" element={
              <>
                <Navbar />
                <main style={{ minHeight: 'calc(100vh - 160px)', padding: '20px 0' }}>
                  <Home />
                </main>
                <Footer />
              </>
            } />
            <Route path="/products" element={
              <>
                <Navbar />
                <main style={{ minHeight: 'calc(100vh - 160px)', padding: '20px 0' }}>
                  <Products />
                </main>
                <Footer />
              </>
            } />
            <Route path="/products/:id" element={
              <>
                <Navbar />
                <main style={{ minHeight: 'calc(100vh - 160px)', padding: '20px 0' }}>
                  <ProductDetail />
                </main>
                <Footer />
              </>
            } />
            <Route path="/categories/:category" element={
              <>
                <Navbar />
                <main style={{ minHeight: 'calc(100vh - 160px)', padding: '20px 0' }}>
                  <Products />
                </main>
                <Footer />
              </>
            } />
            <Route path="/cart" element={
              <>
                <Navbar />
                <main style={{ minHeight: 'calc(100vh - 160px)', padding: '20px 0' }}>
                  <Cart />
                </main>
                <Footer />
              </>
            } />
            <Route path="/login" element={
              <>
                <Navbar />
                <main style={{ minHeight: 'calc(100vh - 160px)', padding: '20px 0' }}>
                  <Login />
                </main>
                <Footer />
              </>
            } />
            <Route path="/register" element={
              <>
                <Navbar />
                <main style={{ minHeight: 'calc(100vh - 160px)', padding: '20px 0' }}>
                  <Register />
                </main>
                <Footer />
              </>
            } />
            <Route path="/forgot-password" element={
              <>
                <Navbar />
                <main style={{ minHeight: 'calc(100vh - 160px)', padding: '20px 0' }}>
                  <ForgotPassword />
                </main>
                <Footer />
              </>
            } />
            <Route path="/reset-password/:token" element={
              <>
                <Navbar />
                <main style={{ minHeight: 'calc(100vh - 160px)', padding: '20px 0' }}>
                  <ResetPassword />
                </main>
                <Footer />
              </>
            } />
            <Route path="/about" element={
              <>
                <Navbar />
                <main style={{ minHeight: 'calc(100vh - 160px)', padding: '20px 0' }}>
                  <About />
                </main>
                <Footer />
              </>
            } />
            <Route path="/contact" element={
              <>
                <Navbar />
                <main style={{ minHeight: 'calc(100vh - 160px)', padding: '20px 0' }}>
                  <ContactUs />
                </main>
                <Footer />
              </>
            } />
            <Route path="*" element={
              <>
                <Navbar />
                <main style={{ minHeight: 'calc(100vh - 160px)', padding: '20px 0' }}>
                  <NotFound />
                </main>
                <Footer />
              </>
            } />
          </Routes>
        </Router>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;