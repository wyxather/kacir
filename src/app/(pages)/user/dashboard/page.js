export default function Page() {
    return (
        <main>
            <>User Dashboard</>
            <form
                method='post'
                action='/api/auth/logout'>
                <button>Logout</button>
            </form>
        </main>
    )
}
