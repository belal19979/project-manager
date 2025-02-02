export default function Header() {
  return (
    <nav className="navbar bg-light mb-4 p-0">
      <div className="container">
        <a className="navbar-brand" href="/">
          <div className="d-flex">
            <img
              src="https://project-manager-bucket-test.s3.eu-central-1.amazonaws.com/logo.png"
              alt="logo"
              className="mr-2"
            />
            <div>project manager</div>
          </div>
        </a>
      </div>
    </nav>
  );
}
