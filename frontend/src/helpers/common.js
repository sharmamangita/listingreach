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
  agentcolumns: [
    {
      label: 'Name',
      field: 'name',
      sort: 'asc',
      width: 250
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
      label: '#Blasts Sent',
      field: 'blastssent',
      sort: 'asc',
      width: 50
    },
    {
      label: 'Total Paid',
      field: 'totalpaid',
      sort: 'asc',
      width: 50
    },
    {
      label: 'Registered Date',
      field: 'registered',
      sort: 'asc',
      width: 200
    },   
    {
      label: 'Actions',
      field: 'actions',
      sort: 'asc',
      width: 50
    },
    {
      label: 'Status',
      field: 'status',
      sort: 'asc',
      width: 50
    },
  ],
  blastscolumns: [
    {
      label: 'Blast Type',
      field: 'name',
      sort: 'asc',
      width: 250
    },
    {
      label: 'Headline',
      field: 'email',
      sort: 'asc',
      width: 270
    },
    {
      label: 'Agent',
      field: 'company',
      sort: 'asc',
      width: 200
    },
    {
      label: 'Email',
      field: 'blastssent',
      sort: 'asc',
      width: 50
    },
    {
      label: 'Company',
      field: 'totalpaid',
      sort: 'asc',
      width: 50
    },
    {
      label: 'Sent Date',
      field: 'registered',
      sort: 'asc',
      width: 200
    },   
    {
      label: 'Tootal Paid',
      field: 'registered',
      sort: 'asc',
      width: 200
    },   
    {
      label: 'Paid On',
      field: 'registered',
      sort: 'asc',
      width: 200
    },   
    {
      label: 'Approve',
      field: 'actions',
      sort: 'asc',
      width: 50
    },
    {
      label: 'Send',
      field: 'status',
      sort: 'asc',
      width: 50
    },
  ],

  subscribercolumns: [
    {
      label: 'Name',
      field: 'name',
      sort: 'asc',
      width: 250
    },
    {
      label: 'Email',
      field: 'email',
      sort: 'asc',
      width: 270
    },
    {
      label: 'Phone',
      field: 'phone',
      sort: 'asc',
      width: 200
    },
    {
      label: 'City',
      field: 'city',
      sort: 'asc',
      width: 50
    },
    {
      label: 'State',
      field: 'state',
      sort: 'asc',
      width: 50
    },
    {
      label: 'Subscribed Date',
      field: 'subscribedon',
      sort: 'asc',
      width: 200
    },   
    {
      label: 'Preferences',
      field: 'preferences',
      sort: 'asc',
      width: 50
    },
    {
      label: 'Actions',
      field: 'actions',
      sort: 'asc',
      width: 50
    }
    // {
    //   label: 'Status',
    //   field: 'status',
    //   sort: 'asc',
    //   width: 50
    // },
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


