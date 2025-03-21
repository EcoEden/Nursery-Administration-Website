const ProtectedRoute = () => {
  const token = localStorage.getItem("token");
  if (token === null) return <Navigate to="/login" replace />;
  return <Outlet />;
};
