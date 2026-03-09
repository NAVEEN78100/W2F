import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import {
  LayoutDashboard,
  FileText,
  FolderTree,
  MessageSquare,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Gift,
  Bug,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useState } from "react";

const navItems = [
  { name: "Dashboard", path: "/admin", icon: LayoutDashboard },
  { name: "Articles", path: "/admin/articles", icon: FileText },
  { name: "Topics", path: "/admin/topics", icon: FolderTree },
  {
    name: "Support Feedback",
    path: "/admin/support-feedback",
    icon: MessageSquare,
  },
  {
    name: "General Feedback",
    path: "/admin/general-feedback",
    icon: MessageSquare,
  },
  {
    name: "Article Feedback",
    path: "/admin/article-feedback",
    icon: MessageSquare,
  },
  {
    name: "Topic Feedback",
    path: "/admin/topic-feedback",
    icon: MessageSquare,
  },
  { name: "Grievances", path: "/admin/grievances", icon: FileText },
  { name: "Bug Bounty", path: "/admin/bug-bounty", icon: Bug },
  { name: "Referral Codes", path: "/admin/referral-code-logs", icon: Gift },
];

export default function AdminSidebar() {
  const { signOut, user } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "min-h-screen bg-sidebar flex flex-col border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Header */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
                <span className="text-sidebar-primary-foreground font-bold text-sm">
                  A
                </span>
              </div>
              <span className="font-semibold text-sidebar-foreground">
                Admin Panel
              </span>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className="text-sidebar-muted hover:text-sidebar-foreground hover:bg-sidebar-accent h-8 w-8"
          >
            {collapsed ? (
              <ChevronRight className="w-4 h-4" />
            ) : (
              <ChevronLeft className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              )}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              {!collapsed && <span>{item.name}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border space-y-2">
        <Button
          variant="ghost"
          onClick={signOut}
          className={cn(
            "w-full justify-start gap-3 text-sidebar-muted hover:text-destructive hover:bg-destructive/10",
            collapsed && "justify-center px-0",
          )}
        >
          <LogOut className="w-5 h-5 shrink-0" />
          {!collapsed && <span>Sign Out</span>}
        </Button>

        {!collapsed && user && (
          <div className="px-3 py-2 text-xs text-sidebar-muted truncate">
            {user.email}
          </div>
        )}
      </div>
    </aside>
  );
}
