import Header from "./components/Header/Header";
import Router from "./routes/Router";
import Footer from "./components/Footer/Footer";

export default function App() {
  return (
    <main className="bg-zinc-950">
      <Header />
      <Router />
      <Footer />
    </main>
  )
}

