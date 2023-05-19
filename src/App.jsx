import { createClient } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)

const HAMSTERS = "Hamsters"

function App() {
  const [hamster, setHamster] = useState([])
  const getHamsters = async () => {
    // const { data } = await supabase.from(HAMNSETERS).select()
    const res = await supabase.from(HAMSTERS).select("*")
    if (res.error) { console.log(res.error) , window.alert("error fetch")}
    console.log(res)
    // const { data } = await supabase.from(HAMNSETERS).select("id")
    setHamster(res.data)
  }
  useEffect(()=>{
    getHamsters()
  },[])

  {/* id: 1,
created_at: '2023-05-19T04:18:21.758133+00:00',
name: 'afor',
description: 'des afor',
breed: 'breed',
image: 'image1.png',
cuteness: 1 */}

  return (
    <main >
     {JSON.stringify(hamster)}
     {hamster.map((item, index) => {
        return (
          <div key={index}>
            <h1>{item.name}</h1>
            <p>{item.age}</p>
            <p>{item.favFood}</p>
            <p>{item.loves}</p>
          </div>
        )
        })
      }
   </main>
  )
}

export default App
