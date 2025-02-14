import React, { useState } from "react";
import { useMutation,useQuery } from "@apollo/client";
import { ADD_QUEUE, CLOSE } from "../../utils/mutations";
import { SWITCH, QUERY_QUEUE } from "../../utils/queries";
import Nav from "../Nav";
import Footer from "../Footer";

const AdminPage = () => {



  const { loading, data } = useQuery(SWITCH);
  const Switch = data?.switch || [];
  const [formState, setFormState] = useState({
    queueId: "",
  });
  console.log(Switch[0]);
  const [addQueue, { error }] = useMutation(ADD_QUEUE);
  const [closeQueue] = useMutation(CLOSE);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  // submit form
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await addQueue({
        variables: { ...formState },
      });
      window.location.reload()
      return;
    } catch (e) {
      console.error(e);
    }
  };

  if (Switch.length) {
    return (
      <main>
        <Nav />
        <div>The Queue is open now</div>
        <h4>Current Queue:</h4>
        <form onSubmit={async (event)=>{
            try {
              await closeQueue();
              window.location.reload()
            } catch (e) {
              console.error(e);
            }
        }}>
          <button className="btn d-block w-100" type="submit">
            Close Queue
          </button>
        </form>
        <Footer />
      </main>
    ) 
  } else {
    return (
      <main>
        <Nav />
        <div> Queue is now closed</div>
        <h4>Create a New Queue for tonight</h4>
        <form onSubmit={handleFormSubmit}>
          <input
            className="form-input"
            placeholder="Queue Id"
            name="queueId"
            type="queueId"
            id="queueId"
            value={formState.queueId}
            onChange={handleChange}
          />
          <button className="btn d-block w-100" type="submit">
            Submit
          </button>
        </form>
        {error && <div>Add Queue Failed</div>}
        <Footer />
      </main>
    ) ;
  }

};
export default AdminPage;


