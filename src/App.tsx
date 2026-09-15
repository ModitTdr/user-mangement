import { RouterProvider } from "react-router";
import router from "./routes/router";
import { useDispatch, useSelector } from "react-redux";
import { restoreSession } from "./features/Authentication/authSlice";
import { useEffect } from "react";
import type { RootState } from "./store/store";
import LoadingPage from "./pages/LoadingPage";

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);

  useEffect(() => {
    dispatch(restoreSession());
  }, []);

  // Block rendering until session check completes
  if (isLoading) return <LoadingPage />;
  return (
    <main>
      <RouterProvider router={router} />
    </main>
  )
}

export default App;