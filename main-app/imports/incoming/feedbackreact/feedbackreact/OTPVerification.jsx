import React from 'react';

const OTPVerification = ({ otp, setOtp, onVerify, otpTimeLeft, loading }) => {
  return (
    <div id="otpSection" className="otp-section">
      <div className="form-group">
        <label htmlFor="otpInput">Enter OTP *</label>
        <input
          type="text"
          id="otpInput"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          maxLength="6"
          placeholder="000000"
          required
        />
      </div>
      <div id="otpTimerDisplay" className="otp-timer">
        ⏱ Time left: {Math.floor(otpTimeLeft / 60)}:{otpTimeLeft % 60 < 10 ? '0' : ''}{otpTimeLeft % 60}
      </div>
      <button
        type="button"
        id="verifyOtpBtn"
        className="btn btn-secondary"
        onClick={onVerify}
        disabled={loading}
      >
        {loading ? '⏳ Verifying...' : 'Verify OTP'}
      </button>
    </div>
  );
};

export default OTPVerification;