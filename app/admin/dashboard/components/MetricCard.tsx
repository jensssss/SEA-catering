import React from 'react';

type MetricCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
};

const MetricCard = ({ title, value, icon, description }: MetricCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow border border-gray-200/50">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-md font-semibold text-gray-500">{title}</h3>
        <div className="bg-teal-100/70 p-2 rounded-full">
          {icon}
        </div>
      </div>
      <div>
        <p className="text-3xl font-bold text-gray-800 break-words">{value}</p>
        <p className="text-sm text-gray-400 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default MetricCard;