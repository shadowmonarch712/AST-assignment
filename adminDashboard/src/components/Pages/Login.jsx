import React from 'react'
import GoogleButton from 'react-google-button'
import { auth, googleAuthProvider } from '../../firebase'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const Navigate = useNavigate();
  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleAuthProvider);
      localStorage.setItem('token', result.user.accessToken);
      localStorage.setItem('user', JSON.stringify(result.user));
      Navigate("/");
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <section className="flex justify-center items-center h-screen ">
      <div className="w-full lg:w-4/12 px-4 mx-auto pt-6">
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
          <div className="rounded-t mb-0 px-6 py-6">
            <div className="text-center mb-3">
              <h6 className="text-blueGray-500 text-sm font-bold">
                Sign in with
              </h6>
            </div>
            <div className="btn-wrapper text-center">
              <button className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150" type="button" onClick={handleSignInWithGoogle}>
                <img alt="..." className="w-5 mr-1" src="https://demos.creative-tim.com/notus-js/assets/img/google.svg" />Google </button>
            </div>
          </div>
        </div>
      </div>
    </section>

  )
}

export default Login