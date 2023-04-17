
import { useState, useEffect } from "react";
import "./App.css";
import { db } from "./firebase-config";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

function App() {
  const [newName, setNewName] = useState("");
  const [newAge, setNewAge] = useState(0);

  const [users, setUsers] = useState([]);
  const usersCollectionRef = collection(db, "TempData");

  const createUser = async () => {
    await addDoc(usersCollectionRef, { name: newName, age: Number(newAge) });
  };

  const updateUser = async (id, age) => {
    const userDoc = doc(db, "users", id);
    const newFields = { age: age + 1 };
    await updateDoc(userDoc, newFields);
  };

  const deleteUser = async (id) => {
    const userDoc = doc(db, "users", id);
    await deleteDoc(userDoc);
  };

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getUsers();
  }, []);

  return (
    <div className="App">
      <input
      className="name-input"
        placeholder="Name..."
        onChange={(event) => {
          setNewName(event.target.value);
        }}
      />
      <input
      className="age-input"
        type="number"
        placeholder="Age..."
        onChange={(event) => {
          setNewAge(event.target.value);
        }}
      />

      <button className="create-user-btn" onClick={createUser}> Create User</button>
      {users.map((user) => {
        return (
          <div className="user-container" key={user.id}>
            <div className="user-info">
            <h1 className="user-name">Name: {user.name}</h1>
            <h1 className="user-age">Age: {user.age}</h1>
            </div>
            <div className="user-actions">
            <button className="update-user-btn" onClick={() => updateUser(user.id, user.age)}>
              Increase Age
            </button>
            <button className="delete-user-btn" onClick={() => deleteUser(user.id)}>
              Delete User
            </button>
          </div>

            
          </div>
        );
      })}
    </div>
  );
}

export default App;
