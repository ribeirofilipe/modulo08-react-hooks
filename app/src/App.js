import React, { useState } from 'react';

function App() {
  const [ techs, setTechs ] = useState(['Javascript']);
  const [ newTech, setNewTech ] = useState('');

  function handleAdd() {
    setTechs([...techs, newTech]);
    setNewTech('');
  }

  return (
    <>
      {techs.map(tech => (
        <li key={tech}>{tech}</li>
      ))}
      <input value={newTech} onChange={e => setNewTech(e.target.value)} type="text"/>
      <button type="button" onClick={handleAdd}>Adicionar</button>
    </>
  );
}

export default App;
