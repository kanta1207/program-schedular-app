import React from 'react';

interface RequiredMarkProps {
  isEditable: boolean;
}

export const RequiredMark: React.FC<RequiredMarkProps> = ({ isEditable }) => {
  return <span className={isEditable ? 'text-[#FF0000]' : ''}>{isEditable ? ' *' : ' :'}</span>;
};
