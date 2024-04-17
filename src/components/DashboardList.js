import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const DashboardList = ({ accessToken }) => {
  const [dashboards, setDashboards] = useState([]);
  const [dashboardUUIDs, setDashboardUUIDs] = useState({});
  const [dashboardIDs, setDashboardIDs] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://192.168.6.235:8088/api/v1/dashboard/', {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        });
        const data = response.data.result;
        setDashboards(data);
        data.forEach(async (dashboard) => {
          try {
            const embeddedResponse = await axios.get(`http://192.168.6.235:8088/api/v1/dashboard/${dashboard.id}/embedded`, {
              headers: {
                Authorization: `Bearer ${accessToken}`
              }
            });
            setDashboardIDs((prevIDs) => ({ ...prevIDs, [dashboard.id]: embeddedResponse.data.result.dashboard_id }));
            setDashboardUUIDs((prevUUIDs) => ({ ...prevUUIDs, [dashboard.id]: embeddedResponse.data.result.uuid }));
          } catch (error) {
            console.error('Error fetching embedded link:', error);
          }
        });
      } catch (error) {
        console.error('Error fetching Dashboard Data:', error);
      }
    };

    if (accessToken) {
      fetchData();
    }
  }, [accessToken]);

  const handleOpenUserDashboard = (dashboardUUID) => {
    navigate(`/EmbedDashboard/${dashboardUUID}`);
  };

  // Filter dashboards to only render those for which both dashboardId and dashboardIDs exist
  const filteredDashboards = dashboards.filter((dashboard) => dashboard.id in dashboardIDs);

  return (
    <div className='container mt-5'>
      <table className="table table-hover">
        <thead>
          <tr>
            <th scope="col">Dashboard Title</th>
            <th scope="col">Owner Name</th>
            <th scope="col">Last Modified Date</th>
          </tr>
        </thead>
        <tbody>
          {filteredDashboards.map((dashboard) => (
            <tr key={dashboard.id} className='embedDashboard-Row' onClick={() => handleOpenUserDashboard(dashboardUUIDs[dashboard.id])}>
              <td>{dashboard.dashboard_title}</td>
              {dashboard.owners.map((ownername) => (
                <td key={ownername.id} className='text-capitalize'>{ownername.first_name} {ownername.last_name}</td>
              ))}
              <td>{dashboard.changed_on_utc} ({dashboard.changed_on_delta_humanized})</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DashboardList;
