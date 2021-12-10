import React from 'react'
import axios from 'axios'
import { useHistory } from 'react-router'
import { useState } from 'react'

const API_URI = process.env.REACT_APP_API_URI;

export default function NewEvent() {
    const [formState, setFormState] = useState({})


    const history = useHistory()



    function handleSubmit(e){
        e.preventDefault()

        axios
        .post(`${API_URI}/api/event/add`,
        formState)
        .then(respnse =>{
            setFormState({})
            history.push("/")
        }
        )
        .catch(console.log)

    }

    function handleInput(e){
        setFormState({...formState, [e.target.name]: e.target.value}) // setFormState(Object.assign{}, state, {[e.name]: e.value}))
        
            }
            console.log(formState)
    return(
        <div className="NewEventPage">
        <h3>Add an event</h3>
        
        <form onSubmit={handleSubmit}>
          <label htmlFor="sport">Sport</label>

          <select name="sport" id="sport" form="sports_form" onChange={handleInput} value={formState.sport}>
          <option value="football">Football</option>
          <option value="volleyball">Volleyball</option>
          <option value="tennis">Tennis</option>


          </select>

          {/* <input
            type="text"
            name="sport"
            onChange={handleInput}         //onChange={(e) => setHeadline(e.target.value)}
            value={formState.headline}
          /> */}
    
          <label>Players needed</label>
          <input
            type="number"
            name="numberOfPlayers"
             onChange={handleInput}                               // onChange={(e) => setPrice(e.target.value)}
            value={formState.numberOfPlayers}
          />
           <label>Venue</label>

        <select name="venue" id="venue" form="sports_form" onChange={handleInput} value={formState.venue}>
          <option value="venue1">Venue 1</option>
          <option value="venue2">Venue 2</option>
          <option value="venue3">Venue 3</option>
          </select>

      

        <label>Price</label>
          <input
            type="number"
            name="price"
             onChange={handleInput}                               // onChange={(e) => setPrice(e.target.value)}
            value={formState.price}
          />
          
          <button type="submit">Create Event</button>
          
        </form>
      </div>
        )
}
