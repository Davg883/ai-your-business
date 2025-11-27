import { SignIn } from '@clerk/nextjs';

export default function SignInPage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <SignIn
                appearance={{
                    elements: {
                        rootBox: 'mx-auto',
                        card: 'bg-slate-800 border border-slate-700 shadow-xl',
                        headerTitle: 'text-white',
                        headerSubtitle: 'text-slate-400',
                        socialButtonsBlockButton: 'bg-white text-slate-900 hover:bg-slate-100',
                        formFieldLabel: 'text-slate-300',
                        formFieldInput: 'bg-slate-900 border-slate-700 text-white',
                        footerActionText: 'text-slate-400',
                        footerActionLink: 'text-purple-400 hover:text-purple-300'
                    },
                }}
            />
        </div>
    );
}
