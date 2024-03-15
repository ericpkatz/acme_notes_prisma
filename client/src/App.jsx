import { useState } from 'react'

function App() {
  const [notes, setNotes] = useState([])

  return (
    <>
      <h1>Acme Notes { notes.length }</h1>
    </>
  )
}

export default App
