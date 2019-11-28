import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  const [ techs, setTechs ] = useState([]);
  const [ newTech, setNewTech ] = useState('');

  useEffect(() => {
    const storageTechs = localStorage.getItem('techs');

    if (storageTechs) {
      setTechs(JSON.parse(storageTechs));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('techs', JSON.stringify(techs));
  }, [techs])

  const handleAdd = useCallback(() => {
    setTechs([...techs, newTech]);
    setNewTech('');
  });

  const techsSize = useMemo(() => techs.length, [techs]);

  return (
    <>
      {techs.map(tech => (
        <li key={tech}>{tech}</li>
      ))}
      <p>Você possui {techsSize} tecnologia(s)</p>
      <input value={newTech} onChange={e => setNewTech(e.target.value)} type="text"/>
      <button type="button" onClick={handleAdd}>Adicionar</button>
    </>
  );
}

export default App;
