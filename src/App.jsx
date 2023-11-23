import Layout from "./components/layout/Layout";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Welcome from "./components/welcome/Welcome";
import SignIn from "./components/login/SignIn";
import SignUp from "./components/login/SignUp";
import { QueryClient, QueryClientProvider } from "react-query";
import Hotels from "./components/hotels/Hotels";
import Profile from "./components/profile/Profile";
import CreateHotel from "./components/hotelcreateform/CreateHotel";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/profile/:userId" element={<Profile />} />
            <Route path="/createhotel/:userId" element={<CreateHotel />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
