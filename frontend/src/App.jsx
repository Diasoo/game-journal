import {
    SignIn,
    SignUp,
    SignedIn,
    SignedOut,
    UserButton,
} from '@clerk/clerk-react';

import Components from './components/Component';
import Component from "./components/Component";

function App() {
    return (
        <div>
            <SignedOut>
                <SignIn />
            </SignedOut>

            <SignedIn>
                <Component />
                <UserButton />
                {/* Tady budeš mít pak statistiky, formuláře atd. */}
            </SignedIn>
        </div>
    );
}

export default App;