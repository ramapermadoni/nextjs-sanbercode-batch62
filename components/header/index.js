import { withAuth } from "../with-auth";

function Header() {
    return (
        <div>
            <Menu />
        </div>
    );
}
export default withAuth(Header);