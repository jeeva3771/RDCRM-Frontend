
const express = require('express');
const router = express.Router();

// Mock departments data
let departments = [
  {
    id: 1,
    name: 'Production Planning',
    code: 'RD001',
    status: 'Active',
    process: 'CNC, Machining, Assembly, Quality Control, Packaging',
    createdAt: '2024-01-15 09:30 AM',
    createdBy: 'Admin User',
    updatedAt: '2024-12-15 02:15 PM',
    updatedBy: 'Admin User'
  },
  {
    id: 2,
    name: 'Quality Assurance',
    code: 'RD002',
    status: 'Active',
    process: 'Inspection, Testing, Documentation',
    createdAt: '2024-02-10 11:00 AM',
    createdBy: 'Admin User',
    updatedAt: '2024-12-10 04:30 PM',
    updatedBy: 'Admin User'
  }
];

// Get all departments
router.get('/', (req, res) => {
  res.json(departments);
});

// Get department by ID
router.get('/:id', (req, res) => {
  const department = departments.find(d => d.id === parseInt(req.params.id));
  if (!department) {
    return res.status(404).json({ error: 'Department not found' });
  }
  res.json(department);
});

// Create new department
router.post('/', (req, res) => {
  const { name, code, status, process } = req.body;
  
  if (!name || !code) {
    return res.status(400).json({ error: 'Name and code are required' });
  }
  
  const newDepartment = {
    id: departments.length + 1,
    name,
    code,
    status: status || 'Active',
    process: process || '',
    createdAt: new Date().toLocaleString(),
    createdBy: 'Current User',
    updatedAt: new Date().toLocaleString(),
    updatedBy: 'Current User'
  };
  
  departments.push(newDepartment);
  res.status(201).json(newDepartment);
});

// Update department
router.put('/:id', (req, res) => {
  const departmentIndex = departments.findIndex(d => d.id === parseInt(req.params.id));
  if (departmentIndex === -1) {
    return res.status(404).json({ error: 'Department not found' });
  }
  
  const { name, code, status, process } = req.body;
  departments[departmentIndex] = {
    ...departments[departmentIndex],
    name: name || departments[departmentIndex].name,
    code: code || departments[departmentIndex].code,
    status: status || departments[departmentIndex].status,
    process: process || departments[departmentIndex].process,
    updatedAt: new Date().toLocaleString(),
    updatedBy: 'Current User'
  };
  
  res.json(departments[departmentIndex]);
});

// Delete department
router.delete('/:id', (req, res) => {
  const departmentIndex = departments.findIndex(d => d.id === parseInt(req.params.id));
  if (departmentIndex === -1) {
    return res.status(404).json({ error: 'Department not found' });
  }
  
  departments.splice(departmentIndex, 1);
  res.json({ message: 'Department deleted successfully' });
});

module.exports = router;
