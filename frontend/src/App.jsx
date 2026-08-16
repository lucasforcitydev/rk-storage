import { Routes, Route } from "react-router-dom";

import Upload from "./pages/Upload";
import Gallery from "./pages/Gallery";

export default function App() {

    return (

        <Routes>

            <Route path="/" element={<Upload />} />

            <Route path="/gallery" element={<Gallery />} />

        </Routes>

    );

}