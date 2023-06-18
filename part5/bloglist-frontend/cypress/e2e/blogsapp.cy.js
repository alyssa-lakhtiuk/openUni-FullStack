
describe('Blogilista', function () {
  beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/testing/reset');
      cy.request('POST', 'http://localhost:3003/api/users/', {
          username: 'admin',
          password: 'admin'
      });
      cy.request('POST', 'http://localhost:3003/api/users/', {
          username: 'admin2',
          password: 'admin'
      });
      cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
      cy.contains('Log in to application');
      cy.contains('username');
      cy.contains('password');
  });

  describe('Login', function () {

      it('succeeds with correct credentials', function () {
          cy.get('#username').type('admin');
          cy.get('#password').type('admin');
          cy.get('#login-button').click();
          cy.contains('logged in');
      });
  
      it('fails with wrong credentials', function () {
          cy.get('#username').type('admin');
          cy.get('#password').type('abcd');
          cy.get('#login-button').click();
          cy.contains('wrong username or password');
      });

  });


  describe('When logged in', function() {

      beforeEach(function() {
          // cy.contains('login').click()
          // cy.get('#username').type('admin')
          // cy.get('#password').type('admin')
          // cy.get('#login-button').click()
          cy.login({ username: 'admin', password: 'admin' });
          cy.createBlog({ title: "blog_1", author: "somebody1", url: "http://cool.blog/1", likes: 45 });
          cy.createBlog({ title: "blog_2", author: "somebody2", url: "http://cool.blog/2", likes: 77 });
          cy.createBlog({ title: "blog_3", author: "somebody3", url: "http://cool.blog/3", likes: 9 });
      });
  
      it('a blog can be created', function() {
          cy.get('#show-form').click();
          cy.get('#title').type('one more blog');
          cy.get('#author').type('author of blog');
          cy.get('#url').type('http://some.url');
          cy.get('#create').click({force: true});

          cy.contains('one more blog');
      });

      it('a blog can be liked', function() {
          cy.contains('view').click();
          cy.contains('like').click();
          cy.reload()
          cy.contains('likes: 78');
      });

      it('a blog can be deleted', function() {
          cy.contains('view').click();
          cy.contains('remove').click();
      });

      it('blogs are in correct order', function() {
          cy.get('.all_blogs').should(($el) => {
              expect($el.first()).to.contain('blog_2');
          });
      });

      it('creator can delete a blog', function () {
        cy.createBlog({
          title: 'blog_3',
          author: "somebody3",
          url: 'http://cool.blog/3',
        }).then(() => {
          cy.contains('view').click();
          cy.contains('remove').click();
          cy.reload();
          cy.contains('blog_3').should('not.exist');
        });
      });

      it('creator can see button for deleting, others cant', function () {
        cy.login({ username: 'admin2', password: 'admin' });
        cy.contains('remove').should('not.exist');
      });
  });
});