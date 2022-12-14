const users=[]

const addUser=({id,name,room,rounds})=>{
    name=name.trim().toLowerCase();
    room=room.trim().toLowerCase();

    const existingUser=users.find((user)=>user.name===name && user.room===room)
    const RoomLimit=users.filter((user)=>{return user.room===room}).length;
    if(!name || !room) return {error:"Username and Room are Required .."}
    if(RoomLimit>1) return {error:"Only two user are allowed in Room!"}
    if(existingUser) return {error: "Username is taken"}

    const user = { id, name, room ,rounds};

    users.push(user);
    console.log(users)
    return { user };
}

const removeUser = (id) => {
    const index = users.findIndex((user) => user.id === id);
  
    if(index !== -1) return users.splice(index, 1)[0];
  }

  const getUser = (id) => users.find((user) => user.id === id);

  const getUsersInRoom = (room) => users.filter((user) => user.room === room);

  module.exports = { addUser, removeUser, getUser, getUsersInRoom };