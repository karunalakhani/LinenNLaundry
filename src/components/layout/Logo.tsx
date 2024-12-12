import React from 'react';

export const Logo: React.FC = () => {
  return (
    <div className="flex items-center space-x-3">
      <img 
        src="https://axonichealth.com/wp-content/uploads/2024/04/logo-with-black-text-1.png"
        alt="Axonic Healthcare"
        className="h-12 w-auto"
      />
    </div>
  );
};