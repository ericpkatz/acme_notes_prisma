import { useState, useEffect } from 'react'

function App() {
  const [notes, setNotes] = useState([])
  useEffect(()=> {
    const fetchNotes = async()=> {
      const response = await fetch('/api/notes');
      const json = await response.json();
      if(response.ok){
        setNotes(json);
      }
    };
    fetchNotes();

  }, []);

  return (
    <>
      <h1>Acme Notes { notes.length }</h1>
    </>
  )
}

export default App
