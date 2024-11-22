import "./App.css";
import FishScalePattern from "./components/FishScalePattern";
function App() {
  return (
    <div className="p-8 min-h-screen bg-gray-100">
      <p className="mb-8">
        This is a quick and dirty proof of concept, built with extensive help
        from <a href="https://claude.ai">Claude</a>. The basic idea is to
        generate fish scale shingle patterns, kind of like Victorian era houses
        often have.
      </p>

      <FishScalePattern />
    </div>
  );
}

export default App;
