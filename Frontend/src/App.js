import GoogleMap from "./GoogleMap/GoogleMap";
import Navbar from "./Navbar/Navbar";
import { APIProvider } from "@vis.gl/react-google-maps";

function App() {
  const googleApiKey = process.env.REACT_APP_API_KEY;

  return (
    <APIProvider apiKey={googleApiKey}>
      <div className="w-screen h-screen relative">
        <GoogleMap />
        <Navbar />
      </div>
    </APIProvider>
  );
}

export default App;
