import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';

const StaffProfile = () => {
  // Initialize states from localStorage or set defaults
  const [staffData, setStaffData] = useState(() => {
    const savedData = localStorage.getItem('staffData');
    return savedData ? JSON.parse(savedData) : {
      name: '',
      email: '',
      phone: '',
      accessLevel: '',
      status: 'active',
    };
  });

  // Update localStorage whenever staffData state changes
  useEffect(() => {
    localStorage.setItem('staffData', JSON.stringify(staffData));
  }, [staffData]);

  const formik = useFormik({
    initialValues: staffData,
    onSubmit: (values) => {
      setStaffData(values); // Update state
      // Placeholder for API call
      console.log('Form data:', values);
      // API call to create/modify/deactivate staff profile will go here
    },
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Staff Profile Management</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="name">
            Staff Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter staff name"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter staff email"
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
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="accessLevel">
            Access Level
          </label>
          <select
            id="accessLevel"
            name="accessLevel"
            onChange={formik.handleChange}
            value={formik.values.accessLevel}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="" label="Select access level" />
            <option value="manager" label="Manager" />
            <option value="receptionist" label="Receptionist" />
            <option value="housekeeping" label="Housekeeping" />
            {/* Add more roles as needed */}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            onChange={formik.handleChange}
            value={formik.values.status}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="active" label="Active" />
            <option value="inactive" label="Inactive" />
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default StaffProfile;
