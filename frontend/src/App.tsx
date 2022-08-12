import { AnimatePresence } from "framer-motion"
import React, { useEffect } from "react"
import { Routes, Route, useLocation } from 'react-router-dom'
import IsAuthenticated from "./authorization/IsAuthorized"
import MainLayout from "./Layouts/MainLayout"
import Dashboard from "./pages/Dashboard"
import Error from "./pages/Error"
import Home from "./pages/Home"
import UserAuthLayout from "./Layouts/UserAuthLayout"
import SignInUp from "./pages/Account/SignInUp"
import PasswordReset from "./pages/Account/PasswordReset"
import EmailVerification from "./pages/Account/EmailVerification"
import MockProtected from "./pages/MockProtected"
import PersistAuth from "./authorization/PersistAuth"
import YandexSignIn from "./pages/Account/YandexSignIn"
import HomeLayout from "./Layouts/HomeLayout"
import PageLayout from "./Layouts/PageLayout"
import Cart from "./pages/Cart"

const App: React.FC = () => {
    const location = useLocation()

    return (
        <AnimatePresence initial={false} exitBeforeEnter>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<MainLayout />}>
                    <Route element={<HomeLayout />}>
                        <Route index element={<Home />} />
                    </Route>
                    <Route element={<PageLayout />}>
                        <Route path='cart' element={<Cart />} />
                        <Route path='account' element={<UserAuthLayout />}>
                            <Route index element={<SignInUp />} />
                            <Route path='email-verification' element={<EmailVerification />} />
                            <Route path='reset-password' element={<PasswordReset />} />
                            <Route path='yandex-token' element={<YandexSignIn />} />

                            {/* Authenticated */}
                            <Route element={<PersistAuth />} >
                                <Route element={<IsAuthenticated />} >
                                    <Route path=':userId' element={<Dashboard />}>
                                        <Route path='invite-freinds' element={<MockProtected />} />
                                    </Route>
                                </Route>
                            </Route>
                        </Route>

                        <Route path='*' element={<Error />} />
                    </Route>
                </Route>
            </Routes>
        </AnimatePresence >
    )
}

export default App