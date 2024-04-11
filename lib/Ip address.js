import { networkInterfaces } from "os" 

// Function to retrieve the IP address
export function getIpAddress() {
    const nets = networkInterfaces();
    const results = {}; // Store IP addresses

    // Iterate over interfaces
    for (const name of Object.keys(nets)) {
        for (const net of nets[name]) {
            // Skip over internal (non-IPv4) and non-public IP addresses
            if (net.family === 'IPv4' && !net.internal && net.address !== '127.0.0.1') {
                if (!results[name]) {
                    results[name] = [];
                }
                results[name].push(net.address);
            }
        }
    }
    
    return results;
}

// Get the IP address
