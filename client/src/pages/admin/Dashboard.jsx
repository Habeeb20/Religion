import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const Dashboard = () => {
  const [usersData, setUsersData] = useState([]);
  const [leadersData, setLeadersData] = useState([]);

  useEffect(() => {
  
    axios.get(`${import.meta.env.VITE_API_URL}/getallusers`)
      .then(response => setUsersData(response.data))
      .catch(error => console.error('Error fetching users:', error));

    
    axios.get(`${import.meta.env.VITE_API_URL2}/getallleaders`)
      .then(response => setLeadersData(response.data))
      .catch(error => console.error('Error fetching leaders:', error));
  }, []);


  const userPieData = {
    labels: ['Active Users'],
    datasets: [
      {
        label: 'Users Distribution',
        data: [usersData.length],
        backgroundColor: ['#FF6384'],
      },
    ],
  };


  const leaderPieData = {
    labels: ['Active Leaders'],
    datasets: [
      {
        label: 'Leaders Distribution',
        data: [leadersData.length],
        backgroundColor: ['#FF6384'],
      },
    ],
  };


  const religionCount = {
    Christian: leadersData.filter(leader => leader.religion === 'Christian').length,
    Muslim: leadersData.filter(leader => leader.religion === 'Muslim').length,
    Traditional: leadersData.filter(leader => leader.religion === 'Traditional').length,
  };


  const religionBarData = {
    labels: Object.keys(religionCount),
    datasets: [
      {
        label: 'Leaders by Religion',
        data: Object.values(religionCount),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };


  const pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Prevents the chart from maintaining a 1:1 aspect ratio
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
      
   
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Registered Users</h2>
          <p className="text-3xl font-bold">{usersData.length}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-2">Total Registered Leaders</h2>
          <p className="text-3xl font-bold">{leadersData.length}</p>
        </div>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
     
        <div className="bg-white p-6 rounded-sm shadow-md h-64">
          <h2 className="text-xl font-semibold mb-4">User Status Distribution</h2>
          <Pie data={userPieData} options={pieChartOptions} />
        </div>


        <div className="bg-white p-6 rounded-lg shadow-md h-64">
          <h2 className="text-xl font-semibold mb-4">Leader Status Distribution</h2>
          <Pie data={leaderPieData} options={pieChartOptions} />
        </div>
      </div>

      {/* Bar Chart for Religion Distribution */}
      <div className="bg-white p-6 rounded-lg shadow-md mt-9">
        <h2 className="text-xl font-semibold mb-4">Leaders Distribution by Religion</h2>
        <Bar data={religionBarData} />
      </div>
    </div>
  );
};

export default Dashboard;
