import React from 'react';

class SessionForm extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         username: '',
         email: '',
         password: '',
         band: undefined,
      };
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   update(field) {
      return e => this.setState({
         [field]: e.currentTarget.value
      });
   }

   handleSubmit(e) {
      e.preventDefault();
      const user = Object.assign({}, this.state);
      this.props.processForm(user).then(this.props.closeModal);
   }

   renderErrors() {
      return (
         <ul>
            {this.props.errors.map((error, i) => (
               <li key={`error-${i}`}>
                  {error}
               </li>
            ))}
         </ul>
      );
   }

   render() {

      const { formType, openModal, closeModal } = this.props;

      const header = () => {
         switch (formType) {
            case 'LOGIN':
               return 'Log in'

            case 'FAN_SIGNUP':
               return 'Sign up for a Jamcamp fan account'

            case 'ARTIST_SIGNUP':
               return 'Sign up for a Jamcamp artist account'

          default:
             return 'Sign in below'
         }
      };

      const email = () => (
         <label>Email
            <input 
               type="email"
               value={this.state.email}
               onChange={this.update('email')}
               className="login-input"
            />
         </label>
      );

      const band = () => (
         <label>Band
            <input
               type="text"
               value={this.state.band}
               onChange={this.update('band')}
               className="login-input"
            />
         </label>
      );

      return (
         <div className="session-form">
            <h1>{header()}</h1>
            <button className="close-form" type="button" onClick={closeModal}>x</button>
            <form onSubmit={this.handleSubmit} className="signup-form">
               <div className="session-inputs">
                  {formType === 'ARTIST_SIGNUP' ? band() : null}
                  {formType === 'ARTIST_SIGNUP' || formType === 'FAN_SIGNUP' ? email() : null}
                  <label>Username
                     <input 
                        type="text"
                        value={this.state.username}
                        onChange={this.update('username')}
                        className="login-input"
                     />
                  </label>
                  <label>Password
                     <input 
                        type="password"
                        value={this.state.password}
                        onChange={this.update('password')}
                        className="login-input"
                     />
                  </label>
                  <div className="session-errors">{this.renderErrors()}</div>
                  <input
                     className="session-submit" 
                     type="submit" 
                     value={formType === 'LOGIN' ? 'Log in' : 'Sign up'}
                  />
               </div>
               <p className="session-footer">
                  {formType === 'LOGIN' ? "Don't have an accont? " : "Already have an account? "}
               <button
                     className="session-footer-button"
                     type="button"
                     onClick={formType === 'LOGIN' ? () => openModal('SIGNUP') : () => openModal('LOGIN')}>
                        {formType === 'LOGIN' ? 'Sign up' : 'Log in'}
               </button>.
               </p>
               <p className="session-footer">
                  Can't commit? Explore our site with a &nbsp;
               <button
                     className="session-footer-button"
                     type="button"
                     // onClick={}
                     >
                        demo login
               </button>.
               </p>
            </form>
         </div>
      );
   }
}

export default SessionForm;

{/* <h1>{formType === 'LOGIN' ? 'Log in' : formType === 'FAN_SIGNUP' ? 'Sign up as a fan' : 'Sign up as a artist'}</h1> */ }
{/* in label htmlFor"q"  in input: id="q" */ }