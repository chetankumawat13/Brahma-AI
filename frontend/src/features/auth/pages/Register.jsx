import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";
import { useForm } from "react-hook-form";

const Register = () => {
  const [step, setStep] = useState(1);
  const [canResend, setCanResend] = useState(false);
  const [timer, setTimer] = useState(30);

  const {user,loading,handleRegister} = useAuth()
  const {handleSubmit,register} = useForm()
  const [error, setError] = useState('')
  const navigate =  useNavigate()

  useEffect(() => {
    if (step !== 3) return;
    if (canResend) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setCanResend(true);
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [step, canResend]);

  const handleResend = () => {
    setTimer(30);
    setCanResend(false);
  };

  const handleSubmitRegister = async (data) => {
        try{
            setError('')
            await handleRegister(data.email,data.username,data.password)
            setStep(3)
        }catch(err){
            const message = err.response?.data.message
            setError(message)
        }
  }


  return (
    <div className="form-container">
      <TopBar />

      <form onSubmit={handleSubmit(handleSubmitRegister)} action="">
        {step === 1 && (
          <>
              <div className="form-title">
              <h4>Create Account</h4>
            </div>
            <small>{error && `${error}`}</small>
            <div className="input-box">
              <input {...register('email')} type="email" id="email" placeholder="" />
              <label htmlFor="email">Email address</label>
            </div>
            <div className="input-box">
              <input {...register("password")} type="password" id="password" placeholder="" />
              <label htmlFor="password">Password</label>
            </div>
            <button onClick={() => setStep(2)} type="button">
              Continue
            </button>
            <p>
              Already have an account <Link to={"/login"}>Login</Link>
            </p>
          </>
        )}
        {step === 2 && (
          <>
                <div className="form-title">
              <h4>Create Account</h4>
            </div>
            <small>{error && `${error}`}</small>

            <div className="input-box">
              <input {...register("username")} type="text" id="username" placeholder="" />
              <label htmlFor="username">Username</label>
            </div>
            <button  type="submit">
                {loading?"Creating...":"Create Account"}
            </button>
            <button type="button" onClick={() => setStep(1)} className="back-btn">Back</button>
            <p>
              Already have an account <Link to={"/login"}>Login</Link>
            </p>
          </>
        )}

        {step === 3 && (
          <>
            <div className="verify-email">
              <div className="verify-icon">
                <i className="ri-mail-send-line"></i>
              </div>
              <h3>Check Your Email </h3>
              <p>We've sent a verification link to </p>
              <span>chetan@gmail.com</span>
              <button
                onClick={handleResend}
                disabled={!canResend}
                type="button"
              >
                Resend Verification Email
              </button>
              <small>
                {canResend
                  ? "You can resend now"
                  : `Resend available in ${timer}s`}
              </small>
              <Link to={"/login"}>Back to Login</Link>
            </div>
          </>
        )}
      </form>
    </div>
  );
};

export default Register;
