import { useState, useEffect } from 'react'

const CreateNote = ({ create })=> {
  const [txt, setTxt] = useState('');

  const submit = (ev)=> {
    ev.preventDefault();
    create({ txt })
  }
  return (
    <form onSubmit={ submit }>
      <input value={ txt } onChange={ev => setTxt(ev.target.value)}/>
      <button>Create</button>
    </form>
  );
};

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

  const toggle = async(note)=> {
    const response = await fetch(`/api/notes/${note.id}`, {
      method: 'PUT',
      body: JSON.stringify({ isArchived: !note.isArchived}),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    if(response.ok){
      setNotes(notes.map(note => note.id === json.id ? json : note ))
    }
  }

  const destroy = async(note)=> {
    const response = await fetch(`/api/notes/${note.id}`, {
      method: 'DELETE',
    });
    if(response.ok){
      setNotes(notes.filter(_note => _note.id !== note.id));
    }
  }

  const create = async(note)=> {
    const response = await fetch('/api/notes', {
      method: 'POST',
      body: JSON.stringify(note),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const json = await response.json();
    if(response.ok){
      setNotes([...notes, json]);
    }
    else {
      console.log(json);
    }

  }

  return (
    <>
      <h1>Acme Notes { notes.length }</h1>
      <CreateNote create={ create }/>
      <ul>
        {
          notes.map( note => {
            return (
              <li key={ note.id} className={ note.isArchived ? 'archived': ''}>
                { note.txt }
                <button onClick={()=> toggle(note)}>toggle</button>
                <button onClick={()=> destroy(note)}>delete</button>
              </li>

            );
          })

        }
      </ul>
    </>
  )
}

export default App
