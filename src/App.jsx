import Header from "./components/Header/Header";
import Router from "./routes/Router";
import Footer from "./components/Footer/Footer";

import ScrollToTop from "./components/ScrollToTop";

export default function App() {
  return (
    <main className="bg-zinc-950">
      <ScrollToTop />
      <Header />
      <Router />
      <Footer />
    </main>
  )
}

