import CurrentUser from "../Components/CurrentUser.jsx";
import LogoutLink from "../Components/LogoutLink.jsx";
import AuthorizeView, { AuthorizedUser } from "../Components/AuthorizeView.jsx";

function Home() {
    return (
        <AuthorizeView>
            <span><LogoutLink>Logout <AuthorizedUser value="username" /></LogoutLink></span>
            <CurrentUser />
        </AuthorizeView>
    );
}

export default Home;