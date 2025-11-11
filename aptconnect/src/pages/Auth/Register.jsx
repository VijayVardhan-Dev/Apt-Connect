import React from "react";
import { Link } from "react-router-dom";
import ArrowIcon from "../../assets/icons/arrow_icon.png"; // ✅ correct import

const Register = () => {
  return (
    <div className="w-[1440px] h-[1024px] relative bg-white overflow-hidden">

      {/* LEFT SECTION */}
      <div className="w-[780px] h-[1025px] left-0 top-[3px] absolute bg-white rounded-2xl border-gray-200">
        <div className="w-64 h-56 left-0 top-0 absolute overflow-hidden">
          <div className="w-64 h-56 left-0 top-0 absolute bg-neutral-200" />
        </div>
        <div className="w-56 h-56 left-[281.33px] top-0 absolute bg-neutral-200 rounded-2xl border-neutral-200" />
        <div className="w-64 h-96 left-[531px] top-0 absolute overflow-hidden">
          <div className="w-64 h-96 left-0 top-0 absolute bg-neutral-200" />
        </div>
        <div className="w-56 h-80 left-0 top-[242px] absolute overflow-hidden">
          <div className="w-56 h-80 left-0 top-0 absolute bg-neutral-200" />
        </div>
        <div className="w-60 h-[500px] left-[252px] top-[242px] absolute overflow-hidden">
          <div className="w-60 h-[500px] left-0 top-0 absolute bg-neutral-200" />
        </div>
        <div className="w-56 h-60 left-0 top-[588px] absolute bg-neutral-200 rounded-2xl border-gray-200" />
        <div className="w-64 h-64 left-[531px] top-[470px] absolute rounded-tl-3xl rounded-bl-3xl overflow-hidden">
          <div className="w-64 h-64 left-0 top-0 absolute bg-neutral-200" />
        </div>
        <div className="w-56 h-64 left-0 top-[853px] absolute overflow-hidden">
          <div className="w-56 h-64 left-0 top-0 absolute bg-neutral-200" />
        </div>
        <div className="w-60 h-64 left-[252px] top-[770px] absolute overflow-hidden">
          <div className="w-60 h-64 left-0 top-0 absolute bg-neutral-200" />
        </div>
        <div className="w-64 h-64 left-[531px] top-[770px] absolute overflow-hidden">
          <div className="w-64 h-64 left-0 top-0 absolute bg-neutral-200" />
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-[654px] h-[1024px] left-[786px] top-0 absolute outline outline-1 outline-offset-[-1px] outline-gray-200">

        <div className="left-[134px] top-[232px] absolute justify-start text-slate-900 text-4xl font-normal font-['Poppins'] leading-8">Sign Up</div>
        <div className="left-[138px] top-[302px] absolute justify-start text-zinc-600 text-base font-normal font-['Poppins'] leading-4">Email</div>
        <div className="w-96 h-12 left-[135px] top-[330px] absolute rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-800">
          <div className="w-72 h-8 left-[12px] top-[8px] absolute justify-start text-white text-sm font-normal font-['Roboto'] leading-5">Alice</div>
        </div>

        <div className="left-[138px] top-[390px] absolute justify-start text-zinc-600 text-base font-normal font-['Roboto'] leading-4">Password</div>
        <div className="w-96 h-12 left-[136px] top-[416px] absolute rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-800">
          <div className="w-72 h-8 left-[12px] top-[8px] absolute justify-start text-white text-sm font-normal font-['Roboto'] leading-5">Eshlea</div>
        </div>

        <div className="left-[138px] top-[481px] absolute justify-start text-zinc-600 text-base font-normal font-['Poppins'] leading-4">Confirm password</div>
        <div className="w-96 h-12 left-[136px] top-[508px] absolute rounded-lg outline outline-1 outline-offset-[-1px] outline-neutral-800">
          <div className="w-72 h-8 left-[11px] top-[7px] absolute justify-start text-white text-sm font-normal font-['Roboto'] leading-5">alice_logi</div>
        </div>

        {/* ✅ Sign Up (STAYS SAME) */}
        <div className="w-96 h-11 left-[139px] top-[577px] absolute bg-slate-800 rounded-full outline outline-1 outline-offset-[-1px] outline-slate-300">
          <div className="left-[159px] top-[12px] absolute justify-start text-white text-sm font-bold font-['Poppins'] leading-5">Sign Up</div>
        </div>

        {/* ✅ Login (WRAPPED IN LINK) — UI Unchanged */}
        <Link to="/login">
          <div className="w-96 h-11 left-[139px] top-[659px] absolute bg-white rounded-full outline outline-1 outline-offset-[-1px] outline-slate-300 cursor-pointer">
            <div className="left-[167px] top-[12px] absolute justify-start text-slate-800 text-sm font-bold font-['Poppins'] leading-5">Login</div>
          </div>
        </Link>

        <div className="w-96 h-11 left-[139px] top-[713px] absolute bg-slate-800 rounded-full outline outline-1 outline-offset-[-1px] outline-slate-300">
          <div className="left-[116px] top-[12px] absolute justify-start text-white text-sm font-bold font-['Poppins'] leading-5">Sign up with Google</div>
        </div>

        <div className="w-80 h-4 left-[166px] top-[631px] absolute border-gray-200">
          <div className="w-36 h-px left-0 top-[7.50px] absolute border-t border-neutral-800" />
          <div className="w-36 h-px left-[178.67px] top-[7.50px] absolute border-t border-neutral-800" />
          <div className="left-[153.33px] top-0 absolute justify-start text-neutral-800 text-xs font-normal font-['Roboto'] leading-4">Or</div>
        </div>

      </div>

      {/* ✅ ARROW (UI SAME, just using imported icon) */}
      <div className="arrow">
        <img className="w-7 h-7 absolute left-[835px] top-[19px] object-contain cursor-pointer" src={ArrowIcon} alt="back" />
      </div>

    </div>
  );
};

export default Register;
