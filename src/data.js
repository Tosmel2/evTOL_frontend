export const columns = [
  {
      name: 'Serial No',
      selector: row => row.serialno,
  },
  {
      name: 'Model',
      selector: row => row.model,
      minWidth: "fit-content"
  },
  {
      name: 'Weight Limit',
      selector: row => row.weight
  },
  {
      name: 'Battery',
      selector: row => row.batteryCapacity,
  },
  {
      name: 'Status',
      selector: row => row.state,
  },
];
export const medcolumns = [
  {
      name: 'Code',
      selector: row => row.medicationCode
  },
  {
      name: 'Med. Name',
      selector: row => row.medicationName
  },
  {
      name: 'Image',
      selector: row => row.medicationPicture
  },
  {
      name: 'Weight',
      selector: row => row.weight,
  },
  {
      name: 'Quantity',
      selector: row => row.quantity,
  },
  {
      name: 'Edit',
      selector: row => row.edit,
      width: "9%"
  },
  {
      name: 'Delete',
      selector: row => row.delete,
      width: "12%"
  },
];
export const historyColumns = [
  {
      name: 'Evtol',
      selector: row => row.evtolSerial,
      width: "100px"
  },
  {
      name: 'Medications',
      selector: row => row.medications
  },
  {
      name: 'Date',
      selector: row => row.date
  },
  {
      name: 'Address',
      selector: row => row.address,
  }
];

export const data = [
  {
      serial: 1,
      model: 'Beetlejuice',
      wlimit: 500,
      battery: 25,
      price: 200,
      status: "Idle",
  },
  {
    serial: 2,
    model: 'Chivyjuice',
    wlimit: 400,
    battery: 205,
    price: 130,
    status: "Idle",
}
]

export const customStyles = {
  headCells: {
      style: {
          paddingLeft: '18px', // override the cell padding for head cells
          paddingRight: '8px',
          fontSize: '14px',
          backgroundColor: 'rgb(72,187,120)',
          color: 'white'
      },
  },
};
export const customStyles2 = {
  headCells: {
      style: {
          paddingLeft: '14px', // override the cell padding for head cells
          paddingRight: '8px',
          fontSize: '14px',
          backgroundColor: 'rgb(72,187,120)',
          color: 'white'
      },
  },
};
