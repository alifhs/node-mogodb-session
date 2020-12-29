exports.getLogin = (req, res, next) => {
        console.log(req.get('Cookie'));
        // const isLoggedin = req.get('Cookie')
        // .split('=')[1];
        console.log(req.session.isLoggedin);
        // console.log(req.session.constructor.name)

        res.render('auth/login', {
          path: '/login',
          pageTitle: 'Login',
          isAuthenticated: false
          
        });
     
  };
exports.postLogin = (req, res, next) => {
  req.session.isLoggedin = true; 
  
        // res.setHeader('Set-Cookie', 'loggedIn=true');
        res.redirect('/');
     
  };

  