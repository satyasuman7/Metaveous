import React from 'react'
import TableData from '../TableData'

const contactData = [
  {
    id: 1,
    contact_name: 'john',
    contact_email: 'john.doe@example.com',
    contact_mobile: '7457845741',
    contact_message: 'I would like to know more about React.',
    contact_datesubmitted: '2025-10-10',
  }
];

const contactColumns = [
  { key: 'contact_name', label: 'Name' },
  { key: 'contact_email', label: 'Email Address' },
  { key: 'contact_mobile', label: 'Mobile Number' },
  { key: 'contact_message', label: 'Message' },
  { key: 'contact_datesubmitted', label: 'Date Submitted' },
];
export default function ContactView() {
  return (
    <>
      <div className="p-3">
        <TableData data={contactData} columns={contactColumns} title="Contact Messages" />
      </div>
    </>
  )
}
