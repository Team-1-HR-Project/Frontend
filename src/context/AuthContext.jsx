import { createContext, useContext, useState } from "react";

// ============================================================
// MOCK USERS � ????? ???????? ?? API call ?? ??? Backend
// ============================================================

export const MOCK_USERS = [
  {
    userId: "user-ahmed",
    name: "Ahmed Nasser",
    nameAr: "أحمد ناصر",
    initials: "AN",
    role: "admin",
    email: "ahmed@wisework.io",
    avatar: null,
  },
  {
    userId: "user-sara",
    name: "Sara Ahmed",
    nameAr: "سارة أحمد",
    initials: "SA",
    role: "admin",
    email: "sara@wisework.io",
    avatar: null,
  },
  {
    userId: "user-mostafa",
    name: "Mostafa Khalil",
    nameAr: "مصطفى خليل",
    initials: "MK",
    role: "hr",
    email: "mostafa@wisework.io",
    avatar: null,
  },
  {
    userId: "user-layla",
    name: "Layla Hassan",
    nameAr: "ليلى حسن",
    initials: "LH",
    role: "employee",
    email: "layla@wisework.io",
    avatar: null,
  },
];

const DEFAULT_USER = MOCK_USERS[0];

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUserState] = useState(() => {
    try {
      const saved =
        localStorage.getItem("currentUser") ||
        localStorage.getItem("user") ||
        localStorage.getItem("admin");
      if (saved) {
        const parsed = JSON.parse(saved);
        const resolved = parsed?.user || parsed?.data || parsed;
        if (resolved && (resolved.name || resolved.email)) {
          return resolved;
        }
      }
    } catch {
      // ignore JSON parse error
    }
    return DEFAULT_USER;
  });

  const setCurrentUser = (user) => {
    setCurrentUserState(user);
    try {
      if (user) {
        localStorage.setItem("currentUser", JSON.stringify(user));
      } else {
        localStorage.removeItem("currentUser");
      }
    } catch {
      // ignore
    }
  };

  const switchUser = (userId) => {
    const user = MOCK_USERS.find((u) => u.userId === userId);
    if (user) setCurrentUser(user);
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchUser,
        mockUsers: MOCK_USERS,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
