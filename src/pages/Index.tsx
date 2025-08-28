
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Logo from '@/components/Logo';

const Index = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/sign-in');
  };

  return (
    <div className="page-container bg-gradient-welcome">
      <div className="max-w-md w-full flex flex-col items-center animate-fade-in">
        <Logo size="large" />
        
        <h1 className="mt-6 text-3xl font-bold text-center text-gray-800">
          Welcome! We're glad you're here.
        </h1>
        
        <p className="mt-3 text-center text-gray-600 max-w-sm">
          Please sign in to let us know you've arrived. We'll notify the team member you're here to see.
        </p>
        
        <Button 
          className="mt-8 w-48 h-12 text-lg font-semibold rounded-full transition-all hover:scale-105"
          onClick={handleSignIn}
        >
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default Index;
