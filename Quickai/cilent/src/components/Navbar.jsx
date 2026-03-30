
import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useClerk, UserButton, useUser } from '@clerk/clerk-react'
import { Protect, useAuth } from '@clerk/clerk-react'
import { Sparkles, Gem , Bot} from 'lucide-react'



const Navbar = () => {

  const navigate = useNavigate()
  const { user } = useUser()
  const { openSignIn } = useClerk()

  // ✅ get plan safely
  const plan = user?.publicMetadata?.plan || "free"; // default to free if undefined;
  // console.log("User plan:", plan); // Debug log
  console.log(user?.publicMetadata);


  return (
    <div className='fixed z-50 w-full backdrop-blur-2xl flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32'>


      
  <div className=''>
            <div className='text-slate-500'>
              <h1 
                onClick={() => navigate('/')} 
                className="text-xl sm:text-2xl font-bold cursor-pointer bg-gradient-to-r from-green-500 via-orange-500 to-blue-500 bg-clip-text text-transparent"
>
    <h2 className='text-xl font-semibold bg-gradient-to-r from-green-500 via-orange-500 to-blue-500 bg-clip-text text-transparent'>
<h1>                <Protect plan ='premium' fallback="Quick AI Studio">Quick AI Pro  - </Protect>  
</h1>
                <Protect plan ='premium' fallback="Free"><span>Premium</span></Protect>
              </h2>
</h1>
            
            </div>



          </div>
  <div className="flex items-center gap-4">



</div>

      {
        user ? (
          <div className='flex items-center gap-3'>
            
         
            <UserButton />
          </div>
        ) : (
          <button 
            onClick={openSignIn} 
            className='flex items-center gap-2 rounded-full text-sm bg-primary text-white px-6 py-2.5'
          >
            Get started <ArrowRight className='w-4 h-4'/>
          </button>
        )
      }

    </div>
  )
}

export default Navbar
