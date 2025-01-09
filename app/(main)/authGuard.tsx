import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const AuthComponent = (props: any) => {
    const router = useRouter();
    const isAuthenticated = useSelector((state: any) => state.authReducer.isAuthenticated);

    useEffect(() => {
      const token = localStorage.getItem('api_token'); // Replace with your actual auth check

      if (!token || !isAuthenticated) {
        router.replace('/auth/login'); // Redirect to login if not authenticated
      }
    }, [router, isAuthenticated]);

    return <WrappedComponent {...props} />;
  };

  return AuthComponent;
};

export default withAuth;
