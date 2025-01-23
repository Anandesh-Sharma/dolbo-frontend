import React from 'react';

interface PageHeaderProps {
  title: string;
  description: string;
  action?: React.ReactNode;
}

export default function PageHeader({ title, description, action }: PageHeaderProps) {
  return (
    <div className="flex items-center justify-between min-h-[4.5rem] mb-8">
      <div className="flex flex-col justify-center">
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="mt-1 text-gray-400">{description}</p>
      </div>
      {action && <div>{action}</div>}
    </div>
  );
}