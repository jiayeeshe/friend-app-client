import './App.css';
import { useState, useEffect } from 'react';
import Axios from 'axios';



function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState(0)
  const [friendList, setFriendlist] = useState([])



  const addFriend = () => {
    Axios.post('https://friend-application-e3a237c1329a.herokuapp.com/addfriend', { 
      name: name, 
      age : age, 
    }).then((response) => {
      console.log(`this is the id after adding friend ${response.data._id}`);
      setFriendlist([...friendList ,{_id: response.data._id, name : name, age : age }]);
      console.log(response);
    })
    }

  const deleteFriend = (id) => {
    console.log(id);
    Axios.delete(`https://friend-application-e3a237c1329a.herokuapp.com/deletefriend/${id}`
    ).then(() => {setFriendlist(
      friendList.filter((friend) => friend._id !== id)
    )})
  }

  const updateFriend = (id, age) => {
    const newAge = prompt("Please enter the new age");

    Axios.put('https://friend-application-e3a237c1329a.herokuapp.com/updatefriend', { 
      id : id,
      age : newAge,
    }).then(() => {
      setFriendlist(
        friendList.map((friend) => {
          return friend._id === id ? {...friend, age : newAge} : friend 
        })
      );
    })
  }

  useEffect(() => {
    Axios.get('https://friend-application-e3a237c1329a.herokuapp.com/read').then((response) => {
      setFriendlist(response.data);
    }).catch((err) => {
      console.log(err);
    })
  }, [])
  

  return (
  <div className="App">
      <div className="inputs">
        <input type="text" onChange={(event) => {setName(event.target.value)}} placeholder="Friend name..."/>
        <input type="number" onChange={(event) => {setAge(event.target.value)}} placeholder="Friend age..."/>
        <button onClick={addFriend}> SAVE FRIEND</button>
      </div>

      <div className='listOfFriends'>
        {friendList.map((friend)=>{
        return (
         <div className="friendContainer">
          <div className='friend'>
            <h3>Name: {friend.name}</h3> 
            <h3>Age: {friend.age}</h3>
          </div>
          <button onClick={()=> {
            updateFriend(friend._id)}}>Update</button>
          <button id="removeBorder" onClick={()=> {
            console.log(friend._id)
            deleteFriend(friend._id)}}>X</button>
        </div> 
        )
        })}
      </div>
  

  </div>


);
}

export default App;
