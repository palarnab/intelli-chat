import React from 'react';

const NavBar = ({ user }) => {
  const navStyle = {
    padding: '10px 30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '60px',
    position: 'fixed',
    left: 0,
    top: 0,
    width: '100%',
    zInex: 1,
  };

  const chatBubble = {
    width: '35px',
    height: '35px',
    borderRadius: '50%',
    marginRight: '10px',
  };

  const userMessage = {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    color: '#fff',
    textAlign: 'center',
    lineHeight: '30px',
    backgroundColor: 'lightgray',
  };

  return (
    <nav style={navStyle}>
      <h1>Bean Talk</h1>
      <div style={{ display: 'flex' }}>
        <div style={chatBubble}>
          {user.avatar ? (
            <img src={user.avatar} alt="" />
          ) : (
            <div style={userMessage}>{user.name.charAt(0)}</div>
          )}
        </div>
        <h4 style={{ marginTop: '0.3rem' }}>{user.name}</h4>
      </div>
    </nav>
  );
};

export default NavBar;
