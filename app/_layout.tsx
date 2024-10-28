// Import your global CSS file
import { AuthContextProvider, useAuth } from "@/context/authContext";
import "../global.css";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { MenuProvider } from "react-native-popup-menu";
const MainLayout = () => {
  const { isAuthenticated } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  useEffect(() => {
    if (typeof isAuthenticated === "undefined") {
      return;
    }
    const inApp = segments[0] === "(app)";
    if (isAuthenticated && !inApp) {
      router.replace("/home");
    } else if (isAuthenticated === false) {
      //redirect to sign up page
      router.replace("/signIn");
    }
  }, [isAuthenticated]);
  return <Slot />;
};
export default function RootLayout() {
  return (
    <MenuProvider>
      <AuthContextProvider>
        <MainLayout />
      </AuthContextProvider>
    </MenuProvider>
  );
}
