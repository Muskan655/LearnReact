import React, { createContext, useState, useContext } from 'react';

// Global state management: If you need certain data (like user info) to be accessible throughout the app, createContext helps avoid prop drilling, making it more efficient.
// Data sharing: Share data across many components without manually passing props down at each level.

// Creating the context object....
//createContext() returns an object with two components:

// Provider: A component that is used to provide a value to the components that are within its tree.

// Consumer (or the hook useContext): A way for components to consume the value that the Provider provides.
const UserContext = createContext();

function Userdetails() {
  // State to manage user data
  const [user, setUser] = useState({ name: 'John', age: 25 });

  return (
    //pass values to share globally over all child components....
    <UserContext.Provider value={{ user, setUser }}>
      <div>
        <h1>User Details Management</h1>
        <UserDetails />  {/* Child component 1: Display user details */}
        <UpdateUser />   {/* Child component 2: Update user details */}
      </div>
    </UserContext.Provider>
  );
}

//  Child component to display user details
function UserDetails() {
  const { user } = useContext(UserContext); // Access user data from context

  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {user.name}</p>
      <p>Age: {user.age}</p>
    </div>
  );
}

// Child component to update user details
function UpdateUser() {
  const { setUser } = useContext(UserContext); // Access setter function from context
  const [newName, setNewName] = useState('');
  const [newAge, setNewAge] = useState('');

  const handleUpdate = () => {
    setUser(prevUser => ({
      ...prevUser,
      name: newName || prevUser.name,  
      age: newAge || prevUser.age,   
    }));
  };

  return (
    <div>
      <h2>Update User Details</h2>
      <input
        type="text"
        placeholder="New Name"
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <input
        type="number"
        placeholder="New Age"
        value={newAge}
        onChange={(e) => setNewAge(e.target.value)}
      />
      <button onClick={handleUpdate}>Update</button>
    </div>
  );
}
export default Userdetails;

