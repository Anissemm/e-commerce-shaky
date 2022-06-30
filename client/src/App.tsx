import { AnimatePresence } from "framer-motion"
import React from "react"
import { Routes, Route, useLocation } from 'react-router-dom'
import IsAuthenticated from "./Authorization/IsAuthenticated"
import MainLayout from "./Layouts/MainLayout"
import Dashboard from "./pages/Dashboard"
import Error from "./pages/Error"
import Home from "./pages/Home"
import UserAuthLayout from "./Layouts/UserAuthLayout"
import SignInUp from "./pages/SignInUp"

const App: React.FC = () => {
    const location = useLocation()

    return (
        <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<Home />} />
                    <Route path='my-account' element={<UserAuthLayout />}>
                        <Route index element={<SignInUp />} />
                        <Route path='dashboard' element={
                            <IsAuthenticated>
                                <Dashboard />
                            </IsAuthenticated>}
                        />
                    </Route>
                    <Route path='*' element={<Error />} />
                </Route>
            </Routes>
        </AnimatePresence>
    )
}

export default App