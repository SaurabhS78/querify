import mainBg from "./assets/images/bg.png";
import Modal from "./components/Modal";

function App() {
  return (
    <div
      className="h-screen bg-no-repeat bg-cover bg-top flex items-center justify-center"
      style={{ backgroundImage: `url(${mainBg})` }}
    >
      <Modal />
    </div>
  );
}

export default App;
