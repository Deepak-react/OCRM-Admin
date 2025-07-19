import React, { useState, useEffect } from 'react';
import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Chip } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { TextField, InputAdornment } from '@mui/material';

// Dummy data for audit logs
const dummyAuditLogs = [
  { id: 1, userName: 'Alice Johnson', loginTime: '2024-07-18T10:00:00Z', ipAddress: '192.168.1.101', status: 'Success' },
  { id: 2, userName: 'Bob Williams', loginTime: '2024-07-18T10:05:00Z', ipAddress: '192.168.1.102', status: 'Failed' },
  { id: 3, userName: 'Alice Johnson', loginTime: '2024-07-18T11:15:00Z', ipAddress: '192.168.1.101', status: 'Success' },
  { id: 4, userName: 'Charlie Brown', loginTime: '2024-07-18T11:30:00Z', ipAddress: '192.168.1.103', status: 'Success' },
  { id: 5, userName: 'Bob Williams', loginTime: '2024-07-18T12:00:00Z', ipAddress: '192.168.1.102', status: 'Failed' },
  { id: 6, userName: 'Diana Prince', loginTime: '2024-07-18T13:40:00Z', ipAddress: '192.168.1.104', status: 'Success' },
  { id: 7, userName: 'Alice Johnson', loginTime: '2024-07-18T14:00:00Z', ipAddress: '192.168.1.101', status: 'Success' },
  { id: 8, userName: 'Charlie Brown', loginTime: '2024-07-18T15:20:00Z', ipAddress: '192.168.1.103', status: 'Success' },
];

const AuditLoginTab = () => {
  const [auditLogs, setAuditLogs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // In a real application, you'd fetch data here
  useEffect(() => {
    // Simulate fetching data
    setAuditLogs(dummyAuditLogs);
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredLogs = auditLogs.filter(log =>
    log.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h2" className="text-2xl font-bold text-gray-800 mb-6">
        Audit Login Logs
      </Typography>

      {/* Search Bar */}
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search by User Name, IP Address, or Status..."
        value={searchTerm}
        onChange={handleSearchChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 4 }}
      />

      {filteredLogs.length > 0 ? (
        <TableContainer component={Paper} className="shadow-md border border-gray-100 rounded-xl">
          <Table sx={{ minWidth: 650 }} aria-label="audit login table">
            <TableHead className="bg-gray-50">
              <TableRow>
                <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Login Time (IST)</TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IP Address</TableCell>
                <TableCell className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.userName}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(log.loginTime).toLocaleString('en-IN', {
                      year: 'numeric',
                      month: 'short',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                      second: '2-digit',
                      hour12: true,
                      timeZone: 'Asia/Kolkata' // Explicitly set for India Standard Time
                    })}
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.ipAddress}</TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <Chip
                      label={log.status}
                      color={log.status === 'Success' ? 'success' : 'error'}
                      size="small"
                      className="font-semibold"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Paper className="p-6 text-center text-gray-500 rounded-xl shadow-md border border-gray-100">
          <Typography variant="body1">No audit login records found.</Typography>
        </Paper>
      )}
    </Box>
  );
};

export default AuditLoginTab;