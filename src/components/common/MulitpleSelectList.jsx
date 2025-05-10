import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Select from 'react-select';

const PERMISSION_OPTIONS = [
  { value: 'view', label: 'Read' },
  { value: 'edit', label: 'Edit' }
];

function MulitpleSelectList({ setValue, getValues }) {
  const { userList } = useSelector((state) => state.user);
  const [userPermissions, setUserPermissions] = useState([]);

  const options = userList?.map((user) => ({
    value: user._id,
    label: user.email,
  })) || [];

  useEffect(() => {
    const assignedTo = getValues("assignedTo") || [];
    if (assignedTo.length) {
      setUserPermissions(assignedTo);
    }
  }, [getValues]);

  const handleUserChange = (selectedUsers) => {
    const updated = selectedUsers.map((user) => {
      const existing = userPermissions.find((u) => u.userId === user.value);
      return {
        userId: user.value,
        userLabel: user.label,
        permission: existing?.permission || 'view',
      };
    });
    setUserPermissions(updated);
  };

  const handlePermissionChange = (userId, permission) => {
    const updated = userPermissions.map((u) =>
      u.userId === userId ? { ...u, permission } : u
    );
    setUserPermissions(updated);
  };

  useEffect(() => {
    setValue("assignedTo", userPermissions);
  }, [userPermissions, setValue]);

  return (
    <div className="flex flex-col gap-y-2">
      <label className="font-semibold">Assign Users with Permissions</label>
      <Select
        options={options}
        onChange={handleUserChange}
        isMulti
        value={userPermissions.map((u) => ({
          value: u.userId,
          label: u.userLabel,
        }))}
      />

      {userPermissions.map((user) => (
        <div key={user.userId} className="flex items-center gap-2 mt-2">
          <span className="text-sm w-40 truncate">{user.userLabel}</span>
          <Select
            options={PERMISSION_OPTIONS}
            value={PERMISSION_OPTIONS.find((p) => p.value === user.permission)}
            onChange={(perm) => handlePermissionChange(user.userId, perm.value)}
            className="w-32"
          />
        </div>
      ))}
    </div>
  );
}

export default MulitpleSelectList;
