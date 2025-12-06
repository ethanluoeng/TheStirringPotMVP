import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Slideshow from './components/Slideshow'
import Testing from './components/Testing'
import FileUploader from './components/FileUploader'
import UploadRecipe from './pages/UploadRecipe'

function App() {

  return (
    <Slideshow steps = {[
      { text: "Chop onions", timer: 0, image: null },
      { text: "Heat pan", timer: 0, image: null },
      { text: "Cook for 5 minutes", timer: 300, image: null },
    ]}/>
  )
}

export default App
