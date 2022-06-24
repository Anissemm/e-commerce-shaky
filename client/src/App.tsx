import React from "react"
import { Routes, Route } from 'react-router-dom'
import Layout from "./components/Layout"
import ErrorPage from "./pages/ErrorPage"
import HomePage from "./pages/HomePage"

const App: React.FC = () => {
    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                <Route index element={<HomePage />} />
                <Route path='*' element={<ErrorPage />} />
            </Route>
        </Routes>
    )
}

export default App