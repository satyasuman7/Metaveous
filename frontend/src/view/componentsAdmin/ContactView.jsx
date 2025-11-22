import React, { useEffect, useState } from "react";
import axios from "axios";
import TableData from "../TableData";

const contactColumns = [
  { key: "contact_name", label: "Name" },
  { key: "contact_email", label: "Email Address" },
  { key: "contact_phone", label: "Mobile Number" },
  { key: "contact_message", label: "Message" },
  { key: "status", label: "Status" },
];

export default function ContactView() {
  const [contactList, setContactList] = useState([]);

  // FETCH CONTACTS
  const fetchContacts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/contacts");
      if (res.data && res.data.data) {
        const normalizedData = res.data.data.map((contact) => ({
          ...contact,
          status: contact.status === true || contact.status === "true" || contact.status === "Active",
        }));
        setContactList(normalizedData);
      }
    } catch (err) {
      console.error("Error fetching users:", err.response?.data?.msg || err.message);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // EDIT CONTACT STATUS
  const editContact = async (id) => {
    const user = contactList.find((item) => item._id === id);
    if (!user) return;
    const newStatus = !user.status;
    try {
      await axios.put(`http://localhost:3000/contacts/${id}`, { status: newStatus });

      setContactList((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, status: newStatus } : item
        )
      );
    } catch (err) {
      console.error("Error updating status:", err.message);
    }
  };


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
  );
}
