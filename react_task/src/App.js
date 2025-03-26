import { useEffect, useState } from "react";

function App()
{

  const [student_data, set_student_data] = useState("")

  const [is_loading, set_is_loading] = useState(true)

  const [error,set_error] = useState(null)

  const DATA_BASE_URL = "http://localhost:3500/Students"

  useEffect(
    () => 
      { 
        async function getData()
        {
          try
          {
            const response = await fetch(DATA_BASE_URL)

            if (response.ok === false)
              {
                throw new Error("ERROR")
              }

              const read_data = await response.json()

              set_student_data(read_data)

              set_error(null)
          }
          catch(error)
          {
            set_error(error.message)
          }
          finally
          {
            set_is_loading(false)
          }
        }

        setTimeout(
          () => 
            {
            ( async () => await getData() ) ()
            }, 3000
        )
      }, []
  )

  return(
    <div className="App">
      { is_loading ? <p>Loading...</p> : null}
      { error ? <p>Error: {error}</p> : null}
      { !is_loading ? (!error ? <h1>Welcome</h1> : null) : null}
    </div>
  );
}

export default App;
