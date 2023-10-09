import { getCookie, setCookie } from "cookies-next";

export const getCurrentTheme = async () => {
  if (typeof window === "undefined") {
    return import("next/headers").then(({ cookies }) => {
      return cookies().has("scheme") ? cookies().get("scheme")?.value : "dark";
    });
  }

  return getCookie("scheme", { path: "/" });
};

export const toggleTheme = async () => {
  const scheme = await getCurrentTheme();
  const newScheme = scheme === "light" ? "dark" : "light";

  setCookie("scheme", newScheme, {
    path: "/",
  });

  return newScheme;
};
