import React from 'react';
import './css/bootstrap.min.css';
import Body from './page/Body.js';

function App() {
  const [modalShow, setModalShow] = React.useState(false)

  return (
    <div>
      <Body modalShow={modalShow} setModalShow={setModalShow}/>
    </div>
  );
}

export default App;
