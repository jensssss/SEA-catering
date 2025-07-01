// /admin/dashboard/components/MetricCard.tsx

import React from 'react';

type MetricCardProps = {
  title: string;
  value: string;
  icon: React.ReactNode;
  description: string;
};

const MetricCard = ({ title, value, icon, description }: MetricCardProps) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="flex items-start justify-between">
        <h3 className="text-md font-semibold text-slate-600">{title}</h3>
        <div className="bg-teal-100/70 p-2 rounded-full">
          {icon}
        </div>
      </div>
      <div className="mt-4">
        <p className="text-3xl font-bold text-slate-800 break-words">{value}</p>
        <p className="text-sm text-slate-500 mt-1">{description}</p>
      </div>
    </div>
  );
};

export default MetricCard;