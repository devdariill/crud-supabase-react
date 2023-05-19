import { createClient } from "@supabase/supabase-js"
import { useEffect, useState } from "react"

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_KEY
)

const HAMSTERS = "Hamsters"

function App() {
  const [hamsters, setHamsters] = useState([])
  const getHamsters = async () => {
    // const { data } = await supabase.from(HAMNSETERS).select()
    const res = await supabase.from(HAMSTERS).select("*")
    if (res.error) { console.log(res.error) , window.alert("error fetch")}
    console.log(res)
    // const { data } = await supabase.from(HAMNSETERS).select("id")
    setHamsters(res.data)
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
    const hamster = Object.fromEntries(formData.entries())
    console.log(hamster)
    await createHamster(hamster)
  }
  const [hamster, setHamster] = useState({
    name: "",
    description: "",
    breed: "",
    image: "",
    cuteness: 0    
  })
  const inputHandler = event => {
    setHamster(state=>{
      if (event.target.value.length > 10) {
        window.alert("max 10")
        return state
      }
      return{
      ...state,
      [event.target.name]: event.target.value
      }
    })
  }
  console.log(hamster)
  
  const deleteHamster = async hamster => {
    console.log(hamster)
    console.log("delete")
    const res = await supabase.from(HAMSTERS).delete().match({id: hamster})
    if (res.error) { console.log(res.error) , window.alert("error delete")}
    getHamsters()
  }

  const handleUpdate = async event => {
    event.preventDefault()
    const form = event.currentTarget
    console.log(form)
    const formData = new FormData(form)
    const hamster = Object.fromEntries(formData.entries())
    console.log(hamster)
    const {id, ...rest} = hamster
    const res = await supabase.from(HAMSTERS).update(rest).match({id})
    if (res.error) { console.log(res.error) , window.alert("error update")}
    getHamsters()    
    setHamster({
      name: "",
      description: "",
      breed: "",
      image: "",
      cuteness: 0
    })
  }

  const getHamster = async id => {
    console.log(id)
    console.log("get")
    const res = await supabase.from(HAMSTERS).select("*").match({id})
    if (res.error) { console.log(res.error) , window.alert("error get")}
    console.log(res)
    setHamster(res.data[0])
  }


  {/* id: 1,
  created_at: '2023-05-19T04:18:21.758133+00:00',
  name: 'afor',
  description: 'des afor',
  breed: 'breed',
  image: 'image1.png',
  cuteness: 1 */}

  return (
    <main className="h-full flex py-20 flex-col mx-10 gap-y-10 w-screen justify-center">
    <div className="w-full items-center justify-center flex flex-col gap-y-5
    ">
     <form onSubmit={handleSubmit} className="max-w-sm grid grid-cols-2 [&>label>input]:p-2 gap-5 [&>input]:p-2 items-center justify-center px-3 [&>*]:rounded-md">
      <label htmlFor="name">Name</label>
      <input type="text" placeholder="name" name="name" id="name" defaultValue="nameform" onChange={inputHandler}/>
      <label htmlFor="image" >Image</label>
      <input type="text" placeholder="image" name="image" id="image" defaultValue="imgform"/>
      <label htmlFor="cuteness">Cuteness</label>
      <input type="number" placeholder="cuteness" id="cuteness" name="cuteness" defaultValue="6"/>
      <label>Description</label>
      <input type="text" placeholder="description" name="description" defaultValue="desform"/>
      <label>Breed</label>
      <input type="text" placeholder="breed" name="breed" defaultValue="breedform"/>
      <button className="block w-full col-span-2" >Enviar</button>
     </form>
     <button onClick={()=>createHamster({
        name: "8afor",
        description: "8des afor",
        breed: "breed8",
        image: "image8.png",
        cuteness: 8
     })}>Create Hamster</button>
     {[...hamsters].reverse().map((item) => {
        return (
          <div key={item.id} className="relative w-full text-center max-w-screen-sm">
            <button onClick={()=>deleteHamster(item.id)} type="button" className="absolute top-2 right-2 bg-red-500 px-2 rounded-full py-0.5 items-center justify-center text-center">X</button>
            <h1>{item.name}</h1>
            <p>{item.description}</p>
            <p>{item.breed}</p>
            <p>{item.cuteness}</p>
            {!item.image.length>0 && <img src={item.image} alt={item.name} />}
            <button type="button" onClick={()=>getHamster(item.id)}>Edit</button>
          </div>
        )
        })
      }
      
      { hamster.name && (
        <form onSubmit={handleUpdate} className="max-w-sm grid grid-cols-2 [&>label>input]:p-2 gap-5 [&>input]:p-2 items-center justify-center px-3 [&>*]:rounded-md">
          <input type="text" name="id" value={hamster.id} hidden/>
          <label htmlFor="name">Name</label>
          <input type="text" placeholder="name" name="name" id="name"  defaultValue={hamster.name}/>
          <label htmlFor="image" >Image</label>
          <input type="text" placeholder="image" name="image" id="image" defaultValue={hamster.image}/>
          <label htmlFor="cuteness">Cuteness</label>
          <input type="number" placeholder="cuteness" id="cuteness" name="cuteness" defaultValue={hamster.cuteness}/>
          <label>Description</label>
          <input type="text" placeholder="description" name="description" defaultValue={hamster.description}/>
          <label>Breed</label>
          <input type="text" placeholder="breed" name="breed" defaultValue={hamster.breed}/>
          <button className="block w-full col-span-2" >Enviar</button>
        </form>
      )}
    </div>
   </main>
  )
}

export default App
