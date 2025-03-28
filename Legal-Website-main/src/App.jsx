import About from "./Containers/About"
import Areas from "./Containers/Areas"
import Attorneys from "./Containers/Attorneys"
import Bottom from "./Containers/Bottom"
import Clients from "./Containers/Clients"
import Contact from "./Containers/Contact"
import Feedback from "./Containers/Feedback"
import Footer from "./Containers/Footer"
import Hero from "./Containers/Hero"
import Why from "./Containers/Why"

function App() {

  return (
    <div className="grid font-sans">
     <Hero/>
     <About/>
     <Areas/>
     <Attorneys/>
     <Why/>
     <Feedback/>
     <Clients/>
     <Contact/>
     <Footer/>
     <Bottom/>
    </div>
  )
}

export default App
