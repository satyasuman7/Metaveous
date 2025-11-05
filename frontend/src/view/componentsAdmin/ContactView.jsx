import React, { useState } from 'react'
import TableData from '../TableData'

const contactColumns = [
  { key: 'contact_name', label: 'Name' },
  { key: 'contact_email', label: 'Email Address' },
  { key: 'contact_mobile', label: 'Mobile Number' },
  { key: 'contact_message', label: 'Message' },
];
export default function ContactView() {
  const [contactForm, setContactForm] = useState({
    contact_name: '',
    contact_email: '',
    contact_mobile: '',
    contact_message: '',
  });
  const [contactList, setContactList] = useState([]);
  const [editId, setEditId] = useState(null);
  return (
    <>
      <div className="p-3">
        <TableData
          data={contactList}
          columns={contactColumns}
          title="Contact Users"
          onEdit={(item) => editContact(item._id)}
        />
      </div>
    </>
  )
}
