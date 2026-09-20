import { useState } from "react";

/** Hook useSidebar untuk memusatkan state dan logika yang terkait. */
function useSidebar() {
  const [collapsed, setCollapsed] = useState(false);

  /** Komponen atau fungsi toggleCollapsed yang menangani bagian UI terkait. */
  const toggleCollapsed = () => {
    setCollapsed((prev) => !prev);
  };

  return { collapsed, toggleCollapsed };
}

export default useSidebar;
