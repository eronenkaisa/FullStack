describe('Blog ', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {      
      name: 'Matti Luukkainen',      
      username: 'mluukkai',      
      password: 'salainen'    
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.get('form').contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkai')    
      cy.get('#password').type('salainen')    
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
    })

    /* it('fails with wrong credentials', function() {
      cy.get('#username').type('wrong')    
      cy.get('#password').type('wrong')    
      cy.get('#login-button').click()
      cy.contains('wrong username or password')
    }) */
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('mluukkai')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('testTitle')
      cy.get('#author').type('testAuthor')
      cy.get('#url').type('testUrl')
      cy.get('#create-button').click()
      cy.wait(10000);
      cy.contains('testTitle testAuthor')
    })

    it('a blog can be liked', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('testTitle')
      cy.get('#author').type('testAuthor')
      cy.get('#url').type('testUrl')
      cy.get('#create-button').click()
      cy.wait(5000);

      cy.contains('show').click()
      cy.contains('like').click()
      cy.contains('likes 1').click()
    })

    it('A blog can be removed', function() {
      cy.contains('new blog').click()
      cy.get('#title').type('testTitle')
      cy.get('#author').type('testAuthor')
      cy.get('#url').type('testUrl')
      cy.get('#create-button').click()
      cy.wait(5000);
      
      cy.contains('show').click()
      cy.get('#remove-button').click()
      cy.should('not.contain', 'testTitle testAuthor')
    })
  })
})


