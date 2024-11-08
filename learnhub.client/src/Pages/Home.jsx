import CurrentUser from "../components/CurrentUser.jsx";
import LogoutLink from "../components/LogoutLink.jsx";
import AuthorizeView, { AuthorizedUser } from "../components/AuthorizeView.jsx";

function Home() {
    return (
        <AuthorizeView>
            <span><LogoutLink>Logout <AuthorizedUser value="username" /></LogoutLink></span>
            <CurrentUser />
        </AuthorizeView>
    );
}

export default Home;