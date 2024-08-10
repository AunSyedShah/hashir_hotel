import React, { useState, useEffect } from 'react';
import CreateGuestProfile from './CreateGuestProfile';
import ManageGuestProfiles from './ManageGuestProfiles';
import { useFormik } from 'formik';

const AdminDashboard = () => {
  // State to store roles and permissions
  const [rolesPermissions, setRolesPermissions] = useState(() => {
    const savedData = localStorage.getItem('rolesPermissions');
    return savedData ? JSON.parse(savedData) : [];
  });

  // State to store staff profiles
  const [staffProfiles, setStaffProfiles] = useState(() => {
    const savedProfiles = localStorage.getItem('staffProfiles');
    return savedProfiles ? JSON.parse(savedProfiles) : [];
  });

  // Update localStorage whenever rolesPermissions state changes
  useEffect(() => {
    localStorage.setItem('rolesPermissions', JSON.stringify(rolesPermissions));
  }, [rolesPermissions]);

  // Update localStorage whenever staffProfiles state changes
  useEffect(() => {
    localStorage.setItem('staffProfiles', JSON.stringify(staffProfiles));
  }, [staffProfiles]);

  // Formik setup for adding/editing roles and permissions
  const formikRoles = useFormik({
    initialValues: {
      role: '',
      permission: '',
      editIndex: null,
    },
    onSubmit: (values, { resetForm }) => {
      if (formikRoles.values.editIndex !== null) {
        const updatedData = [...rolesPermissions];
        updatedData[formikRoles.values.editIndex] = { role: values.role, permission: values.permission };
        setRolesPermissions(updatedData);
      } else {
        setRolesPermissions([...rolesPermissions, { role: values.role, permission: values.permission }]);
      }
      resetForm({ values: { role: '', permission: '', editIndex: null } });
    },
  });

  // Formik setup for adding/editing staff profiles
  const formikStaff = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      accessLevel: '',
      status: 'active',
      editIndex: null,
    },
    onSubmit: (values, { resetForm }) => {
      if (formikStaff.values.editIndex !== null) {
        const updatedProfiles = [...staffProfiles];
        updatedProfiles[formikStaff.values.editIndex] = { ...values };
        setStaffProfiles(updatedProfiles);
      } else {
        setStaffProfiles([...staffProfiles, { ...values }]);
      }
      resetForm({ values: { name: '', email: '', phone: '', accessLevel: '', status: 'active', editIndex: null } });
    },
  });

  // Function to handle editing a role/permission
  const handleEditRole = (index) => {
    formikRoles.setValues({ ...rolesPermissions[index], editIndex: index });
  };

  // Function to handle deleting a role/permission
  const handleDeleteRole = (index) => {
    const updatedData = rolesPermissions.filter((_, i) => i !== index);
    setRolesPermissions(updatedData);
  };

  // Function to handle editing a staff profile
  const handleEditStaff = (index) => {
    formikStaff.setValues({ ...staffProfiles[index], editIndex: index });
  };

  // Function to handle deleting a staff profile
  const handleDeleteStaff = (index) => {
    const updatedProfiles = staffProfiles.filter((_, i) => i !== index);
    setStaffProfiles(updatedProfiles);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <CreateGuestProfile/>
      <ManageGuestProfiles/>
      {/* Form for adding/editing roles and permissions */}
      <form onSubmit={formikRoles.handleSubmit} className="space-y-4 mb-8">
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="role">
            User Role
          </label>
          <input
            type="text"
            id="role"
            name="role"
            onChange={formikRoles.handleChange}
            value={formikRoles.values.role}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter user role"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="permission">
            Permission Level
          </label>
          <input
            type="text"
            id="permission"
            name="permission"
            onChange={formikRoles.handleChange}
            value={formikRoles.values.permission}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Enter permission level"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {formikRoles.values.editIndex !== null ? 'Update' : 'Save'}
        </button>
      </form>

      {/* Displaying existing roles and permissions */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Existing Roles and Permissions</h2>
        <ul className="space-y-2">
          {rolesPermissions.map((item, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <span>{item.role} - {item.permission}</span>
              <div>
                <button
                  onClick={() => handleEditRole(index)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteRole(index)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Form for adding/editing staff profiles */}
      <form onSubmit={formikStaff.handleSubmit} className="space-y-4 my-8">
        <div>
          <label className="block text-sm font-medium mb-2" htmlFor="name">
            Staff Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={formikStaff.handleChange}
            value={formikStaff.values.name}
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
            onChange={formikStaff.handleChange}
            value={formikStaff.values.email}
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
            onChange={formikStaff.handleChange}
            value={formikStaff.values.phone}
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
            onChange={formikStaff.handleChange}
            value={formikStaff.values.accessLevel}
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
            onChange={formikStaff.handleChange}
            value={formikStaff.values.status}
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
          {formikStaff.values.editIndex !== null ? 'Update' : 'Save'}
        </button>
      </form>

      {/* Displaying existing staff profiles */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Existing Staff Profiles</h2>
        <ul className="space-y-2">
          {staffProfiles.map((profile, index) => (
            <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded">
              <span>{profile.name} ({profile.accessLevel}) - {profile.status}</span>
              <div>
                <button
                  onClick={() => handleEditStaff(index)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteStaff(index)}
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

export default AdminDashboard;
