import React from 'react'
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'

const Home = () => {
  return (
    <div className='min-h-screen bg-black text-white flex flex-col justyfy-center items-center gap-4 p-4 pt-46'>
      <motion.h1 className='text-5xl min:text-7xl font-bold text-center mb-6'
        initial={{ opacity: 0, y: -50 }}
        animate={{opacity: 1, y: 0}}
        transition={{ duration: 0.5 }}>
        Build your CRUD Magic!
      </motion.h1>

      <motion.p className='text-lg min:text-2xl text-center mb-8 text-gray-300 max-w-2xl'
      initial={{ opacity: 0, y: -30 }}
      animate={{opacity: 1, y: 0}}
      transition={{ delay:0.5,duration: 0.8 }}>
        Learn CRUD oprations step-by-step with our interactive app.
      </motion.p>
      <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}>
              <Link to='/app' className='bg-gradient-to-r from-purple-500 to-pink-500 px-8 py-4 hover:shadow-xl text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out'>
      Start Learning New
      </Link>
      </motion.div>


    </div>
  )
}

export default Home