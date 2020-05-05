// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];
    
export const common = {
    lavel: [
        { name: 'Under Graduate', value: 'Under Graduate' },
        { name: 'Graduation', value: 'Graduation' },
        { name: 'PhD', value: 'PhD' },
        { name: 'Post Graduation', value: 'Post Graduation' },
        { name: 'Others', value: 'Others' },
    ],

    experince: [
        { name: 'experience_one', value: '5' },
        { name: 'experience_two', value: '15' },
        { name: 'experience_three', value: '16' }
    ],
  caddata: [
    {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Free/Paid',
        field: 'freepaid',
        sort: 'asc',
        width: 200
      },
      {
        label: 'Experience',
        field: 'experience',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Average Rating',
        field: 'averagerating',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Registered Date',
        field: 'registered',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Last Login',
        field: 'lastlogin',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Exp Salary',
        field: 'expsalary',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Location',
        field: 'location',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Actions',
        field: 'actions',
        sort: 'asc',
        width: 100
      },
       {
        label: 'Status',
        field: 'status',
        sort: 'asc',
        width: 100
      },
  ],  
  empdata: [
    {
        label: 'Name',
        field: 'name',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Email',
        field: 'email',
        sort: 'asc',
        width: 270
      },
      {
        label: 'Company',
        field: 'company',
        sort: 'asc',
        width: 200
      },
      {
        label: '#Downloaded',
        field: 'downloaded',
        sort: 'asc',
        width: 100
      },
      {
        label: 'Total Paid',
        field: 'totalpaid',
        sort: 'asc',
        width: 150
      },
      {
        label: 'Registered',
        field: 'registered',
        sort: 'asc',
        width: 100
      },
       {
        label: 'Last Login',
        field: 'lastlogin',
        sort: 'asc',
        width: 100
      },
       {
        label: 'Actions',
        field: 'actions',
        sort: 'asc',
        width: 100
      },
       {
        label: 'Status',
        field: 'status',
        sort: 'asc',
        width: 100
      },
    ],
    
};


