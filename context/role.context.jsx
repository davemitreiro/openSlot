import { createContext, useState } from "react";

const RoleContext = createContext();

function RoleProviderWrapper(props) {
  const [role, setRole] = useState("user");

  const selectRole = () => {
    if (role === "user") {
      setRole("pro");
    } else if (role === "pro") {
      setRole("user");
    }
  };
  return (
    <RoleContext.Provider value={{ role, selectRole }}>
      {props.children}
    </RoleContext.Provider>
  );
}

export { RoleContext, RoleProviderWrapper };
