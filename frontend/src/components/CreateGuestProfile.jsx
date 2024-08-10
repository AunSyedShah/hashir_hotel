import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';

const CreateGuestProfile = () => {
  const [guestProfiles, setGuestProfiles] = useState(() => {
    const savedProfiles = localStorage.getItem('guestProfiles');
    return savedProfiles ? JSON.parse(savedProfiles) : [];
  });

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
      const newProfile = {
        ...values,
        registrationDate: new Date().toISOString(),
      };

      setGuestProfiles([...guestProfiles, newProfile]);
      resetForm();
    },
  });

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Register Guest Profile</h1>

      <form onSubmit={formik.handleSubmit} className="space-y-4">
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
          Register
        </button>
      </form>
    </div>
  );
};

export default CreateGuestProfile;
