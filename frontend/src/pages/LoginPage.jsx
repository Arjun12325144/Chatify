import { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore'
import BorderAnimatedContainer from '../components/BorderAnimatedContainer';
import { LockIcon, MessageCircleIcon, MailIcon } from 'lucide-react';
import { LoaderIcon } from 'react-hot-toast';
import { Link } from 'react-router';

function LoginPage () {
   const [formData, setFormData] = useState({ email: "", password: "" })
    const { login, isLoggingIn } = useAuthStore();
    const handleSubmit = (e) => {
      e.preventDefault();
      login(formData);
  
    }
  return <div className='w-full flex items-center justify-center p-4 bg-slate-900'>
    <div className='relative w-full max-w-6xl md:h-[700px] h-[650px] '>
      <BorderAnimatedContainer>
        <div className='w-full flex flex-col md:flex-row'>
          {/* LEFT - IMAGE SECTION */}
          <div className='md:w-1/2 p-8 flex items-center justify-center md:border-r border-slate-600/30'>
            <div className='w-full max-w-md'>
              {/* heading text */}
              <div className='text-center mb-8'>
                <MessageCircleIcon className='w-12 h-12 mx-auto text-slate-400 mb-4' />
                <h2 className='text-3xl font-bold text-slate-200 mb-2'>Welcome Back</h2>
                <p className='text-slate-400'>Login to access to your account</p>
              </div>
              {/* form */}
              <form onSubmit={handleSubmit}>
                 
                {/* email */}
                <div className='mb-5'>
                  <label className='auth-input-label'>Email</label>
                  <div className='relative'>
                    <MailIcon className='auth-input-icon' />
                    <input type="email" value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className='input'
                      placeholder='johndoe@gmail.com'
                    />

                  </div>
                </div>
                {/* password */}
                <div className='mb-4'>
                  <label className='auth-input-label'>Password</label>
                  <div className='relative'>
                     <LockIcon className='auth-input-icon'/>
                    <input type="password" value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className='input'
                      placeholder='Enter your password'
                    />

                  </div>
                </div>
                <button className='auth-btn' type='submit' disabled={isLoggingIn}>
                  {isLoggingIn ? (
                    <LoaderIcon className='w-full h-5 animate-spin text-center' />
                  ) : (
                    "Sign In"
                  )}

                </button>
              </form>
              <div className='mt-6 text-center'>
                <Link to="/signup" className='auth-link'>
                  Don't have any account? Sign Up
                </Link>
              </div>

            </div>
          </div>

          {/* {form illustriation right side} */}
          <div className='hidden md:w-1/2 md:flex items-center justify-center p-6 bg-gradient-to-bl from-slate-800/20 to-transparent'>
            <div>
              <img
                src="/login.png"
                alt="People using mobile devices"
                className="w-full h-auto object-contain"
              />
              <div className="mt-6 text-center">
                <h3 className="text-xl font-medium text-cyan-400">Connect anytime, anywhere</h3>

                <div className="mt-4 flex justify-center gap-4">
                  <span className="auth-badge">Free</span>
                  <span className="auth-badge">Easy Setup</span>
                  <span className="auth-badge">Private</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </BorderAnimatedContainer>

    </div>

  </div>
}

export default LoginPage;