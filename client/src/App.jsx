import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NewNote from "./components/NewNote";
import NotFound from "./components/NotFound";
import store from "./redux/store";
import { Provider } from "react-redux";
import ShowNote from "./components/ShowNote";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import TitleContextProvider from "./context/TitleContextProvider";
import { useState } from "react";
import LoginOverlay from "./components/LoginOverlay";
import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import LoginContextProvider from "./context/LoginContextProvider";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  let persistor = persistStore(store);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <>
      <Provider store={store}>
        <LoginContextProvider>
        <TitleContextProvider>
          <PersistGate persistor={persistor}>
            {/* <LoginOverlay isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/> */}
            <Navbar />
            <BrowserRouter>
              <Routes>
                <Route path="/" element={
                  // <ProtectedRoute>
                    <Home />
                  // </ProtectedRoute>
                } 
                />
                <Route path="/new" element={<NewNote />} />
                <Route path="/showNote/:id" element={<ShowNote />} />
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/signup" element={<SignupPage/>}/>
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </PersistGate>
        </TitleContextProvider>
        </LoginContextProvider>
      </Provider>
    </>
  );
}

export default App;
