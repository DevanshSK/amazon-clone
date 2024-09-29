import LoginFormProvider from '@/components/forms/login/LoginFormProvider';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import LoginForm from '@/components/forms/login/LoginForm';

const Login = () => {
    return (
        <div className='flex-1 py-36 md:px-16 w-full'>
            <div className="flex flex-col h-full gap-3">
                <LoginFormProvider>
                    <div className="flex flex-col gap-3">
                        <LoginForm />
                        <div className="w-full flex flex-col gap-3 items-center">
                            <Button className="w-full" type="submit">
                                Submit
                            </Button>
                            <p>Don&apos;t have an account?{" "}
                                <Link to="/register" className="font-bold">Create one</Link>
                            </p>
                        </div>
                    </div>
                </LoginFormProvider>

            </div>
        </div>
    );
};

export default Login;