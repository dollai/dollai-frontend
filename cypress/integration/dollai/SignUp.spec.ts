
describe('회원가입', () => {
  it('입력항목 Validators 동작해야 한다', () => {
    cy.visit('/accounts/signup');

    cy.get('.btn-submit__step1').click();
    cy.get('.form-username .help-block')
      .invoke('text').should('contain', '필수');
    cy.get('.form-email .help-block')
      .invoke('text').should('contain', '필수');
    cy.get('.form-password .help-block')
      .invoke('text').should('contain', '필수');

    cy.get('.form-username input')
      .type('test');
    cy.get('.form-username .help-block').should('not.be.visible');

    const email = 'test@a.net';
    cy.get('.form-email input')
      .type('test');
    cy.get('.form-email .help-block')
      .invoke('text').should('contain', '유효한 이메일 형식');
    cy.get('.form-email input')
      .clear().type(email);
    cy.get('.form-email .help-block').should('not.be.visible');

    cy.get('.form-email-confirmation input')
      .type('test');
    cy.get('.form-email-confirmation .help-block')
      .invoke('text').should('contain', '유효한 이메일 형식');
    cy.get('.form-email-confirmation input')
      .type('test@unmatch.com');
    cy.get('.form-email-confirmation .help-block')
      .invoke('text').should('contain', '일치하지');
    cy.get('.form-email-confirmation input')
      .clear().type(email);
    cy.get('.form-email-confirmation .help-block').should('not.be.visible');

    cy.get('.form-password input')
      .type('test');
    cy.get('.form-password .help-block')
      .invoke('text').should('contain', '조합');
    cy.get('.form-password input')
      .clear().type('aA1!ab');
    cy.get('.form-password .help-block').should('not.be.visible');

    cy.get('.btn-submit__step1').click();
    cy.get('h2')
      .invoke('text').should('contain', '이메일 확인');
  });
});
