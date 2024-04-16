import "./App.css";
import usePasskeysSupport from "./hooks/usePasskeysSupport";

function App() {
  const isSupported = usePasskeysSupport();

  return <>{isSupported && <div>Passkeys are supported</div>}</>;
}

export default App;
