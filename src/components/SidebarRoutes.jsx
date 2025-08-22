// // routes/sidebarRoutes.js
// const sidebarRoutes = [
//   {
//     label: 'Dashboard',
//     icon: 'fa-solid fa-home',
//     path: '/dashboard',
//   },
//   {
//     label: 'Admin Enquiries',
//     icon: 'fa-solid fa-clipboard-list',
//     path: '/enquiries',
//     match: ['/enquiries', '/enquiries/add'],
//   },

//    {
//     label: 'Designer Enquiries',
//     icon: 'fa-solid fa-clipboard-list',
//     path: '/enquiriesdesigner',
//     match: ['/enquiriesdesigner'],
//   },

//   {
//     label: 'Process',
//     icon: 'fa-solid fa-clipboard-list',
//     path: '/process',
//     match: ['/process', '/process/add', '/process/:processId'],
//   },

//   {
//     label: 'Roles',
//     icon: 'fa-solid fa-clipboard-list',
//     path: '/roles',
//     match: ['/roles', '/roles/add', '/roles/:roleId'],
//   },

//   {
//     label: 'Departments',
//     icon: 'fa-solid fa-clipboard-list',
//     path: '/departments',
//     match: ['/departments', '/departments/add', '/departments/:departmentId'],
//   },

//   {
//     label: 'Materials',
//     icon: 'fa-solid fa-clipboard-list',
//     path: '/materials',
//     match: ['/materials', '/materials/add', '/materials/:materialId'],
//   },

//   {
//     label: 'Users',
//     icon: 'fa-solid fa-clipboard-list',
//     path: '/users',
//     match: ['/users', '/users/add', '/users/:userId'],
//   },
//   // Add more items here
// ]

// export default sidebarRoutes

const sidebarRoutes = [
  {
    label: 'Dashboard',
    icon: 'fa-solid fa-home',
    path: '/dashboard',
  },
  {
    label: 'Masters',
    icon: 'fa-solid fa-hammer',
    children: [
      {
        label: 'Process',
        path: '/process',
        match: ['/process', '/process/add', '/process/:processId'],
      },
      {
        label: 'Materials',
        path: '/materials',
        match: ['/materials', '/materials/add', '/materials/:materialId'],
      },
      {
        label: 'Departments',
        path: '/departments',
        match: ['/departments', '/departments/add', '/departments/:departmentId'],
      },
      {
        label: 'Roles',
        path: '/roles',
        match: ['/roles', '/roles/add', '/roles/:roleId'],
      },
    ],
  },
  {
    label: 'Users',
    icon: 'fa-solid fa-user',
    path: '/users',
    match: ['/users', '/users/add', '/users/:userId'],
  },
  {
    label: 'Admin Enquiries',
    icon: 'fa-solid fa-envelope',
    path: '/enquiries',
    match: ['/enquiries', '/enquiries/add'],
  },
  {
    label: 'Designer Enquiries',
    icon: 'fa-solid fa-pencil-ruler',
    path: '/enquiriesdesigner',
    match: ['/enquiriesdesigner'],
  },
];

export default sidebarRoutes;
