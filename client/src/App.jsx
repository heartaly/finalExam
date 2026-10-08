import { useEffect, useState } from "react";
import axios from "axios";

function App(){

  const [students, setStudents] = useState([]);
  const [name, setName] = useState([]);
  const [course, setCourse] = useState([]);
  const [age, setAge] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {

    axios
    .get("http://localhost:5000/students")
    .then((response) => {
      setStudents(response.data);
    });

  }, []);

  const handleAddStudent = () => {
    const newStudent = { name, course, age };
    
    axios
    .post("http://localhost:5000/students", newStudent)
    .then((response) => {
      setStudents([...students, response.data]);
      setName("");
      setAge("");
      setCourse("");
    });
  };

  const handleDeleteStudent = (id) => {
    axios
    .delete(`http://localhost:5000/students/${id}`)
    .then(() => {
      axios
        .get("http://localhost:5000/students")
        .then((response) => {
          setStudents(response.data);
        });
    });
  };



  return(
    <div>
      <h1>Student Management System</h1>
      <h2> Students </h2>

          <form>
          <label> Name: </label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>

     
          <label> Course: </label>
          <input type="text"  value={course} onChange={(e) => setCourse(e.target.value)}/>

          <label> Age: </label>
          <input type="text" value={age} onChange={(e) => setAge(e.target.value)} />

          <button type="button" onClick={handleAddStudent}> Add Student </button>
        </form>

      {students.map((student) => (
        <div key={student._id}>
          <p>Name: {student.name}</p>
          <p>Course: {student.course} </p>
          <p>Age: {student.age}</p>

          <button type="button" onClick={() => handleEditStudent(student._id)}>Edit</button>
          <button type="button" onClick={() => handleDeleteStudent(student._id)}>Delete</button>
        </div>
      ))}

    </div>
  );
}
 
export default App;