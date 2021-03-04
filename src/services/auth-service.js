import jwtDecode from "jwt-decode";

const tokenKey = "token";

export function loginWithJwt(jwt) {
  // store the jwt into the local-storage
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

export function isSelf(userID) {
  const user = getCurrentUser();
  if (userID && user && user.employeeID === userID) return true;
  return false;
}

export function isAdmin() {
  const user = getCurrentUser();
  if (user && user.isAdmin) return true;
  return false;
}

export function isHumanResource() {
  const user = getCurrentUser();
  if (user && user.isHR) return true;
  return false;
}

export function isEmployee() {
  const user = getCurrentUser();
  if (user && user.isEmployee) return true;
  return false;
}

export function getIdentity() {
  const user = getCurrentUser();
  if (user && user.employeeID) return user.employeeID;
  return null;
}

export function getJoiningDate() {
  const user = getCurrentUser();
  if (user && user.joiningDate) return user.joiningDate;
  return null;
}

export function getResigningDate() {
  const user = getCurrentUser();
  if (user && user.resigningDate) return user.resigningDate;
  return null;
}

export function getDevTalkDate() {
  const user = getCurrentUser();
  if (user && user.devTalkDate) return user.devTalkDate;
  return null;
}

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

export function isAllowed(access = []) {
  const user = getCurrentUser();

  if (user && access && access.length) {
    if (user.isAdmin && access.includes("admin")) return true;
    if (user.isHR && access.includes("hr")) return true;
    if (user.isEmployee && access.includes("employee")) return true;
  }

  return false;
}

export default {
  loginWithJwt,
  logout,
  getCurrentUser,
  isSelf,
  isAdmin,
  isHumanResource,
  isEmployee,
  getIdentity,
  getJoiningDate,
  getResigningDate,
  getDevTalkDate,
  getJwt,
  isAllowed,
};
