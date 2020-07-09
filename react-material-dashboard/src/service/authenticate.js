const SaveToken = async (value) => {
  localStorage.setItem('@neocorp:tokenID', value);
};

const getToken = () => {
  const value = localStorage.getItem('@neocorp:tokenID');
  return value;
};

const removeToken = async () => {
  localStorage.removeItem('@neocorp:tokenID');
};

export { SaveToken, getToken, removeToken };
