
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Logo from '@/components/Logo';

interface LocationState {
  visitorName: string;
  teamMemberName: string;
}

const Confirmation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  
  useEffect(() => {
    // If someone tries to access this page directly without data, redirect to home
    if (!state || !state.visitorName) {
      navigate('/');
    }
  }, [state, navigate]);

  const handleDone = () => {
    navigate('/');
  };

  if (!state) return null;

  return (
    <div className="page-container bg-gradient-confirmation">
      <div className="max-w-md w-full flex flex-col items-center">
        <div className="animate-celebrate">
          <div className="h-32 w-32 rounded-full bg-white shadow-md flex items-center justify-center">
            <svg
              className="h-20 w-20 text-secondary"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M20 6L9 17l-5-5"></path>
            </svg>
          </div>
        </div>

        <h1 className="mt-8 text-2xl font-bold text-center text-gray-800 animate-fade-in">
          Thank you for signing in, {state.visitorName}!
        </h1>
        
        <p className="mt-4 text-center text-gray-600 max-w-sm animate-fade-in">
          We've notified {state.teamMemberName} that you've arrived. Someone will be with you shortly!
        </p>
        
        <Button 
          className="mt-10 rounded-full transition-all hover:scale-105 animate-fade-in"
          onClick={handleDone}
        >
          Done
        </Button>

        <div className="mt-12 animate-fade-in">
          <Logo size="small" />
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
