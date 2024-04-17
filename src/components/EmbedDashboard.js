import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { embedDashboard } from "@preset-sdk/embedded";

const EmbedDashboard = ({ accessToken }) => {
    const [guestToken, setGuestToken] = useState('');
    const { id: dashboardUUIDs } = useParams();


    const fetchGuestTokenFromBackend = async () => {
        const requestOptions = {
            method: 'POST',
            body: JSON.stringify({
                resources: [
                    {
                        id: dashboardUUIDs,
                        type: "dashboard"
                    }
                ],
                rls: [],
                user: {
                    first_name: "string",
                    last_name: "string",
                    username: "string"
                }
            }),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`
            }
        }

        try {
            const response = await fetch('http://192.168.6.235:8088/api/v1/security/guest_token/', requestOptions);
            if (response.ok) {
                const responseData = await response.json();
                const token = responseData.token;
                setGuestToken(token);
                return token;
            } else {
                console.error('Failed to fetch guest token:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching guest token:', error);
        }
    };

    useEffect(() => {
        const embed = async () => {
            await embedDashboard({
                id: dashboardUUIDs,
                supersetDomain: `http://192.168.6.235:8088`,
                mountPoint: document.getElementById("my-superset-container"),
                fetchGuestToken: () => fetchGuestTokenFromBackend(),
                dashboardUiConfig: {
                    hideTitle: false,
                    hideChartControls: false,
                    hideTab: false,
                },
            })
        }
        if (document.getElementById("my-superset-container")) {
            embed()
        }
    }, [])

    return (
        <>
            {/* <div className='container mt-5'>
                <h4>Guest Token:</h4>
                <p style={{ wordWrap: "break-word" }}>{guestToken}</p>
            </div> */}
            <div className='p-3 iframe-area mt-2'>
                <div id='my-superset-container' style={{ width: '100%', height: '100vh' }}>

                </div>
            </div>
        </>
    );
};

export default EmbedDashboard;
