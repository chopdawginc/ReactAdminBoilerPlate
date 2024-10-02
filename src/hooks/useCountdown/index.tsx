import React, { useState, useEffect, useCallback, useMemo } from "react";

export const useCountdown = (initialTime: number) => {
  const [timeLeft, setTimeLeft] = useState<number>(initialTime);
  const [isOtpSent, setIsOtpSent] = useState<boolean>(false);

  useEffect(() => {
    if (isOtpSent && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);

      return () => clearInterval(timer);
    } else if (timeLeft === 0) {
      setIsOtpSent(false);
    }
  }, [isOtpSent, timeLeft]);

  // Format time into MM:SS format
  const formattedCountdown = useMemo(() => {
    const minutes = String(Math.floor(timeLeft / 60)).padStart(2, "0"); // Ensure two digits for minutes
    const seconds = String(timeLeft % 60).padStart(2, "0"); // Ensure two digits for seconds
    return `${minutes}:${seconds}`;
  }, [timeLeft]);

  const resetCountdown = useCallback(() => {
    setTimeLeft(initialTime);
  }, [initialTime]);

  return {
    timeLeft,
    resetCountdown,
    formattedCountdown,
    isOtpSent,
    setIsOtpSent,
  };
};
