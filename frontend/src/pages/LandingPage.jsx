import UserButton from "@/components/user-button/UserButton";
import { useAuthContext } from "@/contexts/AuthContext"

const LandingPage = () => {
  const { user, isAuthenticated, isLoading } = useAuthContext();

  if(isLoading){
    return <div>Loading....</div>
  }

  return (
    <div>

      <h1>{isAuthenticated ? "TRUE" : "FALSE"}</h1>
      <p>{user?.email}</p>
      <p>{user?.role}</p>
      <UserButton />
    </div>
  )
}

export default LandingPage