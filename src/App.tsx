import "./Styles/Main.sass"
import "./Styles/Reset.sass"
import Header from "./Components/Header/Header";
import Breadcrumbs from "./Components/Breadcrumbs/Breadcrumbs";
import {BrowserRouter, Route, Routes, Navigate, useLocation} from 'react-router-dom';
import SparePage from "./Pages/SparePage/SparePage";
import SparesPage from "./pages/SparesPage/SparesPage";
import {Provider} from "react-redux"
import store from "./store/store"
import LoginPage from "./pages/LoginPage/LoginPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import OrdersPage from "./pages/OrdersPage/OrdersPage";
import {useAuth} from "./hooks/users/useAuth";
import OrderConstructor from "./components/OrderConstructor/OrderConstructor";
import {QueryClient, QueryClientProvider } from "react-query";
import SpareEditPage from "./pages/SpareEditPage/SpareEditPage";
import SpareAddPage from "./pages/SpareAddPage/SpareAddPage";
import OrderPage from "./pages/OrderPage/OrderPage";
import SparesList from "./pages/SparesPage/SparesList/SparesList";
import SparesTable from "./pages/SparesPage/SparesTable/SparesTable";

const TopPanelWrapper = () => {
    const {is_authenticated, is_moderator} = useAuth()
    const location = useLocation()

    return (
        <div className="top-panels-wrapper">
            <Breadcrumbs />
            {is_authenticated && !is_moderator && location.pathname.endsWith("spares-list") && <OrderConstructor /> }
        </div>
    )
}



function App() {

    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>

            <Provider store={store}>

            <BrowserRouter basename="/aviashop">

                <div className="App">

                    <div className="wrapper">

                        <Header />

                        <div className={"content-wrapper"}>

                            <TopPanelWrapper />

                            <Routes>

                                <Route path="/" element={<Navigate to="/spares-list" replace />} />

                                <Route path="/spares-list" element={<SparesList />} />

                                <Route path="/spares-table" element={<SparesTable />} />

                                <Route path="/spares/:id" element={<SparePage  />} />

                                <Route path="/spares/create/" element={<SpareAddPage  />} />

                                <Route path="/spares/:id/edit/" element={<SpareEditPage  />} />

                                <Route path="/orders" element={<OrdersPage />} />

                                <Route path="/orders/:id" element={<OrderPage />} />

                                <Route path="/profile" element={<ProfilePage />} />

                                <Route path="/login" element={<LoginPage />} />

                                <Route path="/register" element={<RegisterPage />} />

                            </Routes>

                        </div>

                    </div>

                </div>

            </BrowserRouter>

        </Provider>

        </QueryClientProvider>
    )
}

export default App
