
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { teamMembers } from '@/components/TeamMembers';
import Logo from '@/components/Logo';

const SignIn = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [selectedTeamMember, setSelectedTeamMember] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setName(newName);
    validateForm(newName, selectedTeamMember);
  };

  const handleTeamMemberSelect = (value: string) => {
    setSelectedTeamMember(value);
    validateForm(name, value);
  };

  const validateForm = (nameValue: string, teamMemberValue: string) => {
    setIsFormValid(nameValue.trim() !== '' && teamMemberValue !== '');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isFormValid) return;
    
    // In a real app, we'd save this data to a database
    // For now, we'll just navigate to the confirmation page
    const selectedMember = teamMembers.find(member => member.id === parseInt(selectedTeamMember));
    
    navigate('/confirmation', { 
      state: { 
        visitorName: name,
        teamMemberName: selectedMember?.name || ''
      }
    });
  };

  return (
    <div className="page-container">
      <div className="form-container animate-scale-in">
        <div className="flex justify-center mb-4">
          <Logo size="small" />
        </div>
        
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Sign In
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              What's your name?
            </label>
            <Input
              id="name"
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={handleNameChange}
              className="w-full"
              autoFocus
            />
          </div>
          
          <div className="space-y-2">
            <label htmlFor="team-member" className="block text-sm font-medium text-gray-700">
              Who are you here to see?
            </label>
            <Select value={selectedTeamMember} onValueChange={handleTeamMemberSelect}>
              <SelectTrigger id="team-member" className="w-full">
                <SelectValue placeholder="Select a team member" />
              </SelectTrigger>
              <SelectContent>
                {teamMembers.map((member) => (
                  <SelectItem key={member.id} value={member.id.toString()}>
                    {member.name} - {member.department}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            type="submit" 
            className="w-full py-2 rounded-lg transition-all"
            disabled={!isFormValid}
          >
            Submit
          </Button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
