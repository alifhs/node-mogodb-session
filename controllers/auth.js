const User = require('../models/user')


exports.getLogin = (req, res, next) => {
        console.log(req.get('Cookie')); // 
        // const isLoggedin = req.get('Cookie')
        // .split('=')[1];
        console.log(req.session.isLoggedin);  // session will set isLoggedIn property to sessesion if session id exists in the storage/database
        // console.log(req.session.constructor.name)

        res.render('auth/login', {
          path: '/login',
          pageTitle: 'Login',
          isAuthenticated: false
          
        });
     
  };
exports.postLogin = (req, res, next) => {

  User.findById('5feb04e23769a307dc2433d1')  
    .then(user => {
      req.session.isLoggedin = true;  
      req.session.user = user;
      res.redirect('/');
    })
    .catch(err => console.log(err));
   
  
        // res.setHeader('Set-Cookie', 'loggedIn=true');
        
     
  };
exports.postLogout   = (req, res, next) => {
  req.session.destroy((err)=>{
      console.log(err);
      res.redirect('/');
  });
  
        // res.setHeader('Set-Cookie', 'loggedIn=true');
        // res.redirect('/');
     
  };

  