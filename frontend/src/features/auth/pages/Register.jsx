import React, { useEffect, useState } from "react";
import TopBar from "../components/TopBar";
import { Link } from "react-router";

const Register = () => {
  const [step, setStep] = useState(1);
  const [canResend, setCanResend] = useState(false);
  const [timer, setTimer] = useState(30);

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

  return (
    <div className="form-container">
      <TopBar />
      <form action="">
        {step === 1 && (
          <>
            <div className="form-title">
              <h4>Create Account</h4>
            </div>
            <div className="input-box">
              <input type="email" id="email" placeholder="" />
              <label htmlFor="email">Email address</label>
            </div>
            <div className="input-box">
              <input type="password" id="password" placeholder="" />
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
            <div className="input-box">
              <input type="text" id="username" placeholder="" />
              <label htmlFor="username">Username</label>
            </div>
            <button onClick={() => setStep(3)} type="submit">
              Create Account
            </button>
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
