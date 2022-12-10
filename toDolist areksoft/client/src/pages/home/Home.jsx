import Navbar from "../../components/navbar/Navbar"
import "./home.css"
import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import Task from "../../components/task/Task";
import axios from "axios"
import moment from 'moment';
 
export default function Home() {
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  // const [status, setStatus] = useState("");

  useEffect(() => {
    const taskList = async () => {
      const res = await axios.get("/todo")
      setPosts(res.data)
    }
    taskList()
  },[])

  async function handlechange(note, e) {
    console.log(e.target.value)
    console.log(note._id)
    
    await axios.post(`/todo/${note._id}`, {
      status: e.target.value
    }) 
    
  }
  return (<> <Navbar />
    <div className='home'>

      <div className="homeContainer">
        {open && <div>
          <FontAwesomeIcon onClick={() => setOpen(false)} className="close" icon={faCircleXmark} />
          <Task />
        </div>}
        {!open && <><button onClick={() => setOpen(true)} className='crtTaskBtn'>+ Create a Task</button>
          <table>
            <tr>
              <th>SR.NO</th>
              <th className='name' >NAME</th>
              <th>PRIOTITY</th>
              <th>ASSIGNED DATE</th>
              <th>DEADLINE</th>
              <th>DESCRIPTION</th>
              <th className='status'>STATUS</th>
            </tr>


            {posts.map((note, index) => (
                
              <tr>
                <td>{index + 1}</td>
                <td>{note.task}</td>
                <td>
                  <div className="priorityMarker">
                    <span>{note.priority}</span>
                  </div>
                </td>

                <td>{moment(note.createdAt).format('YYYY-MM-DD')}</td>
                <td>{note.deadline}</td>
                <td>{note.desc}</td>
                <td>
                  <select onChange={(e) => {
                    handlechange(note, e);
                  }}
                    className={note.status === "Completed" ? "green" : "red"}
                  >
                    <option >{note.status}</option>
                    <option>{note.status === "Completed" ? "Partial Completed" : "Completed"}</option>
                  </select>
                </td>
              </tr>))}
          </table></>}
      </div>
    </div>

  </>
  )
}
