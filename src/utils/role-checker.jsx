import React from 'react';
import { useUserAccountTypes } from './user-accounttype';

const RoleChecker = ({ requiredTypes, children }) => {
  const userAccountTypes = useUserAccountTypes();

  const userHasRequiredType = requiredTypes.some(
    requiredType => userAccountTypes.includes(requiredType)
  );

  return userHasRequiredType ? children : null;
};

export default RoleChecker;
