import RegisterFormProvider from "@/components/forms/register/RegisterFormProvider"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import RegisterForm from "@/components/forms/register/RegisterForm"

const Register = () => {
  return (
    <div className='flex-1 py-36 md:px-16 w-full'>
        <div className="flex flex-col h-full gap-3">
            <RegisterFormProvider>
                <div className="flex flex-col gap-3">
                    <RegisterForm />
                    <div className="w-full flex flex-col gap-3 items-center">
                        <Button className="w-full" type="submit">
                            Submit
                        </Button>
                        <p>Already have an account?{" "}
                            <Link to="/login" className="font-bold">Click here.</Link>
                        </p>
                    </div>
                </div>
            </RegisterFormProvider>

        </div>
    </div>
);
}

export default Register