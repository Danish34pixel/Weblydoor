
import Home from './Componenet/Home';
import Background from './Componenet/Inside/Background';

const App = () => {
  return (
    <>
      {/* Background stays OUTSIDE scroll container */}
      <Background />
      <Home/>
    </>
  );
};

export default App;