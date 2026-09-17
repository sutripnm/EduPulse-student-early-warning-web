import { useState } from "react";

function useSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };

  return { collapsed, toggleCollapsed };
}

export default useSidebar;
