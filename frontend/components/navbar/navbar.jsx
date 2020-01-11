import React from 'react';

class Navbar extends React.Component {
   constructor(props) {
      super(props)
      this.state = {
         dropdown: false
      }
      this.demo = this.demo.bind(this);
      this.toggleDropdown = this.toggleDropdown.bind(this);
   }

   toggleDropdown() {
      console.log(this.state);
      this.setState({ dropdown: !this.state.dropdown }, () => console.log(this.state));
      
   }

   demo(e) {
      e.preventDefault();
      this.props.demoLogin({
         username: "Mr. Terrapin",
         password: "DARK@star*1"
      });
   }

   renderDropDown() {

      if (this.state.dropdown) {
         return (
            <button onClick={this.props.logout}>Logout</button>
         )
      }

   }

   render() {

      const { currentUser, logout, openModal } = this.props;

      const artistBar= () => (
         <ul className="right-side-nav">
            <p>Artist</p>
            <li className="nav-element">
               <button className="icon" >
                  <i className="fas fa-plus"></i>
               </button>
            </li>
            <li className="nav-element">
               <button className="icon" >
                  <i className="fas fa-heart"></i>
               </button>
            </li>
            <li className="nav-element">
               <div className="icon dropdown">
                  <i className="fas fa-circle" onClick={this.toggleDropdown}>
                     {this.renderDropDown()}
               </i></div>
            </li>
         </ul>
      );
   
      const fanBar = () => (
         <ul className="right-side-nav">
            <p>FAN</p>
            <li className="nav-element">
               <button className="icon" >
                  <i className="fas fa-heart"></i>
               </button>
            </li>
            <li className="nav-element">
               <button className="icon" >
                  <i className="fas fa-circle">
                  </i></button>
            </li>
         </ul>
      );

      // const circleDropdown = () => (
      //    <ul>
      //       <li>
      //          <button onClick={logout}>Logout</button>
      //       </li>
      //    </ul>
      // );
   
   
      const display = currentUser ? (
         <div className="signed-in-nav">
            {currentUser.band ? artistBar() : fanBar() }
         </div>
      ) : (
            <div className='unassigned-nav'>
               <button className="nav-login" onClick={(e) => this.demo(e)}>Demo Login</button>
               <button className="nav-login" onClick={() => openModal('SIGNUP')}>Sign up</button>
               <button className="nav-login" onClick={() => openModal('LOGIN')}>Log in</button>
            </div>
         );

      return (
         <header id="nav-bar" className="nav-bar-row">
            <div className="nav-content">
               <div className="logo-shell">
                  <img className="logo" src={window.TerrapinURL} />
               </div>
               <div>
                  search
               </div>
               <div>
                  {display}
               </div>
            </div>
         </header>
      );
   }

};


export default Navbar;

{/* <p>I am an artist</p> */ }
{/* <i class="fas fa-search"></i> */ }
{/* <i class="fas fa-plus-square"></i> */ }