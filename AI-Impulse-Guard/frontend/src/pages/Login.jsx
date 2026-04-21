import React from "react";
import aiImage from "../assets/ai-image.png";
function LoginPage(){
    return(
        <>
    <div className="min-h-screen flex flex-col md:flex-row text-white   ">

      <div className="hidden md:flex md:w-1/2 flex-col justify-between p-10 bg-gradient-to-br from-[#060E20] to-[#111c44]">
        <div className="space-y-6 text-center max-w-xl mx-auto">          <p className="text-gray-400 text-sm mb-6">Impulse Guard</p>

          <h1 className="text-5xl font-semibold leading-tight text-center">
            The <span className="text-[#9AE6FF]">Ethereal</span><br />
            Guardian of Your<br />Assets.
          </h1>

          <p className="text-gray-300 max-w-md text-sm leading-relaxed ">
            Advanced AI-driven impulse protection. We sit between your intent and your capital, ensuring every transaction is aligned with your future.
          </p>
        </div>

        <div className="flex justify-center">
  <div className="w-[448px] h-[228px] rounded-2xl overflow-hidden bg-[#0F2A3D] shadow-[0_0_80px_rgba(56,189,248,0.25)]">
    
    <img
      src={aiImage}
      alt="AI Graphic"
      className="w-full h-full object-cover"
    />

  </div>
</div>

        <div className="flex gap-4">
          <div className="flex-1 bg-[#171F33] p-5 rounded-2xl">
            <p className="text-sm font-medium">Secure Protocol</p>
            <p className="text-xs text-gray-400 mt-1">Multi-layered encryption for every tier.</p>
          </div>

          <div className="flex-1 bg-[#171F33] p-5 rounded-2xl">
            <p className="text-sm font-medium">Smart Analytics</p>
            <p className="text-xs text-gray-400 mt-1">Real-time spending behavioral patterns.</p>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center px-6 py-10 bg-[#0B1326]">
        <div className="w-full max-w-md">

          <h2 className="text-3xl font-semibold">Welcome back</h2>
          <p className="text-gray-400 text-sm mt-2">
            Enter your credentials to access your premium dashboard.
          </p>

          {/* SOCIAL BUTTONS */}
          <div className="flex gap-4 mt-6">
            <button className="flex-1 h-12 rounded-full bg-[#0F2A3D] border border-white/5 hover:bg-white/10 transition">
              Google
            </button>
            <button className="flex-1 h-12 rounded-full bg-[#0F2A3D] border border-white/5 hover:bg-white/10 transition">
              Apple
            </button>
          </div>

          {/* DIVIDER */}
          <div className="flex items-center gap-3 my-6 text-gray-500 text-xs">
            <div className="flex-1 h-px bg-white/10"></div>
            OR CONTINUE WITH EMAIL
            <div className="flex-1 h-px bg-white/10"></div>
          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <label className="text-xs text-gray-400">EMAIL ADDRESS</label>
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full mt-2 h-12 px-4 rounded-xl  border border-white/5 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-xs text-gray-400">
              <label>PASSWORD</label>
              <span className="cursor-pointer hover:text-white">Forgot?</span>
            </div>

            <input
              type="password"
              placeholder="••••••••"
              className="w-full mt-2 h-12 px-4 rounded-xl  border border-white/5 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* BUTTON */}
          <button className="w-full h-12 rounded-full mt-4 bg-gradient-to-r from-[#C0C1FF] to-[#4B4DD8] hover:brightness-110 shadow-[0_0_30px_rgba(75,77,216,0.6)] transition">
                  Sign In →
            </button>

          {/* FOOTER */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Don’t have an account? <span className="text-[#4FD1C5] cursor-pointer">Create Account</span>
          </p>

        </div>
      </div>
    </div>

        </>
    )
}

export default LoginPage