import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';

const ManageGuestProfiles = () => {
  const [guestProfiles, setGuestProfiles] = useState(() => {
    const savedProfiles = localStorage.getItem('guestProfiles');
    return savedProfiles ? JSON.parse(savedProfiles) : [];
  });

  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem('guestProfiles', JSON.stringify(guestProfiles));
  }, [guestProfiles]);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      preferences: '',
    },
    onSubmit: (values, { resetForm }) => {
      const updatedProfiles = [...guestProfiles];
      if (editingIndex !== null) {
        updatedProfiles[editingIndex] = { ...values, registrationDate: updatedProfiles[editingIndex].registrationDate };
      } else {
        updatedProfiles.push({ ...values, registrationDate: new Date().toISOString() });
      }

      setGuestProfiles(updatedProfiles);
      resetForm();
      setEditingIndex(null);
    },
  });

  const handleEdit = (index) => {
    formik.setValues({
      name: guestProfiles[index].name,
      email: guestProfiles[index].email,
      phone: guestProfiles[index].phone,
      preferences: guestProfiles[index].preferences,
    });
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedProfiles = guestProfiles.filter((_, i) => i !== index);
    setGuestProfiles(updatedProfiles);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Guest Profiles</h1>

      {/* Form for adding/editing guest profiles */}
      <form onSubmit={formik.handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="name">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter full name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter email address"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            type="text"
            id="phone"
            name="phone"
            onChange={formik.handleChange}
            value={formik.values.phone}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter phone number"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="preferences">
            Preferences
          </label>
          <textarea
            id="preferences"
            name="preferences"
            onChange={formik.handleChange}
            value={formik.values.preferences}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter preferences"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editingIndex !== null ? 'Update Profile' : 'Add Profile'}
        </button>
      </form>

      {/* Displaying existing guest profiles */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Registered Guest Profiles</h2>
        <ul className="space-y-2">
          {guestProfiles.map((profile, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <span>{profile.name} ({profile.email})</span>
              <div>
                <button
                  onClick={() => handleEdit(index)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ManageGuestProfiles;
