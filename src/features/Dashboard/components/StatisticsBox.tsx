import React from "react";

interface StatisticsBoxProps {
  iconcolor: string;
  title: string;
  number: string | number;
  children: React.ReactNode;
}

function StatisticsBox(props: StatisticsBoxProps) {
  return (
    <div className="bg-white shadow rounded-lg p-6 flex items-center space-x-4">
      <div className={`${props.iconcolor} text-white p-4 rounded-full`}>
        {props.children}
      </div>
      <div>
        <h3 className="text-xl font-semibold">{props.title}</h3>
        <p className="text-2xl font-bold">{props.number}</p>
      </div>
    </div>
  );
}

export default StatisticsBox;
