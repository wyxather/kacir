export default function Page() {
    return (
        <main>
            <form
                method='post'
                action='/api/auth/login'>
                <label>Username</label>
                <input name='username'></input>
                <label>Password</label>
                <input name='password'></input>
                <button>Login</button>
            </form>
        </main>
    )
}
