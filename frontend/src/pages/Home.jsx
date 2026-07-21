import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Dashboard from "../components/Dashboard/Dashboard";

function Home() {

    const [document, setDocument] = useState(null);

    return (
        <>
            <Navbar />

            {
                document
                    ? <Dashboard document={document} />
                    : <Hero setDocument={setDocument} />
            }
        </>
    );
}

export default Home;