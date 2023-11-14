import Navbar from "./navbar";

const Layout = ({ children }) => {
    return (
        <div className="content">
            <Navbar className="sticky top-0 z-50" />
            {children}
            {/* <Footer className=""/> */}
        </div>
    );
}

export default Layout;