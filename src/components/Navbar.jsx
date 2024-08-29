import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Link } from "react-router-dom";

export default function Navbar() {
  const nav = useNavigate();

  /*const alt = () => {
    const sidebar = document.querySelector(".sidebar");
    sidebar.classList.toggle("sidebarActive");
  };*/

  return <nav className="Navbar"></nav>;
}
