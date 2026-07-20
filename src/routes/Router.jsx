import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home/Home";
import Explore from "../pages/Explore";

import Categories from "../pages/Categories/Categories";
import Genre from "../pages/Categories/Genre"

import Favorites from "../pages/Favorites";

import Anime from '../pages/Anime'
import Video from "../pages/Video";

export default function Router() {
    return (

        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />

            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/:genero" element={<Genre />} />

            <Route path="/favorites" element={<Favorites />} />

            <Route path="/anime/:id" element={<Anime />} />
            <Route path="/video/:id/:tem/:ep" element={<Video />} />

        </Routes>

    )
}