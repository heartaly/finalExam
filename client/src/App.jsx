import { useEffect, useState } from "react";
import axios from "axios";

function App(){

  const [students, setStudents] = useState([]);
  const [name, setName] = useState([]);
  const [course, setCourse] = useState([]);
  const [age, setAge] = useState([]);


  useEffect(() => {

    axios
    .get("http://localhost:5000/students")
    .then((response) => {
      setStudents(response.data);
    });

  }, []);


  return(
    <div>
      <h1>Student Management System</h1>
      <h2> Students </h2>

      <div>
        <form>
          <input type="text" value={name}> </input>

          <input type="text" value={course}> </input>

          <input type="text" value={age}> </input>
        </form>
      </div>

      {students.map((student) => (
        <div key={student.id}>
          <p>Name: {student.name}</p>
          <p>Course: {student.course} </p>
          <p>Age: {student.age}</p>
        </div>
      ))}

    </div>
  );
}
 
export default App;