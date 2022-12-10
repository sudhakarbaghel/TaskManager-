import "./task.css"
import { useState } from "react"
import axios  from "axios"
 

export default function Task() {
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [date, setDate] = useState("");
    const [priority, setPriority] = useState("Imp")
     

    console.log(priority)
    console.log(date)
    console.log(title)
    console.log(desc)
    const handleSubmit = async (e) => {
        // e.preventDefault();
        try {
            const res = await axios.post("/todo/addtask", {
                task: title,
                priority: priority,
                deadline: date,
                desc:desc
            })
             console.log(res)

        } catch (err) {
            console.log(err)
        }
    }
    return (
        <>
            <div className="task">
                <div className="taskContainer">
                    <div className="form">
                        <form className="writeForm" onSubmit={handleSubmit}>
                            <div className="writeFormGroup">
                                <label>
                                    <span>TASK NAME</span>
                                </label>

                                <input required="true" type="text" placeholder="write task..." className="writeInput" autoFocus={true} onChange={e => {
                                    setTitle(e.target.value)
                                }} />

                            </div>
                            <div className="writeFormGroup">
                                <label >PRIORITY</label>

                                <select value={priority} onChange={(e) => { setPriority(e.target.value) }}>
                                    <option value="Imp">
                                        Imp
                                    </option>
                                    <option value="V-Imp">
                                        V-Imp
                                    </option>
                                    <option value="Normal">
                                        Normal
                                    </option>
                                </select>

                            </div>
                            <div className="writeFormGroup">
                                <label >
                                     DEADLINE 
                                </label>

                                <div>
                                    <input required="true" type="date"  onChange={e=>{setDate(e.target.value)}}/>
                                   
                                </div>
                            </div>



                            <div className="writeFormGroup">
                                <label htmlFor="fileInput">
                                    <span>TASK DESCRIPTION</span>
                                </label>

                                <input type="text" required="true" placeholder="write description..." className="writeInput" autoFocus={true} onChange={e => {
                                    setDesc(e.target.value)
                                }} />
                            </div>
                            <div className="writeFormBtn">
                                <button className="writeSubmit" type="submit">SUBMIT</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div>
        </>

    )
}
