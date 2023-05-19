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

  const createHamster = async hamster => {
    const res = await supabase.from(HAMSTERS).insert(hamster)
    if (res.error) { console.log(res.error) , window.alert("error create")}
    getHamsters()
  }
  const handleSubmit = async event => {
    event.preventDefault()
    const form = event.currentTarget
    console.log(form)
    const formData = new FormData(form)
    console.log(formData)
    const hamster = Object.fromEntries(formData.entries())
    console.log(hamster)
  }

  {/* id: 1,
  created_at: '2023-05-19T04:18:21.758133+00:00',
  name: 'afor',
  description: 'des afor',
  breed: 'breed',
  image: 'image1.png',
  cuteness: 1 */}

  return (
    <main>
     {JSON.stringify(hamster)}
     <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name</label>
      <input type="text" placeholder="name" name="name" value="nameform"/>
      <label>
        Description
        <input type="text" placeholder="description" name="description" value="desform"/>
      </label>
      <label>
        Breed
        <input type="text" placeholder="breed" name="breed" value="breedform"/>
      </label>
      <label htmlFor="image" >Image</label>
      <input type="text" placeholder="image" name="image" value="imgform"/>
      <label>
        Cuteness
        <input type="number" placeholder="cuteness" name="cuteness" value="6"/>
      </label>
      <button>Enviar</button>
     </form>

     <button onClick={()=>createHamster({
        name: "8afor",
        description: "8des afor",
        breed: "breed8",
        image: "image8.png",
        cuteness: 8
     })}>Create Hamster</button>
     {hamster.map((item) => {
        return (
          <div key={item.id}>
            <h1>{item.name}</h1>
            <p>{item.description}</p>
            <p>{item.breed}</p>
            <p>{item.cuteness}</p>
            <img src={item.image} alt={item.name} />
          </div>
        )
        })
      }
   </main>
  )
}

export default App
