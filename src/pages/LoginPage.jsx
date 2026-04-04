export default function LoginPage() {
  return (
    <div className="container" style={{ paddingTop: '120px', minHeight: '80vh' }}>
      <h3 style={{ color: 'white' }}>Please Login Admin</h3>
      <form>
        <div className="form-group">
          <label htmlFor="inputUsernameEmail" style={{ color: 'white' }}>Username or email</label>
          <input type="text" className="form-control" id="inputUsernameEmail" />
        </div>
        <div className="form-group">
          <label htmlFor="inputPassword" style={{ color: 'white' }}>Password</label>
          <input type="password" className="form-control" id="inputPassword" />
        </div>
        <button type="submit" className="btn btn-primary">Log In</button>
      </form>
    </div>
  );
}
