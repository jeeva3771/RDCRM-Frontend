
const express = require('express');
const router = express.Router();

// Mock process data
let processes = [
  {
    id: 1,
    processName: 'CNC Machining',
    status: 'Active',
    rawMaterial: 'Aluminum',
    processFields: JSON.stringify(['Setup', 'Cutting', 'Finishing', 'Quality Check']),
    createdAt: '2024-01-15 09:30 AM',
    updatedAt: '2024-12-15 02:15 PM'
  },
  {
    id: 2,
    processName: 'Assembly Line',
    status: 'Active',
    rawMaterial: 'Various Components',
    processFields: JSON.stringify(['Component Check', 'Assembly', 'Testing', 'Packaging']),
    createdAt: '2024-02-10 11:00 AM',
    updatedAt: '2024-12-10 04:30 PM'
  }
];

// Get all processes
router.get('/', (req, res) => {
  res.json(processes);
});

// Get process by ID
router.get('/:id', (req, res) => {
  const process = processes.find(p => p.id === parseInt(req.params.id));
  if (!process) {
    return res.status(404).json({ error: 'Process not found' });
  }
  res.json(process);
});

// Create new process
router.post('/', (req, res) => {
  const { processName, status, rawMaterial, processFields } = req.body;
  
  if (!processName || !status || !rawMaterial) {
    return res.status(400).json({ 
      error: 'Process name, status, and raw material are required' 
    });
  }
  
  const newProcess = {
    id: processes.length + 1,
    processId: processes.length + 1,
    processName,
    status,
    rawMaterial,
    processFields: processFields || '[]',
    createdAt: new Date().toLocaleString(),
    updatedAt: new Date().toLocaleString()
  };
  
  processes.push(newProcess);
  res.status(201).json(newProcess);
});

// Update process
router.put('/:id', (req, res) => {
  const processIndex = processes.findIndex(p => p.id === parseInt(req.params.id));
  if (processIndex === -1) {
    return res.status(404).json({ error: 'Process not found' });
  }
  
  const { processName, status, rawMaterial, processFields } = req.body;
  processes[processIndex] = {
    ...processes[processIndex],
    processName: processName || processes[processIndex].processName,
    status: status || processes[processIndex].status,
    rawMaterial: rawMaterial || processes[processIndex].rawMaterial,
    processFields: processFields || processes[processIndex].processFields,
    updatedAt: new Date().toLocaleString()
  };
  
  res.json(processes[processIndex]);
});

// Delete process
router.delete('/:id', (req, res) => {
  const processIndex = processes.findIndex(p => p.id === parseInt(req.params.id));
  if (processIndex === -1) {
    return res.status(404).json({ error: 'Process not found' });
  }
  
  processes.splice(processIndex, 1);
  res.json({ message: 'Process deleted successfully' });
});

module.exports = router;
