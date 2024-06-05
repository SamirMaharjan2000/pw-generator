import { useState, useCallback, useEffect, useRef } from "react"

function App() {
  const [length,setLength] = useState(8);
  const [number,setNumber] = useState(false);
  const [char,setChar] = useState(false);
  const [password,setPassword] = useState("");

  const passwordGenerator = useCallback(()=>{
    let password = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if(number) str += "0123456789"
    if(char) str += "!@#$%^&*()_+=-{}[]';:|?/.,><"
    for(let i = 1; i <= length;i++){
      let char = Math.floor(Math.random() * str.length + 1)
      password += str.charAt(char)
    }
    setPassword(password)
  }, [length,number,char,setPassword])



  const handleCopy = useCallback(()=>{
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  },[password])

  useEffect(()=>{
    passwordGenerator();
  },[length,number,char,passwordGenerator])

  const passwordRef = useRef(null)

  return (
    <>
      <div className="flex flex-wrap justify-center items-center w-full">
        <p className="text-white">Password Generator :</p>
        <div className="flex bg-white w-80 border-4 shadow-lg p-5 m-10 rounded-3xl shadow-white">
            <input
             type="text" 
             value={password}
             placeholder="Password"
             ref = {passwordRef}
             readOnly
             className="w-full border-2"
             />
             <button
             onClick={handleCopy}
             className="bg-blue-700 px-4 rounded text-white hover:bg-white hover:text-black hover:border-2 hover:text-xl   duration-300 transition ease-in-out"
             >
              Copy
             </button>
             
        </div>
       
      </div>
      <div className="flex items-center justify-center gap-5 text-white">
          <div className="flex flex-col items-center">
          <input type="range" 
          min={8}
          max={50}
          value={length}
          className="cursor-pointer"
          onChange={(e)=>setLength(e.target.value)}
          />
          <label>Length : {length}</label>
          </div>
          <div>
          <input type="checkbox" 
          defaultChecked = {number}
          id="numberInput"
          onChange={(e)=>setNumber(e.target.checked)}
          />
          <label>Number</label>
          </div>

          <div>
          <input type="checkbox" 
          defaultChecked = {char}
          id="charInput"
          onChange={(e)=>setChar(e.target.checked)}
          />
          <label>Special Character</label>
          </div>
        </div>
        
    </>
  )
}

export default App
