import { useState, useCallback, useEffect, useRef } from 'react'

import './App.css'

function App() {
  const [Length, setLength] = useState(5)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharcAllowed] = useState(false)
  const [Password, setPassword] = useState('')

  const passwordRef = useRef(null)

  const generatePassword = useCallback(() => {
    let pass = ''
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

    if (numberAllowed) str += "1234567890"
    if (charAllowed) str += '!@#$%^&*()-_=+[{]}|;:'

    for (let i = 1; i < Length; i++) {
      const char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)

  }, [Length, numberAllowed, charAllowed])

  useEffect(() => {
    generatePassword()
  }, [Length, numberAllowed, charAllowed])

  const copyPasswordToClipboard = () => {
    window.navigator.clipboard.writeText(Password)
    passwordRef.current?.select()
  }


  return (
    <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-80 bg-grey-800 text-orange-500">
      <h1 className='text-3xl font-serif mb-2 text-center'>
        Password Generator
      </h1>
      <div className='flex shadow rounded-lg overflow-hidden mb-4'>
        <input type="text"
          value={Password}
          className='outline-none w-full py-1 px-3'
          placeholder='Password'
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className='outline-none bg-blue-600 text-white px-3 py-0.5 shrink-0'>Copy</button>
      </div>
      <div className='flex text-sm gap-x-2'>
        <div className='flex items-center gap-x-1'>
          <input
            type="range"
            min={5}
            max={20}
            value={Length}
            className='cursor-pointer'
            onChange={(e) => setLength(e.target.value)}
            name=''
            id=''
          />
          <label htmlFor="length">Length: {Length}</label>
        </div>
        {/* second div */}
        <div className='flex items-center gap-x-1'>
          <label htmlFor='number'>Number</label>
          <input
            type="checkbox"
            defaultChecked={numberAllowed}
            onChange={() => {
              setNumberAllowed((previos) => !previos)
            }}
            name=""
            id=""
          />
        </div>
        {/* third div */}
        <div className='flex items-center gap-x-1'>
          <input
            type="checkbox"
            defaultChecked={charAllowed}
            onChange={() => {
              setCharcAllowed((previos) => !previos)
            }}
            name=""
            id=""
          />
          <label htmlFor='charInput' >Character</label>
        </div>



      </div>
    </div>
  )
}

export default App
