import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Explore from "../pages/Explore";
import Categories from "../pages/Categories";
import Popular from "../pages/Popular";
import Favorites from "../pages/Favorites";

export default function Router() {
    return (

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/popular" element={<Popular />} />
            <Route path="/favorites" element={<Favorites />} />


        </Routes>

    )
}