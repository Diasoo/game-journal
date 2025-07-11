import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { useUser } from '@clerk/clerk-react';
import MyComponent from "../components/Component.jsx";

export default function Home() {
    const { user } = useUser();

    return (
        <div>
            <SignedIn>
                <h1 className="text-3xl font-bold text-blue-600">Vítej {user?.primaryEmailAddress?.emailAddress}</h1>
                <MyComponent />
            </SignedIn>
        </div>
    );
}