import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../../public/logo.svg";
import sidebarRoutes from "./SidebarRoutes"; // keep your existing file
import "../App.css";

/* ---------- Helpers (safe + segment-aware) ---------- */
const normalize = (p) => {
  if (typeof p !== "string") return "";
  const noQuery = p.split(/[?#]/)[0]; // strip ? and # for safety
  return noQuery.replace(/:([^/]+)/g, "").replace(/\/+$/, "");
};

const startsWithSegment = (current, base) => {
  if (!base) return false;
  const c = normalize(current);
  const b = normalize(base);
  if (c === b) return true;
  const prefix = b.endsWith("/") ? b : b + "/";
  return c.startsWith(prefix);
};

const isActive = (route, currentPath) => {
  const current = normalize(currentPath);

  const matchers = Array.isArray(route?.match) ? route.match : [];
  if (matchers.length > 0) {
    return matchers.some((m) => startsWithSegment(current, m));
  }

  return startsWithSegment(current, route?.path);
};

/* ---------- Leaf item ---------- */
const SidebarItem = React.memo(function SidebarItem({
  route,
  active,
  onClick,
}) {
  return (
    <div
      className={`rounded-md p-2 flex items-center cursor-pointer ${
        active ? "bg-gray-800 text-white" : "hover:bg-gray-800"
      }`}
      onClick={onClick}
    >
      {route.icon && (
        <i
          className={`${route.icon} mr-3 ${
            active ? "text-white" : "text-gray-400"
          }`}
        />
      )}
      <span className={`text-sm ${active ? "text-white" : "text-gray-300"}`}>
        {route.label}
      </span>
    </div>
  );
});

/* ---------- Parent group with children ---------- */
const SidebarGroup = React.memo(function SidebarGroup({
  route,
  currentPath,
  navigate,
}) {
  const parentSelfActive = isActive(route, currentPath);
  const anyChildActive = Array.isArray(route.children)
    ? route.children.some((c) => isActive(c, currentPath))
    : false;

  const parentActive = parentSelfActive || anyChildActive;

  const [open, setOpen] = React.useState(parentActive);

  // Keep group open when route changes to one of its children
  React.useEffect(() => {
    if (parentActive) setOpen(true);
  }, [parentActive]);

  return (
    <div>
      <div
        className={`rounded-md p-2 flex items-center justify-between cursor-pointer ${
          parentActive ? "bg-gray-800 text-white" : "hover:bg-gray-800"
        }`}
        onClick={() => setOpen((o) => !o)}
      >
        <div className="flex items-center">
          {route.icon && (
            <i
              className={`${route.icon} mr-3 ${
                parentActive ? "text-white" : "text-gray-400"
              }`}
            />
          )}
          <span
            className={`text-sm ${
              parentActive ? "text-white" : "text-gray-300"
            }`}
          >
            {route.label}
          </span>
        </div>
        <i
          className={`fa-solid fa-chevron-${open ? "up" : "down"} text-xs ${
            parentActive ? "text-white" : "text-gray-400"
          }`}
        />
      </div>

      {open && Array.isArray(route.children) && (
        <div className="ml-6 mt-1 space-y-1">
          {route.children.map((child, idx) => {
            const childActive = isActive(child, currentPath);
            return (
              <div
                key={idx}
                className={`p-2 text-sm cursor-pointer rounded-md ${
                  childActive
                    ? "bg-gray-700 text-white"
                    : "hover:bg-gray-700 text-gray-300"
                }`}
                onClick={() => navigate(child.path)}
              >
                • {child.label}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
});

/* ---------- Main Sidebar ---------- */
const AppSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className="w-64 h-screen bg-primary-darkGrey text-gray-300 flex flex-col fixed">
      <div className="p-4 flex justify-center items-center border-b border-gray-800">
        <img
          src={logo}
          alt="EnquiryPro"
          className="p-1.5 h-full object-contain"
          style={{ backgroundColor: "#ffffff" }} // fixed white behind the logo
          id="logo"
        />
      </div>

      <div className="px-4 py-6 space-y-1">
        {sidebarRoutes.map((route, index) => {
          const active = isActive(route, currentPath);
          const hasChildren =
            Array.isArray(route.children) && route.children.length > 0;

          if (hasChildren) {
            return (
              <SidebarGroup
                key={index}
                route={route}
                currentPath={currentPath}
                navigate={navigate}
              />
            );
          }

          return (
            <SidebarItem
              key={index}
              route={route}
              active={active}
              onClick={() => navigate(route.path)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default React.memo(AppSidebar);
