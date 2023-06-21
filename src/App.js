import { useRef, useState } from 'react';
import './App.css';
import axios from 'axios';
function App() {
  const [name,setName] = useState("")
  const [bio,setBio] =useState("")
  const [image,setImage] = useState("")
  const [follower,setFollower] = useState("")
  const [following,setFollowing] = useState("")
  const [url,setUrl] = useState("")
  const data = useRef("")
  const notif = useRef("")
  const [username,setUsername] = useState("")

  const searchData = async (e) => {
    e.preventDefault()
    data.current.classList.add("d-none")
    if(username.length > 0)
    {
      const response = await axios.get(`https://api.github.com/users/${username}`)
    if(response.status === 404)
    {
      data.current.classList.add("d-none")
      notif.current.classList.remove("d-none")
    }else{
      setName(response.data.name)
      setBio(response.data.bio)
      setImage(response.data.avatar_url)
      setFollower(response.data.followers)
      setFollowing(response.data.following)
      setUrl(response.data.html_url)
      notif.current.classList.add("d-none")
      data.current.classList.remove("d-none")
    }
    }
  }
  return (
    <div className='container'>
      <form className='form' onSubmit={searchData}>
          <p className='brand'><i>Search GitHub user info</i></p>
          <div className="box-search">
          <input type="text" value={username} onChange={(e)=>setUsername(e.target.value)} placeholder='Enter username ' />
          </div>
          <div className="data d-none" ref={data}>
            <img src={image} alt="avatar" />
            <h2>{name}</h2>
            <p className='bio'>{bio}</p>
            <small>Followers : {follower}</small>
            <small>Following : {following}</small>
            <a href={url}>Read More</a>
          </div>
          <h1 ref={notif} className='d-none'>Not Found!</h1>
          <small className='footer'>Dibuat dengan ❤ Oleh <a href="https://yayanfaturrohman.my.id" target='__blank'>Yayan</a>, <br /> menggunakan React js & Api Github</small>
        </form>
    </div>
  );
}

export default App;
